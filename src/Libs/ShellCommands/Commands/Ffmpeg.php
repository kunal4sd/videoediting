<?php

namespace App\Libs\ShellCommands\Commands;

use App\Libs\ShellCommands\Commands\Abstracts\CommandAbstract;
use App\Libs\ShellCommands\Commands\Abstracts\Pipeable;

class Ffmpeg extends CommandAbstract
{

    public function __construct()
    {
        $this->binary = 'ffmpeg';
    }

    public function with_input_url($url)
    {
        $this->options[] = sprintf(' -i "%s"', $url);
    }

    public function with_position($time)
    {
        $this->options[] = sprintf(' -ss %d', $time);
    }

    public function with_filter()
    {
        $this->options[] = ' -vf';
    }

    public function with_complex_filter($complex_filter)
    {
        $this->options[] = sprintf(' -filter_complex "%s"', $complex_filter);
    }

    public function with_filter_scale(
        $width,
        $height,
        $force_original_aspect_ration = true
    ) {
        $this->options[] = sprintf(
            'scale=%d:%d%s',
            $width,
            $height,
            $force_original_aspect_ration ? ':force_original_aspect_ratio=increase' : '',
            $strategy
        );
    }

    public function with_frames($frame_count)
    {
        $this->options[] = sprintf(' -frames:v %d', $frame_count);
    }

    public function with_overwrite()
    {
        $this->options[] = ' -y';
    }

    public function with_output_url($url)
    {
        $this->options[] = sprintf(' "%s"', $url);
    }

    public function with_show_errors()
    {
        $this->options[] = ' 2>&1';
    }

}