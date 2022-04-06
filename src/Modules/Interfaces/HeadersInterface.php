<?php

namespace App\Modules\Interfaces;

use App\Modules\Parameters\PlaylistParameter;

interface HeadersInterface
{

    /**
     * @return PlaylistParameter[]
     */
    public function get_headers();

    /**
     * @param PlaylistParameter[] $headers
     * @return HeadersInterface
     */
    public function set_headers(array $headers);

    /**
     * @param PlaylistParameter $header
     * @return HeadersInterface
     */
    public function add_header(PlaylistParameter $header);
}
