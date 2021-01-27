<?php

namespace App\Modules\Video\Entities\ActiveRecords;

use App\Modules\Abstracts\AbstractActiveRecord;

class SearchTextAR extends AbstractActiveRecord
{

    /**
     * @var int
     */
    public $pub_id;

    /**
     * @var string
     */
    public $pub_name;

    /**
     * @var string
     */
    public $date;

    /**
     * @var string
     */
    public $start_segment;

    /**
     * @var string
     */
    public $end_segment;

    /**
     * @var string
     */
    public $text;


    public function __construct(array $data = [])
    {
        $this->build_from_array($data);
    }
}
