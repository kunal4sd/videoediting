<?php

namespace App\Modules\Article\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Article\Entities\ActiveRecords\KeywordAR;
use App\Modules\Article\Entities\Repository\Database\KeywordDB;
use \Exception;

class Keyword extends AbstractModule
{

    /**
     * @param string $name
     * @return KeywordAR[]
     */
    public function search_by_name($name)
    {
        return (new KeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->search_by_name($name);
    }

    /**
     * @param string $name
     * @return KeywordAR[]
     */
    public function search_by_name_media($name)
    {
        $result = [];

        $keywords_ar_media = (new KeywordDB($this->db[Hosts::MEDIA][Dbs::MEDIA]))
            ->search_by_name_media($name);
        $keywords_ar = $this->search_by_name($name);
        $keywords_ids = array_map(
            function($keyword_ar) { return $keyword_ar->id; },
            $keywords_ar
        );
        $keywords_names = array_map(
            function($keyword_ar) { return $keyword_ar->name_en; },
            $keywords_ar
        );

        // this filters the keywords and makes sure the ones returned are present in both local
        // and media databases, with same name having same id on both databases
        foreach($keywords_ar_media as $keyword_ar) {
            if (
                in_array($keyword_ar->id, $keywords_ids)
                && in_array($keyword_ar->name_en, $keywords_names)
            ) {
                $target = array_search($keyword_ar->id, $keywords_ids);
                $target_ar = $keywords_ar[$target];
                if ($target_ar->name_en === $keyword_ar->name_en) {
                    $result[] = $keyword_ar;
                }
            }
        }

        return $result;
    }

    /**
     * @param int $article_id
     * @return KeywordAR[]
     */
    public function get_by_article_id($article_id)
    {
        return (new KeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
            ->get_by_article_id($article_id);
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
