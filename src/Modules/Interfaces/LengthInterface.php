<?php

namespace App\Modules\Interfaces;

interface LengthInterface
{

    /**
     * @return LengthInterface
     */
    public function build_length();

    /**
     * @return float
     */
    public function get_length();

    /**
     * @param float $length
     * @return LengthInterface
     */
    public function set_length($length);
}
