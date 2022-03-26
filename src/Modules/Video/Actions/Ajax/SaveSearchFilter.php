<?php

namespace App\Modules\Video\Actions\Ajax;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\UserActivity;
use App\Modules\User\Entities\ActiveRecords\UserActivityAR;
use \Exception;
use App\Libs\Json;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Files\RawVideoFile;

class SaveSearchFilter extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {

        $result = [
            'data'      => [],
            'preview'   => [],
            'warnings'  => [],
            'message'   => ''
        ];
        $code = 200;
        $publications = $request->getParam('publications') ?? [];
        $countries = $request->getParam('countries') ?? [];

        try {
            $this->entity_user_activity->save_media(new UserActivityAR(
                [
                    'user_id'           => $this->session_user->get_user()->id,
                    'publication_id'    => 0,
                    'article_id'        => 0,
                    'issue_date'        => date("Y-m-d", strtotime($request->getParam('start_date'))),
                    'activity_id'       => UserActivity::PLAYLIST,
                    'created'           => $this->db[Hosts::LOCAL][Dbs::MAIN]->now(),
                    'description' => json_encode([
                        'publication_id'    => 0,
                        'publications'      => $publications,
                        'countries'         => $countries,
                        'start_date'        => $request->getParam('start_date'),
                        'end_date'          => $request->getParam('end_date'),
                        'text'              => $request->getParam('text'),
                        'batch_size'        => 600
                    ])
                ]
            ));
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
