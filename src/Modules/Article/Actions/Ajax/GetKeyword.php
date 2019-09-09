<?php

namespace App\Modules\Article\Actions\Ajax;

use App\Libs\Json;
use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class GetKeyword extends AbstractModule
{

    public function __invoke(Request $request, Response $response)
    {

        $result = [];
        $code = 200;

        try {
            $article_id = $request->getParam('article_id');
            $article_keywords_ar = $this->entity_article_keyword->get_by_article_id($article_id);
            $keywords_ar = $this->entity_keyword->get_by_ids_media(array_map(
                function($article_keyword_ar) { return $article_keyword_ar->keyword_id; }, $article_keywords_ar
            ));

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
