<?php

namespace App\Libs;

use Slim\Http\Response;

class Text
{
    public static function build(Response &$response, $data, $code = 500): \Slim\Http\Message|Response
    {
        $body = $response->getBody();
        $body->write($data);

        return $response->withHeader('Content-Type', 'text/plain')
            ->withBody($body);
    }

}
