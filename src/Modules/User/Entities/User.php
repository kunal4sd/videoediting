<?php

namespace App\Modules\User\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\User\Entities\ActiveRecords\UserAR;
use App\Modules\User\Entities\Repository\Database\UserDB;
use \Exception;

class User extends AbstractModule
{

    /**
     * @param int $id : user database id
     * @throws Exception : if user with provided $id does not exist
     * @return UserAR
     */
    public function get_by_id_media($id, $with_password = false)
    {
        $user = new UserDB($this->db[Hosts::MEDIA][Dbs::MEDIA]);
        $user_ar = $user->get_by_id($id, $with_password);

        if (is_null($user_ar->id)) {
            throw new Exception("User with id #{$id} does not exist", 404);
        }

        return $user_ar;
    }

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

    /**
     * @param string $username
     * @param string $password
     * @param boolean $with_password : (!) returns password in result if true, default is false
     * @return UserAR
     */
    public function get_by_credentials_media($username, $password, $with_password = false)
    {
        $user = new UserDB($this->db[Hosts::MEDIA][Dbs::MEDIA]);
        $user_ar = $user->get_by_credentials($username, $password, $with_password);

        if (is_null($user_ar->id)) {
            throw new Exception("Provided credentials are wrong", 404);
        }

        return $user_ar;
    }

    /**
     * @param string $username
     * @param string $password
     * @param boolean $with_password : (!) returns password in result if true, default is false
     * @return UserAR
     */
    public function get_by_credentials($username, $password, $with_password = false)
    {
        $user = new UserDB($this->db[Hosts::LOCAL][Dbs::MAIN]);
        $user_ar = $user->get_by_credentials($username, $password, $with_password);

        if (is_null($user_ar->id)) {
            throw new Exception("Provided credentials are wrong", 404);
        }

        return $user_ar;
    }

    /**
     * @param UserAR $user_ar
     * @return boolean
     */
    public function is_admin(UserAR $user_ar): bool
    {
        return (int) $user_ar->type_id === 0;
    }

}
