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
     * @return PublicationAR
     * @throws Exception : if publication with provided $id does not exist
     */
    public function get_by_id(int $id): PublicationAR
    {
        $publication = new PublicationDB($this->db[Hosts::LOCAL][Dbs::MAIN]);
        $publication_ar = $publication->get_by_id($id);

        if (is_null($publication_ar->id)) {
            throw new Exception("Publication with id #{$id} does not exist", 200);
        }

        return $publication_ar;
    }

    /**
     * @param array $ids
     * @return array
     */
    public function get_by_ids(array $ids): array
    {
        $publication = new PublicationDB($this->db[Hosts::LOCAL][Dbs::MAIN]);

        return $publication->get_by_ids($ids);
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
     * @return int[]: [$publication_ar->id => datetime_string]
     */
    public function get_latest_stream_update(array $publications_ar, $max_days_back = 30): array
    {
        $result = [];
        $time_left = 60;
        $total_publications = count($publications_ar);
        $start_date_unix = strtotime(date('Y-m-d'));
        $scan_start_date = date("Y-m-d H:i:s", $start_date_unix);
        $scan_end_date = date("Y-m-d H:i:s", $start_date_unix - $max_days_back * 24 * 3600);
        $default = $scan_end_date;
        $session_id = str_replace(['.', ' '], '_', microtime());
        $output_files_path = sprintf(
            '%s/tmp/latest_streams',
            PUBLIC_PATH
        );

        foreach ($publications_ar as $publication_ar) {

            $result[$publication_ar->id] = $default;
            $output_file = sprintf(
                '%s/%s-%s.out',
                $output_files_path,
                $session_id,
                $publication_ar->id
            );
            $paths = iterator_to_array(PlaylistMasterDisk::get_stream_playlist_paths(
                $publication_ar->id,
                $scan_start_date,
                $scan_end_date
            ));
            exec(sprintf(
                '/usr/bin/nohup /usr/bin/php %s/scripts/latest_streams.php  %s %s %s > /dev/null 2>&1 &',
                APP_PATH,
                $output_file,
                $publication_ar->id,
                implode(' ', $paths)
            ));
        }
        do {
            $files = glob(sprintf(
                '%s/%s*.out',
                $output_files_path,
                $session_id
            ));
            $time_left--;
            sleep(1);
        } while($time_left > 0 && count($files) < $total_publications);

        foreach($files as $filepath) {
            $data = explode(',', file_get_contents($filepath));
            $result[$data[0]] = strlen($data[1]) ? $data[1] : $result[$data[0]];
            unlink($filepath);
        }

        return $result;
    }

}
