<?php

namespace App\Modules\Video\Entities\Repository\Disk;

use App\Libs\Enums\Videos;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Video\Entities\PlaylistGenerator;
use App\Modules\Video\Entities\ActiveRecords\PlaylistAR;
use App\Modules\Video\Entities\ActiveRecords\PlaylistMasterAR;
use \Datetime;
use \DateTimeZone;
use \Exception;

class PlaylistMasterDisk extends ModuleAbstract
{

    /**
     * @param int $id
     * @param string $start_date
     * @param string $end_date
     * @param int $batch_size
     * @return PlaylistMasterAR
     */
    public function get_master_playlist($id, $start_date, $end_date, $batch_size)
    {
        try {
            $playlist_master_ar = $this->get_master_playlist_by_hash(
                build_hash($id, $start_date, $end_date, $batch_size)
            );
        }
        catch (Exception $e) {
            $this->logger->write($e);
        }

        return $playlist_master_ar;
    }

    /**
     * @param int $id
     * @param string $start_date
     * @param string $end_date
     * @param int $batch_size
     * @return PlaylistMasterAR
     */
    public function get_master_playlist_by_hash($hash)
    {
        $playlist_master_ar = new PlaylistMasterAR($this->container);
        $file_path = $playlist_master_ar->build_playlist_path($hash);

        try {
            $playlist_master_ar->build_from_file($file_path);
        }
        catch (Exception $e) {
            $this->logger->write($e);
        }

        return $playlist_master_ar;
    }

    /**
     * @param int $id
     * @param string $start_date
     * @param string $end_date
     * @param int $batch_size
     * @return PlaylistMasterAR
     */
    public function create_master_playlist($id, $start_date, $end_date, $batch_size, $force = false)
    {

        if (!$force) {

            $playlist_master_ar = $this->get_master_playlist($id, $start_date, $end_date, $batch_size);

            if (!is_null($playlist_master_ar->name)) {
                return $playlist_master_ar;
            }
        }
        else {
            $playlist_master_ar = new PlaylistMasterAR($this->container);
        }

        list($start_file, $end_file) = $this->get_edges($id, $start_date, $end_date);

        if ($start_file && $end_file) {

            $sfile_mtime = date('Y/m/d H:i:s', filemtime($start_file));
            $efile_mtime = date('Y/m/d H:i:s', filemtime($end_file));
            $sfile_mtime_day = date('d', filemtime($start_file));
            $efile_mtime_day = date('d', filemtime($end_file));

            $files_string = shell_exec(
                $this->build_find_files_command(
                    $start_file,
                    $sfile_mtime,
                    $efile_mtime
                )
            );
            $files = explode(PHP_EOL, trim($files_string));
            array_unshift($files, $start_file);

            if ($sfile_mtime_day !== $efile_mtime_day) {
                $files_string = shell_exec(
                    $this->build_find_files_command(
                        $end_file,
                        $sfile_mtime,
                        $efile_mtime
                    )
                );
                $files = array_merge($files, explode(PHP_EOL, trim($files_string)));
            }

            $files = array_unique(array_filter($files));
            sort($files);

            $files_count = count($files);
            $segment_count = intval($batch_size / Videos::RAW_VIDEO_LENGTH);

            if (!is_dir(Videos::PLAYLIST_PATH)) {
                if (!mkdir(Videos::PLAYLIST_PATH, 0777, true)) {
                    throw new Exception('Could not create the playlist path', 500);
                }
            }

            if (!is_writable(Videos::PLAYLIST_PATH)) {
                throw new Exception('Playlist directory is not writable', 500);
            }

            $playlist_disk = new PlaylistDisk($this->container);
            $playlists = [];
            while($chunks = array_splice($files, 0, $segment_count)) {

                $playlist_ar = $playlist_disk->create_playlist($chunks, $force);

                if (!is_null($playlist_ar->name)) {
                    $playlists[] = $playlist_ar;
                }
            }

            if (!empty($playlists)) {

                $file_path = $playlist_master_ar->build_playlist_path(
                    build_hash($id, $start_date, $end_date, $batch_size)
                );
                $playlist_master_ar->build_from_array([
                    'name' => $file_path,
                    'files' => $playlists
                ]);
                $playlist_master_ar->save($file_path);
            }

        }

        return $playlist_master_ar;
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
                        'date \'+%1$s/%2$s/%%Y/%%m/%%d/%2$s.%%Y_%%m_%%d-%%H:%%M:%%S.%3$s\' --date="%4$s +%5$d seconds %6$s"',
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

}
