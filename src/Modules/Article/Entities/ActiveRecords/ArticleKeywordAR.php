<?php

namespace App\Modules\Article\Entities\ActiveRecords;

use App\Modules\Abstracts\AbstractActiveRecord;

class ArticleKeywordAR extends AbstractActiveRecord
{

    /**
     * @var int
     */
    public $id;

    /**
     * @var int
     */
    public $article_id;

    /**
     * @var int
     */
    public $keyword_id;

    /**
     * @var string|null
     */
    public $coordinates;

    /**
     * @var string
     */
    public $created;

    public function __construct(array $data = [])
    {
        $this->build_from_array($data);
    }
}
