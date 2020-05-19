<?php

namespace App\Modules\Video\Entities\ActiveRecords;

use App\Modules\Abstracts\AbstractActiveRecord;

class RawVideoAR extends AbstractActiveRecord
{

    /**
     * @var int
     */
    public $id;

    /**
     * @var int
     */
    public $publication_id;

    /**
     * @var string
     */
    public $broadcast_time;

    /**
     * @var float
     */
    public $duration;

    /**
     * @var string|null
     */
    public $path;

    public function __construct(array $data = [], $dir)
    {
        if (isset($data['path'])) {
            $data['path'] = str_replace(STORAGE_PATH, $dir, $data['path']);
        }
        $this->build_from_array($data);
    }
}
