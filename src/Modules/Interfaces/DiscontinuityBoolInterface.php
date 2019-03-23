<?php

namespace App\Modules\Interfaces;

interface DiscontinuityBoolInterface
{

    /**
     * @return bool
     */
    public function get_discontinuity();

    /**
     * @param bool $discontinuity
     * @return DiscontinuityBoolInterface
     */
    public function set_discontinuity($discontinuity);
}
