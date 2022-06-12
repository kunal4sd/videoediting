<?php

namespace App\Modules\Article\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Article\Entities\ActiveRecords\ArticleKeywordAR;
use App\Modules\Article\Entities\Repository\Database\ArticleDB;
use App\Modules\Article\Entities\Repository\Database\ArticleKeywordDB;
use \Exception;

class ArticleKeyword extends AbstractModule
{

    /**
     * @param int[] $article_ids
     * @return ArticleKeywordAR[]
     */
    public function get_by_article_ids_media(array $article_ids): array
    {
        return (new ArticleKeywordDB($this->db[Hosts::MEDIA][Dbs::MEDIA]))->get_by_article_ids($article_ids);
    }

    /**
     * @param int[] $article_ids
     * @return ArticleKeywordAR[]
     */
    public function get_by_article_ids(array $article_ids): array
    {
        return (new ArticleKeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->get_by_article_ids($article_ids);
    }

    /**
     * @param int $article_id
     * @return ArticleKeywordAR[]
     */
    public function get_by_article_id_media(int $article_id): array
    {
        return (new ArticleKeywordDB($this->db[Hosts::MEDIA][Dbs::MEDIA]))->get_by_article_id($article_id);
    }

    /**
     * @param int $article_id
     * @return ArticleKeywordAR[]
     */
    public function get_by_article_id(int $article_id): array
    {
        return (new ArticleKeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->get_by_article_id($article_id);
    }

    /**
     * @param int $id
     * @return ArticleKeywordAR
     */
    public function get_by_id_media(int $id): ArticleKeywordAR
    {
        return (new ArticleKeywordDB($this->db[Hosts::MEDIA][Dbs::MEDIA]))->get_by_id($id);
    }

    /**
     * @param int $id
     * @return ArticleKeywordAR
     */
    public function get_by_id(int $id): ArticleKeywordAR
    {
        return (new ArticleKeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->get_by_id($id);
    }

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