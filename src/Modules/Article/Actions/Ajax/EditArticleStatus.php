<?php

namespace App\Modules\Article\Actions\Ajax;

use \Exception;
use App\Libs\Json;
use Slim\Http\Request;
use App\Libs\Enums\Dbs;
use Slim\Http\Response;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\Status;
use App\Libs\Enums\Videos;
use App\Libs\Enums\UserActivity;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Files\VideoFile;
use App\Modules\Video\Entities\ActiveRecords\RemoteFileAR;
use App\Modules\Publication\Entities\ActiveRecords\IssueAR;
use App\Modules\User\Entities\ActiveRecords\UserActivityAR;
use App\Modules\Article\Entities\ActiveRecords\ArticleOneAR;

class EditArticleStatus extends AbstractModule
{

    public function __invoke(Request $request, Response $response)
    {

        $result = [];
        $code = 200;

        try {
            $articles_ar_all = $this->entity_article->get_by_ids($request->getParam('ids'));
            $articles_ar = array_filter(
                $articles_ar_all,
                function($article_ar) {
                    return !is_null($article_ar->id) && $article_ar->status !== Status::LIVE;
                }
            );
            $status = $request->getParam('status');

            if (count($articles_ar) === 0) {
                $result['message'] = "None of the selected article(s) is suitable for status update";
                $code = 400;
            }
            elseif ($status === Status::LIVE) {
                foreach($articles_ar as &$article_ar) {
                    /**
                     * Beginning of reversable area.
                     * All persistent changes made in this area must be reversed in revert_changes()
                     */
                    $publication_ar = $this->entity_publication->get_by_id(
                        $article_ar->publication_id
                    );

                    $media_now = $this->db[Hosts::MEDIA][Dbs::MEDIA]->now();

                    $article_ar_media = clone $article_ar;
                    $article_ar_media->id = null;
                    $article_ar_media->publish_id = null;
                    $article_ar_media->status = null;
                    $article_ar_media->file_path = null;
                    $article_ar_media->file_size = null;
                    $article_ar_media->size = '0.00';
                    $article_ar_media->section_id = 10;
                    $article_ar_media->page_name = ' ';
                    $article_ar_media->ave = $publication_ar->adrate * $article_ar->duration;
                    $article_ar_media->created = $media_now;

                    $article_ar_media_clone = clone $article_ar_media;

                    $article_ar_media->headline_modified = $media_now;
                    $article_ar_media->id = $this->entity_article->save_media($article_ar_media);

                    $video_file = (new VideoFile($this->entity_publication->is_radio($publication_ar)));
                    /**
                     * End of reversable area
                     */
                    if (!$video_file->copy_media($article_ar, $article_ar_media)) {
                        $changes_reverted = $this->revert_changes($article_ar_media);
                        $result['message'] = "Failed copying a video file to live output directory.";
                        if (!$changes_reverted) $result['message'] .= " Unwanted changes have been made to the affected article, and failed being reverted.";
                        $code = 500;

                        return Json::build($response, $result, $code);
                    }

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
                            'created' => $this->db[Hosts::LOCAL][Dbs::MAIN]->now()
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

                    $this->entity_article_one->save(
                        new ArticleOneAR($article_ar_media_clone->build_to_array())
                    );

                    $remote_file_ar = new RemoteFileAR([
                        'path' => sprintf(
                            '%s/%s-1.%s',
                                $article_ar_media->issue_date,
                                $article_ar_media->id,
                                Videos::MOVIE_FORMAT
                        ),
                        'status' => 0,
                        'type' => 0,
                        'created' => $media_now
                    ]);
                    $this->entity_remote_file->save($remote_file_ar);
                    $this->entity_remote_file->save_media($remote_file_ar);

                    $article_keywords_ar = $this->entity_article_keyword->get_by_article_id($article_ar->id);
                    foreach($article_keywords_ar as &$article_keyword_ar) {
                        $article_keyword_ar->article_id = $article_ar_media->id;
                    }
                    $this->entity_article_keyword->save_multiple_media($article_keywords_ar);

                    $article_ar->publish_id = $article_ar_media->id;
                    $article_ar->status = Status::LIVE;
                    $this->entity_article->save($article_ar);

                    $this->entity_user_activity->save_media(
                        new UserActivityAR([
                            'user_id' => $this->session_user->get_user()->id,
                            'publication_id' => $publication_ar->id,
                            'article_id' => $article_ar_media->id,
                            'issue_date' => $article_ar_media->issue_date,
                            'activity_id' => UserActivity::LIVE_MEDIA,
                            'created' => $media_now
                        ])
                    );

                    $user_activities_ar = $this->entity_user_activity->get_last_x_by_user_and_type_media(
                        1, $this->session_user->get_user()->id, UserActivity::CLIP
                    );
                    $user_activity_ar = array_shift($user_activities_ar);
                    $user_activity_ar->article_id = $article_ar_media->id;
                    $this->entity_user_activity->save_media($user_activity_ar);
                }

                $result['message'] = "Article(s) updated successfully";
            }
            else {
                foreach($articles_ar as &$article_ar) {
                    $article_ar->status = $status;
                }
                $this->entity_article->save_multiple($articles_ar);

                $result['message'] = "Article(s) updated successfully";
            }
        }
        catch(Exception $e) {
            $code = 500;
            $this->logger->write(new Exception(
                $e->getMessage(),
                $code
            ));
            $result['message'] = 'Unexpected error.';
        }

        return Json::build($response, $result, $code);
    }

    /**
     * @param ArticleAR $article_ar_media
     * @return bool
     */
    private function revert_changes($article_ar_media)
    {
        return (bool) $this->entity_article->delete_media($article_ar_media);
    }
}
