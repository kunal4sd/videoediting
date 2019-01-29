<?php

namespace App\Modules\User\Entities\ActiveRecords;

use App\Modules\Abstracts\ActiveRecordAbstract;

class UserActivityAR extends ActiveRecordAbstract
{

    /**
     * @var int
     */
    public $id;

    /**
     * @var int
     */
    public $user_id;

    /**
     * @var int
     */
    public $publication_id;

    /**
     * @var int
     */
    public $article_id;

    /**
     * @var string
     */
    public $issue_date;

    /**
     * @var int
     */
    public $activity_id;

    /**
     * @var string
     */
    public $created;

    /**
     * @var int
     */
    public $section_id;

    /**
     * @var string|null
     */
    public $description;

    public function __construct(array $data = [])
    {
        $this->build_from_array($data);
    }
}
