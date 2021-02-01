<?php

namespace App\Modules\Video\Actions\Ajax;

use \Exception;
use App\Libs\Json;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Modules\Abstracts\AbstractModule;

class Search extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {

        $result = [
            'texts' => [],
            'warnings' => []
        ];
        $code = 200;
        try {

            $result['texts'] = $this->entity_search_text->get_search_text(
                $request->getParam('start_date'),
                $request->getParam('end_date'),
                $request->getParam('publication'),
                $request->getParam('text')
            );

            if (empty($result['texts'])) {
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
