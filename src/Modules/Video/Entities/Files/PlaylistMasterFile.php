<?php

namespace App\Modules\Video\Entities\Files;

use App\Libs\Enums\Files;
use App\Modules\Abstracts\AbstractPlaylist;
use App\Modules\Interfaces\HashInterface;
use App\Modules\Parameters\PlaylistParameter;
use App\Modules\Video\Entities\Files\PlaylistFile;
use Pimple\Container;

class PlaylistMasterFile extends AbstractPlaylist implements HashInterface
{

    /**
     * @var Container
     */
    protected $container;

    /**
     * @var string
     */
    private $hash;

    public function __construct(Container $container, array $data = [])
    {
        $this->container = $container;
        $this->build_from_array($data);
        $this->set_type(Files::PLAYLIST);
        $this->add_header((new PlaylistParameter)->set_name('EXTM3U'));
        $this->add_header((new PlaylistParameter)->set_name('EXT-X-VERSION')->set_value('3'));
        $this->set_file_details(
            (new PlaylistParameter)
                ->set_name('EXT-X-STREAM-INF')
                ->set_value("CODECS='avc1.4d401f,mp4a.40.2'")
        );
    }

    public function get_hash()
    {
        return $this->hash;
    }

    public function set_hash($hash)
    {
        list($hash, $file_type) =  array_pad(get_file_details_from_path($hash), 2, 0);
        $this->hash = $hash;
        return $this;
    }

    public function build_hash(...$args)
    {
        list($id, $start_date, $end_date, $batch_size) = array_pad($args, 4, 0);
        $this->hash = build_hash((int) $id, $start_date, $end_date, (int) $batch_size);
        return $this;
    }

    /**
     * @param string $file_path
     * @return PlaylistMasterFile
     */
    public function build_from_file()
    {

        if (!$this->get_hash()) return $this;

        $file = $this->build_playlist_path();
        $this->set_locations($file)->set_name($file);
        $path = $this->get_path();
        if (file_exists($path) && ($content = file_get_contents($path))) {

            $file_details_row = $this->file_details->get_row();
            $content_arr = explode("\n", trim($content));
            $original_length = count($content_arr);
            $all_props = $this->headers_to_string_array();
            $all_props_length = count($all_props);
            $all_props = array_merge($all_props, [$file_details_row]);

            if ($original_length >= $all_props_length) {

                foreach($all_props as $prop) {
                    while( ($key = array_search($prop, $content_arr)) !== false) {
                        unset($content_arr[$key]);
                    }
                }

                $content_arr = array_values($content_arr);
                for($i=0; $i < count($content_arr); $i++) {
                    $row = $content_arr[$i];
                    $playlist_file = (new PlaylistFile($this->container))->build_from_file($row);

                    if (empty($playlist_file->get_files())) {
                        $this->set_files([]);
                        return $this;
                    }
                    $this->add_file($playlist_file);
                }
            }
        }

        return $this;
    }

    protected function build_content()
    {
        $headers = [];
        $files = [];

        foreach($this->get_headers() as $header) {
            $headers[] = $header->get_row();
        }
        foreach($this->get_files() as $file) {
            $files[] = $this->get_file_details()->get_row();
            $files[] = $file->get_url();
        }

        $content = sprintf("%s\n%s", implode("\n", $headers), implode("\n", $files));

        return $content;
    }

    private function headers_to_string_array()
    {
        $result = [];
        foreach($this->headers as $header) {
            $result[] = $header->get_row();
        }
        return $result;
    }
}
