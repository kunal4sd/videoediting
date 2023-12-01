<?php

namespace App\Modules\Video\Actions\Ajax;

use \Exception;
use App\Libs\Json;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Modules\Abstracts\AbstractModule;

class GetSearchQuery extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {

        $result = [
            'data'      => '',
            'message'   => ''
        ];
        $code = 200;

        try {
            $query_id = $request->getParam('query_id');
            $searchQuery = $this->entity_search_query->get_by_id($query_id);
            $searchQueryAr = $searchQuery->build_to_array();
            $searchQueryAr['keywords'] = array_values($this->entity_keyword->get_by_ids_media($searchQuery->keyword_ids));
            $searchQueryAr['users'] = array_values($this->entity_user->get_by_ids($searchQuery->user_ids));
            $result['data'] = $searchQueryAr;

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
