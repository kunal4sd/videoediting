<?php

namespace App\Modules\Article\Middleware\Validation;

use Slim\Http\Request;
use Slim\Http\Response;
use Respect\Validation\Validator as v;
use App\Modules\Abstracts\AbstractModule;

class EditArticleStatus extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {
        $validation = $this->validator->validate($request, [
            'status' => v::notEmpty()->stringType(),
            'ids' => v::notEmpty()->arrayType(),
            'ajax' => v::trueVal()
        ]);

        if ($validation->failed()) {
            return $this->validation_failed($validation->get_errors(), $response);
        }

        $accepted_statuses = $this->entity_article->get_status_values();
        if (!in_array($request->getParam('status'), $accepted_statuses)) return $this->validation_failed(['status' => ['Invalid Article status value']], $response);

        return $next($request, $response);
    }

}
