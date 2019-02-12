<?php

namespace App\Modules\Article\Actions\Ajax;

use App\Libs\Json;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Files\PlaylistFile;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class DeleteArticle extends AbstractModule
{

    public function __invoke(Request $request, Response $response)
    {

        $result = [];
        $code = 200;
        try {
            $this->entity_article->delete_by_id($request->getParam('id'));
            $result['message'] = 'Article deleted successfully';
        }
        catch(Exception $e) {
            $this->logger->write($e);
            $result['message'] = 'Error encountered when trying to delete';
            $code = $e->getCode();
        }

        return Json::build($response, $result, $code);
    }
}
