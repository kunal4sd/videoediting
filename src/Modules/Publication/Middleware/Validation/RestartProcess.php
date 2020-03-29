<?php

namespace App\Modules\Publication\Middleware\Validation;

use App\Libs\Enums\Config\MandatoryFields;
use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use Respect\Validation\Validator as v;

class RestartProcess extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {

        $validation = $this->validator->validate($request, [
            'id' => v::notEmpty()::intVal(),
            'process' => v::notEmpty()->stringType(),
            'ajax' => v::trueVal()
        ]);

        if ($validation->failed()) {
            return $this->validation_failed($validation->get_errors(), $response);
        }

        $validation = [];
        $process = $request->getParam('process');
        $valid_processes = [
            'rsync', 'ffmpeg'
        ];

        if (!in_array($process, $valid_processes)) {
            $validation['process'] = ['provided unrecognized process name'];
        }

        $server = $request->getParam('server');
        if ($request->getParam('id') === null && !strlen($server)) {
            $validation['id'] = ['must be defined'];
            $validation['server'] = ['must be defined'];
        }

        $servers = $this->config->{MandatoryFields::SSH}[$process];
        if (
            strlen($server)
            && !in_array($server, array_map(function($server) { return $server['name']; }, $servers))
        ) $validation['server'] = ['provided unrecognized server name'];

        if (count($validation)) return $this->validation_failed($validation, $response);

        return $next($request, $response);
    }

}
