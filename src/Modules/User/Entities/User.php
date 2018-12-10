<?php

namespace App\Modules\User\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\User\Entities\Repository\Database\UserDB;
use \Exception;

class User extends ModuleAbstract
{

    /**
     * @param int $id : user database id
     * @throws Exception : if user with provided $id does not exist
     * @return UserAR
     */
    public function get_by_id($id, $with_password = false)
    {
        $user = new UserDB($this->db[Hosts::LOCAL][Dbs::MAIN]);
        $user_ar = $user->get_by_id($id, $with_password);

        if (is_null($user_ar->id)) {
            throw new Exception("User with id #{$id} does not exist", 404);
        }

        return $user_ar;
    }

    public function get_by_credentials($username, $password, $with_password = false)
    {
        $user = new UserDB($this->db[Hosts::LOCAL][Dbs::MAIN]);
        $user_ar = $user->get_by_credentials($username, $password, $with_password);

        if (is_null($user_ar->id)) {
            throw new Exception("Provided credentials are wrong", 404);
        }

        return $user_ar;
    }

}
