<?php

namespace App\Modules\Video\Entities\ActiveRecords;

use App\Modules\Video\Entities\ActiveRecords\PlaylistAR;
use App\Modules\Abstracts\PlaylistAbstract;
use Pimple\Container;

class PlaylistMasterAR extends PlaylistAbstract
{

    /**
     * @var string
     */
    public $name;

    /**
     * @var string[]
     */
    public $header = [
        "#EXTM3U",
        "#EXT-X-VERSION:3"
    ];

    /**
     * @var string
     */
    public $glue = "#EXT-X-STREAM-INF:CODECS='avc1.4d401f,mp4a.40.2'";

    /**
     * @var PlaylistAR[]
     */
    public $files = [];

    /**
     * @var string[]
     */
    public $footer = [];

    public function __construct(Container $container, array $data = [])
    {
        parent::__construct($container);
        $this->build_from_array($data);
    }

    /**
     * @param string $file_path
     * @return PlaylistMasterAR
     */
    public function build_from_file($file_path)
    {
        parent::build_from_file($file_path);

        foreach($this->files as &$file) {
            $file_path = $this->url_to_path($file);
            $file = (new PlaylistAR($this->container))->build_from_file($file_path);
            if (is_null($file->name)) {
                $this->files = [];
                break;
            }
        }

        return $this;
    }
}
