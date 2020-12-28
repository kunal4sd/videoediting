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

class GetText extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {

        $result = [
            'texts' => [],
            'warnings' => []
        ];
        $code = 200;
        try {

            $result['texts'] = $this->entity_playlist->get_playlist_texts($request);

            if (empty($result['playlists'])) {
                $result['message'] = 'Could not find any videos with the provided details';
            }
        }
        catch(Exception $e) {
            $code = 500;
            $this->logger->write(new Exception(
                sprintf(
                    'Failed generating the playlist: %s',
                    print_r($e->getMessage(), true)
                ),
                $code
            ));
            $result['message'] = $e->getMessage();
        }


        return Json::build($response, $result, $code);
    }

}
