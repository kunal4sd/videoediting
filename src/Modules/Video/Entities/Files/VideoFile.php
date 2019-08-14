<?php

namespace App\Modules\Video\Entities\Files;

use App\Libs\Enums\Files;
use App\Libs\Enums\Videos;
use App\Modules\Abstracts\AbstractFile;
use App\Modules\Article\Entities\ActiveRecords\ArticleAR;
use App\Modules\Video\Entities\Files\ImageFile;
use App\Modules\Interfaces\LengthInterface;
use App\Modules\Interfaces\PosterInterface;
use App\Modules\Interfaces\SizeInterface;
use Pimple\Container;
use \Exception;

class VideoFile extends AbstractFile implements SizeInterface, LengthInterface
{

    /**
     * @var string
     */
    private $size;

    /**
     * @var float
     */
    private $length;

    /**
     * @var bool
     */
    private $is_radio;

    public function __construct(bool $is_radio = true)
    {
        $this->set_is_radio($is_radio);
        $this->set_type(Files::VIDEO);
    }

    public function build_size()
    {
        $path = $this->get_path();
        $byte_size = 0;
        if (strlen($path) && file_exists($path)) {
            $byte_size = (int) @filesize($path);
        }
        $this->size = human_filesize( $byte_size );

        return $this;
    }

    public function get_size()
    {
        return $this->size;
    }

    public function set_size($size)
    {
        $this->size = $size;
        return $this;
    }

    public function build_length()
    {
        $path = $this->get_path();
        if (strlen($path) && file_exists($path)) {

            if ($this->is_radio) {
                $output = json_decode(
                    shell_exec(
                        sprintf(
                            "%s/duration_multiple %s",
                            BIN_PATH,
                            $this->get_path()
                        )
                    ),
                    true
                );
                $this->set_length(choose_time_to_seconds($output[0]['duration'], $output[0]['time']));
            }
            else {
                $this->set_length(
                    round(
                        shell_exec(
                            sprintf(
                                "%s/duration %s",
                                BIN_PATH,
                                $this->get_path()
                            )
                        ),
                        4,
                        PHP_ROUND_HALF_UP
                    )
                );
            }
        }

        return $this;
    }

    public function get_length()
    {
        return $this->length;
    }

    public function set_length($length)
    {
        $this->length = round((float) $length, 2, PHP_ROUND_HALF_UP);
        return $this;
    }

    public function get_is_radio()
    {
        return $this->is_radio;
    }

    public function set_is_radio(bool $is_radio)
    {
        $this->is_radio = $is_radio;
        return $this;
    }

    /**
     * @param AbstractPlaylist $playlist_file
     * @return AbstractFile
     */
    public function save($playlist_file)
    {

        if ($this->get_path()) {
            $raw_video_paths = array_map(
                function($raw_video_file) {
                    return $raw_video_file->get_path();
                },
                $playlist_file->get_files()
            );
            $files_str = implode('|', $raw_video_paths);

            $cmd = sprintf(
                "ffmpeg -i  \"concat:%s\" -c copy %s\n\r",
                $files_str,
                $this->get_path()
            );
            $output = shell_exec($cmd);
        }

        if (!file_exists($this->get_path())) {
            throw new Exception(
                sprintf(
                    "Failed creating movie, with output `%s`",
                    $output
                ),
                500
            );
        }

        return $this;
    }

    /**
     * @param ArticleAR $article_ar_from
     * @param ArticleAR $article_ar_to
     * @return AbstractFile
     */
    public function copy_media($article_ar_from, $article_ar_to)
    {
        copy(
            $this->build_movie_path($article_ar_from),
            $this->build_movie_path_live($article_ar_to)
        );
        return $this;
    }

    /**
     * @param ArticleAR $article_ar
     */
    public static function build_movie_path($article_ar)
    {
        return sprintf('%s/%s/%s.%s', PUBLIC_PATH, Videos::MOVIE_PATH, $article_ar->id, Videos::MOVIE_FORMAT);
    }

    /**
     * @param ArticleAR $article_ar
     */
    public static function build_movie_path_live($article_ar)
    {
        $path = sprintf(
            '%s/%s/%s',
            PUBLIC_PATH,
            Videos::MOVIE_PATH_LIVE,
            $article_ar->issue_date
        );

        if (!file_exists($path)) {
            mkdir($path, 0777, true);
        }

        return sprintf('%s/%s-1.%s', $path, $article_ar->id, Videos::MOVIE_FORMAT);
    }
}
