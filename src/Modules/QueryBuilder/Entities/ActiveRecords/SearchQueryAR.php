<?php

namespace App\Modules\QueryBuilder\Entities\ActiveRecords;

use App\Modules\Abstracts\AbstractActiveRecord;

class SearchQueryAR extends AbstractActiveRecord
{

    /**
     * @var int
     */
    public $id;

    /**
     * @var string
     */
    public $title;

    /**
     * @var string
     */
    public $query;

    /**
     * @var array
     */
    public $user_ids = [];

    /**
     * @var array
     */
    public $keyword_ids = [];

    /**
     * @var string
     */
    public $created;

    /**
     * @var string
     */
    public $modified;


    public function __construct(array $data = [])
    {
        $this->build_from_array($data);
    }
}
