<?php

namespace App\Modules\Video\Views;

use App\Modules\Abstracts\ModuleAbstract;
use App\Libs\Enums\UserActivity;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\Dbs;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class Index extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response, $args)
    {

        $publications = [];
        $form = [];
        $playlists = [];
        $movies = [];

        try {
            $publications = $this->entity_publication->get_all_active_tv_and_radio();

            if (isset($args['activity_id'])) {
                $user_activity_ar = $this->entity_user_activity->get_by_id_and_user(
                    $args['activity_id'],
                    $_SESSION['user']->id
                );
            }
            else {
                $user_activity_ar = $this->entity_user_activity->get_last_x_by_user_and_type(
                    1,
                    $_SESSION['user']->id,
                    UserActivity::PLAYLIST
                );
            }

            if (
                !is_null($user_activity_ar->id)
                && !is_null( $data = json_decode($user_activity_ar->description, true) )
            ) {

                $form = [
                    'publication' => $data['publication_id'],
                    'start_date' => $data['start_date'],
                    'end_date' => $data['end_date'],
                    'batch' => $data['batch_size'],
                    'force' => false,
                    'date_range' => sprintf('%s - %s', $data['start_date'], $data['end_date'])
                ];
                $playlists = $this->entity_playlist->get_playlists_for_output(
                    $request->withQueryParams($form)
                );

                $movies = $this->entity_movie->get_movies_for_output(
                    $this->entity_article->get_for_interval_by_user_and_publication(
                        $data['start_date'],
                        $data['end_date'],
                        $_SESSION['user']->id,
                        $data['publication_id'],
                        true
                    )
                );
            }
        }
        catch(Exception $e) {
            $this->logger->write($e);
        }

        return $this->view->render($response, 'video/index.twig', [
            'name' => 'World',
            'page_title' => 'Video Editing Tool',
            'publications' => $publications,
            'form' => $form,
            'playlists' => $playlists,
            'movies' => $movies
        ]);
    }

    private function get_movies()
    {

        $result = [];



        return $result;
    }
}
