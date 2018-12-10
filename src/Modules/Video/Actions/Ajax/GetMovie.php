<?php

namespace App\Modules\Video\Actions\Ajax;

use App\Libs\Json;
use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\UserActivity;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Abstracts\PlaylistAbstract;
use App\Modules\Video\Entities\ActiveRecords\PlaylistAR;
use App\Modules\Article\Entities\ActiveRecords\ArticleAR;
use App\Modules\User\Entities\ActiveRecords\UserActivityAR;
use Slim\Http\Request;
use Slim\Http\Response;
use Pimple\Container;
use \Exception;

class GetMovie extends ModuleAbstract
{

    private $playlist_ar;

    public function __invoke(Request $request, Response $response)
    {

        $result = [];

        try {

            $episodes = $request->getParam('episodes');
            $raw_files_urls = [];
            $this->playlist_ar = new PlaylistAR($this->container);

            $publication_id = false;
            $section_id = 0;
            $type_id = 0;
            $duration = 0;
            $file_path = '';
            $status = 'new';

            $first = true;
            foreach($episodes as $url) {
                if ( ($hash = PlaylistAbstract::build_hash_from_path($url)) !== false ) {

                    $playlist_ar = $this->entity_playlist->get_playlist_with_hash($hash);

                    if ( $first && $publication_id === false ) {
                        $publication_id = $playlist_ar->build_publication_id();
                    }
                    elseif ($publication_id !== $playlist_ar->build_publication_id()) {
                        throw new Exception(
                            sprintf(
                                'Anomaly detected while checking movie episodes: %s',
                                print_r($episodes, true)
                            ),
                            400
                        );
                    }

                    $raw_files_urls = array_merge($raw_files_urls, $playlist_ar->files);
                    $first = false;
                }
                else {
                    throw new Exception(
                        sprintf(
                            'Anomaly detected while generating hash for movie episode with url: %s',
                            $url
                        ),
                        400
                    );
                }
            }

            $raw_files_urls = array_unique($raw_files_urls);
            $raw_files_paths = array_map( [$this, 'url_to_path'], $raw_files_urls );
            $this->playlist_ar->build_from_array(['files' => $raw_files_paths]);

            $db_datetime = $this->db[Hosts::LOCAL][Dbs::MAIN]->now();
            $article_ar = new ArticleAR(
                [
                    'publication_id' => $publication_id,
                    'issue_date' => $this->playlist_ar->build_issue_date(),
                    'section_id' => $section_id,
                    'headline' => $request->getParam('title'),
                    'type_id' => $type_id,
                    'modified' => $db_datetime,
                    'created' => $db_datetime,
                    'created_by' => $this->session_user->get_user()->id,
                    'duration' => $duration,
                    'broadcast_time' => $this->playlist_ar->build_broadcast_time(),
                    'file_path' => $file_path,
                    'status' => $status
                ]
            );
            $article_ar->id = $this->entity_article->save($article_ar);

            $this->entity_user_activity->save(new UserActivityAR(
                [
                    'user_id' => $this->session_user->get_user()->id,
                    'publication_id' => $publication_id,
                    'article_id' => $article_ar->id,
                    'issue_date' => $this->playlist_ar->build_issue_date(),
                    'activity_id' => UserActivity::CLIP,
                    'created' => $db_datetime
                ]
            ));

            $movie_path = PlaylistAR::build_movie_path($article_ar->id);
            $files_str = implode('|', $raw_files_paths);
            $cmd = sprintf(
                "ffmpeg -i  \"concat:%s\" -c copy %s\n\r",
                $files_str,
                $movie_path
            );
            $output = shell_exec($cmd);

            if ( !file_exists( $movie_path ) ) {
                throw new Exception(
                    sprintf(
                        "Failed creating movie with command `%s` and output `%s`",
                        $cmd,
                        $output
                    ),
                    500
                );
            }

            $cmd = sprintf(
                "ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 %s",
                $movie_path
            );
            $article_ar->duration = (int) shell_exec($cmd);
            $this->entity_article->save($article_ar);

            $result = $this->entity_movie->get_movie_for_output($article_ar);
        }
        catch(Exception $e) {
            $this->logger->write($e);
        }

        return Json::build($response, $result, 200);
    }

    private function url_to_path($file_url)
    {
        return $this->playlist_ar->url_to_path($file_url);
    }

}
