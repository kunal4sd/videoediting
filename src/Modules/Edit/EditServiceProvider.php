<?php

namespace App\Modules\Edit;

use App\Modules\Edit\Actions\Index;
use Pimple\Container;
use Pimple\ServiceProviderInterface;

class EditServiceProvider implements ServiceProviderInterface
{
    public function register(Container $container)
    {
        $this->register_actions($container);
        $this->register_routes($container);
    }

    public function register_actions(Container $container)
    {
        $container['edit.action.index'] = function ($container) {
            return new Index($container);
        };
    }

    public function register_routes(Container $container)
    {
        $container->slim->get('/', 'edit.action.index');
    }
}