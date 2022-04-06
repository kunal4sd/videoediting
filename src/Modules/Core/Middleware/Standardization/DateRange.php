<?php

namespace App\Modules\Core\Middleware\Standardization;

use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;

class DateRange extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {

        $date_range = $request->getParam('date_range');
        $data = $request->getParams();

        if (!is_null($date_range)) {
            $range_details = explode(' - ', $date_range);
            $start_date = array_shift($range_details);
            $end_date = array_shift($range_details);

            $data = array_merge(
                $data,
                ['start_date' => $start_date, 'end_date' => $end_date]
            );
        }

        return $next($request->withParsedBody($data), $response);
    }

}
