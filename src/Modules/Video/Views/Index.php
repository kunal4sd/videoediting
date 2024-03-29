<?php

namespace App\Modules\Video\Views;

use App\Modules\Abstracts\AbstractModule;
use App\Libs\Enums\UserActivity;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class Index extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $args)
    {

        $publications_active = [];
        $form = [];
        $playlists = [];
        $movies = [];

        try {
            $publications = $this->entity_publication->get_all_active_tv_and_radio_media();
            $publications_details = $this->entity_publication_details->get_all_recording247();
            $publications_active = intersect_objects_by_fields(
                $publications,
                'id',
                $publications_details,
                'publication_id'
            );

            if (isset($args['activity_id'])) {
                $user_activity_ar = $this->entity_user_activity->get_by_id_and_user_media(
                    $args['activity_id'],
                    $this->session_user->get_user()->id
                );

            } else {
                $user_activities_ar = $this->entity_user_activity->get_last_x_by_user_and_type_media(
                    1, $this->session_user->get_user()->id, UserActivity::PLAYLIST
                );
                $user_activity_ar = array_shift($user_activities_ar);
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
                    'method' => 'cached'
                ];
                $playlists = $this->entity_playlist->get_playlists_for_output(
                    $request->withQueryParams($form)
                );

                $movies = $this->entity_movie->get_movies_for_output(
                    $this->entity_article->get_for_interval_by_publication(
                        $data['start_date'],
                        $data['end_date'],
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
            'page_title'    => 'Video Editing',
            'page_name'     => 'editing',
            'publications'  => $publications_active,
            'form'          => $form,
            'playlists'     => $playlists,
            'movies'        => $movies,
            'back'          => $request->getParam('redirected') ?? false
        ]);
    }

}
