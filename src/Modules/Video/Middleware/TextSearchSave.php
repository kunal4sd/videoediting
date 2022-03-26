<?php

namespace App\Modules\Video\Middleware;

use \Exception;
use Slim\Http\Request;
use App\Libs\Enums\Dbs;
use Slim\Http\Response;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\UserActivity;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\User\Entities\ActiveRecords\UserActivityAR;

class TextSearchSave extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {

        return $next($request, $response);
    }

}
