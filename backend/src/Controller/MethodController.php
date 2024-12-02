<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\MethodRepository;
use App\Repository\MethodCrudRepository;
// use App\Repository\RecipeRepository;
use App\Repository\RecipeCrudRepository;
use App\Entity\Method;

#[\AllowDynamicProperties]
#[Route('/api/method', name: 'method')]
class MethodController extends AbstractController {

  private MethodRepository $methodRepository;
  private MethodCrudRepository $methodCrudRepository;
  // private RecipeRepository $recipeRepository;
  private RecipeCrudRepository $recipeCrudRepository;
  private EntityManagerInterface $entityManager; 

  public function __construct(MethodRepository $methodRepository, RecipeCrudRepository $recipeCrudRepository, EntityManagerInterface $entityManager, MethodCrudRepository $methodCrudRepository) {
    $this->methodRepository = $methodRepository;
    $this->recipeCrudRepository = $recipeCrudRepository;
    $this->entityManager = $entityManager;
    $this->methodCrudRepository = $methodCrudRepository;
  }


  /**
  * Get all the existing methods
  * @return JsonResponse
  */
  #[Route('/', name: 'methods')]
  public function index(): JsonResponse {
    $datas = $this->methodRepository->getData();
    return new JsonResponse(
      [
        'datas' => $datas,
      ],
      200
    );
  }


  /**
  * Get method by id
  * @return JsonResponse
  * @param string $id
  */
  #[IsGranted('ROLE_ADMIN')]
  #[Route('/ref/{id}', name: 'method_by_id')]
  public function methodById(string $id): JsonResponse {
    $datas = $this->methodRepository->getDataById($id);
    return new JsonResponse (
      [
        'datas'=> $datas,
      ],
      200
    );
  }


  /**
  * Add new method
  * @return JsonResponse
  * @param Request $request
  */
  #[IsGranted('ROLE_ADMIN')]
  #[Route('/add', name: 'create_method', methods: ['GET', 'POST'])]
  public function create(Request $request): JsonResponse {
    $errors = [];

    $name = $request->get('name');
    if (!$name || trim($name) === '') {
        $errors['name'] = 'Name is required';
    }

    $icon = $request->files->get('icon');
    if ($icon) {
        if (!$icon->isValid()) {
            $errors['icon'] = 'Invalid file upload.';
        } elseif (!in_array($icon->getMimeType(), ['image/jpeg', 'image/png', 'image/webp'])) {
            $errors['icon'] = 'Invalid file type. Only JPEG, PNG, or WebP are allowed.';
        } elseif ($icon->getSize() > 2 * 1024 * 1024) {
            $errors['icon'] = 'File size exceeds 2MB.';
        }
    }

    if (!empty($errors)) {
        return new JsonResponse([
            'message' => 'Validation failed',
            'errors' => $errors,
        ], Response::HTTP_BAD_REQUEST);
    }

    $iconPath = null;
    if ($icon) {
        $uploadDir = $this->getParameter('upload_directory');
        $fileName = uniqid() . '.' . $icon->guessExtension();
        $icon->move($uploadDir, $fileName);
        $iconPath = '/uploads/' . $fileName;
    }

    $method = new Method();
    $method->setName($name);
    if ($iconPath) {
        $method->setIcon($iconPath);
    }

    $this->entityManager->persist($method);
    $this->entityManager->flush();

    return new JsonResponse([
        'message' => 'Method created successfully.',
        'method' => [
            'id' => $method->getId(),
            'name' => $method->getName(),
            'icon' => $method->getIcon(),
        ],
    ], Response::HTTP_CREATED);
}

  /**
  * Delete method based on ID
  * @return JsonResponse
  * @param Request $request
  */
  #[IsGranted('ROLE_ADMIN')]
    #[Route('/delete/{id}', name: 'delete_method', methods: ['DELETE'])]
    public function delete(Request $request, int $id): JsonResponse {
    
      $method = $this->methodCrudRepository->find($id);

    if (!$method) {
        return new JsonResponse(['message' => 'Method not found'], Response::HTTP_NOT_FOUND);
    }

    $recipes = $this->recipeCrudRepository->findBy(['method' => $method]);

    foreach ($recipes as $recipe) {
      $recipe->setMethod(null);
      $this->entityManager->persist($recipe);
  }

    $this->entityManager->remove($method); 
    $this->entityManager->flush();

    return new JsonResponse([
        'message' => 'Method deleted successfully.',
        'deletedId' => $method->getId(),
    ], Response::HTTP_OK);
}

  /**
  * Update existing method based on ID
  * @return JsonResponse
  * @param Request $request
  */
  #[IsGranted('ROLE_ADMIN')]
  #[Route('/update/{id}', name: 'update_method', methods: ['POST'])]
  public function update(Request $request, int $id): JsonResponse {
    $method = $this->methodCrudRepository->findById($id);

    if (!$method) {
        return new JsonResponse(['message' => 'Method not found'], Response::HTTP_NOT_FOUND);
    }

    $data = json_decode($request->getContent(), true);
    $errors = [];

    if (isset($data['name']) && trim($data['name']) === '') {
        $errors['name'] = 'Name cannot be empty';
    }

    if (!empty($errors)) {
        return new JsonResponse([
            'message' => 'Validation failed',
            'errors' => $errors,
        ], Response::HTTP_BAD_REQUEST);
    }

    if (isset($data['name'])) {
        $method->setName($data['name']);
    }
    if (isset($data['icon'])) {
        $method->setIcon($data['icon']);
    }

    $this->entityManager->flush();

    return new JsonResponse([
        'message' => 'Method updated successfully.',
        'method' => [
            'id' => $method->getId(),
            'name' => $method->getName(),
            'icon' => $method->getIcon(),
        ],
    ], Response::HTTP_OK);
}
}
