<?php

namespace App\Repository;

use Doctrine\Persistence\ManagerRegistry; 
use phpDocumentor\Reflection\Types\Boolean;

#[\AllowDynamicProperties]
class TestRepository 
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
        $sql="select * from method";
        return $this->mssql_conn->fetchAllAssociative($sql);
    }

}