<?php

namespace App\Modules\Core\Middleware\Authorization;

use App\Libs\Json;
use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Libs\Enums\UserActivity;

class SameSessionId extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {
        $user_activity_ar = $this->entity_user_activity->get_last_x_by_user_and_type(
            1,
            $this->session_user->get_user()->id,
            UserActivity::LOGIN
        );

        if ($user_activity_ar->description === session_id()) {
            return $next($request, $response);
        }
        $this->logger->write(new \Exception('User session id has changed since login.', 403));

        if ($request->getParam('ajax')) {
            return Json::build($response, [ 'authorization' => 'User authorization failed' ], 403);
        }

        return $response->withRedirect($this->router->pathFor('user.action.signout'));
    }
}
