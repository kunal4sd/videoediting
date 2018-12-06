<?php

namespace App\Modules\Video\Views;

use App\Modules\Abstracts\ModuleAbstract;
use App\Libs\Enums\UserActivity;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\Dbs;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class Listing extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response, $args)
    {

        $publications = [];
        try {
            $publications = $this->entity_publication->get_all_active_tv_and_radio();
            $statuses = $this->entity_article->get_status_values();
        }
        catch(Exception $e) {
            $this->logger->write($e);
        }

        return $this->view->render($response, 'listing/listing.twig', [
            'page_title' => 'Video Listing',
            'publications' => $publications,
            'statuses' => $statuses
        ]);
    }
}
