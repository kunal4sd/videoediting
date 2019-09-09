<?php

namespace App\Modules\Video\Actions\Ajax;

use App\Libs\Json;
use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\UserActivity;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\User\Entities\ActiveRecords\UserActivityAR;
use App\Modules\Video\Entities\Files\PlaylistFile;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class GetEpisode extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {

        $result = [
            'src' => [],
            'poster' => '',
            'warnings' => []
        ];
        $code = 200;

        try {

            $hash = PlaylistFile::build_hash_from_path($request->getParam('playlist'));
            if ($hash) {
                $playlist_file = $this->entity_playlist->get_playlist_with_hash($hash);
                $files = $playlist_file->get_files();
                $from = $request->getParam('from');
                $to = $request->getParam('to');
                list($indexes, $time_cuts) = $playlist_file->get_range_indexes($from, $to);
                $new_files = array_values(
                    array_slice($files, $indexes['from'], ( $indexes['to'] - $indexes['from'] + 1 ))
                );

                $multiple_files = count($new_files) > 1;
                $first = array_shift($new_files)->build_perfect_cut(
                    $time_cuts['from'], $multiple_files ? false : $time_cuts['to']
                );
                array_unshift($new_files, $first);

                if ($multiple_files) {
                    $last = array_pop($new_files)->build_perfect_cut(false, $time_cuts['to']);
                    array_push($new_files, $last);
                }

                $new_playlist_file = $this->entity_playlist->get_playlist_with_files($new_files);
                $this->entity_user_activity->save_media(new UserActivityAR(
                    [
                        'user_id' => $this->session_user->get_user()->id,
                        'publication_id' => 0,
                        'article_id' => 0,
                        'issue_date' => date("Y-m-d"),
                        'activity_id' => UserActivity::EPISODE,
                        'created' => $this->db[Hosts::LOCAL][Dbs::MAIN]->now(),
                        'description' => json_encode(['hash' => $new_playlist_file->get_hash()])
                    ]
                ));
                $result['src'] = $new_playlist_file->get_url();
                $result['poster'] = $new_playlist_file->get_poster()->get_url();
                $result['message'] = 'Episode created successfully';
            }
            else {
                $code = 400;
                $result['message'] = 'Could not find the source playlist for this episode';
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
