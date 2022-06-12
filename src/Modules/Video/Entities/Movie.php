<?php

namespace App\Modules\Video\Entities;

use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Files\VideoFile;
use App\Modules\Article\Entities\ActiveRecords\ArticleAR;
use \Exception;

class Movie extends AbstractModule
{

    /**
     * @param ArticleAR[] $articles_ar
     * @throws Exception
     * @return string[][]
     */
    public function get_movies_for_output(array $articles_ar)
    {

        $result = [];
        $article_ids = array_map(function($article_ar) { return $article_ar->id; }, $articles_ar);
        $article_keywords_ar = $this->entity_article_keyword->get_by_article_ids($article_ids);
        $keyword_ids = array_map(
            function($article_keyword_ar) {
                return $article_keyword_ar->keyword_id;
            },
            $article_keywords_ar
        );
        $keywords_ar = $this->entity_keyword->get_by_ids_media($keyword_ids);

        $article_to_keywords = [];
        foreach ($article_keywords_ar as $article_keyword_ar) {
            $article_id = $article_keyword_ar->article_id;
            $keyword_id = $article_keyword_ar->keyword_id;
            if (!isset($article_to_keywords[$article_id])) {
                $article_to_keywords[$article_id] = [
                    'ids' => [],
                    'names' => []
                ];
            }
            $article_to_keywords[$article_id]['ids'][] = $keywords_ar[$keyword_id]->id ?? 0;
            $article_to_keywords[$article_id]['names'][] = $keywords_ar[$keyword_id]->name_en ?? '';
        }

        foreach ($articles_ar as $article_ar) {
            $movie_file = new VideoFile(false, $this->container);
            $movie_path = $movie_file->build_movie_path($article_ar, true);
            $movie_file->set_locations($movie_path)
                ->set_length($article_ar->duration)
                ->build_size($article_ar, true);
            $publication_ar = $this->entity_publication->get_by_id($article_ar->publication_id);

            if (!isset($article_to_keywords[$article_ar->id])) {
                $keywords_names = [];
                $keywords_ids = [];
            }
            else {
                $keywords_names = $article_to_keywords[$article_ar->id]['names'];
                $keywords_ids = $article_to_keywords[$article_ar->id]['ids'];
            }
            $result[] = [
                'download' => $this->container
                    ->get('router')
                    ->pathFor('video.action.download_movie', ['article_id' => $article_ar->id]),
                'src' => $movie_file->get_url(),
                'id' => $article_ar->id,
                'created' => $article_ar->created,
                'issue_datetime' => sprintf('%s %s', $article_ar->issue_date, $article_ar->broadcast_time),
                'issue_date' => $article_ar->issue_date,
                'broadcast_time' => $article_ar->broadcast_time,
                'file_size' => $movie_file->get_size(),
                'duration' => seconds_to_time($movie_file->get_length()),
                'headline' => $article_ar->headline,
                'text' => $article_ar->text,
                'status' => $article_ar->status,
                'status_class' => $this->get_article_status_class($article_ar->status),
                'keywords_name_en' => implode(', ', $keywords_names),
                'keywords' => implode(', ', $keywords_ids),
                'publication' => $publication_ar->name_en
            ];
        }

        return $result;
    }

    /**
     * @param ArticleAR $article_ar
     * @param MovieFile $movie_file
     * @throws Exception
     * @return string[]
     */
    public function get_movie_for_output(ArticleAR $article_ar, VideoFile $movie_file)
    {

        $keywords_names = [];
        $keywords_ids = [];
        $article_keywords_ar = $this->entity_article_keyword->get_by_article_id($article_ar->id);
        $keywords_ar = $this->entity_keyword->get_by_ids_media(array_map(
            function($article_keyword_ar) { return $article_keyword_ar->keyword_id; }, $article_keywords_ar
        ));

        foreach ($keywords_ar as $keyword_ar) {
            $keywords_names[] = $keyword_ar->name_en;
            $keywords_ids[] = $keyword_ar->id;
        }

        $publication_ar = $this->entity_publication->get_by_id($article_ar->publication_id);

        return [
            'download' => $this->container
                ->get('router')
                ->pathFor('video.action.download_movie', ['article_id' => $article_ar->id]),
            'src' => $movie_file->get_url(),
            'id' => $article_ar->id,
            'created' => $article_ar->created,
            'issue_datetime' => sprintf('%s %s', $article_ar->issue_date, $article_ar->broadcast_time),
            'issue_date' => $article_ar->issue_date,
            'broadcast_time' => $article_ar->broadcast_time,
            'file_size' => $movie_file->get_size(),
            'duration' => seconds_to_time($movie_file->get_length()),
            'headline' => $article_ar->headline,
            'text' => $article_ar->text,
            'status' => $article_ar->status,
            'status_class' => $this->get_article_status_class($article_ar->status),
            'keywords_name_en' => implode(', ', $keywords_names),
            'keywords' => implode(', ', $keywords_ids),
            'publication' => $publication_ar->name_en
        ];
    }

}