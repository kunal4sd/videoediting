<?php

namespace App;

use App\Lib\Config;
use App\Lib\Log;
use App\Controller\Edit;
use App\Modules\Edit\EditServiceProvider;
use App\Modules\User\UserServiceProvider;
use App\Lib\Enum\MandatoryConfigFields;
use Slim\App as Slim;
use Slim\Views\Twig;
use Slim\Views\TwigExtension;
use Slim\Http\Request;
use Slim\Http\Response;
use Pimple\Container;

class App
{

    /**
     * @var Config
     */
    private $config;

    /**
     * @var Slim
     */
    private $slim;

    public function __construct()
    {
        $this->config = new Config();
        $this->build_app();
    }

    public function run()
    {
        $this->slim->run();
    }

    private function build_app()
    {
        $this->slim = new Slim();
        $container =& $this->slim->getContainer();
        $container->settings->replace($this->config->slim);
        $container->config = $this->config;

        $container['slim'] = function() {
            return $this->slim;
        };

        $this->build_logger($container);
        $this->build_handlers($container);
        $this->build_database($container);
        $this->build_view($container);
        $this->build_modules($container);
    }

    private function build_logger(Container &$container)
    {
        $container['logger'] = function($container) {

            // FIXME: not implemented yet
            return new Log($container->config->{MandatoryConfigFields::LOGS});
        };
    }

    private function build_view(Container &$container)
    {
        $container['view'] = function ($container) {

            $view = new Twig(
                $container->config->{MandatoryConfigFields::TEMPLATES_PATH},
                $container->config->{MandatoryConfigFields::TWIG}
            );
            $view->addExtension(new TwigExtension($container->router, $container->request->getUri()));

            return $view;
        };
    }

    private function build_modules(Container &$container)
    {
        $container->register(new EditServiceProvider());
        $container->register(new UserServiceProvider());
    }

    private function build_database(Container &$container)
    {
        $container['db'] = function(&$container) {

            // FIXME: not implemented yet
            return new MySql($container->config->{MandatoryConfigFields::DBS});
        };
    }

    private function build_handlers(Container &$container)
    {
        $this->build_not_found_handler($container);
        $this->build_not_allowed_handler($container);
        $this->build_error_handler($container);
        $this->build_php_error_handler($container);
    }

    private function build_not_found_handler(Container &$container)
    {
        $container['notFoundHandler'] = function(&$container) {
            return function ($request, $response, $exception = null) use (&$container) {
                return $container->view->render(
                        $response,
                        'errors/404.twig',
                        []
                    )->withStatus(404);
            };
        };
    }

    private function build_not_allowed_handler(Container &$container)
    {
        $container['notAllowedHandler'] = function(&$container) {
            return function ($request, $response, $exception = null) use (&$container) {
                return $container->view->render(
                        $response,
                        'errors/403.twig',
                        []
                    )->withStatus(403);
            };
        };
    }

    private function build_error_handler(Container &$container)
    {
        $container['errorHandler'] = function(&$container) {
            return function ($request, $response, $exception = null) use (&$container) {
                return $container->view->render(
                        $response,
                        'errors/500.twig'
                    )->withStatus(500);
            };
        };
    }

    private function build_php_error_handler(Container &$container)
    {
        $container['phpErrorHandler'] = function(&$container) {
            return function ($request, $response, $exception = null) use (&$container) {
                return $container->view->render(
                        $response,
                        'errors/500.twig',
                        []
                    )->withStatus(500);;
            };
        };
    }

}
