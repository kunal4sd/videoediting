<?php

namespace App\Modules\Article\Entities\ActiveRecords;

use App\Modules\Abstracts\AbstractActiveRecord;

class PublicationDetailsAR extends AbstractActiveRecord
{

    /**
     * @var int
     */
    public $publication_id;

    /**
     * @var string|null
     */
    public $frequency;

    /**
     * @var string|null
     */
    public $polarity;

    /**
     * @var string|null
     */
    public $stream_link;

    /**
     * @var string|null
     */
    public $frequency_modulation;

    /**
     * @var string|null
     */
    public $radio_stream_link_online;

    /**
     * @var string|null
     */
    public $radio_frequency_modulation;

    /**
     * @var string|null
     */
    public $radio_frequency;

    /**
     * @var string|null
     */
    public $note;

    /**
     * @var string|null
     */
    public $recording247;

    public function __construct(array $data = [])
    {
        $this->build_from_array($data);
    }
}
