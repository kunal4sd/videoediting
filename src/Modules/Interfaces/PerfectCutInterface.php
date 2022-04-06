<?php

namespace App\Modules\Interfaces;

use App\Modules\Abstracts\AbstractFile;

interface PerfectCutInterface
{

    /**
     * @return bool
     */
    public function is_perfect_cut();

    /**
     * @param float $from_cut
     * @param float $to_cut
     * @return AbstractFile
     */
    public function build_perfect_cut($from_cut, $to_cut);
}
