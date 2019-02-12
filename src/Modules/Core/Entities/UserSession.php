<?php

namespace App\Modules\Core\Entities;

use App\Modules\Abstracts\AbstractSessionActiveRecord;
use App\Libs\Enums\SessionFields;
use \Exception;

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
     * @return App\Modules\User\Entities\ActiveRecords\UserAR|null
     */
    public function get_user()
    {
        return $this->entity;
    }
}
