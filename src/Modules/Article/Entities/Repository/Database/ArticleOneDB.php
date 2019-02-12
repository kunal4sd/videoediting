<?php

namespace App\Modules\Article\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Article\Entities\ActiveRecords\ArticleOneAR;
use \PDO;
use \Exception;

class ArticleOneDB extends AbstractDatabase
{

    /**
     * Updating of existing rows is made based on the tables Primary Key (column `id`)
     * @param ArticleOneAR
     * @return int id of inserted row
     */
    public function save(ArticleOneAR $article_one_ar)
    {

        $article_one_array = array_filter($article_one_ar->build_to_array(), function($val) {
            return !is_null($val);
        });
        $article_one_fields = array_keys($article_one_array);

        return $this->db->insert_id(
            sprintf(
                "
                    INSERT INTO article1
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
                implode(',', $article_one_fields),
                implode(',', array_map( function($val) { return ":{$val}"; }, $article_one_fields )),
                implode(',', array_map(
                    function($val) { return sprintf('%1$s=VALUES(%1$s)', $val); },
                    $article_one_fields
                ))
            ),
            $article_one_array
        );
    }

}
