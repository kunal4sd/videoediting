<?php

namespace App\Modules\Core\Middleware\Authorization;

use App\Libs\Json;
use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;

class SameIp extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {
        if ($this->session_user->is_same_ip()) {
            return $next($request, $response);
        }
        $this->logger->write(
            new \Exception(
                sprintf(
                    'User IP has changed since login. Registered %s vs Detected %s',
                    $this->session_user->get_user()->ip,
                    $_SERVER['REMOTE_ADDR']
                ),
                403
            )
        );

        if ($request->getParam('ajax')) {
            return Json::build(
                $response,
                [
                    'authorization' => 'Session authorization failed. Contact admin if issue repeats.'
                ],
                403
            );
        }

        return $response->withRedirect($this->router->pathFor('user.action.signout'));
    }
}
