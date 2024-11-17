<?php

namespace App\Repository;


use App\Entity\Recipe;
use Doctrine\Persistence\ManagerRegistry; 
use phpDocumentor\Reflection\Types\Boolean;

#[\AllowDynamicProperties]
class RecipeRepository 
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
            FROM recipe
            ";
    return $this->mssql_conn->fetchAllAssociative($sql);
  }
  

  /**
   * get metod by id
   * @param string $id
   */
  public function getDataById(string $id): ?Array {
    $sql = "SELECT * 
            FROM recipe 
            WHERE id = '$id'
            ";
    return $this->mssql_conn->fetchAllAssociative($sql);
  }
}