<?php

namespace App\Modules\Video\Entities\Files;

use App\Libs\Enums\Files;
use App\Libs\Enums\Videos;
use App\Modules\Abstracts\AbstractFile;
use App\Modules\Interfaces\LengthInterface;
use App\Modules\Interfaces\DiscontinuityBoolInterface;
use App\Modules\Interfaces\PerfectCutInterface;

class RawVideoFile extends AbstractFile implements LengthInterface, DiscontinuityBoolInterface, PerfectCutInterface
{

    /**
     * @var float
     */
    private $length;

    /**
     * @var string
     */
    private $discontinuity;

    /**
     * @var bool
     */
    private $is_radio;

    public function __construct(bool $is_radio = false)
    {
        $this->set_is_radio($is_radio);
        $this->set_type(Files::RAW_VIDEO);
    }

    public function build_length()
    {
        $path = $this->get_path();
        if (strlen($path) && file_exists($path)) {
            $output = get_video_files_duration([$path], $this->is_radio);
            $this->set_length($output[$path]);
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

    public function set_name($location)
    {
        $this->name = basename($location, '.'.Videos::RAW_VIDEO_FORMAT);
        return $this;
    }

    public function get_discontinuity()
    {
        return $this->discontinuity;
    }

    public function set_discontinuity($discontinuity)
    {
        $this->discontinuity = (bool) $discontinuity;
        return $this;
    }

    public function get_is_radio()
    {
        return $this->is_radio;
    }

    public function set_is_radio(bool $is_radio)
    {
        $this->is_radio = $is_radio;
        return $this;
    }

    public function is_perfect_cut()
    {
        return strpos($this->get_path(), Videos::CUT_VIDEO_PATH) !== false;
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
            $matches = $this->parseFilename();
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

    private function parseFilename(string $inPattern = '', bool $last = false)
    {
        $pattern = empty($inPattern) ? '/.+(\d{4})_(\d{2})_(\d{2})\-(\d{2}):(\d{2}):(\d{2})/Uis' : $inPattern;

        preg_match(
            $pattern,
            $this->get_path(),
            $matches
        );

        if (!$matches && !$last) {
            $pattern = '/.+(\d{4})_(\d{2})_(\d{2})\-(\d{2})_(\d{2})_(\d{2})/Uis';
            $matches = $this->parseFilename($pattern, true);
        }

        return $matches;
    }

    public function build_end_datetime()
    {
        $result = '0000-00-00 00:00:00';
        if ($this->get_path()) {
            $matches = $this->parseFilename();
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
        if ($this->get_path()) {
            $file_details = explode(".", basename($this->get_path(), '.'.Videos::RAW_VIDEO_FORMAT));
            $publication_id = array_shift($file_details);
        }

        return $publication_id;
    }

    public function build_perfect_cut($from_cut, $to_cut)
    {

        if ($from_cut === false && $to_cut === false) return $this;

        $name = $this->set_name($this->get_path())->get_name();
        if ($from_cut !== false) {

            if ($this->get_length() - $from_cut < 0.5) {
                $from_cut = max(0, $from_cut - 1);
            }
            $name .= '-f';
        }
        if ($to_cut !== false) {
            $name .= '-t';
        }

        $file_path = sprintf(
            '%s/%s/%s.%s', PUBLIC_PATH, Videos::CUT_VIDEO_PATH, $name, Videos::RAW_VIDEO_FORMAT
        );
        $path = dirname($file_path);

        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        $this->cut_content($file_path, $from_cut, $to_cut);
        $this->set_locations($file_path);
        $this->set_length($to_cut ?: $this->get_length() - $from_cut ?: 0);

        return $this;
    }

    private function cut_content($output_path, $from, $to)
    {
        $cmd = sprintf(
            "ffmpeg -hide_banner -loglevel panic -y -i %s %s %s -c copy %s",
            $this->get_path(),
            $from !== false ? '-ss ' . round(floor($from), 2) : '',
            $to !== false ? '-to ' . round((floor($to) + 0.99), 2) : '',
            $output_path
        );
        shell_exec($cmd);
    }
}