<?php

namespace App\Modules\Core\Entities;

use App\Modules\Abstracts\AbstractSessionActiveRecord;
use App\Libs\Enums\SessionFields;

class UserSession extends AbstractSessionActiveRecord
{

    protected $entity_field = SessionFields::USER;

    /**
     * @return bool : true if user session data exists, false otherwise
     */
    public function is_known()
    {
        return $this->entity && $this->entity->id;
    }

    /**
     * @return bool : true if same ip, false otherwise
     */
    public function is_same_ip()
    {
        return $this->entity->ip === $_SERVER['REMOTE_ADDR'];
    }

    /**
     * @return App\Modules\User\Entities\ActiveRecords\UserAR|null
     */
    public function get_user()
    {
        return $this->entity;
    }
}
