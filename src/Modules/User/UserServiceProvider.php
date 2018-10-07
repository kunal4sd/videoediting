<?php

namespace App\Modules\User;

use App\Modules\User\Actions\Login;
use App\Modules\User\Actions\Logout;
use Pimple\Container;
use Pimple\ServiceProviderInterface;

class UserServiceProvider implements ServiceProviderInterface
{
    public function register(Container $container)
    {
        $this->register_actions($container);
        $this->register_routes($container);
    }

    public function register_actions(Container $container)
    {
        $container['user.action.login'] = function ($container) {
            return new Login($container);
        };
        $container['user.action.logout'] = function ($container) {
            return new Logout($container);
        };
    }

    public function register_routes(Container $container)
    {
        $container->slim->get('/login', 'user.action.login');
        $container->slim->get('/logout', 'user.action.logout');
    }
}