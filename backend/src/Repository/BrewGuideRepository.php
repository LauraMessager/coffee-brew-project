<?php

namespace App\Repository;

use App\Entity\BrewGuide;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<BrewGuide>
 */
class BrewGuideRepository extends ServiceEntityRepository
{
  public $mssql_conn = null;

  /**
   * Initialize connections
   * @param ManagerRegistry $doctrine
   * 
   */
  public function __construct(ManagerRegistry $doctrine)
  {
    $this->mssql_conn = $doctrine->getConnection();    
  }

  public function getData(): ?Array {
    $sql = "SELECT * 
            FROM brew_guide
            ";
    return $this->mssql_conn->fetchAllAssociative($sql);
  }

  /**
   * get metod by id
   * @param string $id
   */
  public function getDataById(string $id): ?Array {
    $sql = "SELECT * 
            FROM brew_guide 
            WHERE id = '$id'
            ";
    return $this->mssql_conn->fetchAllAssociative($sql);
  }
}
