<?php

namespace App\Modules\Video\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Video\Entities\ActiveRecords\TextAR;
use \PDO;

class TextDB extends AbstractDatabase
{

    /**
     * @param string $from : start date
     * @param string $to : end date
     * @param int $publication_id
     * @return TextAR[]
     */
    public function get_for_interval_by_publication(
        string $from,
        string $to,
        int $publication_id
    )
    {

        $start = strtotime($from);
        $start_midnight = strtotime(date("Y-m-d 00:00:00"), $start);
        $end = strtotime($to);
        $end_midnight = strtotime(date("Y-m-d 00:00:00"), $end);
        $result = [];
        $params = [
            'start_day' => date("Y-m-d", $start),
            'end_day' => date("Y-m-d", $end),
            'start_time' => $start - $start_midnight,
            'end_time' => $end - $end_midnight,
            'publication_id' => [$publication_id, PDO::PARAM_INT]
        ];

        $data = $this->db->fetch_all(
            "
                SELECT
                    *
                FROM pub_{$publication_id} AS texts
                WHERE 1
                    AND texts.pub_id = :publication_id
                    AND (
                        (
                            texts.date = :start_day
                            AND texts.start_time >= :start_time
                        ) OR
                        (
                            texts.date = :end_day
                            AND texts.start_time <= :end_time
                        ) OR
                        (
                            texts.date > :start_day
                            AND texts.date < :end_day
                        )
                    )
                ORDER BY
                    CONCAT_WS(' ', texts.date, texts.start_time)
                    ASC
            ",
            $params
        );

        foreach($data as $row) {
            $details = get_file_details_from_path($row['path']);
            $dir = get_raw_video_path(
                    $publication_id,
                    strtotime(
                        \Datetime::createFromFormat('Y_m_d-H:i:s', $details[1])->getTimestamp()
                    )
                );
            $result[] = new TextAR($row, $dir);
        }

        return $result;
    }

}
