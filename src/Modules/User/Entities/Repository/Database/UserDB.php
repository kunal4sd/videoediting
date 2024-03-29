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
                    group_id,
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
                    group_id,
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

    /**
     * @return UserAR []
     */
    public function get_all_users (){
        $result = [];
        $data = $this->db->fetch_all(
            "  SELECT  
                id,
                username,
                fname,
                lname,
                start_date,
                expiry_date,
                created,
                modified,
                created_by
                FROM user 
            ");
        foreach ($data as $row){
            $result[] = new UserAR($row);
        }
        return $result;
    }

    /**
     * @param array $ids
     * @return UserAR []
     */
    public function get_by_ids(array $ids): array
    {
        $result = [];
        if (empty($ids)) return $result;

        $params = array_map(function($id) { return sprintf('id_%s', $id); }, $ids);
        $data = $this->db->fetch_all(
            sprintf(
                "
                    SELECT
                        id,
                        username,
                        fname,
                        lname,
                        start_date,
                        expiry_date,
                        created,
                        modified,
                        created_by
                    FROM user
                    WHERE 1
                        AND id IN (:%s)
                ",
                implode(',:', $params)
            ),
            array_combine($params, $ids)
        );

        foreach($data as $row) {
            $result[$row['id']] = new UserAR($row);
        }

        return $result;
    }

}
