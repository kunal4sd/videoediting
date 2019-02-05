<?php

namespace App\Modules\Abstracts;

use App\Libs\Db\Container as ContainerDB;

abstract class DatabaseAbstract
{

    /**
     * @var ContainerDB
     */
    protected $db;

    public function __construct(ContainerDB $db)
    {
        $this->db = $db;
    }

}
