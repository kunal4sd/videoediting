<?php

namespace App\Modules\Core\Middleware;

use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;

class Csrf extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {
        $this->view->getEnvironment()->addGlobal('csrf', [
            'fields' => sprintf(
                '
                <input type="hidden" name="%s" value="%s">
                <input type="hidden" name="%s" value="%s">
                ',
                $this->csrf->getTokenNameKey(),
                $this->csrf->getTokenName(),
                $this->csrf->getTokenValueKey(),
                $this->csrf->getTokenValue()
            )
        ]);

        return $next($request, $response);
    }
}
