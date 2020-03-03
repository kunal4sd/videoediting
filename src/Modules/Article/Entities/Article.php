<?php

namespace App\Modules\Article\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Article\Entities\ActiveRecords\ArticleAR;
use App\Modules\Article\Entities\Repository\Database\ArticleDB;
use App\Modules\Article\Entities\Repository\Database\ArticleKeywordDB;
use App\Modules\Video\Entities\Files\VideoFile;
use \Exception;

class Article extends AbstractModule
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
        $article_ar = $this->entity_article->get_by_id($article_id);
        $rows = $article_db->delete_by_id($article_id);
        if ($rows === 1) {
            (new ArticleKeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
                ->delete_by_article_id($article_id);
            $this->entity_playlist->delete_file_by_path(
                (new VideoFile())->set_locations(VideoFile::build_movie_path($article_ar))
            );

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
     * @return ArticleAR[]
     */
    public function get_by_id($id)
    {
        return (new ArticleDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->get_by_id($id);
    }

    /**
     * @param string $from : start date
     * @param string $to : end date
     * @return ArticleAR[]
     */
    public function get_for_interval(
        $from,
        $to,
        $order_desc = false
    )
    {
        return (new ArticleDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
            ->get_for_interval($from, $to, $order_desc);
    }

    /**
     * @param string $from : start date
     * @param string $to : end date
     * @param int|array $publication_id
     * @return ArticleAR[]
     */
    public function get_for_interval_by_publication(
        $from,
        $to,
        $publication_id,
        $order_desc = false
    )
    {

        if (!is_array($publication_id)) {
            $publication_id = [$publication_id];
        }

        return (new ArticleDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
            ->get_for_interval_by_publication(
                $from, $to, $publication_id, $order_desc
            );
    }

    /**
     * @throws Exception
     * @return int
     */
    public function save_media(ArticleAR $article_ar)
    {

        $clone = clone $article_ar;
        $clone->file_size = null;
        $insert_id = (new ArticleDB($this->db[Hosts::MEDIA][Dbs::MEDIA]))->save($clone);

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

        $clone = clone $article_ar;
        $clone->headline_modified = null;
        $insert_id = (new ArticleDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->save($clone);

        if (is_null($insert_id)) {
            throw new Exception("Failed saving article", 400);
        }

        return $insert_id;
    }

}
