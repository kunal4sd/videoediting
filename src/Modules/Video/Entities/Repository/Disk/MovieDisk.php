<?php

namespace App\Modules\Video\Entities\Repository\Disk;

use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Video\Entities\ActiveRecords\PlaylistAR;

class MovieDisk extends ModuleAbstract
{

    /**
     * @param int $id
     * @return bool
     */
    public function delete_by_id($article_id)
    {
        $movie_path = PlaylistAR::build_movie_path($article_id);

        return unlink($movie_path);
    }
}
