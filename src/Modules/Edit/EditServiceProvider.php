<?php

namespace App\Modules\Edit;

use App\Modules\Edit\Views\Index;
use App\Modules\Core\Middleware\Authorization\KnownUser as KnownUserAuthorizationMiddleware;
use Pimple\Container;
use Pimple\ServiceProviderInterface;

class EditServiceProvider implements ServiceProviderInterface
{
    public function register(Container $container)
    {
        $this->register_views($container);
        $this->register_routes($container);
    }

    private function register_views(Container $container)
    {
        $container['edit.view.index'] = function ($container) {
            return new Index($container);
        };
    }

    private function register_routes(Container $container)
    {
        $container->slim->get('/', 'edit.view.index')->setName('edit.view.index')
                        ->add(new KnownUserAuthorizationMiddleware($container));
    }
}
