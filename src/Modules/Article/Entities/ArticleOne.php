<?php

namespace App\Modules\Article\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Article\Entities\ActiveRecords\ArticleOneAR;
use App\Modules\Article\Entities\Repository\Database\ArticleOneDB;
use \Exception;

class ArticleOne extends AbstractModule
{

    /**
     * @throws Exception
     * @return int
     */
    public function save(ArticleOneAR $article_one_ar)
    {

        $insert_id = (new ArticleOneDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->save($article_one_ar);

        if (is_null($insert_id)) {
            throw new Exception("Failed saving article_one", 400);
        }

        return $insert_id;
    }

}
