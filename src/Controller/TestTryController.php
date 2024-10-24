<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Annotation\Route;

use App\Repository\TestRepository;

use Symfony\Component\HttpFoundation\Request;

#[\AllowDynamicProperties]
// #[IsGranted('ADMIN')]
#[Route('/test', name: 'test')]
class TestTryController extends AbstractController {

    /**
     * init repository
     * @param TestRepository $testRepository
     */

     public function __construct(TestRepository $testRepository) {
        $this->testRepository = $testRepository;
     }

     /**
      * Test
      * @return JsonResponse
      */
      #[Route('/', name: 'index')]
      public function index(): JsonResponse {
          $datas = $this->testRepository->getData();

          return new JsonResponse (
            [
              'datas'=> $datas,
            ],
            200
          );
      }
}