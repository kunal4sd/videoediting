<?php

namespace App\Modules\User\Middleware\Validation;

use App\Modules\Abstracts\ModuleAbstract;
use Slim\Http\Request;
use Slim\Http\Response;
use Respect\Validation\Validator as v;

class SignIn extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response, $next)
    {

        $validation = $this->validator->validate($request, [
            'username' => v::noWhitespace()->notEmpty(),
            'password' => v::noWhitespace()->notEmpty()
        ]);

        if ($validation->failed()) {

            foreach($validation->get_errors() as $field => $errors) {
                $this->flash->addMessage("errors_{$field}", array_shift($errors));
            }

            $this->logger->write(
                new \Exception(
                    sprintf(
                        'Failed sign in attempt: %s',
                        print_r($validation->get_errors(), true)
                    ),
                    403
                )
            );

            return $response->withRedirect($this->router->pathFor('user.view.signin'));
        }

        return $next($request, $response);
    }
}
