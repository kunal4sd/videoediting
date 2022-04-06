<?php

namespace App\Modules\Article\Actions\Ajax;

use \Exception;
use App\Libs\Json;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Libs\Enums\Status;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Article\Entities\ActiveRecords\ArticleKeywordAR;

class EditArticle extends AbstractModule
{

    public function __invoke(Request $request, Response $response)
    {

        $result = [];
        $code = 200;

        try {
            $article_ar = $this->entity_article->get_by_id(
                $request->getParam('id')
            );

            if (!is_null($article_ar->id) && $article_ar->status !== Status::LIVE) {

                // save article
                $article_ar->text = $request->getParam('text');
                $article_ar->headline = $request->getParam('headline');

                $this->entity_article->save($article_ar);

                // delete old keywords associated with current article id
                $this->entity_article_keyword->delete_by_article_id($article_ar->id);

                // save new keywords associated with current article id
                $article_keywords_ar = [];
                $keywords = array_filter(explode(',', $request->getParam('keywords')));
                foreach($keywords as $keyword) {
                    $article_keywords_ar[] = new ArticleKeywordAR([
                        'article_id' => $article_ar->id,
                        'keyword_id' => $keyword
                    ]);
                }
                $this->entity_article_keyword->save_multiple($article_keywords_ar);

                $result['message'] = "Article updated successfully";
            }
            elseif(is_null($article_ar->id)) {
                $result['message'] = "No article found with the provided details";
                $code = 404;
            }
            else {
                $result['message'] = "Article status is Live and cannot be changed";
                $code = 400;
            }
        }
        catch(Exception $e) {
            $code = 500;
            $this->logger->write(new Exception(
                $e->getMessage(),
                $code
            ));
            $result['message'] = 'Unexpected error.';
        }

        return Json::build($response, $result, $code);
    }
}
