<?php

namespace App\Modules\Interfaces;

use App\Modules\Abstracts\AbstractFile;

interface PosterInterface
{

    /**
     * @return AbstractFile
     */
    public function get_poster();

    /**
     * @param AbstractFile $poster
     * @return PosterInterface
     */
    public function set_poster(AbstractFile $poster);
}
