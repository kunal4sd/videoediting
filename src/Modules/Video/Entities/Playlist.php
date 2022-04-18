<?php

namespace App\Modules\Video\Entities;

use DateTime;
use \Exception;
use Slim\Http\Request;
use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\Videos;
use App\Modules\Abstracts\AbstractFile;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Files\PlaylistMasterFile;
use App\Modules\Video\Entities\Repository\Database\TextDB;
use App\Modules\Video\Entities\Repository\Disk\PlaylistDisk;
use App\Modules\Video\Entities\Repository\Disk\PlaylistMasterDisk;

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
            $request->getParam('method')
        );

        foreach($playlists_file as $playlist_file) {
            $start_datetime = strtotime($playlist_file->get_first_file()->build_start_datetime());
            $end_datetime = strtotime($playlist_file->get_last_file()->build_end_datetime());

            $pattern = '/.+\/playlist\/(.+)\.m3u8/Uis';
            preg_match($pattern, $playlist_file->get_url(), $matches);
            $hash = $matches[1] ? $matches[1] : $playlist_file->get_hash();

            $result[] = [
                'hash' => $hash,
                'url' => $playlist_file->get_url(),
                'url_texts' => sprintf('%s/videos/actions/get/text', base_url()),
                'start_date' => date("Y-m-d H:i:s", $start_datetime),
                'end_date' => date("Y-m-d H:i:s", $end_datetime),
                'start_day' => date("l, Y-m-d", $start_datetime),
                'start_hour' => date("H:i:s", $start_datetime),
                'end_day' => date("l, Y-m-d", $end_datetime),
                'end_hour' => date("H:i:s", $end_datetime),
                'poster' => $playlist_file->get_poster()->get_url(),
                'publication' => $request->getParam('publication')
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
    public function get_playlists($id, $start_date, $end_date, $batch_size, $method)
    {
        $playlist_master_file = (new PlaylistMasterDisk($this->container))
            ->create_master_playlist(
                $id,
                $start_date,
                $end_date,
                $batch_size,
                $method
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
     * @param Request $request
     * @throws Exception
     * @return string[]
     */
    public function get_playlist_texts(Request $request)
    {
        $result = [];
        $query = '';

        if (!is_null($request->getParam('hash'))) {
            $playlist_file = $this->get_playlist_with_hash($request->getParam('hash'));

            if (!is_null($first_file = $playlist_file->get_first_file())) {

                $from = $first_file->build_start_datetime();
                $to = $playlist_file->get_last_file()->build_end_datetime();

                list($text_ars, $query) = (new TextDB($this->db[Hosts::LOCAL][Dbs::TEXTS]))
                ->get_for_interval_by_publication($from, $to, $request->getParam('publication'));
                foreach($text_ars as $text_ar) {
                    $result[] = $text_ar->word;
                }
            }
        }
        else {
            $from = $request->getParam('start_date');
            $to = $request->getParam('end_date');

            list($text_ars, $query) = (new TextDB($this->db[Hosts::LOCAL][Dbs::TEXTS]))
            ->get_for_interval_by_publication($from, $to, $request->getParam('publication'));
            foreach($text_ars as $text_ar) {
                $result[] = $text_ar->word;
            }
        }

        return [$result, $query];
    }

    /**
     * @param Request $request
     * @return string[]
     * @throws Exception
     */
    public function get_playlist_texts_timeshift(Request $request): array
    {
        $hash = $request->getParam('hash');
        $publicationId = $request->getParam('publication');
        $interval = $request->getParam('interval');
        $result = [];

        if (!is_null($hash)) {
            $playlist_file = $this->get_playlist_with_hash($hash);

            if (!is_null($first_file = $playlist_file->get_first_file())) {
                $from = $first_file->build_start_datetime();
                $to = $playlist_file->get_last_file()->build_end_datetime();

                $textDB = new TextDB($this->db[Hosts::LOCAL][Dbs::TEXTS]);
                $data = $textDB->get_playlist_texts_timeshift($from, $to, $publicationId, $interval);

                $startTime = new DateTime($from);
                $segmentId = 0;
                $minus = 0;
                $shift = 0;
                $last = 0;

                foreach ($data as $datum) {
                    if ($segmentId != $datum['segment_id']) {
                        $segmentId = $datum['segment_id'];
                        $startSegmentDatetime = new DateTime($datum['start_segment_datetime']);

                        $diff = $this->dateAddFormatted($startSegmentDatetime, $datum['end_time']);
                        if ($diff >= $startTime) {
                            $minus = $datum['start_time'];
                        }
                        $shift = $last;
                    }
                    $stime = ($datum['start_time'] - $minus) + $shift;
                    $etime = ($datum['end_time'] - $minus) + $shift;
                    $last = $etime;

                    /*var_dump([
                        'stime' => $stime,
                        'etime' => $etime,
                    ]);*/

                    $result[] = [
                        'start_time'    => $this->convertToTime($stime),
                        'end_time'      => $this->convertToTime($etime),
                        'word'          => $datum['word'],
                        'stime'         => $stime,
                        'etime'         => $etime,
                    ];
                }
            }
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
