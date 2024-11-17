<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\BrewGuideRepository;
use App\Repository\BrewGuideCrudRepository;
use App\Entity\BrewGuide;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\User;

#[\AllowDynamicProperties]
#[IsGranted('ROLE_ADMIN')]
#[Route('/api/brew_guide', name: 'brew_guide')]
class BrewGuideController extends AbstractController {

  private BrewGuideRepository $brewGuideRepository;
  private BrewGuideCrudRepository $brewGuideCrudRepository;
  private EntityManagerInterface $entityManager; 

  public function __construct(BrewGuideRepository $brewGuideRepository, EntityManagerInterface $entityManager, BrewGuideCrudRepository $brewGuideCrudRepository) {
    $this->brewGuideRepository = $brewGuideRepository;
    $this->entityManager = $entityManager;
    $this->brewGuideCrudRepository = $brewGuideCrudRepository;
  }


  /**
  * Get all the existing methods
  * @return JsonResponse
  */
  #[Route('/', name: 'guides')]
  public function index(): JsonResponse {
    $datas = $this->brewGuideRepository->getData();
    return new JsonResponse(
      [
        'datas' => $datas,
      ],
      200
    );
  }

  /**
  * Get brew guide by id
  * @return JsonResponse
  * @param string $id
  */
  #[Route('/brew/{id}', name: 'brew_by_id')]
  public function brewById(string $id): JsonResponse {
    $datas = $this->brewGuideRepository->getDataById($id);
    return new JsonResponse (
      [
        'datas'=> $datas,
      ],
      200
    );
  }

  /**
  * Add new brew guide
  * @return JsonResponse
  * @param Request $request
  */
  #[Route('/add', name: 'create_brew', methods: ['GET', 'POST'])]
  public function create(Request $request): JsonResponse {
    $data = json_decode($request->getContent(), true);
    $errors = [];

    if (!isset($data['title']) || trim($data['title']) === '') {
        $errors['title'] = 'Title is required';
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

    $brewGuide = new BrewGuide();
    $brewGuide->setTitle($data['title']);
    $brewGuide->setDescription($data['description'] ?? null);
    $brewGuide->setCreatedBy($user);
    $brewGuide->setCreatedAt(new \DateTime());

    $this->entityManager->persist($brewGuide);
    $this->entityManager->flush();

    return new JsonResponse([
        'message' => 'Brew guide created successfully!',
        'brewGuide' => [
            'id' => $brewGuide->getId(),
            'title' => $brewGuide->getTitle(),
            'description' => $brewGuide->getDescription(),
            'created_by' => $brewGuide->getCreatedBy()->getUsername(),
            'created_at' => $brewGuide->getCreatedAt()->format('Y-m-d H:i:s'),
        ],
    ], Response::HTTP_CREATED);
  }

  /**
  * Delete bew guide based on ID
  * @return JsonResponse
  * @param Request $request
  */
  #[Route('/delete/{id}', name: 'delete_brew_guide', methods: ['DELETE'])]
  public function delete(Request $request, int $id): JsonResponse {
  
    $brew = $this->brewGuideCrudRepository->findById($id);

    if (!$brew) {
      return new JsonResponse(['message' => 'Brew not found'], Response::HTTP_NOT_FOUND);
    }
    $this->entityManager->remove($brew); 
    $this->entityManager->flush();

    return new JsonResponse([
      'message' => 'Brew deleted successfully',
      'deletedId' => $brew->getId(),
    ], Response::HTTP_OK);
  }

  /**
  * Update existing brew guide based on ID
  * @return JsonResponse
  * @param Request $request
  */
  #[Route('/update/{id}', name: 'update_brew_guide', methods: ['POST'])]
  public function update(Request $request, int $id): JsonResponse {
    $brew = $this->brewGuideCrudRepository->findById($id);

    if (!$brew) {
      return new JsonResponse(['message' => 'Brew guide not found'], Response::HTTP_NOT_FOUND);
    }

    $data = json_decode($request->getContent(), true);
    $errors = [];

    if (isset($data['title']) && trim($data['title']) === '') {
      $errors['title'] = 'Title cannot be empty';
    }

    if (isset($data['created_by']) && !is_int($data['created_by'])) {
      $errors['created_by'] = 'Created by must be an integer';
    }

    if (!empty($errors)) {
      return new JsonResponse([
        'message' => 'Validation failed',
        'errors' => $errors,
      ], Response::HTTP_BAD_REQUEST);
    }

    if (isset($data['title'])) {
      $brew->setTitle($data['title']);
    }
    if (isset($data['description'])) {
      $brew->setDescription($data['description']);
    }
    if (isset($data['created_by'])) {
      $user = $this->entityManager->getRepository(User::class)->find($data['created_by']);
        
      if (!$user) {
          return new JsonResponse([
              'message' => 'User not found',
              'errors' => ['created_by' => 'Invalid user ID'],
          ], Response::HTTP_BAD_REQUEST);
      }

      $brew->setCreatedBy($user);
    }
    if (isset($data['created_at'])) {
      try {
        $date = new \DateTime($data['created_at']);
        $brew->setCreatedAt($date);
      } catch (\Exception $e) {
        return new JsonResponse([
          'message' => 'Invalid date format for created_at',
          'errors' => ['created_at' => 'Invalid date format'],
        ], Response::HTTP_BAD_REQUEST);
      }
    }

    $this->entityManager->flush();

    return new JsonResponse([
      'message' => 'Brew guide updated successfully!',
      'brewGuide' => [
        'id' => $brew->getId(),
        'title' => $brew->getTitle(),
        'description' => $brew->getDescription(),
        'created_by' => $brew->getCreatedBy()->getId(),
        'created_at' => $brew->getCreatedAt() ? $brew->getCreatedAt()->format('Y-m-d H:i:s') : null,
      ],
    ], Response::HTTP_OK);
  }
}