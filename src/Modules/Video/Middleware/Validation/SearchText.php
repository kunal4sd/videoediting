<?php

namespace App\Modules\Video\Middleware\Validation;

use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use Respect\Validation\Validator as v;

class SearchText extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {

        $validation = $this->validator->validate($request, [
            'date' => v::notEmpty()->stringType(),
            'publication' => v::notEmpty()->intVal(),
            'text' => v::notEmpty()->stringType(),
            'ajax' => v::trueVal()
        ]);
        if ($validation->failed()) {
            return $this->validation_failed($validation->get_errors(), $response);
        }

        $date_validation = [];
        $date = $request->getParam('date');
        if ($date !== date("Y-m-d", strtotime($date))) {
            $date_validation['date'] = ['unrecognized format'];
        }

        if (count($date_validation)) return $this->validation_failed($date_validation, $response);

        return $next($request, $response);
    }

}
