<?php

namespace App\Modules\Article\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Article\Entities\ActiveRecords\ArticleKeywordAR;
use \PDO;
use \Exception;

class ArticleKeywordDB extends AbstractDatabase
{

    /**
     * @param int $id
     * @return ArticleKeywordAR[]
     */
    public function get_by_article_id(int $article_id): array
    {
        $result = [];
        $data = $this->db->fetch(
            "
                SELECT
                    *
                FROM article_keyword
                WHERE 1
                    AND article_id = :article_id
            ",
            [
                'article_id' => $article_id
            ]
        );

        foreach($data as $row) {
            $result[] = new ArticleKeywordAR($row);
        }

        return $result;
    }

    /**
     * @param int $id
     * @return ArticleKeywordAR
     */
    public function get_by_id(int $id): ArticleKeywordAR
    {
        $data = $this->db->fetch(
            "
                SELECT
                    *
                FROM article_keyword
                WHERE 1
                    AND id = :id
            ",
            [
                'id' => $id
            ]
        );

        return new ArticleKeywordAR($data);
    }

    /**
     * @param int $article_id
     * @return int nb of affected rows
     */
    public function delete_by_article_id(int $article_id): int
    {

        return $this->db->row_count(
            "
                DELETE FROM article_keyword
                WHERE 1
                    AND article_id = :id
            ",
            [
                'id' => [$article_id, PDO::PARAM_INT]
            ]
        );
    }

    /**
     * @param ArticleKeywordAR[]
     * @return int nb of insertedd rows
     */
    public function save_multiple(array $article_keywords_ar): int
    {

        if (empty($article_keywords_ar)) return 0;

        $counter = 0;
        $rows_counter = 0;
        $article_keyword_fields = [];
        $values = [];
        $rows = [];
        foreach($article_keywords_ar as $article_keyword_ar) {

            $article_keyword_array = array_filter($article_keyword_ar->build_to_array(), function($val) {
                return !is_null($val);
            });

            if (empty($article_keyword_fields)) {
                $article_keyword_fields = array_keys($article_keyword_array);
            }

            foreach($article_keyword_array as $field => $value) {
                $values["{$field}_{$counter}"] = $value;
                $rows[$rows_counter][] = ":{$field}_{$counter}";
                $counter++;
            }
            $rows_counter++;
        }

        return $this->db->row_count(
            sprintf(
                "
                    INSERT INTO article_keyword
                    (
                        %s
                    )
                    VALUES
                    (
                        %s
                    )
                ",
                implode(',', $article_keyword_fields),
                implode('), (', array_map( function($row) { return implode(',', $row); }, $rows ))
            ),
            $values
        );
    }

}
