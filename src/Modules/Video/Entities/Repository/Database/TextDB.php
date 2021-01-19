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
                pub_{$publication_id}.*
            FROM segments AS s
            INNER JOIN pub_{$publication_id} AS p
                on p.segment_id = s.id
                AND p.pub_id = s.pub_id
            WHERE 1
                AND s.start_segment_datetime >= :from
                AND s.end_segment_datetime <= :to
                AND s.pub_id = :publication_id
            ORDER BY
                CONCAT_WS(' ', p.date, p.start_time)
                ASC
            ",
            $params
        );

        foreach($data as $row) {
            $result[] = new TextAR($row);
        }

        return $result;
    }

}
