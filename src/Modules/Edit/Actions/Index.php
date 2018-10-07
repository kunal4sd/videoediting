<?php

namespace App\Modules\Edit\Actions;

use App\Modules\ActionAbstract;
use Slim\Http\Request;
use Slim\Http\Response;
use Pimple\Container;

class Index extends ActionAbstract
{
    public function __invoke(Request $request, Response $response)
    {
        return $this->container->view->render($response, 'edit/index.twig', [
            'name' => 'World',
            'page_title' => 'Video Editing Tool'
        ]);
    }
}