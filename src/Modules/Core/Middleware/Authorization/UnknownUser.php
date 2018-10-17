<?php

namespace App\Modules\Core\Middleware\Authorization;

use App\Modules\Abstracts\ModuleAbstract;
use Slim\Http\Request;
use Slim\Http\Response;

class UnknownUser extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response, $next)
    {

        if (!$this->user_session->is_known()) {
            return $next($request, $response);
        }
        $this->logger->write(new \Exception('Access forbidden for known user', 403));

        return $response->withRedirect($this->router->pathFor('edit.view.index'));
    }
}
