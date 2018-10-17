<?php

namespace App\Modules\User\Actions;

use \Exception;
use App\Libs\Json;
use App\Modules\User\Entity\User;
use App\Modules\Abstracts\ModuleAbstract;
use Slim\Http\Request;
use Slim\Http\Response;
use Pimple\Container;
use Respect\Validation\Validator as v;

class Authenticate extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response)
    {

        try {
            $user_ar = $this->entity_user->get_by_credentials(
                $request->getParam('username'),
                $request->getParam('password')
            );
            $this->user_session->init($user_ar);
        }
        catch(Exception $e) {
            $this->flash->addMessage('alerts_errors', $e->getMessage());
            $this->logger->write(
                new \Exception(
                    sprintf(
                        'Failed sign in attempt: %s',
                        print_r($e->getMessage(), true)
                    ),
                    403
                )
            );

            return $response->withRedirect($this->router->pathFor('user.view.signin'));
        }

        return $response->withRedirect($this->router->pathFor('edit.view.index'));
    }
}
