<?php

namespace App\Modules\Article\Entities\Repository\Database;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Article\Entities\ActiveRecords\KeywordAR;
use \PDO;
use \Exception;

class KeywordDB extends ModuleAbstract
{

    /**
     * @param string $name
     * @return KeywordAR[]
     */
    public function search_by_name($name)
    {
        $result = [];

        $data = $this->db[Hosts::LOCAL][Dbs::MAIN]->fetch_all(
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
     * @param int $id
     * @return KeywordAR[]
     */
    public function get_by_article_id($id)
    {
        $result = [];

        $data = $this->db[Hosts::LOCAL][Dbs::MAIN]->fetch_all(
            "
                SELECT
                    keyword.*
                FROM keyword
                INNER JOIN article_keyword
                    ON article_keyword.keyword_id = keyword.id
                    AND article_keyword.article_id = :article_id
            ",
            [
                'article_id' => $id
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
    public function get_by_id($id)
    {
        $data = $this->db[Hosts::LOCAL][Dbs::MAIN]->fetch(
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

}
