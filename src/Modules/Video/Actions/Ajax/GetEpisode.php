<?php

namespace App\Modules\Video\Actions\Ajax;

use App\Libs\Json;
use App\Libs\Enums\Videos;
use App\Modules\Abstracts\ModuleAbstract;
use Slim\Http\Request;
use Slim\Http\Response;
use Pimple\Container;
use \Exception;

class GetEpisode extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response)
    {

        $result = [
            'src' => [],
            'poster' => '',
            'warnings' => []
        ];

        try {

            $playlist_details = explode('/', $request->getParam('playlist'));
            $filename = array_pop($playlist_details);
            $filename_details = explode('.', $filename);
            $hash = array_shift($filename_details);
            $file_type = array_shift($filename_details);

            if ($hash && $file_type === Videos::PLAYLIST_FORMAT) {

                $playlist_ar = $this->entity_playlist->get_playlist_with_hash($hash);
                $files = $playlist_ar->files;
                $from = $request->getParam('from');
                $to = $request->getParam('to');
                $from_index = floor($from / Videos::RAW_VIDEO_LENGTH);
                $to_index = floor($to / Videos::RAW_VIDEO_LENGTH);
                $new_files = array_values(
                    array_slice($files, $from_index, ( $to_index - $from_index + 1 ))
                );
                $new_hash = build_hash($new_files);
                $new_playlist_ar = $this->entity_playlist->get_playlist_with_files(
                    $new_files,
                    false
                );

                $poster_path = $new_playlist_ar->build_poster_path($new_hash);
                $new_playlist_ar->build_poster($poster_path);

                $result['src'] = $new_playlist_ar->path_to_url($new_playlist_ar->name);
                $result['poster'] = $new_playlist_ar->path_to_url($poster_path);
            }
        }
        catch(Exception $e) {
            $this->flash->addMessage('alerts_errors', $e->getMessage());
            $this->logger->write(
                new Exception(
                    sprintf(
                        'Failed generating the playlist: %s',
                        print_r($e->getMessage(), true)
                    ),
                    $e->getCode()
                )
            );
        }

        return Json::build($response, $result, 200);
    }

}
