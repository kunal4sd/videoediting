<?php

namespace App\Modules\User\Actions;

use App\Libs\Json;
use App\Modules\Abstracts\ModuleAbstract;
use Slim\Http\Response;
use Slim\Http\Request;
use Pimple\Container;
use \Exception;

class Authenticate extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response)
    {

        try {
            $user_ar = $this->entity_user->get_by_credentials(
                $request->getParam('username'),
                $request->getParam('password')
            );
            $this->session_user->init_from_entity($user_ar);
        }
        catch(Exception $e) {
            $this->flash->addMessage('alerts_errors', $e->getMessage());
            $this->logger->write(
                new Exception(
                    sprintf(
                        'Failed sign in attempt: %s',
                        print_r($e->getMessage(), true)
                    ),
                    403
                )
            );

            if ($request->getParam('ajax')) {
                return Json::build($response, [$e->getMessage()], 400);
            }

            return $response->withRedirect($this->router->pathFor('user.view.signin'));
        }

        if ($request->getParam('ajax')) {
            return Json::build(
                $response,
                ['redirect_to' => $this->router->pathFor('video.view.index')],
                302
            );
        }

        return $response->withRedirect($this->router->pathFor('video.view.index'));
    }
}
