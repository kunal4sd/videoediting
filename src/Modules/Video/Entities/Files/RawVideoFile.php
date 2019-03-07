<?php

namespace App\Modules\Video\Entities\Files;

use App\Libs\Enums\Files;
use App\Libs\Enums\Videos;
use App\Modules\Abstracts\AbstractFile;
use App\Modules\Interfaces\LengthInterface;
use Pimple\Container;

class RawVideoFile extends AbstractFile implements LengthInterface
{

    /**
     * @var float
     */
    private $length;

    public function __construct()
    {
        $this->set_type(Files::RAW_VIDEO);
    }

    public function build_length()
    {
        $path = $this->get_path();
        if (strlen($path) && file_exists($path)) {

            $this->length = round(
                shell_exec(
                    sprintf(
                        "%s/duration %s",
                        BIN_PATH,
                        $this->get_path()
                    )
                ),
                4,
                PHP_ROUND_HALF_UP
            );
        }

        return $this;
    }

    public function get_length()
    {
        return $this->length;
    }

    public function set_length($length)
    {
        $this->length = round((float) $length, 4, PHP_ROUND_HALF_UP);
        return $this;
    }

    public function build_broadcast_time()
    {
        $result = '00:00:00';
        if ($this->get_path()) {
            $details = explode('-', basename($this->get_path(), '.'.Videos::RAW_VIDEO_FORMAT));
            if (isset($details[1])) {
                $result = $details[1];
            }
        }

        return $result;
    }

    public function build_issue_date()
    {
        $result = '0000-00-00';
        if ($this->get_path()) {
            $details = explode('.', basename($this->get_path(),  '.'.Videos::RAW_VIDEO_FORMAT));
            if (isset($details[1])) {
                $datetime = str_replace(array('-','_') , array(' ','-'), $details[1]);
                $datetime_details = explode(' ', $datetime);
                $result = array_shift($datetime_details);
            }
        }

        return $result;
    }

    public function build_start_datetime()
    {
        $result = '0000-00-00 00:00:00';
        if ($this->get_path()) {
            preg_match(
                '/.+(\d{4})_(\d{2})_(\d{2})\-(\d{2}):(\d{2}):(\d{2})\.ts/Uis',
                $this->get_path(),
                $matches
            );
            array_shift($matches);

            $result = sprintf(
                '%s-%s-%s %s:%s:%s',
                array_shift($matches),
                array_shift($matches),
                array_shift($matches),
                array_shift($matches),
                array_shift($matches),
                array_shift($matches)
            );
        }

        return $result;
    }

    public function build_end_datetime()
    {
        $result = '0000-00-00 00:00:00';
        if ($this->get_path()) {

            preg_match(
                '/.+(\d{4})_(\d{2})_(\d{2})\-(\d{2}):(\d{2}):(\d{2})\.ts/Uis',
                $this->get_path(),
                $matches
            );
            array_shift($matches);

            $length = $this->get_length();
            if (is_null($length)) {
                $length = $this->build_length()->get_length();
            }
            $time_unix = strtotime(
                sprintf(
                    '%s-%s-%s %s:%s:%s',
                    array_shift($matches),
                    array_shift($matches),
                    array_shift($matches),
                    array_shift($matches),
                    array_shift($matches),
                    array_shift($matches)
                )
            ) + $length;

            $result = date("Y-m-d H:i:s", $time_unix);
        }

        return $result;
    }

    public function build_publication_id()
    {
        $publication_id = false;
        if ($this->get_url()) {
            $file_details = explode("videos/", $this->get_url());
            if (count($file_details) === 2) {
                $path_details = explode('/', array_pop($file_details));
                $publication_id = array_shift($path_details);
            }
        }

        return $publication_id;
    }
}
