<?php

namespace App\Modules\User\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\User\Entities\ActiveRecords\UserActivityAR;
use App\Modules\User\Entities\Repository\Database\UserActivityDB;
use \Exception;

class UserActivity extends ModuleAbstract
{

    /**
     * @param int $id
     * @param int $user_id
     * @return UserActivityAR[]|UserActivityAR
     */
    public function get_last_x_by_user_and_type($x, $user_id, $type_id)
    {

        $user_activities_ar = (new UserActivityDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
            ->get_last_x_by_user_and_type($x, $user_id, $type_id);

        if (empty($user_activities_ar)) {
            throw new Exception("No activities found", 400);
        }

        return $x === 1 ? array_shift($user_activities_ar) : $user_activities_ar;
    }

    /**
     * @param int $id
     * @param int $user_id
     * @return UserActivityAR
     */
    public function get_by_id_and_user($id, $user_id)
    {

        $user_activity_ar = (new UserActivityDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
            ->get_by_id_and_user($id, $user);

        if (is_null($user_activity_ar->id)) {
            throw new Exception("User activity with id #{$id} does not exist", 400);
        }

        return $user_activity_ar;
    }

    /**
     * @throws Exception
     * @return int
     */
    public function save(UserActivityAR $user_activity_ar)
    {

        $insert_id = (new UserActivityDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
            ->save($user_activity_ar);

        if (is_null($insert_id)) {
            throw new Exception("Failed saving article", 400);
        }

        return $insert_id;
    }

}
