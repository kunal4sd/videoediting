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
                AND DATE_ADD(s.start_segment_datetime, INTERVAL p.end_time second) >= :from
                AND DATE_ADD(s.start_segment_datetime, INTERVAL p.start_time second) <= :to
            WHERE 1
                AND s.id IN (
                    SELECT
                        CONCAT_WS(',', id)
                    FROM segments
                    WHERE 1
                        AND start_segment_datetime >= DATE_SUB(:from, INTERVAL 600 second)
                        AND start_segment_datetime <= :to
                        AND pub_id = :publication_id
                )
                AND s.pub_id = :publication_id
                AND s.start_segment_datetime >= DATE_SUB(:from, INTERVAL 600 second)
                AND s.start_segment_datetime <= :to
            GROUP BY
                p.id
            ORDER BY
                s.start_segment_datetime,
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
                AND DATE_ADD(s.start_segment_datetime, INTERVAL p.end_time second) >= '{$from}'
                AND DATE_ADD(s.start_segment_datetime, INTERVAL p.start_time second) <= '{$to}'
            WHERE 1
                AND s.id IN (
                    SELECT
                        CONCAT_WS(',', id)
                    FROM segments
                    WHERE 1
                        AND start_segment_datetime >= DATE_SUB('{$from}', INTERVAL 600 second)
                        AND start_segment_datetime <= '{$to}'
                        AND pub_id = {$publication_id}
                    ORDER BY
                        id
                        DESC
                )
                AND s.pub_id = {$publication_id}
                AND s.start_segment_datetime >= DATE_SUB('{$from}', INTERVAL 600 second)
                AND s.start_segment_datetime <= '{$to}'
            GROUP BY
                p.id
            ORDER BY
                s.start_segment_datetime,
                p.start_time
                ASC
            "
        ];
    }

    /**
     * @param string $from : start date
     * @param string $to : end date
     * @param int $publication_id
     * @return TextAR[]
     */
    public function get_playlist_texts_timeshift(
        string $from,
        string $to,
        int $publication_id,
        int $interval
    )
    {
        $params = [
            'from'              => $from,
            'to'                => $to,
            'publication_id'    => [$publication_id, PDO::PARAM_INT],
            'interval'          => [$interval, PDO::PARAM_INT],
        ];

        $sql = "
            SELECT
                p.*, s.*
            FROM segments AS s
            INNER JOIN pub_{$publication_id} AS p
                ON p.segment_id = s.id
                AND p.pub_id = s.pub_id
                AND DATE_ADD(s.start_segment_datetime, INTERVAL p.end_time second) >= :from
                AND DATE_ADD(s.start_segment_datetime, INTERVAL p.start_time second) <= :to
            WHERE 1
                AND s.id IN (
                    SELECT
                        id
                    FROM segments
                    WHERE 1
                        AND start_segment_datetime >= DATE_SUB(:from, INTERVAL :interval second)
                        AND start_segment_datetime <= :to
                        AND pub_id = :publication_id
                )
                AND s.pub_id = :publication_id
                AND s.start_segment_datetime >= DATE_SUB(:from, INTERVAL :interval second)
                AND s.start_segment_datetime <= :to
                AND p.start_time > 0
            GROUP BY
                p.id
            ORDER BY
                s.start_segment_datetime,
                p.start_time
                ASC
            ";

        return $this->db->fetch_all($sql, $params);
    }

    /**
     * @param string $start_date
     * @param string $end_date
     * @param array $publication_ids
     * @param array $countries
     * @param string $text
     * @return SearchTextAR[]
     */
    public function get_search_text(string $start_date, string $end_date, array $publication_ids, array $countries, string $text): array
    {
        $result = [];
        $params = [
            'start_date' => [strtotime($start_date), PDO::PARAM_INT],
            'end_date' => [strtotime($end_date), PDO::PARAM_INT],
        ];

        foreach($publication_ids as $id) {
            $key = "id_{$id}";
            $params[$key] = [intval($id), PDO::PARAM_INT];
        }

        foreach($countries as $iso) {
            $key = "iso_{$iso}";
            $params[$key] = [$iso, PDO::PARAM_STR];
        }
        $sql = "    SELECT
                        *
                    FROM recordings_text
                    WHERE
                        date >= :start_date
                        AND date <= :end_date
                ";

        if ($publication_ids) { // If countries exist
            $sql .= sprintf(" AND pub_id IN (%s)", ":id_" . implode(', :id_', $publication_ids));
        }
        if ($countries) { // If countries exist
            $sql .= sprintf(" AND country IN (%s)", ":iso_" . implode(", :iso_", $countries));
        }
        $sql .= " AND MATCH('@text {$text}')
                    ORDER BY id desc
                    LIMIT 1000";

        $data = $this->db->fetch_all($sql, $params);

        foreach($data as $row) {
            $row['text'] = $text;
            $search_text_ar = new SearchTextAR($row);

            $search_text_ar->date = date("Y-m-d H:i:s", intval($search_text_ar->date));
            $result[] = $search_text_ar;
        }

        return $result;
    }

}
