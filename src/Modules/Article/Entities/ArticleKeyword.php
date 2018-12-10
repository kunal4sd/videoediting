<?php

namespace App\Modules\Article\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Video\Entities\Repository\Disk\MovieDisk;
use App\Modules\Article\Entities\ActiveRecords\ArticleAR;
use App\Modules\Article\Entities\Repository\Database\ArticleDB;
use App\Modules\Article\Entities\Repository\Database\ArticleKeywordDB;
use \Exception;

class ArticleKeyword extends ModuleAbstract
{
    /**
     * @param int
     * @return int
     */
    public function delete_by_article_id($article_id)
    {
        return (new ArticleKeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
            ->delete_by_article_id($article_id);
    }

    /**
     * @param ArticleKeywordAR[]
     * @return int
     */
    public function save_multiple_media(array $article_keywords_ar)
    {
        return (new ArticleKeywordDB($this->db[Hosts::MEDIA][Dbs::MEDIA]))
            ->save_multiple($article_keywords_ar);
    }

    /**
     * @param ArticleKeywordAR[]
     * @return int
     */
    public function save_multiple(array $article_keywords_ar)
    {
        return (new ArticleKeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
            ->save_multiple($article_keywords_ar);
    }

}
