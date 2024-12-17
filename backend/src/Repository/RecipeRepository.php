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
    $sql = "SELECT r.id, 
            r.name, 
            r.temperature, 
            r.water_amt, 
            r.coffee_amt, 
            r.description, 
            r.created_at, 
            r.modified_at, 
            r.created_by, 
            r.method, 
            m.name as method_name
            FROM recipe r
            LEFT JOIN method m ON method=m.id;
            ";
    return $this->mssql_conn->fetchAllAssociative($sql);
  }
  
  /**
   * get sample data
   */
  public function getSampleData(): ?Array {
    $sql = "SELECT * 
            FROM recipe
            WHERE created_by=5
            ";
    return $this->mssql_conn->fetchAllAssociative($sql);
  }
  

  /**
   * get recipe by id
   * @param string $id
   */
  public function getDataById(string $id): ?Array {
    $sql = "SELECT 
            rc.id, 
            rc.name, 
            rc.temperature, 
            rc.water_amt, 
            rc.coffee_amt, 
            rc.description, 
            rc.created_at, 
            rc.modified_at, 
            rc.created_by, 
            rc.method AS method_id, 
            mt.name AS method_name, 
            mt.icon AS method_icon
            FROM recipe rc 
            LEFT JOIN method mt on rc.method = mt.id 
            WHERE rc.id = '$id' 
            ";
    return $this->mssql_conn->fetchAllAssociative($sql);
  }
}