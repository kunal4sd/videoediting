<?php

namespace App\Modules\Video\Actions\Ajax;

use \Exception;
use App\Libs\Json;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Modules\Abstracts\AbstractModule;

class GetSearchQueryList extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {

        $result = [
            'data'      => [],
            'message'   => ''
        ];
        $code = 200;

        try {

            $result['data'] = $this->entity_search_query->getSearchQueries();

            if (empty($result['data'])) {
                $result['message'] = 'Could not find any segments with the provided details';
            }
        }
        catch(Exception $e) {
            $code = 500;
            $this->logger->write(new Exception(
                sprintf(
                    'Search failed with message: %s',
                    print_r($e->getMessage(), true)
                ),
                $code
            ));
            $result['message'] = $e->getMessage();
        }


        return Json::build($response, $result, $code);
    }

}
