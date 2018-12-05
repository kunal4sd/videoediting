<?php

namespace App\Modules\Article\Entities\ActiveRecords;

use \Date;
use App\Modules\Abstracts\ActiveRecordAbstract;

class KeywordAR extends ActiveRecordAbstract
{

    /**
     * @var int
     */
    public $id;

    /**
     * @var string
     */
    public $name_en;

    /**
     * @var string|null
     */
    public $name_ar;

    /**
     * @var int
     */
    public $created_by;

    /**
     * @var string
     */
    public $modified;

    /**
     * @var string
     */
    public $created;

    /**
     * @var string|null
     */
    public $description;

    /**
     * @var int|null
     */
    public $active;

    /**
     * @var string
     */
    public $display_name_en;

    /**
     * @var string
     */
    public $display_name_ar;

    public function __construct(array $data = [])
    {
        $this->build_from_array($data);
    }
}
