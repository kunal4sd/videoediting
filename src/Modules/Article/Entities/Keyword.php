<?php

namespace App\Modules\Article\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Article\Entities\ActiveRecords\KeywordAR;
use App\Modules\Article\Entities\Repository\Database\KeywordDB;
use \Exception;

class Keyword extends ModuleAbstract
{

    /**
     * @param string $name
     * @return KeywordAR[]
     */
    public function search_by_name($name)
    {
        $result = [];

        $keywords_ar = (new KeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->search_by_name($name);

        foreach($keywords_ar as $keyword_ar) {
            $result[] = $keyword_ar;
        }

        return $result;
    }

    /**
     * @param int $article_id
     * @return KeywordAR[]
     */
    public function get_by_article_id($article_id)
    {

        $result = [];

        $keywords_ar = (new KeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
            ->get_by_article_id($article_id);

        foreach($keywords_ar as $keyword_ar) {
            $result[] = $keyword_ar;
        }

        return $result;
    }

    /**
     * @param int $article_id
     * @return string[]
     */
    public function get_keywords_name_en_by_article_id($article_id)
    {

        $result = [];

        $keywords_ar = (new KeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
            ->get_by_article_id($article_id);

        foreach($keywords_ar as $keyword_ar) {
            $result[] = $keyword_ar->name_en;
        }

        return $result;
    }

}
