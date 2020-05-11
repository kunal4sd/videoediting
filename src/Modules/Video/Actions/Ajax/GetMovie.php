<?php

namespace App\Modules\Video\Actions\Ajax;

use App\Libs\Json;
use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\UserActivity;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Abstracts\AbstractPlaylist;
use App\Modules\Video\Entities\Files\VideoFile;
use App\Modules\Video\Entities\Files\PlaylistFile;
use App\Modules\Article\Entities\ActiveRecords\ArticleAR;
use App\Modules\User\Entities\ActiveRecords\UserActivityAR;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class GetMovie extends AbstractModule
{

    private $playlist_file;

    public function __invoke(Request $request, Response $response)
    {

        $result = [];
        $code = 200;
        try {

            $episodes = $request->getParam('episodes');
            $this->playlist_file = new PlaylistFile($this->container);

            $publication_id = false;
            $section_id = 0;
            $type_id = 0;
            $duration = 0;
            $file_path = '';
            $status = 'new';

            $first = true;
            foreach($episodes as $url) {
                if ( ($hash = AbstractPlaylist::build_hash_from_path($url)) !== false ) {

                    $playlist_file = $this->entity_playlist->get_playlist_with_hash($hash);
                    if ( $first && $publication_id === false ) {
                        $publication_id = $playlist_file->get_first_file()->build_publication_id();
                    }
                    elseif ($publication_id !== $playlist_file->get_first_file()->build_publication_id()) {
                        $result['message'] = sprintf(
                            'Anomaly detected while checking movie episodes: %s',
                            print_r($episodes, true)
                        );
                        $code = 400;
                        throw new Exception($result['message'], $code);
                    }

                    $this->playlist_file->add_files($playlist_file->get_files());
                    $first = false;
                }
                else {
                    $result['message'] = sprintf(
                        'Anomaly detected while generating hash for movie episode with url: %s',
                        $url
                    );
                    $code = 400;
                    throw new Exception($result['message'], $code);
                }
            }

            $db_datetime = $this->db[Hosts::LOCAL][Dbs::MAIN]->now();
            $article_ar = new ArticleAR(
                [
                    'publication_id' => $publication_id,
                    'issue_date' => $this->playlist_file->get_first_file()->build_issue_date(),
                    'section_id' => $section_id,
                    'headline' => $request->getParam('title'),
                    'type_id' => $type_id,
                    'modified' => $db_datetime,
                    'created' => $db_datetime,
                    'created_by' => $this->session_user->get_user()->id,
                    'duration' => $duration,
                    'broadcast_time' => $this->playlist_file->get_first_file()->build_broadcast_time(),
                    'file_path' => $file_path,
                    'status' => $status
                ]
            );
            $article_ar->id = $this->entity_article->save($article_ar);

            $this->entity_user_activity->save_media(new UserActivityAR(
                [
                    'user_id' => $this->session_user->get_user()->id,
                    'publication_id' => $publication_id,
                    'article_id' => $article_ar->id,
                    'issue_date' => $this->playlist_file->get_first_file()->build_issue_date(),
                    'activity_id' => UserActivity::CLIP,
                    'created' => $db_datetime,
                    'description' => json_encode(['hash' => $this->playlist_file->get_hash()])
                ]
            ));

            $publication_ar = $this->entity_publication->get_by_id($publication_id);
            $movie_file = new VideoFile(
                $this->entity_publication->is_radio($publication_ar),
                $this->container
            );
            $movie_path = $movie_file->build_movie_path($article_ar);
            $movie_file->set_locations($movie_path)
                ->save($this->playlist_file)
                ->build_length()
                ->build_size($article_ar);

            $article_ar->duration = $movie_file->get_length();
            $this->entity_article->save($article_ar);

            $result = $this->entity_movie->get_movie_for_output($article_ar, $movie_file);
            $movie_file->move_to_permanent_path($article_ar);
            $result['message'] = 'Article created successfully';
        }
        catch(Exception $e) {
            $code = 500;
            $this->logger->write(new Exception(
                $e->getMessage(),
                $code
            ));
            $result['message'] = 'Unexpected error.';
        }

        return Json::build($response, $result, $code);
    }

}
