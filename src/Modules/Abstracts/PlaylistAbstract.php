<?php

namespace App\Modules\Abstracts;

use App\Libs\Enums\Videos;
use App\Modules\Abstracts\ActiveRecordAbstract;
use \Exception;

abstract class PlaylistAbstract extends ActiveRecordAbstract
{

    /**
     * @var string
     */
    public $name;

    /**
     * @var string[]
     */
    public $header;

    /**
     * @var string
     */
    public $glue;

    /**
     * @var string[]|PlaylistAR[]
     */
    public $files;

    /**
     * @var string[]
     */
    public $footer;

    /**
     * @param string $file_path
     * @return PlaylistAbstract
     */
    public function build_from_file($file_path)
    {

        if (file_exists($file_path) && ($content = file_get_contents($file_path))) {

            $content_arr = explode("\n", trim($content));
            $original_length = count($content_arr);
            $all_props = array_merge($this->header, $this->footer);
            $all_props_length = count($all_props);
            $all_props = array_merge($all_props, [$this->glue]);

            if ($original_length >= $all_props_length) {

                foreach($all_props as $prop) {
                    while( ($key = array_search($prop, $content_arr)) !== false) {
                        unset($content_arr[$key]);
                    }
                }
                $content_arr = array_filter($content_arr);

                if ($original_length === count($content_arr) * 2 + $all_props_length) {
                    $this->name = $this->url_to_path($file_path);

                    foreach($content_arr as $file) {
                        $this->files[] = $this->url_to_path($file);
                    }
                }
            }
        }

        return $this;
    }

    /**
     * @param string $hash
     * @return PlaylistAbstract
     */
    public function build_from_hash($hash)
    {
        $file_path = $this->build_playlist_path($hash);
        return $this->build_from_file($file_path);
    }

    public function build_content()
    {

        $content = implode("\n", $this->header);

        foreach($this->files as $file) {

            if ($file instanceof PlaylistAbstract) {
                $file = $file->name;
            }

            $content .= sprintf('%s%s%s%s', "\n", $this->glue, "\n", $this->path_to_url($file));
        }

        $content .= "\n" . implode("\n", $this->footer);

        return $content;
    }

    public function save($file_path)
    {

        if ( file_exists($file_path) ){
            unlink($file_path);
        }

        if ( !($fh = @fopen($file_path, 'w')))  {
            throw new Exception(sprintf('Could not open file "%s".', $file_path), 500);
        }
        fwrite($fh, $this->build_content() . "\n");
        fclose($fh);

        return $this;
    }

    public function get_first_file()
    {

        if ( isset($this->files[0]) ) {
            return $this->files[0];
        }

        throw new Exception(
            'Playlist does not contain any files.',
            500
        );
    }

    public function build_broadcast_time()
    {
        $details = explode('-', basename($this->get_first_file(), '.'.Videos::RAW_VIDEO_FORMAT));
        return $details[1];
    }

    public function build_issue_date()
    {
        $details = explode('.', basename($this->get_first_file(),  '.'.Videos::RAW_VIDEO_FORMAT));
        $datetime = str_replace(array('-','_') , array(' ','-'), $details[1]);
        $datetime_details = explode(' ', $datetime);

        return array_shift($datetime_details);
    }

    public function build_start_datetime()
    {
        preg_match(
            '/.+(\d{4})_(\d{2})_(\d{2})\-(\d{2}):(\d{2}):(\d{2})\.ts/Uis',
            $this->get_first_file(),
            $matches
        );
        array_shift($matches);

        return sprintf(
            '%s-%s-%s %s:%s:%s',
            array_shift($matches),
            array_shift($matches),
            array_shift($matches),
            array_shift($matches),
            array_shift($matches),
            array_shift($matches)
        );
    }

    public function build_end_datetime()
    {
        $files_count = count($this->files);
        $hash = build_hash($this->files);

        preg_match(
            '/.+(\d{4})_(\d{2})_(\d{2})\-(\d{2}):(\d{2}):(\d{2})\.ts/Uis',
            $this->files[ $files_count - 1 ],
            $matches
        );
        array_shift($matches);

        return sprintf(
            '%s-%s-%s %s:%s:%s',
            array_shift($matches),
            array_shift($matches),
            array_shift($matches),
            array_shift($matches),
            array_shift($matches),
            array_shift($matches)
        );
    }

    public function build_poster($path)
    {

        if ( file_exists($path) ) return $this;

        try {

            $cmd = sprintf(
                'ffmpeg -i "%s" -ss 0.00 -vf scale=400:300:force_original_aspect_ratio=increase -vframes 1 -y "%s" 2>&1',
                $this->get_first_file(),
                $path
            );
            $output = shell_exec($cmd);

            if( !file_exists( $path ) ) {
                throw new Exception(
                    sprintf(
                        "Failed creating poster image for playlist with command `%s` and output `%s`",
                        $cmd,
                        $output
                    ),
                    500
                );
            }

            chmod( $path, 0777 );
        }
        catch(Exception $e) {
            throw $e;
        }

        return $this;
    }

    public function build_publication_id()
    {

        $publication_id = false;

        if (!empty($this->files)) {

            $file_details = explode("videos/", $this->get_first_file());
            if (count($file_details) === 2) {
                $path_details = explode('/', array_pop($file_details));

                $publication_id = array_shift($path_details);
            }
        }

        return $publication_id;
    }

    public static function path_to_url($file_path)
    {
        return str_replace(
            PUBLIC_PATH,
            sprintf(
                '%s://%s',
                SCHEME,
                HOST
            ),
            $file_path
        );
    }

    public static function url_to_path($file_url)
    {
        return str_replace(
            sprintf(
                '%s://%s',
                SCHEME,
                HOST
            ),
            PUBLIC_PATH,
            $file_url
        );
    }

    public static function build_movie_path($name)
    {
        return sprintf('%s/%s/%s.%s', PUBLIC_PATH, Videos::MOVIE_PATH, $name, Videos::MOVIE_FORMAT);
    }

    public static function build_playlist_path($name)
    {
        return sprintf('%s/%s/%s.%s', PUBLIC_PATH, Videos::PLAYLIST_PATH, $name, Videos::PLAYLIST_FORMAT);
    }

    public static function build_poster_path($name)
    {
        return sprintf('%s/%s/%s.%s', PUBLIC_PATH, Videos::POSTER_PATH, $name, Videos::POSTER_FORMAT);
    }

    public static function build_hash_from_path($path)
    {

        $playlist_details = explode('/', $path);

        if ( ($filename = array_pop($playlist_details)) !== null ) {
            $filename_details = explode('.', $filename);
            $hash = array_shift($filename_details);
            $file_type = array_shift($filename_details);

            if ($hash && $file_type === Videos::PLAYLIST_FORMAT) {
                return $hash;
            }
        }

        return false;
    }

}
