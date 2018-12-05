<?php

namespace App\Modules\Video\Middleware\Validation;

use App\Libs\Json;
use App\Modules\Abstracts\ModuleAbstract;
use Slim\Http\Request;
use Slim\Http\Response;
use Respect\Validation\Validator as v;

class GetEpisode extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response, $next)
    {

        $validation = $this->validator->validate($request, [
            'from' => v::intVal()->between(0, ( $request->getParam('to') - 1 ), true),
            'to' => v::intVal()->min(( $request->getParam('from') - 1 ), true),
            'playlist' => v::notEmpty(),
            'ajax' => v::trueVal()
        ]);

        if ($validation->failed()) {
            return $this->validation_failed($validation->get_errors(), $response);
        }

        return $next($request, $response);
    }

}
