<?php

namespace App\Modules;

use Pimple\Container;

abstract class ActionAbstract
{
    /**
     * @var Container
     */
    protected $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }
}