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

class GetVideoList extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response)
    {

        $result = [
            'videos' => [],
            'warnings' => []
        ];

        try {

            $publications = $request->getParam('publication');
            if (strlen($publications)) {
                $publications = explode(',', $publications);
                $articles_ar = $this->entity_article->get_for_interval_by_user_and_publication(
                    $request->getParam('start_date'),
                    $request->getParam('end_date'),
                    $_SESSION['user']->id,
                    $publications
                );
            }
            else {
                $articles_ar = $this->entity_article->get_for_interval_by_user(
                    $request->getParam('start_date'),
                    $request->getParam('end_date'),
                    $_SESSION['user']->id
                );
            }

            if (!empty($articles_ar)) {
                $result['videos'] = $this->entity_movie->get_movies_for_output($articles_ar);
            }

            $statuses = $request->getParam('status');
            if (strlen($statuses)) {
                $statuses = explode(',', $statuses);
                foreach($result['videos'] as &$video) {
                    if (!in_array($video['status'], $statuses)) {
                        $video = false;
                    }
                }
                $result['videos'] = array_filter($result['videos']);
            }
        }
        catch(Exception $e) {
            $this->flash->addMessage('alerts_errors', $e->getMessage());
            $this->logger->write(
                new Exception(
                    sprintf(
                        'Failed getting the videos: %s',
                        print_r($e->getMessage(), true)
                    ),
                    $e->getCode()
                )
            );
        }

        return Json::build($response, $result, 200);
    }

}
