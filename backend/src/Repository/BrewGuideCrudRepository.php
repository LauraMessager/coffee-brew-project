<?php

namespace App\Repository;

use App\Entity\BrewGuide;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<BrewGuide>
 */
class BrewGuideCrudRepository extends ServiceEntityRepository
{
  public function __construct(ManagerRegistry $registry)
  {
    parent::__construct($registry, BrewGuide::class);
  }

  /**
   * Get all brew guides
   * @return BrewGuide[]
   */
  public function getAllBrews(): array
  {
    return $this->findAll();
  }

  /**
   * Find brew guide by ID
   * @param int $id
   * @return BrewGuide|null
   */
  public function findById(int $id): ?BrewGuide
  {
    return $this->find($id);
  }
}
