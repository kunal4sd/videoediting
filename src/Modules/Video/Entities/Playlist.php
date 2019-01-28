<?php

namespace App\Modules\Video\Entities;

use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Video\Entities\ActiveRecords\PlaylistMasterAR;
use App\Modules\Video\Entities\Repository\Disk\PlaylistDisk;
use App\Modules\Video\Entities\Repository\Disk\PlaylistMasterDisk;
use \Exception;
use Slim\Http\Request;

class Playlist extends ModuleAbstract
{

    /**
     * @throws Exception
     * @return string[]
     */
    public function get_playlists_for_output(Request $request)
    {

        $result = [];
        $playlists_ar = $this->get_playlists(
            $request->getParam('publication'),
            $request->getParam('start_date'),
            $request->getParam('end_date'),
            $request->getParam('batch'),
            $request->getParam('force')
        );

        foreach($playlists_ar as $playlist_ar) {

            $hash = build_hash($playlist_ar->files);
            $start_datetime = strtotime($playlist_ar->build_start_datetime());
            $end_datetime = strtotime($playlist_ar->build_end_datetime());

            $result[] = [
                'url' => $playlist_ar->path_to_url($playlist_ar->name),
                'start_date' => date("Y-m-d H:i:s", $start_datetime),
                'end_date' => date("Y-m-d H:i:s", $end_datetime),
                'start_day' => date("l, Y-m-d", $start_datetime),
                'start_hour' => date("H:i:s", $start_datetime),
                'end_day' => date("l, Y-m-d", $end_datetime),
                'end_hour' => date("H:i:s", $end_datetime),
                'poster' => $playlist_ar->get_poster_url()
            ];
        }

        return $result;
    }

    /**
     * @throws Exception : if no videos are found
     * @return PlaylistMasterAR
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
     * @throws Exception : if no videos are found
     * @return PlaylistAR[]
     */
    public function get_playlists($id, $start_date, $end_date, $batch_size, $force)
    {

        $playlist_master_ar = (new PlaylistMasterDisk($this->container))
            ->create_master_playlist(
                $id,
                $start_date,
                $end_date,
                $batch_size,
                $force
            );

        if (empty($playlist_master_ar->files)) {
            throw new Exception(
                sprintf(
                    "No videos found on disk for publication id %s, during period %s - %s",
                    $id,
                    $start_date,
                    $end_date
                ),
                200
            );
        }

        return $playlist_master_ar->files;
    }

    /**
     * @param string $hash
     * @throws Exception
     * @return PlaylistAR
     */
    public function get_playlist_with_hash($hash)
    {

        $playlist_ar = (new PlaylistDisk($this->container))->get_playlist_with_hash($hash);

        if (empty($playlist_ar->files)) {
            throw new Exception(sprintf("No playlist found on disk with hash %s", $hash), 200);
        }

        return $playlist_ar;
    }

    /**
     * @param string[] $files
     * @throws Exception
     * @return PlaylistAR
     */
    public function get_playlist_with_files($files, $force = false)
    {

        $playlist_ar = (new PlaylistDisk($this->container))->create_playlist($files, $force);

        if (empty($playlist_ar->files)) {
            throw new Exception(sprintf("No playlist found on disk with files %s", print_r($files, true)), 200);
        }

        return $playlist_ar;
    }

    public function delete_playlist_files(PlaylistMasterAR $playlist_master_ar)
    {
        foreach($playlist_master_ar->files as $playlist_ar) {
            if (file_exists($playlist_ar->name)) unlink($playlist_ar->name);
            $poster_path = $playlist_ar->get_poster_path(build_hash($playlist_ar->files));
            if (file_exists($poster_path)) unlink($poster_path);
        }
        if (file_exists($playlist_master_ar->name)) unlink($playlist_master_ar->name);
    }
}
