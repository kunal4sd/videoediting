<?php

namespace App\Modules\User\Actions;

use App\Lib\Json;
use App\Modules\ActionAbstract;
use Slim\Http\Request;
use Slim\Http\Response;
use Pimple\Container;

class Logout extends ActionAbstract
{
    public function __invoke(Request $request, Response $response)
    {
        $data = ['data' => 'test'];

        return $response
            ->withHeader('Content-type', 'application/json')
            ->withStatus(200)
            ->write(Json::build(['result' => $data]))
            ;
    }
}