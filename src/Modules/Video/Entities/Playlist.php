<?php

namespace App\Modules\Video\Entities;

use App\Libs\Enums\Videos;
use App\Modules\Abstracts\AbstractFile;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Files\PlaylistMasterFile;
use App\Modules\Video\Entities\Repository\Disk\PlaylistDisk;
use App\Modules\Video\Entities\Repository\Disk\PlaylistMasterDisk;
use \Exception;
use Slim\Http\Request;

class Playlist extends AbstractModule
{

    /**
     * @throws Exception
     * @return string[]
     */
    public function get_playlists_for_output(Request $request)
    {

        $result = [];
        $playlists_file = $this->get_playlists(
            $request->getParam('publication'),
            $request->getParam('start_date'),
            $request->getParam('end_date'),
            $request->getParam('batch'),
            $request->getParam('use_cached') ? false : true
        );

        foreach($playlists_file as $playlist_file) {
            $start_datetime = strtotime($playlist_file->get_first_file()->build_start_datetime());
            $end_datetime = strtotime($playlist_file->get_last_file()->build_end_datetime());

            $result[] = [
                'url' => $playlist_file->get_url(),
                'start_date' => date("Y-m-d H:i:s", $start_datetime),
                'end_date' => date("Y-m-d H:i:s", $end_datetime),
                'start_day' => date("l, Y-m-d", $start_datetime),
                'start_hour' => date("H:i:s", $start_datetime),
                'end_day' => date("l, Y-m-d", $end_datetime),
                'end_hour' => date("H:i:s", $end_datetime),
                'poster' => $playlist_file->get_poster()->get_url()
            ];
        }

        return $result;
    }

    /**
     * @return PlaylistMasterFile
     */
    public function get_playlist_master($id, $start_date, $end_date, $batch_size)
    {
        return (new PlaylistMasterDisk($this->container))
            ->get_master_playlist(
                $id,
                $start_date,
                $end_date,
                $batch_size
            );
    }

    /**
     * @return PlaylistFile[]
     */
    public function get_playlists($id, $start_date, $end_date, $batch_size, $force)
    {
        $playlist_master_file = (new PlaylistMasterDisk($this->container))
            ->create_master_playlist(
                $id,
                $start_date,
                $end_date,
                $batch_size,
                $force
            );

        return $playlist_master_file->get_files();
    }

    /**
     * @param string $hash
     * @throws Exception
     * @return PlaylistFile
     */
    public function get_playlist_with_hash($hash)
    {
        $playlist_file = (new PlaylistDisk($this->container))->get_playlist_with_hash($hash);
        return $playlist_file;
    }

    /**
     * @param string[] $files
     * @throws Exception
     * @return PlaylistFile
     */
    public function get_playlist_with_files($files, $force = false)
    {
        $playlist_file = (new PlaylistDisk($this->container))->create_playlist($files, $force);
        return $playlist_file;
    }

    /**
     * @param AbstractFile $file
     */
    public function delete_file_by_path(AbstractFile $file)
    {
        if (!($path = $file->get_path())) return $this;

        $deletable_file_types = [
            Videos::PLAYLIST_FORMAT,
            Videos::POSTER_FORMAT,
            Videos::MOVIE_FORMAT
        ];
        list($hash, $file_type) = get_file_details_from_path($path);
        if ($hash && in_array($file_type, $deletable_file_types) && file_exists($path)) unlink($path);

        return $this;
    }
}
