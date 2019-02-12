<?php

namespace App\Modules\Video\Actions\Ajax;

use App\Modules\Abstracts\AbstractModule;
use App\Libs\Json;
use Slim\Http\Response;
use Slim\Http\Request;
use \Exception;

class GetMovieList extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {

        $result = [
            'movies' => [],
            'warnings' => []
        ];

        try {

            $articles_ar = $this->entity_article->get_for_interval_by_publication(
                $request->getParam('start_date'),
                $request->getParam('end_date'),
                $request->getParam('publication')
            );

            if (!empty($articles_ar)) {
                $result['movies'] = $this->entity_movie->get_movies_for_output($articles_ar);
            }
        }
        catch(Exception $e) {
            $this->flash->addMessage('alerts_errors', $e->getMessage());
            $this->logger->write(
                $e
            );
        }

        return Json::build($response, $result, 200);
    }

}
