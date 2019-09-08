<?php

namespace App;

use App\Libs\Config;
use App\Modules\Core\CoreServiceProvider;
use App\Modules\User\UserServiceProvider;
use App\Modules\Video\VideoServiceProvider;
use App\Modules\Article\ArticleServiceProvider;
use App\Modules\Publication\PublicationServiceProvider;
use \Exception;
use Pimple\Container;
use Slim\App as Slim;

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
        $container = $this->slim->getContainer();
        $container->settings->replace($this->config->slim);
        $container->config = $this->config;

        $container['slim'] = function() {
            return $this->slim;
        };

        $this->build_handlers($container);
        $this->build_modules($container);
    }

    private function build_modules(Container &$container)
    {
        try {
            $container->register(new CoreServiceProvider());
            $container->register(new VideoServiceProvider());
            $container->register(new ArticleServiceProvider());
            $container->register(new PublicationServiceProvider());
            $container->register(new UserServiceProvider());
        }
        catch(Exception $e) {
            $container->logger->write($e);
        }
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

                if ($exception === null) {
                    $exception = new Exception(
                        'URL not found: ' . $request->getUri()->__tostring(),
                        404
                    );
                }
                $container->logger->write($exception);

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

                $exception = new Exception(
                    'URL access forbidden: ' . $request->getUri()->__tostring(),
                    403
                );
                $container->logger->write($exception);

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

                $exception = new Exception(
                    'Unknown error encountered at ' . $request->getUri()->__tostring(),
                    500
                );
                $container->logger->write($exception);

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

                $exception = new Exception(
                    'Unknown PHP error encountered in at ' . $request->getUri()->__tostring(),
                    404
                );
                $container->logger->write($exception);

                return $container->view->render(
                        $response,
                        'errors/500.twig',
                        []
                    )->withStatus(500);
            };
        };
    }

}
