<?php

namespace App\Modules\User\Middleware\Validation;

use App\Libs\Json;
use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use Respect\Validation\Validator as v;

class SignIn extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {

        $validation = $this->validator->validate($request, [
            'username' => v::noWhitespace()->notEmpty(),
            'password' => v::noWhitespace()->notEmpty()
        ]);

        if ($validation->failed()) {
            return $this->validation_failed($validation->get_errors(), $response);
        }

        return $next($request, $response);
    }
}
