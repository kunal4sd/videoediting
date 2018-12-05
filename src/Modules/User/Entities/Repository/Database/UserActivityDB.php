<?php

namespace App\Modules\User\Entities\Repository\Database;

use App\Libs\Enums\Hosts;
use App\Libs\Enums\Dbs;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\User\Entities\ActiveRecords\UserActivityAR;
use \Exception;
use \PDO;

class UserActivityDB extends ModuleAbstract
{

    /**
     * @param int $x : most recent X activities
     * @param int $user_id
     * @return UserActivityAR[]
     */
    public function get_last_x_by_user_and_type($x, $user_id, $type_id)
    {

        $result = [];

        $data = $this->db[Hosts::LOCAL][Dbs::MAIN]->fetch_all(
            "
                SELECT
                    *
                FROM user_activity
                WHERE 1
                    AND user_id = :user_id
                    AND activity_id = :activity_id
                ORDER BY
                    id
                    DESC
                LIMIT :x
            ",
            [
                'user_id' => $user_id,
                'activity_id' => $type_id,
                'x' => [$x, PDO::PARAM_INT]
            ]
        );

        foreach($data as $row) {
            $result[] = new UserActivityAR($row);
        }

        return $result;
    }

    /**
     * @param int $id : user_activity database id
     * @param int $user_id
     * @return UserActivityAR
     */
    public function get_by_id_and_user($id, $user_id)
    {
        $data = $this->db[Hosts::LOCAL][Dbs::MAIN]->fetch(
            "
                SELECT
                    *
                FROM user_activity
                WHERE 1
                    AND id = :id
                    AND user_id = :user_id
            ",
            [
                'id' => $id,
                'user_id' => $user_id
            ]
        );

        return new UserActivityAR($data);
    }

    /**
     * @param int $id : user_activity database id
     * @return UserActivityAR
     */
    public function get_by_id($id)
    {
        $data = $this->db[Hosts::LOCAL][Dbs::MAIN]->fetch(
            "
                SELECT
                    *
                FROM user_activity
                WHERE 1
                    AND id = :id
            ",
            [
                'id' => $id
            ]
        );

        return new UserActivityAR($data);
    }

    /**
     * @return UserActivityAR[]
     */
    public function get_all()
    {
        $result = [];

        $data = $this->db[Hosts::LOCAL][Dbs::MAIN]->fetch_all(
            "
                SELECT
                    *
                FROM user_activity
                GROUP BY
                    id
                ORDER BY
                    id
                    ASC
            "
        );

        foreach($data as $row) {
            $result[] = new UserActivityAR($row);
        }

        return $result;
    }

    /**
     * @param UserActivityAR
     * @return int id of inserted row
     */
    public function save(UserActivityAR $user_activity)
    {

        $user_activity_array = array_filter($user_activity->build_to_array(), function($val) {
            return !is_null($val);
        });
        $user_activity_fields = array_keys($user_activity_array);

        return $this->db[Hosts::LOCAL][Dbs::MAIN]->insert_id(
            sprintf(
                "
                    INSERT INTO user_activity
                    (
                        %s
                    )
                    VALUES
                    (
                        %s
                    )
                    ON DUPLICATE KEY UPDATE
                        %s
                ",
                implode(',', $user_activity_fields),
                implode(',', array_map( function($val) { return ':'.$val; }, $user_activity_fields )),
                implode(',', array_map(
                    function($val) { return sprintf('%1$s=VALUES(%1$s)', $val); },
                    $user_activity_fields
                ))
            ),
            $user_activity_array
        );
    }

}
