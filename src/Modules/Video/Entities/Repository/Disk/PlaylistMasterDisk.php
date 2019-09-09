<?php

namespace App\Modules\Video\Entities\Repository\Disk;

use App\Libs\Enums\Videos;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Files\RawVideoFile;
use App\Modules\Video\Entities\Files\PlaylistMasterFile;
use \Datetime;
use \DateTimeZone;
use \Exception;

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
            case 'database':
                return $this->create_master_playlist_db(
                    $id, $start_date, $end_date, $batch_size
                );
                break;
            case 'stream':
                return $this->create_master_playlist_stream(
                    $id, $start_date, $end_date, $batch_size
                );
                break;
            case 'raw':
                return $this->create_master_playlist_raw(
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
    private function create_master_playlist_db(
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

        $raw_videos_ar = $this->container->entity_raw_video->get_for_interval_by_publication(
            $scan_start_date, $scan_end_date, $id, false
        );

        if (empty($raw_videos_ar)) return $playlist_master_file;

        // select for elimination all video files outside the interval
        $idx_to_eliminate = [];

        // select videos on the left (out)side of the interval
        foreach ($raw_videos_ar as $idx => $raw_file_ar) {
            if (strtotime($raw_file_ar->broadcast_time) + $raw_file_ar->duration < $start_date_unix) {
                $idx_to_eliminate[$idx] = null;
            }
            else break;
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
                    while (($line = fgets($handle)) !== false) {

                        $line = trim($line);
                        if (strpos($line, '#EXTINF:') === 0) {
                            $duration = str_replace('#EXTINF:', '', $line);
                        }
                        elseif (strpos($line, '#') !== 0 && $duration > 0.0) {
                            $filename = basename($line);
                            $details = get_file_details_from_path($filename);
                            $sub_path = Datetime::createFromFormat(
                                    'Y_m_d-H:i:s',
                                    $details[1]
                                )->format('Y/m/d');

                            $raw_video_file = (new RawVideoFile())
                                ->set_locations(
                                    sprintf(
                                        '%s/%s/%s/%s',
                                        Videos::RAW_VIDEO_PATH,
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
                                    $files[] = $raw_video_file;
                                }
                                else break;
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
            yield sprintf(
                '%s/%s/%s.%s.m3u8',
                Videos::RAW_VIDEO_PATH,
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
    private function create_master_playlist_raw(
        $id,
        $start_date,
        $end_date,
        $batch_size
    ): PlaylistMasterFile
    {

        $publication_ar = $this->container->entity_publication->get_by_id($id);
        $is_radio = $this->container->entity_publication->is_radio($publication_ar);
        $playlist_master_file = new PlaylistMasterFile($this->container);
        list($start_file, $end_file) = $this->get_edges($id, $start_date, $end_date);
        if ($start_file && $end_file) {

            if (!is_dir(Videos::PLAYLIST_PATH)) {
                if (!mkdir(Videos::PLAYLIST_PATH, 0777, true)) {
                    throw new Exception('Could not create the playlist path', 500);
                }
            }

            if (!is_writable(Videos::PLAYLIST_PATH)) {
                throw new Exception('Playlist directory is not writable', 500);
            }

            $sfile_mtime = date('Y/m/d H:i:s', filemtime($start_file));
            $efile_mtime = date('Y/m/d H:i:s', filemtime($end_file));

            $files = [];
            foreach ($this->get_paths_in_range($start_file, $end_file) as $path) {
                $files_string = shell_exec(
                    $this->build_find_files_command(
                        $path,
                        $sfile_mtime,
                        $efile_mtime
                    )
                );
                $files = array_merge($files, explode(PHP_EOL, trim($files_string)));
            }
            array_unshift($files, $start_file);
            array_push($files, $end_file);
            $files = array_filter($files);
            $files = array_unique($files);
            sort($files);
            array_walk($files, function(&$file, $key) {
                $file = url_to_path($file);
            });

            $files_duration = get_video_files_duration($files, $is_radio);
            foreach($files as &$raw_file) {
                $file = (new RawVideoFile())
                    ->set_locations($raw_file)
                    ->set_name($raw_file)
                    ->set_length($files_duration[$raw_file])
                    ->set_discontinuity(true);
                $raw_file = $file;
            }
            $files = array_filter($files);

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
                $playlist_master_file->set_locations($playlist_master_file->build_playlist_path())
                    ->save();
            }
        }

        return $playlist_master_file;
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

    private function build_find_files_command($reference_file, $from, $to)
    {

        $result = '';
        $sdir = explode('/', $reference_file);
        $sdir = array_splice($sdir, 0, count($sdir) - 1);
        $sdir = implode('/', $sdir) . '/';

        if (file_exists($sdir)) {
            $result = sprintf(
                'find %1$s -type f -newermt "%2$s" ! -newermt "%3$s" | sort -n | cut -f2',
                $sdir,
                $from,
                $to
            );
        }

        return $result;
    }

    private function get_edges($id, $start_date, $end_date)
    {

        $tz = new DateTimeZone('Asia/Amman');
        $start_date = Datetime::createFromFormat('Y-m-d H:i:s', $start_date, $tz);
        $end_date = Datetime::createFromFormat('Y-m-d H:i:s', $end_date, $tz);

        $offset_start = intval($start_date->getOffset() / 3600);
        $offset_end = intval($end_date->getOffset() / 3600);

        $start_time = sprintf(
            '%1$s %2$+03d00',
            $start_date->format('Y-m-d H:i:s'),
            $offset_start
        );
        $end_time = sprintf(
            '%1$s %2$+03d00',
            $end_date->format('Y-m-d H:i:s'),
            $offset_end
        );

        $whole_interval = strtotime($end_date->format('Y-m-d H:i:s')) - strtotime($start_date->format('Y-m-d H:i:s'));
        $scanning_periods = [
            'best' => Videos::STANDARD_SCANNING_PERIOD,
            'worst' =>  $whole_interval < Videos::EXTENDED_SCANNING_PERIOD ? $whole_interval : Videos::EXTENDED_SCANNING_PERIOD
        ];

        $start_file = $this->get_best_file(
            $id,
            $start_time,
            $scanning_periods,
            'start'
        );

        if ( !$start_file ) {
            return [false, false];
        }

        $end_file = $this->get_best_file(
            $id,
            $end_time,
            $scanning_periods,
            'end'
        );

        if ( !$end_file ) {
            return [false, false];
        }

        return [$start_file, $end_file];
    }

    private function get_best_file($id, $date, $scanning_periods, $type)
    {

        $ago = 'ago';
        $start_with = 0;
        foreach ($scanning_periods as $scenario => $period) {

            if ($scenario === 'best') {
                $ago = 'ago';
                $start_with = 0;
            }
            elseif ($type === 'start') {
                $ago = '';
            }

            for($i = $start_with; $i <= $period; $i++) {

                $filename = shell_exec(
                    sprintf(
                        'date \'+%1$s/%2$s/%%Y/%%m/%%d/%2$s.%%Y_%%m_%%d-%%H:%%M:%%S.%3$s\' \
                        --date="%4$s +%5$d seconds %6$s"',
                        Videos::RAW_VIDEO_PATH,
                        $id,
                        Videos::RAW_VIDEO_FORMAT,
                        $date,
                        $i,
                        $ago
                    )
                );
                $filename = trim($filename);

                if (file_exists($filename)) {
                    return $filename;
                }
            }

            if ($type === 'end') {
                $start_with = $period + 1;
            }
        }

        return false;
    }

    private function get_paths_in_range($from, $to)
    {

        $tz = new DateTimeZone('Asia/Amman');
        $from_details = get_file_details_from_path($from);
        $to_details = get_file_details_from_path($to);
        $from_name = $from_details[1];
        $to_pub_id = $to_details[0];
        $to_name = $to_details[1];

        $start_date = Datetime::createFromFormat('Y_m_d-H:i:s', $from_name, $tz);
        $end_date = Datetime::createFromFormat('Y_m_d-H:i:s', $to_name, $tz);
        $diff = strtotime($end_date->format('Y-m-d')) - strtotime($start_date->format('Y-m-d'));
        $diff = abs($diff / 3600 / 24);

        do {

            yield sprintf(
                '%s/%s/%s',
                Videos::RAW_VIDEO_PATH,
                $to_pub_id,
                Datetime::createFromFormat('Y_m_d-H:i:s', $to_name, $tz)
                    ->modify(sprintf('-%s days', $diff))
                    ->format('Y/m/d')
            );
            $diff--;
        }
        while($diff > 0);
    }
}
