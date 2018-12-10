<?php

namespace App\Modules\Article\Entities\ActiveRecords;

use App\Modules\Abstracts\ActiveRecordAbstract;

class ArticleOneAR extends ActiveRecordAbstract
{

    /**
     * @var int
     */
    public $id;

    /**
     * @var int|null
     */
    public $publication_id;

    /**
     * @var string|null
     */
    public $issue_date;

    /**
     * @var int|null
     */
    public $section_id;

    /**
     * @var string
     */
    public $headline;

    /**
     * @var string|null
     */
    public $headline_translated;

    /**
     * @var string|null
     */
    public $author;

    /**
     * @var string|null
     */
    public $url;

    /**
     * @var int
     */
    public $images_number;

    /**
     * @var bool
     */
    public $published;

    /**
     * @var int
     */
    public $type_id;

    /**
     * @var int
     */
    public $tonality;

    /**
     * @var string
     */
    public $modified;

    /**
     * @var string
     */
    public $translation_date;

    /**
     * @var string
     */
    public $created;

    /**
     * @var int|null
     */
    public $created_by;

    /**
     * @var string|null
     */
    public $page_name;

    /**
     * @var float
     */
    public $ave;

    /**
     * @var bool
     */
    public $reject;

    /**
     * @var float|null
     */
    public $size;

    /**
     * @var float|null
     */
    public $total_l;

    /**
     * @var float|null
     */
    public $total_w;

    /**
     * @var string|null
     */
    public $text;

    /**
     * @var string|null
     */
    public $text_translated;

    /**
     * @var string|null
     */
    public $summary;

    /**
     * @var bool
     */
    public $to_check;

    /**
     * @var bool
     */
    public $to_analyze;

    /**
     * @var int
     */
    public $duration;

    /**
     * @var string|null
     */
    public $broadcast_time;

    /**
     * @var int
     */
    public $issue_number;

    /**
     * @var int
     */
    public $volume_number;

    /**
     * @var string
     */
    public $file_path;

    public function __construct(array $data = [])
    {
        $this->build_from_array($data);
    }
}
