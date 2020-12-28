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
        $start_midnight = strtotime(date("Y-m-d 00:00:00", $start));
        $end = strtotime($to);
        $end_midnight = strtotime(date("Y-m-d 00:00:00", $end));
        $result = [];
        $params = [
            'start_day' => date("Y-m-d", $start),
            'end_day' => date("Y-m-d", $end),
            'start_time' => $start - $start_midnight,
            'end_time' => $end - $end_midnight,
            'publication_id' => [$publication_id, PDO::PARAM_INT]
        ];
        $same_day = date("Y-m-d", $start) === date("Y-m-d", $end);

        $data = $this->db->fetch_all(
            sprintf(
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
                                %s
                            ) OR
                            (
                                texts.date = :end_day
                                %s
                                AND texts.start_time <= :end_time
                            ) %s
                        )
                    ORDER BY
                        CONCAT_WS(' ', texts.date, texts.start_time)
                        ASC
                ",
                $same_day ? "AND texts.start_time <= :end_time" : '',
                $same_day ? "AND texts.start_time >= :start_time" : '',
                $same_day ? "" : "OR
                    (
                        texts.date > :start_day
                        AND texts.date < :end_day
                    )"
            ),
            $params
        );

        foreach($data as $row) {
            $result[] = new TextAR($row);
        }

        return $result;
    }

}
