<?php

namespace App\Modules\User\Actions;

use App\Libs\Enums\UserActivity;
use App\Libs\Json;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\User\Entities\ActiveRecords\UserActivityAR;
use Slim\Http\Response;
use Slim\Http\Request;
use \Exception;

class Authenticate extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {

        $result = [];
        $code = 200;
        try {
            $user_ar = $this->entity_user->get_by_credentials(
                $request->getParam('username'),
                $request->getParam('password')
            );
            $this->session_user->init_from_entity($user_ar);
            $this->entity_user_activity->save(
                new UserActivityAR([
                    'user_id' => $this->session_user->get_user()->id,
                    'publication_id' => 0,
                    'article_id' => 0,
                    'issue_date' => '0000-00-00',
                    'activity_id' => UserActivity::LOGIN,
                    'created' => date("Y-m-d H:i:s"),
                    'description' => session_id()
                ])
            );
            $result['redirect_to'] = $this->router->pathFor('video.view.index');
            $code = 302;
        }
        catch(Exception $e) {
            $code = 403;
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
                $result[] = $e->getMessage();
            }
        }

        if ($code < 400) {
            $this->delete_previous_sessions_files();
        }
        if ($request->getParam('ajax')) {
            return Json::build($response, $result, $code);
        }

        if ($code < 400) {
            return $response->withRedirect(
                $this->router->pathFor('video.view.index')
            );
        }

        return $response->withRedirect($this->router->pathFor('user.view.signin'));
    }

    private function delete_previous_sessions_files()
    {
        $user_activities_ar = $this->entity_user_activity
            ->get_by_user_and_type_since(
                $this->session_user->get_user()->id,
                date('Y-m-d H:i:s', strtotime('-2 months')),
                UserActivity::PLAYLIST,
                UserActivity::EPISODE,
                UserActivity::CLIP
            );

        // remove latest playlist from array, so its files won't be deleted
        $latest_user_activity_ar = false;
        $latest_hashes = [];
        for($i = 0; $i < count($user_activities_ar); $i++) {
            if ($user_activities_ar[$i]->activity_id == UserActivity::PLAYLIST) {
                $latest_user_activity_ar = $user_activities_ar[$i];
                unset($user_activities_ar[$i]);
                break;
            }
        }

        if ($latest_user_activity_ar) {
            $data = json_decode($latest_user_activity_ar->description, true);
            $latest_playlist_master_file = $this->entity_playlist
                ->get_playlist_master(
                    $data['publication_id'],
                    $data['start_date'],
                    $data['end_date'],
                    $data['batch_size']
                );
            $latest_hashes[$latest_playlist_master_file->get_hash()] = 1;
            foreach($latest_playlist_master_file->get_files() as $playlist_file) {
                $latest_hashes[$playlist_file->get_hash()] = 1;
            }
        }

        $descriptions = [];
        while( $user_activity_ar = array_shift($user_activities_ar) ) {

            if (isset($descriptions[$user_activity_ar->description])) continue;
            $descriptions[$user_activity_ar->description] = 1;

            if (
                !is_null($user_activity_ar->id)
                && !is_null( $data = json_decode($user_activity_ar->description, true) )
            ) {
                try {
                    if ($user_activity_ar->activity_id == UserActivity::PLAYLIST) {
                        $playlist_master_file = $this->entity_playlist
                            ->get_playlist_master(
                                $data['publication_id'],
                                $data['start_date'],
                                $data['end_date'],
                                $data['batch_size']
                            );

                        foreach($playlist_master_file->get_files() as $playlist_file) {

                            $playlist_file->delete_perfect_cut_files();
                            if (!isset($latest_hashes[$playlist_file->get_hash()])) {
                                $poster_file = $playlist_file->get_poster();
                                $this->entity_playlist->delete_file_by_path($playlist_file);
                                if ($poster_file) {
                                    $this->entity_playlist->delete_file_by_path($poster_file);
                                }
                            }
                        }

                        if (
                            $playlist_master_file->get_hash()
                            && !isset($latest_hashes[$playlist_master_file->get_hash()])
                        ) {
                            $this->entity_playlist->delete_file_by_path($playlist_master_file);
                        }

                    }
                    else {
                        $playlist_file = $this->entity_playlist->get_playlist_with_hash($data['hash']);
                        $playlist_file->delete_perfect_cut_files();
                        if (isset($data['hash']) && !isset($latest_hashes[$data['hash']])) {
                            $this->entity_playlist->delete_file_by_path($playlist_file);
                            $poster_file = $playlist_file->get_poster();
                            if ($poster_file) {
                                $this->entity_playlist->delete_file_by_path($poster_file);
                            }
                        }
                    }
                } catch (Exception $e) {
                    $this->logger->write($e);
                }
            }
        }
    }
}
