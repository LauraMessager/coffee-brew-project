<?php

namespace App\Repository;

use App\Entity\Method;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class MethodCrudRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Method::class);
    }

    /**
     * Get all methods
     * @return Method[]
     */
    public function getAllMethods(): array
    {
        return $this->findAll();
    }

    /**
     * Find method by ID
     * @param int $id
     * @return Method|null
     */
    public function findById(int $id): ?Method
    {
        return $this->find($id);
    }
}
