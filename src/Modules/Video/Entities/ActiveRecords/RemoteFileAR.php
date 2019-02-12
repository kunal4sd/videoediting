<?php

namespace App\Modules\Video\Entities\ActiveRecords;

use App\Modules\Abstracts\AbstractActiveRecord;

class RemoteFileAR extends AbstractActiveRecord
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

    public function __construct(array $data = [])
    {
        $this->build_from_array($data);
    }
}
