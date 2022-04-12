<?php

namespace App\Modules\Video\Views;

use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class VTT extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $args)
    {
//        var_dump($request->getParams(), $args);

        $result = [
            'texts'     => [],
            'warnings'  => [],
            'message'   => ''
        ];
        $code = 200;
        try {

            $words = $this->entity_playlist->get_playlist_texts_timeshift($args['publication'], $args['hash']);

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

        var_dump($words);

        $text = $this->view->fetch('vtt/index.twig', [

        ]);
        $body = $response->getBody();
        $body->write($text);

        return $response
            ->withHeader('Content-Type', 'text/vtt;charset=utf-8')
            ->withBody($body)
            ->withStatus($code)
            ;
    }

}
