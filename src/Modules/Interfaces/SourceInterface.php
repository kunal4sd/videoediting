<?php

namespace App\Modules\Interfaces;

interface SourceInterface
{

    /**
     * @return SourceInterface
     */
    public function get_source();

    /**
     * @param string $source
     * @return SourceInterface
     */
    public function set_source($source);
}
