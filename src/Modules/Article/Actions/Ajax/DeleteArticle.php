<?php

namespace App\Modules\Article\Actions\Ajax;

use App\Libs\Json;
use App\Modules\Abstracts\ModuleAbstract;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class DeleteArticle extends ModuleAbstract
{

    public function __invoke(Request $request, Response $response)
    {

        $result = [];

        try {
            $this->entity_article->delete_by_id($request->getParam('id'));
        }
        catch(Exception $e) {
            $this->logger->write($e);

            return Json::build($response, $result, $e->getCode());
        }

        return Json::build($response, $result, 200);
    }
}
