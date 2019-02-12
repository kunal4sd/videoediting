<?php

namespace App\Modules\User\Views;

use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;

class SignIn extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {
        return $this->view->render($response, 'user/login.twig', [
            'page_title' => 'Sign In',
            'page_name' => 'signin',
        ]);
    }
}
