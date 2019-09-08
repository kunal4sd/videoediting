<?php

namespace App\Modules\Publication\Views;

use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class Report extends AbstractModule
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
        }
        catch(Exception $e) {
            $this->logger->write($e);
        }

        return $this->view->render($response, 'publication/report/report.twig', [
            'page_title' => 'Publications Report',
            'page_name' => 'report',
            'channels' => $publications_active,
            'types' => $this->entity_publication->get_types($publications_active)
        ]);
    }
}
