<?php

namespace App\Modules\Video\Entities\Repository\Disk;

use App\Libs\Enums\Videos;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Files\RawVideoFile;
use App\Modules\Video\Entities\Files\PlaylistMasterFile;
use \Datetime;

class PlaylistMasterDisk extends AbstractModule
{

    /**
     * @param int $id
     * @param string $start_date
     * @param string $end_date
     * @param int $batch_size
     * @param string $method
     * @return PlaylistMasterFile
     */
    public function create_master_playlist(
        $id,
        $start_date,
        $end_date,
        $batch_size,
        $method = 'cached'
    ): PlaylistMasterFile
    {
        switch($method) {
            case 'stream':
                return $this->create_master_playlist_stream(
                    $id, $start_date, $end_date, $batch_size
                );
                break;
            default:
                return $this->create_master_playlist_cached(
                    $id, $start_date, $end_date, $batch_size
                );
        }
    }

    /**
     * @param int $id
     * @param string $start_date
     * @param string $end_date
     * @param int $batch_size
     * @return PlaylistMasterFile
     */
    private function create_master_playlist_stream(
        $id,
        $start_date,
        $end_date,
        $batch_size
    ): PlaylistMasterFile
    {

        $playlist_master_file = new PlaylistMasterFile($this->container);
        $start_date_unix = strtotime($start_date);
        $end_date_unix = strtotime($end_date);
        $scan_start_date = date("Y-m-d H:i:s", $start_date_unix - Videos::STANDARD_SCANNING_PERIOD);
        $scan_end_date = date("Y-m-d H:i:s", $end_date_unix + Videos::STANDARD_SCANNING_PERIOD);
        $files = [];
        foreach($this->get_stream_playlist_paths($id, $scan_start_date, $scan_end_date) as $stream_path) {
            if (file_exists($stream_path)) {

                $handle = fopen($stream_path, "r");
                if ($handle) {

                    $duration = 0.0;
                    $date_obj = false;
                    $date_timestamp = 0;
                    $base_path = false;
                    while (($line = fgets($handle)) !== false) {
                        $line = trim($line);
                        if (strpos($line, '#EXTINF:') === 0) {
                            $duration = str_replace(['#EXTINF:', ','], '', $line);
                        }
                        elseif (strpos($line, '#') !== 0 && $duration > 0.0) {
                            $filename = basename($line);
                            if ($date_obj === false)
                            {
                                $details = get_file_details_from_path($filename);
                                $date_obj = Datetime::createFromFormat('Y_m_d-H:i:s', $details[1]);
                                $sub_path = $date_obj->format('Y/m/d');
                                $date_timestamp = $date_obj->getTimestamp();
                                $base_path = get_raw_video_path($id, $date_timestamp);
                            }

                            $raw_video_file = (new RawVideoFile())
                                ->set_locations(
                                    sprintf(
                                        '%s/%s/%s/%s',
                                        $base_path,
                                        $id,
                                        $sub_path,
                                        $filename
                                    )
                                )
                                ->set_name($filename)
                                ->set_length($duration)
                                ->set_discontinuity(true);

                            $start_datetime = $raw_video_file->build_start_datetime();
                            $end_datetime = $raw_video_file->build_end_datetime();
                            if (strtotime($end_datetime) >= $start_date_unix) {
                                if (strtotime($start_datetime) <= $end_date_unix) {
                                    $previous_file = array_pop($files);
                                    if (
                                        $previous_file
                                        && $previous_file->get_name() !== $raw_video_file->get_name()
                                    ) {
                                        $files[] = $previous_file;
                                    }
                                    $files[] = $raw_video_file;

                                } else {
                                     break;
                                }
                            }
                            $duration = 0.0;
                        }
                    }
                    fclose($handle);
                }
            }
        }

        $files_copy = $files;
        $playlist_disk = new PlaylistDisk($this->container);
        $playlists = [];
        foreach($this->get_segment_count($files_copy, $batch_size) as $segment_count) {

            $chunks = array_splice($files, 0, $segment_count);
            $playlist_file = $playlist_disk->create_playlist($chunks, true);

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

    public static function get_stream_playlist_paths($id, $start_date, $end_date)
    {
        foreach(get_dates_in_range($start_date, $end_date) as $current_date) {
            $timestamp = Datetime::createFromFormat('Y-m-d', $current_date)->getTimestamp();
            yield sprintf(
                '%s/%s/%s/%s.%s.m3u8',
                PUBLIC_PATH,
                get_raw_video_path($id, $timestamp),
                $id,
                $id,
                str_replace('-', '_', $current_date)
            );
        }
    }

    /**
     * @param int $id
     * @param string $start_date
     * @param string $end_date
     * @param int $batch_size
     * @return PlaylistMasterFile
     */
    private function create_master_playlist_cached(
        $id,
        $start_date,
        $end_date,
        $batch_size
    ): PlaylistMasterFile
    {
        $playlist_master_file = $this->get_master_playlist(
            $id,
            $start_date,
            $end_date,
            $batch_size
        );
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
