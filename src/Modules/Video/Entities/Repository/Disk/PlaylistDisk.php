<?php

namespace App\Modules\Video\Entities\Repository\Disk;

use App\Libs\Enums\Videos;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Video\Entities\ActiveRecords\PlaylistAR;

class PlaylistDisk extends ModuleAbstract
{

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
    public function get_playlist_with_files($files)
    {
        return $this->get_playlist_with_hash(build_hash($files));
    }

    /**
     * @param int $id
     * @param string $start_date
     * @param string $end_date
     * @param int $batch_size
     * @return PlaylistAR[]
     */
    public function create_playlist($files, $force)
    {

        if (!$force) {

            $playlist_ar = $this->get_playlist_with_files($files);
            if (!is_null($playlist_ar->name)) {
                return $playlist_ar;
            }
        }

        $playlist_ar = new PlaylistAR($this->container);

        foreach($files as &$file) {
            $file = preg_replace('/[^[:print:]]/', '', $file);
            $file = preg_replace(
                '/\/storage\/recordings/',
                sprintf(
                    '%s://%s/videos',
                    SCHEME,
                    HOST
                ),
                $file
            );
        }

        $file_path = $playlist_ar->build_playlist_path(build_hash($files));

        return $playlist_ar
            ->build_from_array(['name' => $file_path, 'files' => $files])
            ->save($file_path);
    }

}
