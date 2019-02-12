<?php

namespace App\Modules\Article\Actions\Ajax;

use App\Libs\Json;
use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class SearchKeyword extends AbstractModule
{

    public function __invoke(Request $request, Response $response)
    {

        $result = [];
        $code = 200;
        try {
            $keywords_ar = $this->entity_keyword->search_by_name($request->getParam('string'), true);
            foreach($keywords_ar as $keyword_ar) {
                $result[] = [
                    'id' => $keyword_ar->id,
                    'text' => sprintf('%s ::: %s', $keyword_ar->name_en, $keyword_ar->name_ar)
                ];
            }
        }
        catch(Exception $e) {
            $this->logger->write($e);
            $result['message'] = $e->getMessage();
            $code = $e->getCode();
        }

        return Json::build($response, $result, $code);
    }
}
