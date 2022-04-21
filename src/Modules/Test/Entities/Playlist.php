<?php

namespace App\Modules\Test\Entities;

use App\Modules\Video\Entities\Files\PlaylistFile;
use App\Modules\Video\Entities\Files\RawVideoFile;
use DateTime;
use \Exception;
use Slim\Http\Request;
use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\Videos;
use App\Modules\Abstracts\AbstractFile;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Files\PlaylistMasterFile;
use App\Modules\Test\Entities\Repository\Database\TextDB;
use App\Modules\Video\Entities\Repository\Disk\PlaylistDisk;
use App\Modules\Video\Entities\Repository\Disk\PlaylistMasterDisk;
use App\Modules\Video\Entities\Playlist as RealPlaylist;

class Playlist extends AbstractModule
{
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

    public static function parsePlaylistFile($streamPath)
    {
        if (!file_exists($streamPath)) {
            return false;
        }
        $handle = fopen($streamPath, "r");
        if (!$handle) {
            return false;
        }

        $result = [];
        $duration = 0.0;
        while (($line = fgets($handle)) !== false) {
            $line = trim($line);
            if (strpos($line, '#EXTINF:') === 0) {
                $duration = str_replace(['#EXTINF:', ','], '', $line);

            } elseif (strpos($line, '#') !== 0 && $duration > 0.0) {
                $filename = basename($line);
                $result[$filename] = $duration;

                $duration = 0.0;
            }
        }
        fclose($handle);

        return $result;
    }

    /**
     * @throws Exception
     * @return string[]
     */
    public function get_playlists_for_output(Request $request)
    {
        $batchSize = 100;
        $result = [];
        $publicationId = $request->getParam('publication');
        $startDate = $request->getParam('start_date');
        $endDate = $request->getParam('end_date');

        $textDB = new TextDB($this->db[Hosts::LOCAL][Dbs::TEXTS]);
        $segments = $textDB->getSegments($publicationId, $startDate, $endDate, $batchSize);

        $config = [];
        foreach ($segments as $segment) {
            if (empty($config[$segment['date']])) {
                $playlistTemplatePath = self::get_stream_playlist_paths($publicationId, $segment['date']);
                $config[$segment['date']] = self::parsePlaylistFile($playlistTemplatePath);
            }

            $tsFileNames = explode(", ", $segment['segments_list']);
            $playlistMasterFile = $this->createPlaylist($tsFileNames, $config[$segment['date']], $publicationId, $segment['start_segment_datetime'], $segment['end_segment_datetime'], $batchSize);

            $startDatetime = strtotime($segment['start_segment_datetime']);
            $endDatetime = strtotime($segment['end_segment_datetime']);
            $result[] = [
                'segment_id'    => $segment['id'],
                'hash'          => $playlistMasterFile->get_hash(),
                'url'           => $playlistMasterFile->get_url(),
                'url_texts'     => '',
                'start_date'    => date("Y-m-d H:i:s", $startDatetime),
                'end_date'      => date("Y-m-d H:i:s", $endDatetime),
                'start_day'     => date("l, Y-m-d", $startDatetime),
                'start_hour'    => date("H:i:s", $startDatetime),
                'end_day'       => date("l, Y-m-d", $endDatetime),
                'end_hour'      => date("H:i:s", $endDatetime),
                'poster'        => '',
                'publication'   => $publicationId
            ];
        }

        return $result;
    }

