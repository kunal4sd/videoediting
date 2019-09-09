<?php

namespace App\Modules\Publication\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\Videos;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Publication\Entities\ActiveRecords\PublicationAR;
use App\Modules\Publication\Entities\Repository\Database\PublicationDB;
use App\Modules\Video\Entities\Files\RawVideoFile;
use App\Modules\Video\Entities\Repository\Disk\PlaylistMasterDisk;
use \Datetime;
use \Exception;

class Publication extends AbstractModule
{

    /**
     * @param int $id : publication database id
     * @throws Exception : if publication with provided $id does not exist
     * @return PublicationAR
     */
    public function get_by_id($id)
    {
        $publication = new PublicationDB($this->db[Hosts::LOCAL][Dbs::MAIN]);
        $publication_ar = $publication->get_by_id($id);

        if (is_null($publication_ar->id)) {
            throw new Exception("Publication with id #{$id} does not exist", 200);
        }

        return $publication_ar;
    }

    /**
     * @throws Exception : if no publications are found
     * @return PublicationAR[]
     */
    public function get_all_active_tv_and_radio()
    {
        $publication_db = new PublicationDB($this->db[Hosts::LOCAL][Dbs::MAIN]);
        $publications = $publication_db->get_all_active_tv_and_radio();

        if (empty($publications)) {
            throw new Exception("No active TV and radio channels found in database", 200);
        }

        return $publications;
    }

    /**
     * @throws Exception : if no publications are found
     * @return PublicationAR[]
     */
    public function get_all_active_tv_and_radio_media()
    {
        $publication_db = new PublicationDB($this->db[Hosts::MEDIA][Dbs::MEDIA]);
        $publications = $publication_db->get_all_active_tv_and_radio();

        if (empty($publications)) {
            throw new Exception("No active TV and radio channels found in database", 200);
        }

        return $publications;
    }

    /**
     * @param PublicationAR $publication_ar
     * @return boolean
     */
    public function is_radio(PublicationAR $publication_ar): bool
    {
        return (int) $publication_ar->type_id === 4;
    }

    /**
     * @param PublicationAR $publication_ar
     * @return boolean
     */
    public function is_tv(PublicationAR $publication_ar): bool
    {
        return (int) $publication_ar->type_id === 3;
    }

    /**
     * @param PublicationAR[] $publications_ar
     * @return string[]: [$publication_ar->id => TV/Radio]
     */
    public function get_types(array $publications_ar): array
    {
        $publications_type = [];
        foreach($publications_ar as $idx => $publication_ar) {
            if ($this->is_radio($publication_ar)) {
                $publications_type[$publication_ar->id] = 'Radio';
            }
            else {
                $publications_type[$publication_ar->id] = 'TV';
            }
        }

        return $publications_type;
    }

    /**
     * @param PublicationAR[] $publications_ar
     * @return int[]: [$publication_ar->id => RawVideoFile]
     */
    public function get_latest_stream_update(array $publications_ar, $max_days_back = 30): array
    {
        $result = [];
        $start_date_unix = strtotime(date('Y-m-d'));
        $scan_start_date = date("Y-m-d H:i:s", $start_date_unix);
        $scan_end_date = date("Y-m-d H:i:s", $start_date_unix - $max_days_back * 24 * 3600);
        $default = $scan_end_date;

        foreach ($publications_ar as $publication_ar) {

            $result[$publication_ar->id] = $default;
            $paths_iterator = PlaylistMasterDisk::get_stream_playlist_paths(
                $publication_ar->id,
                $scan_start_date,
                $scan_end_date
            );
            foreach ($paths_iterator as $stream_path) {
                if (file_exists($stream_path)) {

                    $file_arr = file($stream_path);
                    if (!empty($file_arr)) {

                        $file_arr = array_reverse($file_arr);
                        $duration = 0.0;
                        $filename = false;
                        $rawVideoFile = false;
                        foreach($file_arr as $line) {

                            $line = trim($line);
                            if (
                                strpos($line, '#EXTINF:') === 0
                                && $filename !== false
                                && $rawVideoFile !== false
                            ) {
                                $duration = str_replace(['#EXTINF:', ','], '', $line);
                                $result[$publication_ar->id] = $rawVideoFile->set_length($duration)
                                                                            ->build_end_datetime();
                                break;
                            }
                            elseif (strpos($line, '#') !== 0 && $duration === 0.0) {
                                $filename = basename($line);
                                $details = get_file_details_from_path($filename);
                                $sub_path = Datetime::createFromFormat(
                                        'Y_m_d-H:i:s',
                                        $details[1]
                                    )->format('Y/m/d');

                                    $rawVideoFile = (new RawVideoFile())
                                    ->set_locations(
                                        sprintf(
                                            '%s/%s/%s/%s',
                                            Videos::RAW_VIDEO_PATH,
                                            $publication_ar->id,
                                            $sub_path,
                                            $filename
                                        )
                                    )
                                    ->set_name($filename);
                            }
                        }
                    }
                    break;
                }
            }
        }

        return $result;
    }

}
