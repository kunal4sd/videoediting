<?php

namespace App\Modules\Test\Entities\Repository\Database;

use \PDO;
use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Video\Entities\ActiveRecords\TextAR;
use App\Modules\Video\Entities\ActiveRecords\SearchTextAR;

class TextDB extends AbstractDatabase
{
    /**
     * @param int $segmentId
     * @param int $publicationId
     * @return TextAR[]
     */
    public function getTexts(int $segmentId, int $publicationId): array
    {
        $params = [
            'segment_id'    => $segmentId,
        ];

        $sql = "SELECT
                p.*, s.*
            FROM segments AS s
            INNER JOIN pub_{$publicationId} AS p
                ON p.segment_id = s.id
                AND p.pub_id = s.pub_id
            WHERE 1
                AND s.id = :segment_id
            GROUP BY
                p.id
            ORDER BY
                s.start_segment_datetime,
                p.start_time
                ASC";

        return $this->db->fetch_all($sql, $params);
    }

    /**
     * @param int $publicationId
     * @param string $startDate
     * @param string $endDate
     * @param int $limit
     * @return TextAR[]
     */
    public function getSegments(int $publicationId, string $startDate, string $endDate, int $limit): array
    {
        $params = [
            'publication_id'    => $publicationId,
            'start_date'        => $startDate,
            'end_date'          => $endDate,
//            'limit'             => $limit,
        ];

        $sql = "
        SELECT * FROM `segments`
        WHERE
              pub_id = :publication_id
          AND start_segment_datetime >= :start_date
          AND end_segment_datetime <= :end_date
        ORDER BY id
        LIMIT 100
                ";

        return $this->db->fetch_all($sql, $params);
    }
}
