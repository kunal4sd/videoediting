<?php

namespace App\Modules\Publication\Actions\Ajax;

use App\Modules\Abstracts\AbstractModule;
use App\Libs\Json;
use Slim\Http\Response;
use Slim\Http\Request;
use \Exception;

class ListByCountries extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {
        $countries = $request->getParam('countries') ?? [];

        $result = [
            'texts' => [],
            'warnings' => [],
            'message' => ''
        ];
        $code = 200;
        try {

            $result['texts'] = $this->entity_publication->get_by_countries($countries);

            if (empty($result['texts'])) {
                $result['message'] = 'Could not find any publications for the current country';
            }
        }
        catch(Exception $e) {
            $code = 500;
            $this->logger->write(new Exception(
                sprintf(
                    'Failed fetching the words: %s',
                    print_r($e->getMessage(), true)
                ),
                $code
            ));
            $result['message'] = $e->getMessage();
        }

        return Json::build($response, $result, $code);
    }

}
