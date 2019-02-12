<?php

namespace App\Modules\Video\Entities\Repository\Disk;

use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Files\PlaylistFile;

class PlaylistDisk extends AbstractModule
{

    /**
     * @param string[] $files
     * @param bool $force
     * @return PlaylistFile
     */
    public function create_playlist($files, $force)
    {
        $force = $force === true || $force === 'true';

        if (!$force) {
            $playlist_file = $this->get_playlist_with_files($files);
            if (!empty($playlist_file->get_files())) {
                return $playlist_file;
            }
        }

        $playlist_file = (new PlaylistFile($this->container));
        return $playlist_file
                ->set_files($files)
                ->build_hash()
                ->set_locations($playlist_file->build_playlist_path())
                ->set_name($playlist_file->get_hash())
                ->build_poster()
                ->save();
    }

    /**
     * @param array $files
     * @return PlaylistFile[]
     */
    public function get_playlist_with_files($files)
    {
        $playlist_file = (new PlaylistFile($this->container, ['files' => $files]))->build_hash();
        return $this->get_playlist_with_hash($playlist_file->get_hash());
    }

    /**
     * @param string $hash
     * @return PlaylistFile[]
     */
    public function get_playlist_with_hash($hash)
    {
        return ( new PlaylistFile($this->container) )->build_from_hash($hash);
    }

}
