<?php

namespace App\Modules\Interfaces;

interface HashInterface
{

    /**
     * @return HashInterface
     */
    public function build_hash(...$args);

    /**
     * @var string
     * @return HashInterface
     */
    public function set_hash($hash);

    /**
     * @return string
     */
    public function get_hash();
}
