<?php

namespace App\Modules\Core\Entities;

use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\User\Entities\ActiveRecords\UserAR;
use \Exception;

class UserSession extends ModuleAbstract
{

    const SESSION_FIELD = 'user';

    /**
     * @var UserAR
     */
    private $user;

    public function is_known()
    {
        return $this->user && $this->user->id;
    }

    public function init(UserAR $user = null)
    {
        $this->start();
        try {
            if ($user === null) {
                $this->init_from_session();

                $this->container->logger->write(
                    new Exception(
                        sprintf('Session continued for known user %s', $this->user->username),
                        200
                    )
                );
            }
            else {
                $this->user = $user;
                $this->init_from_user();

                $this->container->logger->write(
                    new Exception(
                        sprintf('New session started for known user %s', $this->user->username),
                        200
                    )
                );
            }
        }
        catch(Exception $e) {
            $this->container->logger->write($e);
        }

        return $this;
    }

    private function start()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    private function init_from_session()
    {
        if (!isset($_SESSION[self::SESSION_FIELD])) {
            throw new Exception('Failed initializing user session. Continuing as unknown user');
        }

        $this->user = $_SESSION[self::SESSION_FIELD];
    }

    private function init_from_user()
    {
        $_SESSION[self::SESSION_FIELD] = $this->user;
    }

    public function stop()
    {
        $this->container->logger->write(
            new Exception(
                sprintf('User %s signed out', $this->user->username),
                200
            )
        );
        unset($_SESSION[self::SESSION_FIELD]);
    }

    public function get_user()
    {
        return $this->user;
    }

    public function __get($field)
    {
        return $this->user->$field;
    }
}
