<?php

namespace App\Modules\Video\Middleware\Validation;

use App\Libs\Json;
use App\Modules\Abstracts\ModuleAbstract;
use Slim\Http\Request;
use Slim\Http\Response;
use Respect\Validation\Validator as v;

class GetMovieList extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response, $next)
    {

        $validation = $this->validator->validate($request, [
            'date_range' => v::notEmpty()->stringType(),
            'publication' => v::notEmpty()->intVal(),
            'ajax' => v::trueVal()
        ]);
        if ($validation->failed()) {
            return $this->validation_failed($validation->get_errors(), $response);
        }

        $date_range = $request->getParam('date_range');
        $range_details = explode(' - ', $date_range);
        if (count($range_details) !== 2) {
            return $this->validation_failed(
                [
                    'date_range' => ['unrecognized format']
                ],
                $response
            );
        }

        $start_date = $range_details[0];
        $end_date = $range_details[1];
        if (
            $start_date !== date("Y-m-d H:i:s", strtotime($start_date))
            || $end_date !== date("Y-m-d H:i:s", strtotime($end_date))
        ) {
            return $this->validation_failed(
                [
                    'date_range' => ['unrecognized format']
                ],
                $response
            );
        }

        return $next($request, $response);
    }

}
