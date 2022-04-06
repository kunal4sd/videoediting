<?php

namespace App\Modules\Publication\Entities\ActiveRecords;

use App\Modules\Abstracts\AbstractActiveRecord;

class CountryAR extends AbstractActiveRecord
{

    /**
     * @var string
     */
    public $iso;

    /**
     * @var string
     */
    public $name;

    /**
     * @var string
     */
    public $name_en;

    /**
     * @var string|null
     */
    public $name_ar;

    /**
     * @var string|null
     */
    public $iso3;

    /**
     * @var int|null
     */
    public $keycode;

    /**
     * @var int
     */
    public $is_preferred;

    /**
     * @var int
     */
    public $id;

    public function __construct(array $data = [])
    {
        $this->build_from_array($data);
    }
}
