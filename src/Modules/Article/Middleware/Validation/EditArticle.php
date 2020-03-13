<?php

namespace App\Modules\Article\Middleware\Validation;

use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use Respect\Validation\Validator as v;

class EditArticle extends AbstractModule
{
    public function __invoke(Request $request, Response $response, $next)
    {
        $validation = $this->validator->validate($request, [
            'keywords' => v::stringType(),
            'text' => v::stringType(),
            'headline' => v::notEmpty()->stringType(),
            'id' => v::notEmpty()->intVal(),
            'ajax' => v::trueVal()
        ]);

        if ($validation->failed()) {
            return $this->validation_failed($validation->get_errors(), $response);
        }

        $accepted_statuses = $this->entity_article->get_status_values();
        if (!in_array($request->getParam('status'), $accepted_statuses)) return $this->validation_failed(['status' => 'Invalid Article status value'], $response);

        return $next($request, $response);
    }

}
