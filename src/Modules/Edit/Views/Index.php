<?php

namespace App\Modules\Edit\Views;

use App\Modules\Abstracts\ModuleAbstract;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\Dbs;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class Index extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response)
    {

        $publications = [];
        try {
            $publications = $this->entity_publication->get_all_active_tv_and_radio();
        }
        catch(Exception $e) {
            $this->logger->write(
                new Exception(
                    sprintf(
                        'Failed retrieving publications: %s',
                        print_r($e->getMessage(), true)
                    ),
                    403
                )
            );
        }

        return $this->view->render($response, 'edit/index.twig', [
            'name' => 'World',
            'page_title' => 'Video Editing Tool',
            'publications' => $publications
        ]);
    }
}
