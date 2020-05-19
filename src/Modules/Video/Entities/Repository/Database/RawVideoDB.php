<?php

namespace App\Modules\Video\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Video\Entities\ActiveRecords\RawVideoAR;
use \PDO;

class RawVideoDB extends AbstractDatabase
{

    /**
     * @param string $from : start date
     * @param string $to : end date
     * @param int $publication_id
     * @return RawVideoAR[]
     */
    public function get_for_interval_by_publication(
        string $from,
        string $to,
        int $publication_id,
        bool $tv_only = false
    )
    {

        $result = [];
        $params = [
            'start_time' => $from,
            'end_time' => $to,
            'publication_id' => [$publication_id, PDO::PARAM_INT]
        ];

        $tv_select = '';
        if ($tv_only) {
            $tv_select = '
                INNER JOIN publication AS p
                    ON p.id = rd.publication_id
                    AND p.type_id = 3
            ';
        }

        $data = $this->db->fetch_all(
            "
                SELECT
                    rd.id,
                    rd.publication_id,
                    rd.broadcast_time,
                    rd.duration,
                    rd.path
                FROM recording_details AS rd
                {$tv_select}
                WHERE 1
                    AND rd.publication_id = :publication_id
                    AND rd.broadcast_time >= :start_time
                    AND rd.broadcast_time <= :end_time
                ORDER BY
                    rd.broadcast_time
                    ASC
            ",
            $params
        );

        $dir = get_raw_video_path($publication_id);
        foreach($data as $row) {
            $result[] = new RawVideoAR($row, $dir);
        }

        return $result;
    }

}
