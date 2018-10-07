<?php

namespace App\Modules\User\Actions;

use App\Modules\ActionAbstract;
use Slim\Http\Request;
use Slim\Http\Response;
use Pimple\Container;

class Login extends ActionAbstract
{
    public function __invoke(Request $request, Response $response)
    {
        return $this->container->view->render($response, 'user/login.twig', [
            'page_title' => 'Login'
        ]);
    }
}