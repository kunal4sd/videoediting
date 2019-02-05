<?php

namespace App\Modules\Abstracts;

use App\Libs\Json;
use Pimple\Container;

abstract class ModuleAbstract
{

    /**
     * @var Container
     */
    protected $container;

    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    public function __get($field)
    {
        return $this->container->$field;
    }

    protected function validation_failed(array $all_errors, $response)
    {

        $result = [];

        foreach($all_errors as $field => $errors) {
            $error = get_pretty_name(array_shift($errors));
            $result[$field] = $error;
            $this->flash->addMessage("errors_{$field}", $error);
        }

        $this->logger->write(
            new \Exception(
                sprintf(
                    'Form validation failed with errors: %s',
                    print_r($all_errors, true)
                ),
                400
            )
        );

        return Json::build($response, $result, 400);
    }

    protected function get_article_status_class($status)
    {
        $status_const = sprintf('STATUS_%s', strtoupper($status));

        return constant(sprintf('\App\Libs\Enums\StatusClasses::%s', $status_const));
    }
}
