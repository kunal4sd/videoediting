<?php

namespace App\Modules\Article\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Article\Entities\ActiveRecords\ArticleAR;
use \PDO;

class ArticleDB extends AbstractDatabase
{

    /**
     * @return string[]
     */
    public function get_status_values()
    {

        $matches = [];
        $type = $this->db->fetch_column(
            '
                SHOW COLUMNS
                FROM article
                WHERE 1
                    AND Field = "status"
            ',
            [],
            1
        );
        preg_match("/^enum\(\'(.*)\'\)$/", $type, $matches);

        return explode("','", $matches[1]);
    }

    /**
     * @param string $from : start date
     * @param string $to : end date
     * @return ArticleAR[]
     */
    public function get_for_interval(
        $from,
        $to,
        $order_desc = false
    )
    {

        $result = [];
        $order = 'ASC';

        if ($order_desc) {
            $order = 'DESC';
        }

        $data = $this->db->fetch_all(
            sprintf(
                "
                    SELECT
                        *
                    FROM article
                    WHERE 1
                        AND issue_date >= DATE_FORMAT(:from, '%%Y-%%m-%%d')
                        AND issue_date <= DATE_FORMAT(:to, '%%Y-%%m-%%d')
                    ORDER BY
                        id
                        %s
                ",
                $order
            ),
            [
                'from' => $from,
                'to' => $to
            ]
        );

        foreach($data as $row) {
            $result[] = new ArticleAR($row);
        }

        return $result;
    }

    /**
     * @param string $from : start date
     * @param string $to : end date
     * @param array $publication_ids
     * @return ArticleAR[]
     */
    public function get_for_interval_by_publication(
        $from,
        $to,
        $publication_ids,
        $order_desc = false
    )
    {

        $result = [];
        $order = 'ASC';

        if ($order_desc) {
            $order = 'DESC';
        }


        $params = [
            'from' => $from,
            'to' => $to
        ];

        $in = [];
        foreach($publication_ids as $id) {
            $key = "id_{$id}";
            $in[] = ":{$key}";
            $params[$key] = [$id, PDO::PARAM_INT];
        }

        $data = $this->db->fetch_all(
            sprintf(
                "
                    SELECT
                        *
                    FROM article
                    WHERE 1
                        AND issue_date >= DATE_FORMAT(:from, '%%Y-%%m-%%d')
                        AND issue_date <= DATE_FORMAT(:to, '%%Y-%%m-%%d')
                        AND publication_id IN (%1\$s)
                    ORDER BY
                        id
                        %2\$s
                ",
                implode(',', $in),
                $order
            ),
            $params
        );

        foreach($data as $row) {
            $result[] = new ArticleAR($row);
        }

        return $result;
    }

    /**
     * @param int $article_id
     * @return ArticleAR
     */
    public function get_by_id($article_id)
    {

        $data = $this->db->fetch(
            "
                SELECT
                    *
                FROM article
                WHERE 1
                    AND id = :id
            ",
            [
                'id' => [$article_id, PDO::PARAM_INT]
            ]
        );

        return new ArticleAR($data);
    }

    /**
     * @param int $article_id
     * @return int nb of affected rows
     */
    public function delete_by_id($article_id)
    {

        return $this->db->row_count(
            "
                DELETE FROM article
                WHERE 1
                    AND id = :id
            ",
            [
                'id' => [$article_id, PDO::PARAM_INT]
            ]
        );
    }

    /**
     * Updating of existing rows is made based on the tables Primary Key (column `id`)
     * @param ArticleAR
     * @return int id of inserted row
     */
    public function save(ArticleAR $article)
    {

        $article_array = array_filter($article->build_to_array(), function($val) {
            return !is_null($val);
        });
        $article_fields = array_keys($article_array);

        return $this->db->insert_id(
            sprintf(
                "
                    INSERT INTO article
                    (
                        %s
                    )
                    VALUES
                    (
                        %s
                    )
                    ON DUPLICATE KEY UPDATE
                        %s
                ",
                implode(',', $article_fields),
                implode(',', array_map( function($val) { return ":{$val}"; }, $article_fields )),
                implode(',', array_map(
                    function($val) { return sprintf('%1$s=VALUES(%1$s)', $val); },
                    $article_fields
                ))
            ),
            $article_array
        );
    }

}
