<?php

namespace App\Repository;

use App\Entity\Recipe;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class RecipeCrudRepository extends ServiceEntityRepository
{
  public function __construct(ManagerRegistry $registry)
  {
    parent::__construct($registry, Recipe::class);
  }

  /**
   * Get all recipes
   * @return Recipe[]
   */
  public function getAllRecipes(): array
  {
    return $this->findAll();
  }

  /**
   * Find method by ID
   * @param int $id
   * @return Recipe|null
   */
  public function findById(int $id): ?Recipe
  {
    return $this->find($id);
  }
}
