<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\MethodRepository;
use App\Form\MethodType;
use App\Entity\Method;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

#[\AllowDynamicProperties]
// #[IsGranted('ADMIN')]
#[Route('/api/method', name: 'method')]
class MethodController extends AbstractController {

    private MethodRepository $methodRepository;
    private EntityManagerInterface $entityManager; 

    public function __construct(MethodRepository $methodRepository, EntityManagerInterface $entityManager) {
        $this->methodRepository = $methodRepository;
        $this->entityManager = $entityManager;
    }

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

    #[Route('/add', name: 'create_method', methods: ['GET', 'POST'])]
    public function create(Request $request): JsonResponse {
      $content = $request->getContent();
      $data = json_decode($content, true);

      if ($data === null || !isset($data['name'], $data['icon'])) {
          return new JsonResponse(['error' => 'Invalid JSON or missing required fields'], Response::HTTP_BAD_REQUEST);
      }

      $method = new Method();
      $form = $this->createForm(MethodType::class, $method);
      $form->submit($data);

      if (!$form->isValid()) {
          return new JsonResponse([
              'errors' => $form->getErrors(true, false),
              'message' => 'Form validation failed'
          ], Response::HTTP_BAD_REQUEST);
      }

      // Persist and flush the entity here
      $entityManager->persist($method);
      $entityManager->flush();

      // Check if the method exists in the database after flushing
      $repository = $this->getDoctrine()->getRepository(Method::class);
      $savedMethod = $repository->find($method->getId());

      if ($savedMethod) {
          return new JsonResponse(
              [
                  'message' => 'Method created successfully!',
                  'method' => [
                      'id' => $savedMethod->getId(),
                      'name' => $savedMethod->getName(),
                      'icon' => $savedMethod->getIcon(),
                  ],
              ],
              Response::HTTP_CREATED
          );
      } else {
          return new JsonResponse(['error' => 'Failed to save method'], Response::HTTP_INTERNAL_SERVER_ERROR);
      }
    }
}



      // /**
      // * Get method by id
      // * @return JsonResponse
      // * @param string $id
      // */
      // #[Route('/{id}', name: 'method')]
      // public function methodById(string $id): JsonResponse {
      //     $datas = $this->methodRepository->getDataById($id);

      //     return new JsonResponse (
      //       [
      //         'datas'=> $datas,
      //       ],
      //       200
      //     );
      // }