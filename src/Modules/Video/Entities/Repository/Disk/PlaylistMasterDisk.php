<?php

namespace App\Modules\Video\Entities\Repository\Disk;

use App\Libs\Enums\Videos;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Files\RawVideoFile;
use App\Modules\Video\Entities\Files\PlaylistMasterFile;

class PlaylistMasterDisk extends AbstractModule
{

    /**
     * @param int $id
     * @param string $start_date
     * @param string $end_date
     * @param int $batch_size
     * @return PlaylistMasterFile
     */
    public function create_master_playlist($id, $start_date, $end_date, $batch_size, $force = false)
    {

        $force = $force === true || $force === 'true';
        if (!$force) {
            $playlist_master_file = $this->get_master_playlist(
                $id,
                $start_date,
                $end_date,
                $batch_size
            );
            if (!empty($playlist_master_file->get_files())) return $playlist_master_file;
        }

        $playlist_master_file = new PlaylistMasterFile($this->container);
        $start_date_unix = strtotime($start_date);
        $end_date_unix = strtotime($end_date);
        $scan_start_date = date("Y-m-d H:i:s", $start_date_unix - Videos::STANDARD_SCANNING_PERIOD);
        $scan_end_date = date("Y-m-d H:i:s", $end_date_unix + Videos::STANDARD_SCANNING_PERIOD);

        $raw_videos_ar = $this->container->entity_raw_video->get_for_interval_by_publication(
            $scan_start_date, $scan_end_date, $id, false
        );

        if (empty($raw_videos_ar)) return $playlist_master_file;

        // select for elimination all video files outside the interval
        $idx_to_eliminate = [];

        // select videos on the left (out)side of the interval
        foreach ($raw_videos_ar as $idx => $raw_file_ar) {
            if (strtotime($raw_file_ar->broadcast_time) < $start_date_unix) {
                $idx_to_eliminate[$idx] = null;
            }
            else {
                unset($idx_to_eliminate[$idx - 1]);
                break;
            }
        }

        // select videos on the right (out)side of the interval
        $min_idx = isset($idx) ? $idx : 0;
        $length = count($raw_videos_ar);
        for ($idx = $length - 1; $idx > $min_idx; $idx--) {
            $raw_file_ar = $raw_videos_ar[$idx];
            if (strtotime($raw_file_ar->broadcast_time) > $end_date_unix) {
                $idx_to_eliminate[$idx] = null;
            }
            else break;
        }

        // filter out the videos outside the selected interval
        $raw_videos_ar = array_filter($idx_to_eliminate + $raw_videos_ar);

        $files = [];
        foreach($raw_videos_ar as $raw_file_ar) {
            $file = (new RawVideoFile())
                ->set_locations($raw_file_ar->path)
                ->set_name($raw_file_ar->path)
                ->set_length($raw_file_ar->duration)
                ->set_discontinuity(true);
            $files[] = $file;
        }
        $files = array_filter($files);

        $files_copy = $files;
        $playlist_disk = new PlaylistDisk($this->container);
        $playlists = [];
        foreach($this->get_segment_count($files_copy, $batch_size) as $segment_count) {

            $chunks = array_splice($files, 0, $segment_count);
            $playlist_file = $playlist_disk->create_playlist($chunks, $force);

            if (!is_null($playlist_file->get_hash())) {
                $playlists[] = $playlist_file;
            }
        }

        if (!empty($playlists)) {
            $playlist_master_file
                ->set_files($playlists)
                ->build_hash($id, $start_date, $end_date, $batch_size);
            $playlist_master_file
                ->set_locations($playlist_master_file->build_playlist_path())
                ->save();
        }

        return $playlist_master_file;
    }

    private function get_segment_count(array $files, $batch_size)
    {

        $current_batch_size = 0;
        $segment_count = 0;
        while($file = array_shift($files)) {

            $segment_count++;
            $current_batch_size += $file->get_length();

            if ($batch_size <= $current_batch_size) {
                yield $segment_count;
                $current_batch_size = 0;
                $segment_count = 0;
            }
        }

        if ($segment_count) yield $segment_count;
    }

    /**
     * @param int $id
     * @param string $start_date
     * @param string $end_date
     * @param int $batch_size
     * @return PlaylistMasterFile
     */
    public function get_master_playlist($id, $start_date, $end_date, $batch_size)
    {
        $master_playlist_file = (new PlaylistMasterFile($this->container))
            ->build_hash($id, $start_date, $end_date, $batch_size);
        return $master_playlist_file->build_from_file();
    }
}
