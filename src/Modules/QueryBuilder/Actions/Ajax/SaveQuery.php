<?php

namespace App\Modules\QueryBuilder\Actions\Ajax;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\QueryBuilder\Entities\ActiveRecords\SearchQueryAR;
use \Exception;
use App\Libs\Json;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Modules\Abstracts\AbstractModule;


class SaveQuery extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {

        $result = [];
        $code = 200;
        $id = $request->getParam('id') ?? '';
        $title = $request->getParam('title') ?? '';
        $query = $request->getParam('query') ?? '';
        $users = $request->getParam('users') ?? [];
        $keywords = explode(',',$request->getParam('keywords'));
         try {
            $dataToBeInsertedUpdated = [
                'title' => $title,
                'query' => $query,
                'user_ids' => $users,
                'keyword_ids' => $keywords,
                'created' => $this->db[Hosts::LOCAL][Dbs::MAIN]->now(),
                'modified' => $this->db[Hosts::LOCAL][Dbs::MAIN]->now(),
            ];
            if( $id > 0){
                    $dataToBeInsertedUpdated['id'] = $id;
            }
            $insert_id = $this->entity_search_query->saveSearchQuery(new SearchQueryAR(
                $dataToBeInsertedUpdated
            ));
            $result['insert_id'] =  $insert_id;
            $result['message'] = 'Search query saved successfully';
        }
        catch(Exception $e) {
            $code = 500;
            $this->logger->write(new Exception(
                sprintf(
                    'Failed save activity: %s',
                    print_r($e->getMessage(), true)
                ),
                $code
            ));
            $result['message'] = $e->getMessage();
        }

        return Json::build($response, $result, $code);
    }

}
