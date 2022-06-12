<?php

namespace App\Modules\Video\Middleware\Validation;

use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use Respect\Validation\Validator as v;

class VTT extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {

        $validation = $this->validator->validate($request, [
        ]);

        if ($validation->failed()) {
            return $this->validation_failed($validation->get_errors(), $response);
        }

        return $next($request, $response);
    }

}
