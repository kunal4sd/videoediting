<?php

namespace App\Modules\Video\Middleware\Validation;

use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use Respect\Validation\Validator as v;

class GetMovie extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {

        $validation = $this->validator->validate($request, [
            'episodes' => v::notEmpty()->arrayType(),
            'title' => v::notEmpty()->stringType(),
            'text' => v::notEmpty()->stringType()->identical('MediaObserver ME'),
            'quality' => v::notEmpty()->stringType()->identical('medium'),
            'size' => v::notEmpty()->stringType()->identical('480p'),
            'format' => v::notEmpty()->stringType()->identical('mp4'),
            'aspect' => v::notEmpty()->stringType()->identical('16:9'),
            'ajax' => v::trueVal()
        ]);

        if ($validation->failed()) {
            return $this->validation_failed($validation->get_errors(), $response);
        }

        return $next($request, $response);
    }

}
