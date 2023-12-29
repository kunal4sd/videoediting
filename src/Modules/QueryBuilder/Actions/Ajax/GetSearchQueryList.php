<?php

namespace App\Modules\QueryBuilder\Actions\Ajax;

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
            $searchQueries = [];
            foreach ($this->entity_search_query->getSearchQueries() as $searchQuery){
                $searchQueryAr = $searchQuery->build_to_array();
                $searchQueryAr['keywords'] = array_values($this->entity_keyword->get_by_ids_media($searchQuery->keyword_ids));
                $searchQueryAr['users'] = array_values($this->entity_user->get_by_ids($searchQuery->user_ids));
                $searchQueries[] = $searchQueryAr;
            }
            $result['data'] = $searchQueries;

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
