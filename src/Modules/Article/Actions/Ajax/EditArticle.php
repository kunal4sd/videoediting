<?php

namespace App\Modules\Article\Actions\Ajax;

use App\Libs\Json;
use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Article\Entities\ActiveRecords\ArticleKeywordAR;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class EditArticle extends ModuleAbstract
{

    public function __invoke(Request $request, Response $response)
    {

        $result = [];

        try {
            $article_ar = $this->entity_article->get_by_id_and_user(
                $request->getParam('id'),
                $_SESSION['user']->id
            );

            if (!is_null($article_ar->id)) {

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
            }
            else {
                throw new Exception(
                    sprintf(
                        'No article found with the provided id #%s for user %s',
                        $request->getParam('id'),
                        $_SESSION['user']->id
                    ),
                    400
                );
            }

        }
        catch(Exception $e) {
            $this->logger->write($e);

            return Json::build($response, $result, 400);
        }

        return Json::build($response, $result, 200);
    }
}
