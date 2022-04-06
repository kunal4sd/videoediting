<?php

namespace App\Modules\Video\Middleware\Validation;

use App\Libs\Json;
use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use Respect\Validation\Validator as v;

class GetMovieList extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {

        $validation = $this->validator->validate($request, [
            'start_date' => v::notEmpty()->stringType(),
            'end_date' => v::notEmpty()->stringType(),
            'publication' => v::notEmpty()->intVal(),
            'ajax' => v::trueVal()
        ]);
        if ($validation->failed()) {
            return $this->validation_failed($validation->get_errors(), $response);
        }

        $date_validation = [];
        $start_date = $request->getParam('start_date');
        $end_date = $request->getParam('end_date');
        if ($start_date !== date("Y-m-d H:i:s", strtotime($start_date))) {
            $date_validation['start_date'] = ['unrecognized format'];
        }
        if ($end_date !== date("Y-m-d H:i:s", strtotime($end_date))) {
            $date_validation['end_date'] = ['unrecognized format'];
        }
        if (strtotime($start_date) > strtotime($end_date)) {
            $date_validation['start_date'] = ['must have a value before end date'];
            $date_validation['end_date'] = ['must have a value after start date'];
        }

        if (count($date_validation)) return $this->validation_failed($date_validation, $response);

        return $next($request, $response);
    }

}
