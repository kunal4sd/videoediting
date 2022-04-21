<?php

namespace App\Modules\Test\Actions\Ajax;

use App\Modules\Abstracts\AbstractModule;
use App\Libs\Json;
use Slim\Http\Response;
use Slim\Http\Request;
use \Exception;

class GetVTT extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $args)
    {

        $result = [
            'texts'     => [],
            'warnings'  => [],
            'message'   => ''
        ];
        $words = [];
        $code = 200;
        try {
            $words = $this->test_entity_playlist->getTexts(
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

        $text = $this->view->fetch('vtt/index.twig', [
            "words" => $words
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
