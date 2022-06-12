<?php

namespace App\Modules\Publication\Entities\ActiveRecords;

use App\Modules\Abstracts\AbstractActiveRecord;

class IssueAR extends AbstractActiveRecord
{

    /**
     * @var int
     */
    public $id;

    /**
     * @var string
     */
    public $date;

    /**
     * @var int
     */
    public $publication_id;

    /**
     * @var int
     */
    public $status;

    /**
     * @var int
     */
    public $pages_number;

    /**
     * @var int
     */
    public $issue_number;

    /**
     * @var int
     */
    public $volume_number;

    public function __construct(array $data = [])
    {
        $this->build_from_array($data);
    }
}