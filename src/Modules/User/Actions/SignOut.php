<?php

namespace App\Modules\User\Actions;

use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use Pimple\Container;

class SignOut extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {
        $this->session_user->stop();
        $this->logger->write(new \Exception('User logged out.', 200));

        if ($request->getParam('ajax')) {
            return Json::build($response, [ 'authorization' => 'User authorization failed' ], 403);
        }

        return $response->withRedirect($this->router->pathFor('user.view.signin'));
    }
}
