<?php

namespace App\Modules\User;

use App\Modules\User\Views\SignIn;
use App\Modules\User\Actions\SignOut;
use App\Modules\User\Actions\Authenticate;
use App\Modules\User\Entities\User;
use App\Modules\User\Entities\UserActivity;
use App\Modules\User\Middleware\Validation\SignIn as SignInValidationMiddleware;
use App\Modules\Core\Middleware\Authorization\SameIp as SameIpAuthorizationMiddleware;
use App\Modules\Core\Middleware\Authorization\KnownUser as KnownUserAuthorizationMiddleware;
use App\Modules\Core\Middleware\Authorization\UnknownUser as UnknownUserAuthorizationMiddleware;
use App\Modules\Core\Middleware\Persistant as PersistantMiddleware;
use Pimple\Container;
use Pimple\ServiceProviderInterface;

class UserServiceProvider implements ServiceProviderInterface
{
    public function register(Container $container)
    {
        $this->register_views($container);
        $this->register_actions($container);
        $this->register_routes($container);
        $this->register_entities($container);
    }

    private function register_views(Container $container)
    {
        $container['user.view.signin'] = function ($container) {
            return new SignIn($container);
        };
    }

    private function register_actions(Container $container)
    {
        $container['user.action.authenticate'] = function ($container) {
            return new Authenticate($container);
        };
        $container['user.action.signout'] = function ($container) {
            return new SignOut($container);
        };
    }

    private function register_routes(Container $container)
    {
        $container->slim->get('/sign-in', 'user.view.signin')
                        ->add(new UnknownUserAuthorizationMiddleware($container))
                        ->setName('user.view.signin');
        $container->slim->post('/sign-in', 'user.action.authenticate')
                        ->add(new SignInValidationMiddleware($container))
                        ->add(new PersistantMiddleware($container))
                        ->add(new UnknownUserAuthorizationMiddleware($container))
                        ->setName('user.action.authenticate');
        $container->slim->get('/sign-out', 'user.action.signout')
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('user.action.signout');
    }

    private function register_entities(Container $container)
    {
        $container['entity_user'] = function ($container) {
            return new User($container);
        };
        $container['entity_user_activity'] = function ($container) {
            return new UserActivity($container);
        };
    }
}
