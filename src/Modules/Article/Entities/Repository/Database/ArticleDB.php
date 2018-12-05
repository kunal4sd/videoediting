<?php

namespace App\Modules\Article\Entities\Repository\Database;

use App\Libs\Enums\Hosts;
use App\Libs\Enums\Dbs;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Article\Entities\ActiveRecords\ArticleAR;
use \PDO;
use \Exception;

class ArticleDB extends ModuleAbstract
{

    /**
     * @param string $from : start date
     * @param string $to : end date
     * @param int $user_id
     * @param int $publication_id
     * @return ArticleAR[]
     */
    public function get_for_interval_by_user_and_publication(
        $from,
        $to,
        $user_id,
        $publication_id,
        $order_desc = false
    )
    {

        $result = [];
        $order = 'ASC';

        if ($order_desc) {
            $order = 'DESC';
        }

        $data = $this->db[Hosts::LOCAL][Dbs::MAIN]->fetch_all(
            sprintf(
                "
                    SELECT
                        *
                    FROM article
                    WHERE 1
                        AND issue_date >= DATE_FORMAT(:from, '%%Y-%%m-%%d')
                        AND issue_date <= DATE_FORMAT(:to, '%%Y-%%m-%%d')
                        AND publication_id = :publication_id
                        AND created_by = :user_id
                    ORDER BY
                        id
                        %s
                ",
                $order
            ),
            [
                'from' => $from,
                'to' => $to,
                'publication_id' => [$publication_id, PDO::PARAM_INT],
                'user_id' => [$user_id, PDO::PARAM_INT]
            ]
        );

        foreach($data as $row) {
            $result[] = new ArticleAR($row);
        }

        return $result;
    }

    /**
     * @param int $article_id
     * @param int $user_id
     * @return ArticleAR
     */
    public function get_by_id_and_user($article_id, $user_id)
    {

        $data = $this->db[Hosts::LOCAL][Dbs::MAIN]->fetch(
            "
                SELECT
                    *
                FROM article
                WHERE 1
                    AND id = :id
                    AND created_by = :user_id
            ",
            [
                'id' => [$article_id, PDO::PARAM_INT],
                'user_id' => [$user_id, PDO::PARAM_INT]
            ]
        );

        return new ArticleAR($data);
    }

    /**
     * @param int $article_id
     * @param int $user_id
     * @return int nb of affected rows
     */
    public function delete_by_id_and_user($article_id, $user_id)
    {

        return $this->db[Hosts::LOCAL][Dbs::MAIN]->row_count(
            "
                DELETE FROM article
                WHERE 1
                    AND id = :id
                    AND created_by = :user_id
            ",
            [
                'id' => [$article_id, PDO::PARAM_INT],
                'user_id' => [$user_id, PDO::PARAM_INT]
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

        return $this->db[Hosts::LOCAL][Dbs::MAIN]->insert_id(
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
