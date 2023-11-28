<?php

namespace App\Modules\Core;


use App\Libs\Json;
use App\Libs\Session;
use App\Libs\Validator;
use App\Libs\Db\Db;
use App\Libs\Log\Log;
use App\Libs\Enums\Config\MandatoryFields;
use App\Modules\Core\Entities\UserSession;
use App\Modules\Core\Middleware\Csrf as CsrfMiddleware;
use App\Modules\Core\Middleware\CurrentPath as CurrentPathMiddleware;
use Slim\Views\Twig;
use Slim\Views\TwigExtension;
use Slim\Flash\Messages;
use Slim\Csrf\Guard;
use Pimple\Container;
use Pimple\ServiceProviderInterface;
use \Exception;

class CoreServiceProvider implements ServiceProviderInterface
{
    public function register(Container $container)
    {
        $this->register_logger($container);
        $this->register_flash($container);
        $this->register_sessions($container);
        $this->register_database($container);
        $this->register_validator($container);
        $this->register_view($container);
        $this->register_csrf($container);
        $this->register_global_middleware($container);
    }

    private function register_sessions(Container &$container)
    {
        $container['session'] = function($container) {
            return new Session();
        };

        $container['session_user'] = function($container) {
            $session_user = new UserSession($container->session, $container->logger);

            return $session_user->init_from_session();
        };

        $container->session;
    }

    private function register_logger(Container &$container)
    {
        $container['logger'] = function($container) {
            return new Log($container->config->{MandatoryFields::LOG});
        };
    }

    private function register_csrf(Container &$container)
    {
        $container['csrf'] = function($container) {

            $guard = new Guard();
            $guard->setPersistentTokenMode(true);
            $guard->setFailureCallable(function ($request, $response, $next) use ($container) {
                return Json::build($response, [ 'csrf' => 'CSRF check failed' ], 400);
            });

            return $guard;
        };
    }

    private function register_global_middleware(Container &$container)
    {
        $container->slim->add(new CsrfMiddleware($container));
        $container->slim->add($container->csrf);
        $container->slim->add(new CurrentPathMiddleware($container));
    }

    private function register_flash(Container &$container)
    {
        $container['flash'] = function($container) {
            return new Messages();
        };
    }

    private function register_database(Container &$container)
    {
        try {
            Db::build($container);
        }
        catch(Exception $e) {
            $container->logger->write($e);
        }
    }

    private function register_validator(Container $container)
    {
        $container['validator'] = function ($container) {
            return new Validator($container);
        };
    }

    private function register_view(Container &$container)
    {
        $container['view'] = function ($container) {

            try {
                $view = new Twig(
                    $container->config->{MandatoryFields::TEMPLATES_PATH},
                    $container->config->{MandatoryFields::TWIG}
                );

                $view->addExtension(new TwigExtension($container->router, $container->request->getUri()));

                $view->getEnvironment()->addGlobal('flash', $container->flash->getMessages());
                $view->getEnvironment()->addGlobal('user', [
                    'is_known' => $container->session_user->is_known(),
                    'details' => $container->session_user->get_user(),
                    'is_admin' => $container->session_user->get_user() && $container->entity_user->is_admin($container->session_user->get_user())
                ]);
            }
            catch(Exception $e) {
                $container->logger->write($e);
            }

            return $view;
        };
    }
}
