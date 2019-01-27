<?php

namespace App\Modules\Video\Entities\Repository\Disk;

use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Video\Entities\ActiveRecords\PlaylistAR;

class PlaylistDisk extends ModuleAbstract
{

    /**
     * @param string[] $files
     * @param bool $force
     * @return PlaylistAR
     */
    public function create_playlist($files, $force)
    {
        $force = $force === true || $force === 'true';
        foreach($files as &$file) {
            $file = PlaylistAR::path_to_url($file);
        }

        if (!$force) {

            $playlist_ar = $this->get_playlist_with_files($files);
            if (!is_null($playlist_ar->name)) {
                return $playlist_ar;
            }
        }

        $playlist_ar = new PlaylistAR($this->container);
        return $playlist_ar
            ->build_from_array(['files' => $files])
            ->build_from_array(['name' => $playlist_ar->build_playlist_path()])
            ->save()
            ->build_poster();
    }

    /**
     * @param string $hash
     * @return PlaylistAR[]
     */
    public function get_playlist_with_hash($hash)
    {
        return ( new PlaylistAR($this->container) )->build_from_hash($hash);
    }

    /**
     * @param string[] $files
     * @return PlaylistAR[]
     */
    private function get_playlist_with_files($files)
    {
        return $this->get_playlist_with_hash(build_hash($files));
    }

}
