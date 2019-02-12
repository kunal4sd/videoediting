<?php

namespace App\Modules\Video\Views;

use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class Listing extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {

        $publications_active = [];
        try {
            $publications = $this->entity_publication->get_all_active_tv_and_radio_media();
            $publications_details = $this->entity_publication_details->get_all_recording247();
            $publications_active = intersect_objects_by_fields(
                $publications,
                'id',
                $publications_details,
                'publication_id'
            );
            $statuses = $this->entity_article->get_status_values(true);
        }
        catch(Exception $e) {
            $this->logger->write($e);
        }

        return $this->view->render($response, 'listing/listing.twig', [
            'page_title' => 'Video Listing',
            'page_name' => 'listing',
            'publications' => $publications_active,
            'statuses' => $statuses
        ]);
    }
}
