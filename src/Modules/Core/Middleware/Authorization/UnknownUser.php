<?php

namespace App\Modules\Core\Middleware\Authorization;

use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;

class UnknownUser extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {

        if (!$this->session_user->is_known()) {
            return $next($request, $response);
        }
        $this->logger->write(new \Exception('Access forbidden for known user', 403));

        return $response->withRedirect($this->router->pathFor('video.view.index'));
    }
}
