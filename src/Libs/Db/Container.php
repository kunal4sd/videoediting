<?php

namespace App\Libs\Db;

use Slim\Container as SlimContainer;
use Slim\Exception\ContainerValueNotFoundException;

class Container extends SlimContainer
{
    public function __call($method, array $args)
    {
        return call_user_func_array($this->get($method), $args);
    }
}
