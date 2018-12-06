<?php

namespace App\Modules\Video\Entities;

use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Video\Entities\ActiveRecords\PlaylistAR;
use App\Modules\Article\Entities\ActiveRecords\ArticleAR;
use \Exception;
use Slim\Http\Request;

class Movie extends ModuleAbstract
{

    /**
     * @param ArticleAR[] $articles_ar
     * @throws Exception
     * @return string[][]
     */
    public function get_movies_for_output(array $articles_ar)
    {

        $result = [];

        foreach($articles_ar as $article_ar) {
            $result[] = $this->get_movie_for_output($article_ar);
        }

        return $result;
    }

    /**
     * @param ArticleAR $article_ar
     * @throws Exception
     * @return string[]
     */
    public function get_movie_for_output(ArticleAR $article_ar)
    {

        $result = [];

        $movie_path = PlaylistAR::build_movie_path($article_ar->id);
        $keywords_en = $this->entity_keyword->get_keywords_name_en_by_article_id($article_ar->id);
        $publication_ar = $this->entity_publication->get_by_id($article_ar->publication_id);

        $result = [
            'download' => $this->container
                ->get('router')
                ->pathFor('video.action.download_movie', ['article_id' => $article_ar->id]),
            'src' => PlaylistAR::path_to_url($movie_path),
            'id' => $article_ar->id,
            'created' => $article_ar->created,
            'issue_datetime' => sprintf('%s %s', $article_ar->issue_date, $article_ar->broadcast_time),
            'issue_date' => $article_ar->issue_date,
            'broadcast_time' => $article_ar->broadcast_time,
            'file_size' => human_filesize( (int) @filesize( $movie_path ) ),
            'duration' => seconds_to_time($article_ar->duration),
            'headline' => $article_ar->headline,
            'text' => $article_ar->text,
            'status' => $article_ar->status,
            'keywords' => implode(', ', $keywords_en),
            'publication' => $publication_ar->name_en
        ];

        return $result;
    }

}
