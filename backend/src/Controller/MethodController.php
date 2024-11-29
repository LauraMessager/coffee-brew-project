<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\MethodRepository;
use App\Repository\MethodCrudRepository;
use App\Entity\Method;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

#[\AllowDynamicProperties]
#[Route('/api/method', name: 'method')]
class MethodController extends AbstractController {

  private MethodRepository $methodRepository;
  private MethodCrudRepository $methodCrudRepository;
  private EntityManagerInterface $entityManager; 

  public function __construct(MethodRepository $methodRepository, EntityManagerInterface $entityManager, MethodCrudRepository $methodCrudRepository) {
    $this->methodRepository = $methodRepository;
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
    $data = json_decode($request->getContent(), true);
    $errors = [];

    if (!isset($data['name']) || trim($data['name']) === '') {
      $errors['name'] = 'Name is required';
    }

    $icon = $request->files->get('icon');
    if (!$icon) {
      $errors['icon'] = 'Icon is required.';
    } elseif (!$icon->isValid()) {
      $errors['icon'] = 'Invalid file upload.';
    } elseif (!in_array($icon->getMimeType(), ['image/jpeg', 'image/png', 'image/webp'])) {
      $errors['icon'] = 'Invalid file type. Only JPEG, PNG, or WebP are allowed.';
    } elseif ($icon->getSize() > 2 * 1024 * 1024) {
      $errors['icon'] = 'File size exceeds 2MB.';
    }

    if (!empty($errors)) {
      return new JsonResponse([
        'message' => 'Validation failed',
        'errors' => $errors,
      ], Response::HTTP_BAD_REQUEST);
    }

    $uploadDir = $this->getParameter('upload_directory');
    $fileName = uniqid() . '.' . $icon->guessExtension();
    $icon->move($uploadDir, $fileName);

    $method = new Method();
    $method->setName($data['name']);
    $method->setIcon('/uploads/' . $fileName); 

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
