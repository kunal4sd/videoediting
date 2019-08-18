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

            $file_details = get_file_details_from_path($files[0]);
            $publication_id = array_shift($file_details);
            $publication_ar = $this->container->entity_publication->get_by_id($publication_id);
            $is_radio = $this->container->entity_publication->is_radio($publication_ar);
            $files_duration = $this->get_files_duration($files, $is_radio);
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
                $playlist_file = $playlist_disk->create_playlist($chunks, $force);

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

    private function get_files_duration(array $files, $is_radio)
    {
        $result = [];

        if ($is_radio) {
            $chunks = array_chunk($files, 8);
            foreach($chunks as $chunk) {
                $output = json_decode(
                    shell_exec(
                        sprintf(
                            "%s/duration_multiple %s",
                            BIN_PATH,
                            implode(' ', $chunk)
                        )
                    ),
                    true
                );
                $filenames = array_map(function($row) {
                    return $row['filename'];
                }, $output);
                $durations = array_map(function($row) {
                    return choose_time_to_seconds($row['duration'], $row['time']);
                }, $output);
                $result = array_merge($result, array_combine($filenames, $durations));
            }
        }
        else {
            $output = json_decode(
                shell_exec(
                    sprintf(
                        "%s/duration %s",
                        BIN_PATH,
                        implode(' ', $files)
                    )
                ),
                true
            );
            $filenames = array_map(function($row) {
                return $row['filename'];
            }, $output);
            $durations = array_map(function($row) {
                return round($row['duration'], 4, PHP_ROUND_HALF_UP);
            }, $output);
            $result = array_merge($result, array_combine($filenames, $durations));
        }

        return $result;
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
        foreach($scanning_periods as $scenario => $period) {

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
        $from_pub_id = array_shift($from_details);
        $from_name = array_shift($from_details);
        $to_pub_id = array_shift($to_details);
        $to_name = array_shift($to_details);
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
