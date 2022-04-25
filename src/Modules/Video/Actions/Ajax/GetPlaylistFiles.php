<?php

namespace App\Modules\Video\Actions\Ajax;

use App\Modules\Abstracts\AbstractModule;
use App\Libs\Json;
use Slim\Http\Response;
use Slim\Http\Request;
use \Exception;

class GetPlaylistFiles extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $args)
    {

        $result = [
            'texts'     => [],
            'warnings'  => [],
            'message'   => ''
        ];
        $files = [];
        $code = 200;
        try {
            $files = $this->entity_playlist->get_playlist_files(
                $request->withQueryParams($args)
            );

            if (empty($words)) {
                $result['message'] = 'Could not find any words for the current segment';
            }

        } catch(Exception $e) {
            $code = 500;
            $this->logger->write(new Exception(
                sprintf(
                    'VTT Failed fetching the words: %s',
                    print_r($e->getMessage(), true)
                ),
                $code
            ));
        }

        $text = $this->view->fetch('video/components/file_list.twig', [
            "files" => $files
        ]);
        $body = $response->getBody();
        $body->write($text);

        return $response
            ->withHeader('Content-Type', 'text/html;charset=utf-8')
            ->withBody($body)
            ->withStatus($code)
            ;
    }

}
