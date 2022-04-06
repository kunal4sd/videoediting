<?php

namespace App\Modules\Article\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Article\Entities\ActiveRecords\KeywordAR;
use \PDO;
use \Exception;

class KeywordDB extends AbstractDatabase
{

    /**
     * @param string $name
     * @return KeywordAR[]
     */
    public function search_by_name($name)
    {
        $result = [];

        $data = $this->db->fetch_all(
            "
                SELECT
                    *
                FROM keyword
                WHERE 1
                    AND (
                        name_en like :name
                        OR name_ar like :name
                    )
            ",
            [
                'name' => ["%{$name}%", PDO::PARAM_STR]
            ]
        );

        foreach($data as $row) {
            $result[] = new KeywordAR($row);
        }

        return $result;
    }

    /**
     * @param string $name
     * @return KeywordAR[]
     */
    public function search_by_name_media($name)
    {
        $result = [];

        $data = $this->db->fetch_all(
            "
                SELECT
                    k.*
                FROM keyword AS k
                INNER JOIN customer_keyword AS ck
                    ON ck.keyword_id = k.id
                INNER JOIN customer AS c
                    ON c.id = ck.customer_id
                    AND c.expiry_date >= NOW()
                INNER JOIN customer_mediatype AS cmt
                    ON cmt.customer_id = c.id
                    AND (
                        cmt.publication_types LIKE '%3%'
                        OR cmt.publication_types LIKE '%4%'
                    )
                WHERE 1
                    AND (
                        k.name_en like :name
                        OR k.name_ar like :name
                    )
                    AND k.active = 1
                GROUP BY
                    k.id
            ",
            [
                'name' => ["%{$name}%", PDO::PARAM_STR]
            ]
        );

        foreach($data as $row) {
            $result[] = new KeywordAR($row);
        }

        return $result;
    }

    /**
     * @param int $id
     * @return KeywordAR
     */
    public function get_by_id(int $id): KeywordAR
    {
        $data = $this->db->fetch(
            "
                SELECT
                    *
                FROM keyword
                WHERE 1
                    AND id = :id
            ",
            [
                'id' => $id
            ]
        );

        return new KeywordAR($data);
    }

    /**
     * @param int[] $id
     * @return KeywordAR[] [id => KeywordAR]
     */
    public function get_by_ids(array $ids): array
    {
        $result = [];
        if (empty($ids)) return $result;

        $params = array_map(function($id) { return sprintf('id_%s', $id); }, $ids);
        $data = $this->db->fetch_all(
            sprintf(
                "
                    SELECT
                        *
                    FROM keyword
                    WHERE 1
                        AND id IN (:%s)
                ",
                implode(',:', $params)
            ),
            array_combine($params, $ids)
        );

        foreach($data as $row) {
            $result[$row['id']] = new KeywordAR($row);
        }

        return $result;
    }

}
