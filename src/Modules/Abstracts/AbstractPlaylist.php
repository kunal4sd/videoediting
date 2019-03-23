<?php

namespace App\Modules\Abstracts;

use App\Libs\Enums\Videos;
use App\Modules\Abstracts\AbstractFile;
use App\Modules\Interfaces\DiscontinuityInterface;
use App\Modules\Interfaces\FileDetailsInterface;
use App\Modules\Interfaces\FilesInterface;
use App\Modules\Interfaces\FooterInterface;
use App\Modules\Interfaces\HeadersInterface;
use App\Modules\Interfaces\SaveInterface;
use App\Modules\Parameters\PlaylistParameter;
use \Exception;

abstract class AbstractPlaylist extends AbstractFile implements HeadersInterface, FileDetailsInterface, FilesInterface, SaveInterface, DiscontinuityInterface
{

    /**
     * @var PlaylistParameter[]
     */
    protected $headers = [];

    /**
     * @var PlaylistParameter
     */
    protected $file_details;

    /**
     * @var PlaylistParameter
     */
    protected $discontinuity;

    /**
     * @var AbstractFile[]
     */
    protected $files = [];

    abstract protected function build_content();

    public function get_headers()
    {
        return $this->headers;
    }

    public function set_headers(array $headers)
    {
        $this->headers = $headers;
        return $this;
    }

    public function add_header(PlaylistParameter $header)
    {
        array_push($this->headers, $header);
        return $this;
    }

    public function get_file_details()
    {
        return $this->file_details;
    }

    public function set_file_details(PlaylistParameter $file_details)
    {
        $this->file_details = $file_details;
        return $this;
    }

    public function get_discontinuity()
    {
        return $this->discontinuity;
    }

    public function set_discontinuity(PlaylistParameter $discontinuity)
    {
        $this->discontinuity = $discontinuity;
        return $this;
    }

    public function get_files()
    {
        return $this->files;
    }

    public function set_files(array $files)
    {
        $this->files = $files;
        return $this;
    }

    public function add_file(AbstractFile $file)
    {
        array_push($this->files, $file);
        return $this;
    }

    public function add_files(array $files)
    {
        $this->files = array_merge($this->files, $files);
        return $this;
    }

    public function save()
    {
        if (file_exists($this->get_path())) {
            $this->container->entity_playlist->delete_file_by_path($this);
        }

        if (!($fh = @fopen($this->get_path(), 'w'))) {
            throw new Exception(sprintf('Could not open file "%s".', $this->get_path()), 500);
        }
        fwrite($fh, $this->build_content() . "\n");
        fclose($fh);

        return $this;
    }

    /**
     * @param string $hash
     * @return AbstractPlaylist
     */
    public function build_from_hash($hash)
    {
        $this->set_hash($hash);
        $file_path = $this->build_playlist_path();
        return $this->build_from_file($file_path);
    }

    public function build_playlist_path()
    {
        return sprintf(
            '%s/%s/%s.%s',
            PUBLIC_PATH,
            Videos::PLAYLIST_PATH,
            $this->get_hash(),
            Videos::PLAYLIST_FORMAT
        );
    }

    public static function build_hash_from_path($path)
    {
        list($hash, $file_type) = get_file_details_from_path($path);
        if ($hash && $file_type === Videos::PLAYLIST_FORMAT) {
            return $hash;
        }

        return false;
    }

    public function get_first_file()
    {
        reset($this->files);
        return current($this->files);
    }

    public function get_last_file()
    {
        return end($this->files);
    }
}
