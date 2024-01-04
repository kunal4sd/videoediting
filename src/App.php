<?php

namespace App;

use App\Libs\Json;
use App\Libs\Config;
use App\Modules\Core\CoreServiceProvider;
use App\Modules\Test\TestServiceProvider;
use App\Modules\User\UserServiceProvider;
use App\Modules\Video\VideoServiceProvider;
use App\Modules\QueryBuilder\QueryBuilderServiceProvider;
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
        $start_time = microtime(true);
        $this->slim->run();
        $execution_time = (microtime(true) - $start_time) / 60;

        if ($execution_time > 1.0) {
            $container = $this->slim->getContainer();
            $container->logger->write(new Exception(
                sprintf(
                    'WARNING: Request took longer than expected: %.5f',
                    $execution_time
                ),
                200
            ));
        }
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
            $container->register(new QueryBuilderServiceProvider());
            $container->register(new TestServiceProvider());
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

                $url = $request->getUri()->__tostring();
                $extension = pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION);
                if (!strlen($extension)) {
                    if ($exception === null) {
                        $exception = new Exception(
                            'URL not found: ' . $url,
                            404
                        );
                    }
                    $container->logger->write($exception);

                    return $container->view->render(
                            $response,
                            'errors/404.twig',
                            []
                        )->withStatus(404);
                }
                else {
                    return Json::build($response, [
                        'url' => $url
                    ], 404);
                }
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

                if (is_null($exception)) {
                    $exception = new Exception(
                        'Unknown error encountered at ' . $request->getUri()->__tostring(),
                        500
                    );
                }
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

                if (is_null($exception)) {
                    $exception = new Exception(
                        'Unknown PHP error encountered in at ' . $request->getUri()->__tostring(),
                        500
                    );
                }
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
