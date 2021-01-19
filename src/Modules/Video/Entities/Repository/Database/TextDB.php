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

        $result = [];
        $params = [
            'from' => $from,
            'to' => $to,
            'publication_id' => [$publication_id, PDO::PARAM_INT]
        ];

        $data = $this->db->fetch_all(
            "
            SELECT
                p.*
            FROM recordings_text.segments AS s
            INNER JOIN recordings_text.pub_{$publication_id} AS p
                ON p.segment_id = s.id
                AND p.pub_id = s.pub_id
                AND :from <= DATE_ADD(s.start_segment_datetime, INTERVAL p.start_time second)
                AND :to >= DATE_ADD(s.start_segment_datetime, INTERVAL p.start_time second)
            WHERE 1
                AND s.id >= (
                    SELECT
                        id
                    FROM recordings_text.segments
                    WHERE 1
                        AND start_segment_datetime <= :from
                    ORDER BY
                        id
                        DESC
                    LIMIT 1
                )
                AND s.id <= (
                    SELECT
                        id
                    FROM recordings_text.segments
                    WHERE 1
                        AND start_segment_datetime <= :to
                    ORDER BY
                        id
                        DESC
                    LIMIT 1
                )
                AND s.pub_id = :publication_id
                GROUP BY
                    p.id
                ORDER BY
                    s.id,
                    p.date,
                    p.start_time
                    ASC
            ",
            $params
        );

        foreach($data as $row) {
            $result[] = new TextAR($row);
        }

        return [
            $result,
            "
            SELECT
                p.*
            FROM recordings_text.segments AS s
            INNER JOIN recordings_text.pub_{$publication_id} AS p
                ON p.segment_id = s.id
                AND p.pub_id = s.pub_id
                AND {$from} <= DATE_ADD(s.start_segment_datetime, INTERVAL p.start_time second)
                AND {$to} >= DATE_ADD(s.start_segment_datetime, INTERVAL p.start_time second)
            WHERE 1
                AND s.id >= (
                    SELECT
                        id
                    FROM recordings_text.segments
                    WHERE 1
                        AND start_segment_datetime <= {$from}
                    ORDER BY
                        id
                        DESC
                    LIMIT 1
                )
                AND s.id <= (
                    SELECT
                        id
                    FROM recordings_text.segments
                    WHERE 1
                        AND start_segment_datetime <= {$to}
                    ORDER BY
                        id
                        DESC
                    LIMIT 1
                )
                AND s.pub_id = {$publication_id}
                GROUP BY
                    p.id
                ORDER BY
                    s.id,
                    p.date,
                    p.start_time
                    ASC
            "
        ];
    }

}
