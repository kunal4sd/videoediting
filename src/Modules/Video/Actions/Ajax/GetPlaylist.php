<?php

namespace App\Modules\Video\Actions\Ajax;

use App\Modules\User\Entities\ActiveRecords\UserActivityAR;
use App\Modules\Abstracts\AbstractModule;
use App\Libs\Enums\UserActivity;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\Dbs;
use App\Libs\Json;
use Slim\Http\Response;
use Slim\Http\Request;
use \Exception;

class GetPlaylist extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {

        $result = [
            'playlists' => [],
            'warnings' => []
        ];
        $code = 200;
        try {

            $result['playlists'] = $this->entity_playlist->get_playlists_for_output($request);

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
                        'batch_size' => $request->getParam('batch')
                    ])
                ]
            ));

            if (empty($result['playlists'])) {
                $result['message'] = 'Could not find any videos with the provided details';
            }
        }
        catch(Exception $e) {
            $this->logger->write(
                new Exception(
                    sprintf(
                        'Failed generating the playlist: %s',
                        print_r($e->getMessage(), true)
                    ),
                    $e->getCode()
                )
            );
            $result['message'] = $e->getMessage();
            $code = $e->getCode();
        }


        return Json::build($response, $result, $code);
    }

}
