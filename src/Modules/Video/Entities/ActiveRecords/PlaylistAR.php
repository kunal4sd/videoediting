<?php

namespace App\Modules\Video\Entities\ActiveRecords;

use App\Libs\Enums\Videos;
use App\Modules\Abstracts\PlaylistAbstract;
use Pimple\Container;

class PlaylistAR extends PlaylistAbstract
{

    /**
     * @var string
     */
    public $name;

    /**
     * @var string[]
     */
    public $header = [
        '#EXTM3U',
        '#EXT-X-VERSION:3',
        '#EXT-X-MEDIA-SEQUENCE:0',
        '#EXT-X-ALLOW-CACHE:NO',
        '#EXT-X-TARGETDURATION:' . ( Videos::RAW_VIDEO_LENGTH + 1 )
    ];

    /**
     * @var string
     */
    public $glue = '#EXTINF:' . Videos::RAW_VIDEO_LENGTH;

    /**
     * @var string[]
     */
    public $files = [];

    /**
     * @var string[]
     */
    public $footer = [
        '#EXT-X-ENDLIST'
    ];

    public function __construct(Container $container, array $data = [])
    {
        parent::__construct($container);
        $this->build_from_array($data);
    }
}
