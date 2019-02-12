<?php

namespace App\Modules\Core\Middleware;

use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;

class Persistant extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {
        foreach ($request->getParams() as $param => $value) {
            $this->flash->addMessage("persistant_{$param}", $value);
        }

        return $next($request, $response);
    }
}
