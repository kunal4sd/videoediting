<?php

namespace App\Modules\Video\Middleware\Validation;

use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Files\RawVideoFile;
use Slim\Http\Request;
use Slim\Http\Response;
use Respect\Validation\Validator as v;

class TextSearchSave extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {

        $validation = $this->validator->validate(
            $request,
            [
                'start_segment' => v::notEmpty()->stringType(),
                'end_segment' => v::notEmpty()->stringType(),
                'publication' => v::notEmpty()->intVal(),
            ],
            true
        );
        if ($validation->failed()) {
            return $this->validation_failed($validation->get_errors(), $response);
        }

        $route = $request->getAttribute('route');
        $params = $route->getArguments();

        // These required for windows apache, because ":" colon symbol does not allowed in url
        $params['start_segment'] = str_replace("!", ":", $params['start_segment']);
        $params['end_segment'] = str_replace("!", ":", $params['end_segment']);

        $start_raw_video_file = (new RawVideoFile())->set_locations($params['start_segment']);
        $end_raw_video_file = (new RawVideoFile())->set_locations($params['end_segment']);

        $start_date = $start_raw_video_file->build_start_datetime();
        $end_date = $end_raw_video_file->build_start_datetime();

        $date_validation = [];

        if ($start_date !== date("Y-m-d H:i:s", strtotime($start_date))) {
            $date_validation['start_date'] = ['unrecognized format'];
        }
        if ($end_date !== date("Y-m-d H:i:s", strtotime($end_date))) {
            $date_validation['end_date'] = ['unrecognized format'];
        }
        if (strtotime($start_date) > strtotime($end_date)) {
            $date_validation['start_date'] = ['start date must be before End date'];
        }

        if (count($date_validation)) return $this->validation_failed($date_validation, $response);

        $clone = $request->withParsedBody([
            'start_date' => $start_date,
            'end_date' => $end_date,
            'publication' => $params['publication'],
        ]);

        return $next($clone, $response);
    }

}
