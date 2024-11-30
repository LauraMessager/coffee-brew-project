<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\UsersRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;


#[Route('/api/user', name: 'user')]
class UserController
{
  private UserPasswordHasherInterface $passwordHasher;
  private EntityManagerInterface $entityManager;
  private NelmioCorsMiddleware $cors;
  private UsersRepository $usersRepository;

  public function __construct(UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager, UsersRepository $usersRepository)
  {
    //parent::__construct($cors);
    $this->passwordHasher = $passwordHasher;
    $this->entityManager = $entityManager;
    $this->usersRepository = $usersRepository;
  }


    /**
    * Get users list
    * @return JsonResponse
    */
    #[IsGranted('ROLE_ADMIN')]
    #[Route('/list', name: 'users')]
    public function index(): JsonResponse {
      $datas = $this->usersRepository->getData();
      return new JsonResponse(
        [
          'datas' => $datas,
        ],
        200
      );
    }


    /**
     * Register Route
     */
    #[Route('/register', name: 'register', methods: ['POST'])]
    public function register(Request $request): JsonResponse
    {
      $data = json_decode($request->getContent(), true);
      $errors = [];
    
      if (empty($data['name'])) {
        $errors['name'] = 'Name is required';
      }
      if (empty($data['mail'])) {
        $errors['mail'] = 'Email is required';
      }
      if (empty($data['password'])) {
        $errors['password'] = 'Password is required';
      }

      if (!preg_match('/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{13,}$/', $data['password'])) {
        $errors['password'] = 'Password must be at least 13 characters long, include an uppercase letter, a number, and a special character.';
      }

      if (!empty($errors)) {
        return new JsonResponse([
          'message' => 'Validation failed',
          'errors' => $errors,
        ], JsonResponse::HTTP_BAD_REQUEST);
      }

      $existingUser = $this->entityManager->getRepository(User::class)->findOneBy(['mail' => $data['mail']]);
      if ($existingUser) {
        return new JsonResponse(['message' => 'User already exists'], JsonResponse::HTTP_BAD_REQUEST);
      }

      $user = new User();
      $user->setName($data['name']);
      $user->setMail($data['mail']);

      $roles = isset($data['roles']) ? $data['roles'] : ['ROLE_USER'];
      $user->setRoles($roles);

      $hashedPassword = $this->passwordHasher->hashPassword($user, $data['password']);
      $user->setPassword($hashedPassword);

      $user->setCreatedAt(new \DateTime());

      $this->entityManager->persist($user);
      $this->entityManager->flush();

      return new JsonResponse(['message' => 'User registered successfully!'], JsonResponse::HTTP_CREATED);
    }


    /**
     * Login route
     */
    #[Route('/login', name: 'login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
      $data = json_decode($request->getContent(), true);

      if (!isset($data['mail']) || !isset($data['password'])) {
        return new JsonResponse(['message' => 'Invalid request'], JsonResponse::HTTP_BAD_REQUEST);
      }

      $user = $this->entityManager->getRepository(User::class)->findOneBy(['mail' => $data['mail']]);

      if (!$user) {
        return new JsonResponse(['message' => 'User not found'], JsonResponse::HTTP_UNAUTHORIZED);
      }

      if (!$this->passwordHasher->isPasswordValid($user, $data['password'])) {
        return new JsonResponse(['message' => 'Invalid password'], JsonResponse::HTTP_UNAUTHORIZED);
      }

      $apiToken = bin2hex(random_bytes(64)); 
      $user->setApiToken($apiToken);
      $this->entityManager->persist($user);
      $this->entityManager->flush();
      
      $roles = $user->getRoles();
      return new JsonResponse([
          'apiToken' => $apiToken,
          'roles' => $roles
      ], JsonResponse::HTTP_OK);
    }

    /**
     * Logout route
     */
    #[Route('/logout', name: 'logout', methods: ['POST'])]
    public function logout(Request $request): JsonResponse
    {
      $apiToken = $request->headers->get('auth-token');
      if ($apiToken) {
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['apiToken' => $apiToken]);
        if ($user) {
          $user->setApiToken(null);
          $this->entityManager->persist($user);
          $this->entityManager->flush();
        }
      }

      return new JsonResponse(['message' => 'Logged out successfully'], JsonResponse::HTTP_OK);
    }
}