    public function createPlaylist(array $filenames, $config, int $publicationId, string $startDate, string $endDate, int $batchSize)
    {
        $playlist_master_file = new PlaylistMasterFile($this->container);

        foreach ($filenames as $filename) {
            $filename = trim($filename);
            $duration = $config[$filename] ?? 5;

            $details = get_file_details_from_path($filename);
            $date_obj = Datetime::createFromFormat('Y_m_d-H:i:s', $details[1]);
            $sub_path = $date_obj->format('Y/m/d');
            $date_timestamp = $date_obj->getTimestamp();
            $base_path = get_raw_video_path($publicationId, $date_timestamp);

            $raw_video_file = (new RawVideoFile())
                ->set_locations(
                    sprintf(
                        '%s/%s/%s/%s',
                        $base_path,
                        $publicationId,
                        $sub_path,
                        $filename
                    )
                )
                ->set_name($filename)
                ->set_length($duration)
                ->set_discontinuity(true);

            $files[] = $raw_video_file;
        }

        $files_copy = $files;
        $playlist_disk = new PlaylistDisk($this->container);
        $playlists = [];

        $playlist_file = new PlaylistFile($this->container, ['files' => $files]);
        $segment_count = $this->get_segment_count($files_copy, $batchSize);
        foreach($this->get_segment_count($files_copy, $batchSize) as $segment_count) {

            $chunks = array_splice($files, 0, $segment_count);
//            $playlist_file = $playlist_disk->create_playlist($chunks, true);
            $playlist_file = $playlist_disk->create_playlist($chunks, false);

            if (!is_null($playlist_file->get_hash())) {
                $playlists[] = $playlist_file;
            }
        }

        return $playlist_file;


        /*if (!empty($playlists)) {
            try {
                $playlist_master_file
                    ->set_files($playlists)
                    ->build_hash($publicationId, $startDate, $endDate, $batchSize)
                    ->set_locations($playlist_master_file->build_playlist_path())
                    ->save();

            } catch (Exception $e) {
            }
        }

        return $playlist_master_file;*/
    }

    public static function get_stream_playlist_paths($id, $date)
    {
        $timestamp = Datetime::createFromFormat('Y-m-d', $date)->getTimestamp();

        return sprintf(
            '%s/%s/%s/%s.%s.m3u8',
            PUBLIC_PATH,
            get_raw_video_path($id, $timestamp),
            $id,
            $id,
            str_replace('-', '_', $date)
        );
    }

    /**
     * @param Request $request
     * @return string[]
     * @throws Exception
     */
    public function getTexts(Request $request): array
    {
        $publicationId = $request->getParam('publication');
        $segmentId = $request->getParam('segment_id');
        $result = [];

        $textDB = new TextDB($this->db[Hosts::LOCAL][Dbs::TEXTS]);
        $data = $textDB->getTexts($segmentId, $publicationId);

        foreach ($data as $datum) {
            $result[] = [
                'start_time'    => $this->convertToTime($datum['start_time']),
                'end_time'      => $this->convertToTime($datum['end_time']),
                'word'          => $datum['word'],
            ];
        }

        return $result;
    }

    private function convertToTime($init): string
    {
        $init  = number_format($init, 2);
        $secs  = floor($init);
        $milli = (int) (($init - $secs) * 1000);
        $milli = str_pad($milli, 3, '0', STR_PAD_LEFT);

        $hours   = ($secs / 3600);
        $minutes = (($secs / 60) % 60);
        $minutes = str_pad($minutes, 2, '0', STR_PAD_LEFT);
        $seconds = $secs % 60;
        $seconds = str_pad($seconds, 2, '0', STR_PAD_LEFT);
        if ($hours > 1) {
            $hours = str_pad($hours, 2, '0', STR_PAD_LEFT);
        } else {
            $hours = '00';
        }
        $Time = "$hours:$minutes:$seconds.$milli";

        return $Time;
    }

    private function sec2String($seconds): string
    {
        $results = [];

        $numbers = preg_split("/\D/", $seconds);
        if (!empty($numbers[0])) {
            $results[] = $numbers[0] . " seconds";
        }
        if (!empty($numbers[1])) {
            $results[] = $numbers[1] . " milliseconds";
        }

        return implode(" ", $results);
    }

    private function dateAddFormatted($date, $interval)
    {
        return date_add($date, date_interval_create_from_date_string($this->sec2String($interval)));
    }

    private function segmentDiff($startSegment, $endSegment): array
    {
        $sDate = $this->segment2Date($startSegment);
        $eDate = $this->segment2Date($endSegment);
        return (array)date_diff($sDate, $eDate);
    }

    private function segment2Date($str)
    {
        preg_match('/.+(\d{4}_\d{2}_\d{2}-\d{2}:\d{2}:\d{2})\.ts/Uis', $str, $matches);

        return date_create_from_format('Y_m_d-H:i:s', $matches[1]);
    }

}
