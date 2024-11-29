<?php

namespace App\Repository;


use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry; 
use phpDocumentor\Reflection\Types\Boolean;

#[\AllowDynamicProperties]
class UsersRepository 
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
            FROM user
            ";
    return $this->mssql_conn->fetchAllAssociative($sql);
  }
}