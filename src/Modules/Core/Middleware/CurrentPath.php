<?php

namespace App\Modules\Core\Middleware;

use App\Modules\Abstracts\ModuleAbstract;
use Slim\Http\Request;
use Slim\Http\Response;

class CurrentPath extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response, $next)
    {
        $this->view->getEnvironment()->addGlobal('current_path', $request->getRequestTarget());

        return $next($request, $response);
    }
}
