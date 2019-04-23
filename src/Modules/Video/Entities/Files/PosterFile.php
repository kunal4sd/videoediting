<?php

namespace App\Modules\Video\Entities\Files;

use App\Libs\Enums\Files;
use App\Modules\Abstracts\AbstractFile;
use App\Modules\Interfaces\SaveInterface;
use App\Modules\Interfaces\SourceInterface;
use Pimple\Container;
use \Exception;

class PosterFile extends AbstractFile implements SourceInterface, SaveInterface
{

    /**
     * @var string
     */
    private $source;

    public function __construct()
    {
        $this->set_type(Files::IMAGE);
    }

    public function get_source()
    {
        return $this->source;
    }

    public function set_source($source)
    {
        $this->source = $source;
        return $this;
    }

    public function save()
    {
        if (!file_exists($this->get_path())) {

            $dirname = dirname($this->get_path());
            if (!is_dir($dirname)) {
                if (!mkdir($dirname, 0777, true)) {
                    throw new Exception(
                        sprintf('Could not create the poster path %s', $this->get_path()),
                        500
                    );
                }
            }

            if (!is_writable($dirname)) {
                throw new Exception(
                    sprintf('Poster path %s is not writable', $this->get_path()),
                    500
                );
            }

            $cmd = sprintf(
                'ffmpeg -i "%s" -ss 0.00 -vf scale=400:300:force_original_aspect_ratio=increase -vframes 1 -y "%s" 2>&1',
                $this->get_source(),
                $this->get_path()
            );
            shell_exec($cmd);

            if (file_exists($this->get_path())) {
                chmod( $this->get_path(), 0777 );
            }
            else {
                $this->set_locations();
            }
        }

        return $this;
    }
}
