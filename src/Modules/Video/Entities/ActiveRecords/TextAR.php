<?php

namespace App\Modules\Video\Entities\ActiveRecords;

use App\Modules\Abstracts\AbstractActiveRecord;

class TextAR extends AbstractActiveRecord
{

    /**
     * @var int
     */
    public $id;

    /**
     * @var int
     */
    public $pub_id;

    /**
     * @var int
     */
    public $segment_id;

    /**
     * @var string
     */
    public $country;

    /**
     * @var string
     */
    public $date;

    /**
     * @var string
     */
    public $start_time;

    /**
     * @var string
     */
    public $end_time;

    /**
     * @var string
     */
    public $word;

    /**
     * @var float
     */
    public $conf;

    /**
     * @var string
     */
    public $created;


    public function __construct(array $data = [])
    {
        $this->build_from_array($data);
    }
}
