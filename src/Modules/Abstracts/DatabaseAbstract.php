<?php

namespace App\Modules\Abstracts;

use App\Libs\Json;
use App\Libs\Enums\StatusClasses;
use App\Libs\Db\Container as ContainerDB;
use Pimple\Container;

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
