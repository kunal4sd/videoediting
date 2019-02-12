<?php

namespace App\Modules\Interfaces;

interface SizeInterface
{

    /**
     * @return SizeInterface
     */
    public function build_size();

    /**
     * @return string
     */
    public function get_size();

    /**
     * @param string $size
     * @return SizeInterface
     */
    public function set_size($size);
}
