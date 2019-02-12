<?php

namespace App\Modules\Interfaces;

use App\Modules\Parameters\PlaylistParameter;

interface FooterInterface
{

    /**
     * @return PlaylistParameter
     */
    public function get_footer();

    /**
     * @param PlaylistParameter $footer
     * @return FooterInterface
     */
    public function set_footer(PlaylistParameter $footer);
}
