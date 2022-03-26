<?php

namespace App\Modules\Video\Middleware;

use \Exception;
use Slim\Http\Request;
use App\Libs\Enums\Dbs;
use Slim\Http\Response;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\UserActivity;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\User\Entities\ActiveRecords\UserActivityAR;

class TextSearchSave extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {

        $result = [
            'texts' => [],
            'warnings' => [],
            'message' => ''
        ];
        $code = 200;
        try {
            $this->entity_user_activity->save_media(new UserActivityAR(
                [
                    'user_id' => $this->session_user->get_user()->id,
                    'publication_id' => $request->getParam('publication'),
                    'article_id' => 0,
                    'issue_date' => date("Y-m-d", strtotime($request->getParam('start_date'))),
                    'activity_id' => UserActivity::PLAYLIST,
                    'created' => $this->db[Hosts::LOCAL][Dbs::MAIN]->now(),
                    'description' => json_encode([
                        'publication_id' => $request->getParam('publication'),
                        'start_date' => $request->getParam('start_date'),
                        'end_date' => $request->getParam('end_date'),
                        'batch_size' => 600
                    ])
                ]
            ));
        }
        catch(Exception $e) {
            $code = 500;
            $this->logger->write(new Exception(
                sprintf(
                    'Failed initiating redirect: %s',
                    print_r($e->getMessage(), true)
                ),
                $code
            ));
            $result['message'] = $e->getMessage();
        }

        return $next($request, $response);
    }

}
