<?php

namespace App\Modules\Interfaces;

use App\Modules\Parameters\PlaylistParameter;

interface DiscontinuityInterface
{

    /**
     * @return PlaylistParameter
     */
    public function get_discontinuity();

    /**
     * @param PlaylistParameter $discontinuity
     * @return DiscontinuityInterface
     */
    public function set_discontinuity(PlaylistParameter $discontinuity);
}
