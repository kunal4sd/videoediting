<?php

namespace App\Modules\Interfaces;

use App\Modules\Parameters\PlaylistParameter;

interface FileDetailsInterface
{

    /**
     * @return PlaylistParameter
     */
    public function get_file_details();

    /**
     * @param PlaylistParameter $file_details
     * @return FileDetailsInterface
     */
    public function set_file_details(PlaylistParameter $file_details);
}
