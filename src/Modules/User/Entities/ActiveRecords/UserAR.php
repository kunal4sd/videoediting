<?php

namespace App\Modules\User\Entities\ActiveRecords;

use \Date;
use App\Modules\Abstracts\AbstractActiveRecord;

class UserAR extends AbstractActiveRecord
{

    /**
     * @var int
     */
    public $id;

    /**
     * @var string
     */
    public $username;

    /**
     * @var string|null
     */
    public $password;

    /**
     * @var int
     */
    public $type_id;

    /**
     * @var string|null
     */
    public $fname;

    /**
     * @var string|null
     */
    public $lname;

    /**
     * @var string
     */
    public $start_date;

    /**
     * @var string|null
     */
    public $expiry_date;

    /**
     * @var string
     */
    public $created;

    /**
     * @var string
     */
    public $modified;

    /**
     * @var int
     */
    public $created_by;

    public function __construct(array $data = [])
    {
        $this->build_from_array($data);
    }
}
