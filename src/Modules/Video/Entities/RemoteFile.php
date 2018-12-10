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

class Article extends ModuleAbstract
{

    /**
     * @return string[]|string[][]
     */
    public function get_status_values($with_class = false)
    {
        $result = (new ArticleDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->get_status_values();

        if ($with_class) {
            foreach($result as &$status) {
                $status = [
                    'name' => $status,
                    'class' => $this->get_article_status_class($status)
                ];
            }
        }

        return $result;
    }

    /**
     * @param int $article_id
     * @throws Exception : number of affected rows is different than 1
     * @return bool
     */
    public function delete_by_id($article_id)
    {

        $article_db = new ArticleDB($this->db[Hosts::LOCAL][Dbs::MAIN]);
        $rows = $article_db->delete_by_id_and_user(
            $article_id, $this->session_user->get_user()->id
        );
        if ($rows === 1) {
            (new ArticleKeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
                ->delete_by_article_id($article_id);
            (new MovieDisk($this->container))->delete_by_id($article_id);

            return true;
        }
        else {
            throw new Exception(
                sprintf(
                    "Unexpected number of affected rows returned on Article deletion: %s",
                    $rows
                ),
                400
            );
        }

        return false;
    }

    /**
     * @param int $id
     * @param int $publication_id
     * @return ArticleAR[]
     */
    public function get_by_id_and_user($id, $user_id)
    {
        return (new ArticleDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
            ->get_by_id_and_user($id, $user_id);
    }

    /**
     * @param string $from : start date
     * @param string $to : end date
     * @param int $user_id
     * @return ArticleAR[]
     */
    public function get_for_interval_by_user(
        $from,
        $to,
        $user_id,
        $order_desc = false
    )
    {
        return (new ArticleDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
            ->get_for_interval_by_user($from, $to, $user_id, $order_desc);
    }

    /**
     * @param string $from : start date
     * @param string $to : end date
     * @param int $user_id
     * @param int|array $publication_id
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

        if (!is_array($publication_id)) {
            $publication_id = [$publication_id];
        }

        return (new ArticleDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
            ->get_for_interval_by_user_and_publication(
                $from, $to, $user_id, $publication_id, $order_desc
            );
    }

    /**
     * @throws Exception
     * @return int
     */
    public function save_media(ArticleAR $article_ar)
    {

        $insert_id = (new ArticleDB($this->db[Hosts::MEDIA][Dbs::MEDIA]))->save($article_ar);

        if (is_null($insert_id)) {
            throw new Exception("Failed saving article", 400);
        }

        return $insert_id;
    }

    /**
     * @throws Exception
     * @return int
     */
    public function save(ArticleAR $article_ar)
    {

        $insert_id = (new ArticleDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->save($article_ar);

        if (is_null($insert_id)) {
            throw new Exception("Failed saving article", 400);
        }

        return $insert_id;
    }

}
