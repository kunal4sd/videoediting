<?php

namespace App\Modules\Video\Actions\Ajax;

use App\Modules\User\Entities\ActiveRecords\UserActivityAR;
use App\Modules\Abstracts\ModuleAbstract;
use App\Libs\Enums\UserActivity;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\Dbs;
use App\Libs\Json;
use Slim\Http\Response;
use Slim\Http\Request;
use Pimple\Container;
use \Exception;

class GetMovieList extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response)
    {

        $result = [
            'movies' => [],
            'warnings' => []
        ];

        try {

            $articles_ar = $this->entity_article->get_for_interval_by_user_and_publication(
                $request->getParam('start_date'),
                $request->getParam('end_date'),
                $this->session_user->get_user()->id,
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
