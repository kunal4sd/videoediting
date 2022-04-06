<?php

namespace App\Libs\Db\Abstracts;

use App\Libs\Db\Abstracts\Runnable;

abstract class PdoCommand
{
    /**
     * @var Runnable
     */
    protected $pdo;

    public function __construct(Runnable $pdo)
    {
        $this->pdo = $pdo;
    }
}
