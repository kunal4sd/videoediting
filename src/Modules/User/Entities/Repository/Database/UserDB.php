<?php

namespace App\Modules\User\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\User\Entities\ActiveRecords\UserAR;

class UserDB extends AbstractDatabase
{

    public function get_by_id($id, $with_password = false)
    {

        $with_password = $with_password ? 'password,' : '';
        $result = $this->db->fetch(
            "
                SELECT
                    id,
                    username,
                    {$with_password}
                    type_id,
                    fname,
                    lname,
                    start_date,
                    expiry_date,
                    created,
                    modified,
                    created_by,
                    :ip AS ip
                FROM user
                WHERE 1
                    AND id = :id
            ",
            [
                'id' => $id,
                'ip' => $_SERVER['REMOTE_ADDR']
            ]
        );

        return new UserAR($result);
    }

    public function get_by_credentials($username, $password, $with_password = false)
    {

        $with_password = $with_password ? 'password,' : '';
        $result = $this->db->fetch(
            "
                SELECT
                    id,
                    username,
                    {$with_password}
                    type_id,
                    fname,
                    lname,
                    start_date,
                    expiry_date,
                    created,
                    modified,
                    created_by,
                    :ip AS ip
                FROM user
                WHERE 1
                    AND username = :username
                    AND password = PASSWORD(:password)
            ",
            [
                'username' => $username,
                'password' => $password,
                'ip' => $_SERVER['REMOTE_ADDR']
            ]
        );

        return new UserAR($result);
    }

}
