<?php

namespace App\Modules\Video\Entities;

use App\Modules\Abstracts\ModuleAbstract;
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
            $poster_path = $playlist_ar->build_poster_path($hash);
            $playlist_ar->build_poster($poster_path);

            $result[] = [
                'url' => $playlist_ar->path_to_url($playlist_ar->name),
                'start_date' => date("Y-m-d H:i:s", $start_datetime),
                'end_date' => date("Y-m-d H:i:s", $end_datetime),
                'start_day' => date("l, M jS", $start_datetime),
                'start_hour' => date("H:i:s", $start_datetime),
                'end_day' => date("l, M jS", $end_datetime),
                'end_hour' => date("H:i:s", $end_datetime),
                'poster' => $playlist_ar->path_to_url($poster_path)
            ];
        }

        return $result;
    }

    /**
     * @throws Exception : if no videos are found
     * @return PlaylistMasterAR
     */
    public function get_playlist_master($id, $start_date, $end_date, $batch_size, $force)
    {

        $playlist_master_ar = (new PlaylistMasterDisk($this->container))
            ->create_master_playlist(
                $id,
                $start_date,
                $end_date,
                $batch_size,
                $force
            );

        if (empty($playlist_master_ar->name)) {
            throw new Exception(
                sprintf(
                    "No videos found on disk for publication id %s, during period %s - %s",
                    $id,
                    $start_date,
                    $end_date
                ),
                400
            );
        }

        return $playlist_master_ar;
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
                400
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
            throw new Exception(sprintf("No playlist found on disk with hash %s", $hash), 400);
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
            throw new Exception(sprintf("No playlist found on disk with files %s", print_r($files, true)), 400);
        }

        return $playlist_ar;
    }

}
