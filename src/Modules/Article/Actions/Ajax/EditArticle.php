<?php

namespace App\Modules\Article\Actions\Ajax;

use App\Libs\Json;
use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\Status;
use App\Libs\Enums\Videos;
use App\Libs\Enums\UserActivity;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\User\Entities\ActiveRecords\UserActivityAR;
use App\Modules\Video\Entities\ActiveRecords\RemoteFileAR;
use App\Modules\Article\Entities\ActiveRecords\IssueAR;
use App\Modules\Article\Entities\ActiveRecords\ArticleOneAR;
use App\Modules\Article\Entities\ActiveRecords\ArticleKeywordAR;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class EditArticle extends ModuleAbstract
{

    public function __invoke(Request $request, Response $response)
    {

        $result = [];

        try {
            $article_ar = $this->entity_article->get_by_id_and_user(
                $request->getParam('id'),
                $this->session_user->get_user()->id
            );

            if (!is_null($article_ar->id)) {

                // save article
                $article_ar->text = $request->getParam('text');
                $article_ar->headline = $request->getParam('headline');

                if ($request->getParam('status') !== Status::LIVE) {
                    $article_ar->status = $request->getParam('status');
                }
                $this->entity_article->save($article_ar);

                // delete old keywords associated with current article id
                $this->entity_article_keyword->delete_by_article_id($article_ar->id);

                // save new keywords associated with current article id
                $article_keywords_ar = [];
                $keywords = array_filter(explode(',', $request->getParam('keywords')));
                foreach($keywords as $keyword) {
                    $article_keywords_ar[] = new ArticleKeywordAR([
                        'article_id' => $article_ar->id,
                        'keyword_id' => $keyword
                    ]);
                }
                $this->entity_article_keyword->save_multiple($article_keywords_ar);

                if (
                    $request->getParam('status') === Status::LIVE
                    && is_null($article_ar->publish_id)
                ) {

                    $publication_ar = $this->entity_publication->get_by_id(
                        $article_ar->publication_id
                    );

                    $issue_ar = $this->entity_issue->get_by_issue_date_and_publication_id_media(
                        $article_ar->issue_date, $publication_ar->id
                    );

                    $this->entity_user_activity->save(
                        new UserActivityAR([
                            'user_id' => $this->session_user->get_user()->id,
                            'publication_id' => $publication_ar->id,
                            'article_id' => $article_ar->id,
                            'issue_date' => $article_ar->issue_date,
                            'activity_id' => UserActivity::LIVE,
                            'created' => $this->db->now()
                        ])
                    );

                    if (is_null($issue_ar->id)) {
                        $this->entity_issue->save_media(
                            new IssueAR([
                                'date' => $article_ar->issue_date,
                                'publication_id' => $publication_ar->id,
                                'status' => 0,
                                'pages_number' => 0,
                                'issue_number' => 0,
                                'volume_number' => 0
                            ])
                        );
                    }

                    $media_now = $this->db[Hosts::MEDIA][Dbs::MEDIA]->now();

                    $media_article_ar = clone $article_ar;
                    $media_article_ar->id = null;
                    $media_article_ar->publish_id = null;
                    $media_article_ar->status = null;
                    $media_article_ar->file_path = null;
                    $media_article_ar->size = '0.00';
                    $media_article_ar->section_id = 10;
                    $media_article_ar->page_name = ' ';
                    $media_article_ar->ave = $publication_ar->adrate * $article_ar->duration;
                    $media_article_ar->created = $media_now;

                    $this->entity_article_one->save(
                        new ArticleOneAR($media_article_ar->build_to_array())
                    );

                    $media_article_ar->headline_modified = $media_now;
                    $media_article_ar->id = $this->entity_article->save_media($media_article_ar);

                    $remote_file_ar = new RemoteFileAR([
                        'path' => sprintf(
                            '%s/%s-1.%s',
                             $media_article_ar->issue_date,
                             $media_article_ar->id,
                             Videos::MOVIE_FORMAT
                        ),
                        'status' => 0,
                        'type' => 0,
                        'created' => $media_now
                    ]);
                    $this->entity_remote_file->save($remote_file_ar);
                    $this->entity_remote_file->save_media($remote_file_ar);

                    foreach($article_keywords_ar as &$article_keyword_ar) {
                        $article_keyword_ar->article_id = $media_article_ar->id;
                    }
                    $this->entity_article_keyword->save_multiple_media($article_keywords_ar);

                    $live_path = sprintf(
                        '%s/%s/%s',
                        PUBLIC_PATH,
                        Videos::MOVIE_PATH_LIVE,
                        $media_article_ar->issue_date
                    );

                    if (!file_exists($live_path)) {
						mkdir($live_path, 0777, true);
                    }

                    copy(
                        PlaylistAR::build_movie_path($article_ar->id),
                        PlaylistAR::build_movie_path_live($media_article_ar->id)
                    );

                    $article_ar->publish_id = $media_article_ar->id;
                    $article_ar->status = Status::LIVE;
                    $this->entity_article->save($article_ar);

                    $this->entity_user_activity->save_media(
                        new UserActivityAR([
                            'user_id' => $this->session_user->get_user()->id,
                            'publication_id' => $publication_ar->id,
                            'article_id' => $media_article_ar->id,
                            'issue_date' => $media_article_ar->issue_date,
                            'activity_id' => UserActivity::LIVE_MEDIA,
                            'created' => $media_now
                        ])
                    );

                    $user_activity_ar = $this->entity_user_activity->get_last_x_by_user_and_type(
                        1, $this->session_user->get_user()->id, UserActivity::CLIP
                    );
                    $user_activity_ar->article_id = $media_article_ar->id;
                    $this->entity_user_activity->save_media($user_activity_ar);

                }
            }
            else {
                throw new Exception(
                    sprintf(
                        'No article found with the provided id #%s for user %s',
                        $request->getParam('id'),
                        $this->session_user->get_user()->id
                    ),
                    400
                );
            }

        }
        catch(Exception $e) {
            $this->logger->write($e);

            return Json::build($response, $result, 400);
        }

        return Json::build($response, $result, 200);
    }
}
