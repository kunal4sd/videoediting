<?php

namespace App\Modules\Video\Middleware\Validation;

use App\Libs\Json;
use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use Respect\Validation\Validator as v;

class GetVideoList extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {

        $validation = $this->validator->validate($request, [
            'date_range' => v::notEmpty()->stringType(),
            'publication' => v::oneOf(v::stringType(), v::nullType()),
            'status' => v::oneOf(v::stringType(), v::nullType()),
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
