<?php

namespace App\Modules\Article\Entities\ActiveRecords;

use \Date;
use App\Modules\Abstracts\ActiveRecordAbstract;

class PublicationAR extends ActiveRecordAbstract
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
     * @var string
     */
    public $name_ar;

    /**
     * @var string
     */
    public $name_formatted;

    /**
     * @var string|null
     */
    public $country;

    /**
     * @var int
     */
    public $circulation;

    /**
     * @var string
     */
    public $language;

    /**
     * @var string|null
     */
    public $logo;

    /**
     * @var float|null (decimal) :(
     */
    public $adrate;

    /**
     * @var float
     */
    public $column_width;

    /**
     * @var int
     */
    public $frequency_id;

    /**
     * @var int
     */
    public $type_id;

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
     * @var int|null [0, 1, 2, 3, 4, 5, 6]
     */
    public $issue_day;

    /**
     * @var int|null
     */
    public $distribution;

    /**
     * @var int|null
     */
    public $genre_id;

    /**
     * @var string
     */
    public $telephone;

    /**
     * @var string|null
     */
    public $url;

    /**
     * @var string
     */
    public $email;

    /**
     * @var bool
     */
    public $skip_ocr;

    /**
     * @var bool
     */
    public $is_deleted;

    /**
     * @var int
     */
    public $active;

    /**
     * @var string|null
     */
    public $download_instruction;

    /**
     * @var string|null
     */
    public $repetition_values;

    /**
     * @var string|null
     */
    public $language_iso;

    /**
     * @var string
     */
    public $publisher;

    /**
     * @var string
     */
    public $distributer;

    public function __construct(array $data = [])
    {
        $this->build_from_array($data);
    }
}
