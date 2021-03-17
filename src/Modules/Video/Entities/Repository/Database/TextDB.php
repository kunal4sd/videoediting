<?php

namespace App\Modules\Video\Entities\Repository\Database;

use \PDO;
use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Video\Entities\ActiveRecords\TextAR;
use App\Modules\Video\Entities\ActiveRecords\SearchTextAR;

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
            FROM segments AS s
            INNER JOIN pub_{$publication_id} AS p
                ON p.segment_id = s.id
                AND p.pub_id = s.pub_id
                AND :from <= DATE_ADD(s.start_segment_datetime, INTERVAL p.end_time second)
                AND :to >= DATE_ADD(s.start_segment_datetime, INTERVAL p.start_time second)
            WHERE 1
                AND s.id >= (
                    SELECT
                        id
                    FROM segments
                    WHERE 1
                        AND start_segment_datetime <= :from
                        AND pub_id = :publication_id
                    ORDER BY
                        id
                        DESC
                    LIMIT 1
                )
                AND s.id <= (
                    SELECT
                        id
                    FROM segments
                    WHERE 1
                        AND start_segment_datetime <= :to
                        AND pub_id = :publication_id
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
            FROM segments AS s
            INNER JOIN pub_{$publication_id} AS p
                ON p.segment_id = s.id
                AND p.pub_id = s.pub_id
                AND '{$from}' <= DATE_ADD(s.start_segment_datetime, INTERVAL p.end_time second)
                AND '{$to}' >= DATE_ADD(s.start_segment_datetime, INTERVAL p.start_time second)
            WHERE 1
                AND s.id >= (
                    SELECT
                        id
                    FROM segments
                    WHERE 1
                        AND start_segment_datetime <= '{$from}'
                        AND pub_id = {$publication_id}
                    ORDER BY
                        id
                        DESC
                    LIMIT 1
                )
                AND s.id <= (
                    SELECT
                        id
                    FROM segments
                    WHERE 1
                        AND start_segment_datetime <= '{$to}'
                        AND pub_id = {$publication_id}
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

    /**
     * @param string $start_date
     * @param string $end_date
     * @param integer $publication_id
     * @param string $text
     * @return SearchTextAR[]
     */
    public function get_search_text(
        string $start_date,
        string $end_date,
        int $publication_id,
        string $text
    )
    {

        $result = [];
        $params = [
            'start_date' => [strtotime($start_date), PDO::PARAM_INT],
            'end_date' => [strtotime($end_date), PDO::PARAM_INT],
            'publication_id' => [$publication_id, PDO::PARAM_INT]
        ];

        $data = $this->db->fetch_all(
            "
            SELECT
                *
            FROM pub_{$publication_id}
            WHERE
                date >= :start_date
                AND date <= :end_date
                AND pub_id = :publication_id
                AND MATCH('@text {$text}')
            ",
            $params
        );

        foreach($data as $row) {
            $row['text'] = $text;
            $result[] = new SearchTextAR($row);
        }

        return $result;
    }

}
