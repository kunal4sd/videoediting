<?php

namespace App\Modules\Video\Actions\Ajax;

use App\Modules\Abstracts\AbstractModule;
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

            list($result['texts'], $result['warnings']) = $this->entity_playlist->get_playlist_texts($request);

            if (empty($result['texts'])) {
                $result['message'] = 'Could not find any words for the current segment';
            }
        }
        catch(Exception $e) {
            $code = 500;
            $this->logger->write(new Exception(
                sprintf(
                    'Failed fetching the words: %s',
                    print_r($e->getMessage(), true)
                ),
                $code
            ));
            $result['message'] = $e->getMessage();
        }


        return Json::build($response, $result, $code);
    }

}
