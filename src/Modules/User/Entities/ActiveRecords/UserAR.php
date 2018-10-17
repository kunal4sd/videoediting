<?php

namespace App\Modules\User\Entities\ActiveRecords;

use \Date;
use App\Modules\Abstracts\ActiveRecordsAbstract;

class UserAR extends ActiveRecordsAbstract
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
     * @var Date
     */
    public $start_date;

    /**
     * @var Date|null
     */
    public $expiry_date;

    /**
     * @var Date
     */
    public $created;

    /**
     * @var Date
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
