<?php

namespace App\Modules\Video\Entities\ActiveRecords;

use App\Modules\Abstracts\ActiveRecordAbstract;

class RemoteFileAR extends ActiveRecordAbstract
{

    /**
     * @var int
     */
    public $id;

    /**
     * @var string|null
     */
    public $path;

    /**
     * @var int|null
     */
    public $status;

    /**
     * @var int
     */
    public $type;

    /**
     * @var string
     */
    public $created;
}
