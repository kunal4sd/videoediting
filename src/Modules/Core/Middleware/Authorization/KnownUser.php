<?php

namespace App\Modules\Core\Middleware\Authorization;

use App\Libs\Json;
use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;

class KnownUser extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {

        if ($this->session_user->is_known()) {
            return $next($request, $response);
        }

        if ($request->getParam('ajax')) {
            return Json::build($response, [ 'authorization' => 'User authorization failed' ], 403);
        }

        return $response->withRedirect($this->router->pathFor('user.view.signin'));
    }
}
