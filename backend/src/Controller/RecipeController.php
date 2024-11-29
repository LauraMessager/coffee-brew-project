<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Method;
use App\Entity\Recipe;
use App\Entity\User; 
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\MethodRepository;
use App\Repository\MethodCrudRepository;
use App\Repository\RecipeRepository;
use App\Repository\RecipeCrudRepository;

#[\AllowDynamicProperties]
#[Route('/api/recipe', name: 'recipe')]
class RecipeController extends AbstractController {

  private RecipeRepository $recipeRepository;
  private RecipeCrudRepository $recipeCrudRepository;
  private EntityManagerInterface $entityManager; 

  public function __construct(RecipeRepository $recipeRepository, EntityManagerInterface $entityManager, RecipeCrudRepository $recipeCrudRepository) {
    $this->recipeRepository = $recipeRepository;
    $this->entityManager = $entityManager;
    $this->recipeCrudRepository = $recipeCrudRepository;
  }

  /**
  * Get all the existing recipes
  * @return JsonResponse
  */
  #[IsGranted('ROLE_ADMIN')]
  #[IsGranted('ROLE_USER')]  
  #[Route('/', name: 'recipes')]
  public function index(): JsonResponse {
    $datas = $this->recipeRepository->getData();
    return new JsonResponse(
      [
        'datas' => $datas,
      ],
      200
    );
  }

  
  /**
  * Get recipe by id
  * @return JsonResponse
  * @param string $id
  */
  #[IsGranted('ROLE_ADMIN')]
  #[IsGranted('ROLE_USER')]
  #[Route('/recipe/{id}', name: 'recipe_by_id')]
  public function brewById(string $id): JsonResponse {
    $datas = $this->recipeRepository->getDataById($id);
    return new JsonResponse (
      [
        'datas'=> $datas,
      ],
      200
    );
  }


  /**
  * Add new recipe
  * @return JsonResponse
  * @param Request $request
  */
  #[IsGranted('ROLE_ADMIN')]
  #[IsGranted('ROLE_USER')]
  #[Route('/add', name: 'create_recipe', methods: ['GET', 'POST'])]
  public function create(Request $request): JsonResponse {
    $data = json_decode($request->getContent(), true);
    $errors = [];

    if (!isset($data['name']) || trim($data['name']) === '') {
      $errors['name'] = 'Name is required';
    }

    if (!empty($errors)) {
      return new JsonResponse([
        'message' => 'Validation failed',
        'errors' => $errors,
      ], Response::HTTP_BAD_REQUEST);
    }

    $user = $this->getUser();

    if (!$user) {
      return new JsonResponse([
        'message' => 'User is not authenticated',
      ], Response::HTTP_UNAUTHORIZED);
    }

    $recipe = new Recipe();
    $recipe->setName($data['name']);
    $recipe->setDescription($data['description'] ?? null);
    $recipe->setTemperature($data['temperature'] ?? null);
    $recipe->setWaterAmt($data['water_amt'] ?? null);
    $recipe->setCoffeeAmt($data['coffee_amt'] ?? null);
    $recipe->setCreatedBy($user); 
    $recipe->setCreatedAt(new \DateTime());
    $recipe->setModifiedAt(new \DateTime());

    if (isset($data['method'])) {
      $method = $this->entityManager->getRepository(Method::class)->find($data['method']);
      if (!$method) {
        return new JsonResponse([
          'message' => 'Method not found',
        ], Response::HTTP_BAD_REQUEST);
      }
      $recipe->setMethod($method);
    }

    $this->entityManager->persist($recipe);
    $this->entityManager->flush();

    return new JsonResponse([
      'message' => 'Recipe created successfully!',
      'recipe' => [
        'id' => $recipe->getId(),
        'name' => $recipe->getName(),
        'description' => $recipe->getDescription(),
      ],
    ], Response::HTTP_CREATED);
  }

  
    /**
    * Update existing brew guide based on ID
    * @return JsonResponse
    * @param Request $request
    */
    #[IsGranted('ROLE_ADMIN')]
    #[IsGranted('ROLE_USER')]
    #[Route('/update/{id}', name: 'update_recipe', methods: ['POST'])]
    public function update(Request $request, int $id): JsonResponse {
      $recipe = $this->recipeCrudRepository->findById($id);
      if (!$recipe) {
        return new JsonResponse(['message' => 'Recipe not found'], Response::HTTP_NOT_FOUND);
      }

      $data = json_decode($request->getContent(), true);
      $errors = [];

      if (isset($data['name']) && trim($data['name']) === '') {
        $errors['name'] = 'Name cannot be empty';
      }

      if (isset($data['method']) && !is_int($data['method'])) {
        $errors['method'] = 'Method must be an integer';
      }

      if (!empty($errors)) {
        return new JsonResponse([
          'message' => 'Validation failed',
          'errors' => $errors,
        ], Response::HTTP_BAD_REQUEST);
      }

      if (isset($data['name'])) {
        $recipe->setName($data['name']);
      }

      if (isset($data['description'])) {
        $recipe->setDescription($data['description']);
      }

      if (isset($data['method'])) {
        $method = $this->entityManager->getRepository(Method::class)->find($data['method']);
        if (!$method) {
          return new JsonResponse([
            'message' => 'Method not found',
          ], Response::HTTP_BAD_REQUEST);
        }
        $recipe->setMethod($method);
      }

      $this->entityManager->flush();

      return new JsonResponse([
        'message' => 'Recipe updated successfully!',
        'recipe' => [
          'id' => $recipe->getId(),
          'name' => $recipe->getName(),
          'description' => $recipe->getDescription(),
          'method' => $recipe->getMethod() ? $recipe->getMethod()->getId() : null,
        ],
      ], Response::HTTP_OK);
    }
}
