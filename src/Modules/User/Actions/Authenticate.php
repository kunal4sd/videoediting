<?php

namespace App\Modules\User\Actions;

use App\Libs\Enums\UserActivity;
use App\Libs\Json;
use App\Modules\Abstracts\ModuleAbstract;
use Slim\Http\Response;
use Slim\Http\Request;
use \Exception;

class Authenticate extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response)
    {

        try {
            $user_ar = $this->entity_user->get_by_credentials(
                $request->getParam('username'),
                $request->getParam('password')
            );
            $this->session_user->init_from_entity($user_ar);
        }
        catch(Exception $e) {
            $this->flash->addMessage('alerts_errors', $e->getMessage());
            $this->logger->write(
                new Exception(
                    sprintf(
                        'Failed sign in attempt: %s',
                        print_r($e->getMessage(), true)
                    ),
                    403
                )
            );

            if ($request->getParam('ajax')) {
                return Json::build($response, [$e->getMessage()], 400);
            }

            return $response->withRedirect($this->router->pathFor('user.view.signin'));
        }
        $this->delete_previous_sessions_files();

        if ($request->getParam('ajax')) {
            return Json::build(
                $response,
                ['redirect_to' => $this->router->pathFor('video.view.index')],
                302
            );
        }

        return $response->withRedirect($this->router->pathFor('video.view.index'));
    }

    private function delete_previous_sessions_files()
    {
        $user_activities_ar = $this->entity_user_activity
            ->get_by_user_and_type_since(
                $this->session_user->get_user()->id,
                UserActivity::PLAYLIST,
                date('Y-m-d H:i:s', strtotime('-2 months'))
            );

        // remove latest playlist from array, so its files won't be deleted
        $latest_user_activity_ar = array_shift($user_activities_ar);
        $data = json_decode($latest_user_activity_ar->description, true);
        $latest_playlist_master_ar = $this->entity_playlist
            ->get_playlist_master(
                $data['publication_id'],
                $data['start_date'],
                $data['end_date'],
                $data['batch_size']
            );

        while( $user_activity_ar = array_shift($user_activities_ar) ) {
            if (
                !is_null($user_activity_ar->id)
                && !is_null( $data = json_decode($user_activity_ar->description, true) )
            ) {
                try {
                    $playlist_master_ar = $this->entity_playlist
                        ->get_playlist_master(
                            $data['publication_id'],
                            $data['start_date'],
                            $data['end_date'],
                            $data['batch_size']
                        );

                    if ($playlist_master_ar->name
                        && $playlist_master_ar->name !== $latest_playlist_master_ar->name
                    ) {
                        $this->entity_playlist
                            ->delete_playlist_files($playlist_master_ar);
                    }
                } catch (Exception $e) {
                    $this->logger->write($e);
                }
            }
        }
    }
}
