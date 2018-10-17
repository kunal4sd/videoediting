<?php

namespace App\Modules\Abstracts;

use Pimple\Container;

abstract class ModuleAbstract
{

    /**
     * @var Container
     */
    protected $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function __get($field)
    {
        return $this->container->$field;
    }
}
