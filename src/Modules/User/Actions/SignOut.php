<?php

namespace App\Modules\User\Actions;

use App\Libs\Json;
use App\Modules\Abstracts\ModuleAbstract;
use Slim\Http\Request;
use Slim\Http\Response;
use Pimple\Container;

class SignOut extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response)
    {
        $this->user_session->stop();

        return $response->withRedirect($this->router->pathFor('user.view.signin'));
    }
}
