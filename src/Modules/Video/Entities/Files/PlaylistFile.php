<?php

namespace App\Modules\Video\Entities\Files;

use App\Libs\Enums\Files;
use App\Libs\Enums\Videos;
use App\Modules\Abstracts\AbstractPlaylist;
use App\Modules\Abstracts\AbstractFile;
use App\Modules\Video\Entities\Files\PosterFile;
use App\Modules\Video\Entities\Files\RawVideoFile;
use App\Modules\Interfaces\FooterInterface;
use App\Modules\Interfaces\HashInterface;
use App\Modules\Interfaces\PosterInterface;
use App\Modules\Parameters\PlaylistParameter;
use Pimple\Container;
use \Exception;

class PlaylistFile extends AbstractPlaylist implements FooterInterface, PosterInterface, HashInterface
{

    /**
     * @var Container
     */
    protected $container;

    /**
     * @var PlaylistParameter
     */
    private $footer;

    /**
     * @var PosterFile
     */
    private $poster;

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
        $this->add_header((new PlaylistParameter)->set_name('EXT-X-MEDIA-SEQUENCE')->set_value('0'));
        $this->add_header((new PlaylistParameter)->set_name('EXT-X-ALLOW-CACHE')->set_value('NO'));
        $this->add_header((new PlaylistParameter)->set_name('EXT-X-TARGETDURATION')->set_value('60'));
        $this->set_file_details((new PlaylistParameter)->set_name('EXTINF'));
        $this->set_discontinuity((new PlaylistParameter)->set_name('EXT-X-DISCONTINUITY'));
        $this->set_footer((new PlaylistParameter)->set_name('EXT-X-ENDLIST'));
    }

    public function get_footer()
    {
        return $this->footer;
    }

    public function set_footer(PlaylistParameter $footer)
    {
        $this->footer = $footer;
        return $this;
    }

    public function get_poster()
    {
        return $this->poster ? $this->poster : (new PosterFile());
    }

    public function set_poster(AbstractFile $poster)
    {
        $this->poster = $poster;
        return $this;
    }

    public function get_hash()
    {
        return $this->hash;
    }

    public function set_hash($hash)
    {
        list($hash, $file_type) = array_pad(get_file_details_from_path($hash), 2, 0);
        $this->hash = $hash;
        return $this;
    }

    public function build_hash(...$args)
    {
        try {
            if (empty($this->get_files())) {
                throw new Exception(
                    'Cannot generate hash because PlaylistFile::files is empty',
                    500
                );
            }

            $urls = [];
            foreach($this->get_files() as $file) {
                $urls[] = $file->get_url();
            }

            $this->hash = build_hash($urls);
        }
        catch(Exception $e) {
            $this->container->logger->write($e);
        }

        return $this;
    }

    /**
     * @param string $file
     * @return PlaylistFile
     */
    public function build_from_file($file)
    {

        $this->set_locations($file)->set_name($file);
        $path = $this->get_path();
        if (file_exists($path) && ($content = file_get_contents($path))) {

            $file_details_row = $this->get_file_details()->get_row();
            $discontinuity_row = $this->get_discontinuity()->get_row();
            $content_arr = explode("\n", trim($content));
            $original_length = count($content_arr);
            $all_props = $this->headers_to_string_array();
            $all_props_length = count($all_props);
            $all_props = array_merge($all_props, [$file_details_row, $this->get_footer()->get_row()]);

            if ($original_length >= $all_props_length) {

                foreach($all_props as $prop) {
                    while( ($key = array_search($prop, $content_arr)) !== false) {
                        unset($content_arr[$key]);
                    }
                }

                $content_arr = array_values($content_arr);
                $is_discontinuity = false;
                for($i=0; $i < count($content_arr); $i += 2) {

                    $row = $content_arr[$i];
                    if ($discontinuity_row === $row) {
                        $is_discontinuity = true;
                        $i++;
                        $row = $content_arr[$i];
                    }

                    $next_row = isset($content_arr[$i+1]) ? $content_arr[$i+1] : false;
                    if ($next_row) {
                        $this->add_file(
                            (new RawVideoFile())
                                ->set_locations($next_row)
                                ->set_name($file)
                                ->set_length(trim(substr(trim($row), strlen($file_details_row) + 1)))
                                ->set_discontinuity($is_discontinuity)
                        );
                        $is_discontinuity = false;
                    }
                }

                if (!$this->get_hash()) $this->build_hash();
                $this->build_poster();
            }
        }

        return $this;
    }

    public function build_poster()
    {
        $first_file = $this->get_first_file();
        if ($first_file) {
            try {
                $this->poster = (new PosterFile())
                    ->set_locations($this->build_poster_path())
                    ->set_name($this->get_hash())
                    ->set_source($first_file->get_path())
                    ->save();
            }
            catch(Exception $e) {
                $this->container->logger->write($e);
            }
        }

        return $this;
    }

    private function build_poster_path()
    {
        return sprintf('%s/%s/%s.%s', PUBLIC_PATH, Videos::POSTER_PATH, $this->get_hash(), Videos::POSTER_FORMAT);
    }

    public function get_range_indexes($from, $to)
    {
        $from_index = -1;
        $to_index = -1;
        $time_passed = 0;
        $from_cut = false;
        $to_cut = false;

        foreach($this->get_files() as $index => $file) {
            $from_diff = $from - $time_passed;
            $to_diff = $to - $time_passed;
            $time_passed += $file->get_length();
            if ($from_index === -1 && $time_passed >= $from) {
                $from_cut = $from_diff;
                $from_index = $index;
            }
            if ($to_index === -1 && $time_passed >= $to) {
                $to_cut = $to_diff;
                $to_index = $index;
            }
            if ($from_index > -1 && $to_index > -1) break;
        }

        if ($from_index === -1) $from_index = $index;
        if ($to_index === -1) $to_index = $index;

        return [
            [ 'from' => $from_index, 'to' => $to_index ],
            [ 'from' => $from_cut, 'to' => $to_cut ]
        ];
    }

    protected function build_content()
    {
        $headers = [];
        $files = [];
        $footer = $this->get_footer()->get_row();

        foreach($this->get_headers() as $header) {
            $headers[] = $header->get_row();
        }
        foreach($this->get_files() as $file) {
            if ($file->get_discontinuity()) {
                $files[] = $this->get_discontinuity()->get_row();
            }
            $files[] = $this->get_file_details()->set_value($file->get_length())->get_row();
            $files[] = $file->get_url();
        }

        $content = sprintf(
            "%s\n%s\n%s",
            implode("\n", $headers),
            implode("\n", $files),
            $footer
        );

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

    public function delete_perfect_cut_files()
    {
        $files = $this->get_files();
        $first = array_shift($files);
        $last = array_pop($files);

        if (
            $first instanceof RawVideoFile
            && $first->is_perfect_cut()
            && file_exists($first->get_path())
        ) {
            unlink($first->get_path());
        }
        if (
            $last instanceof RawVideoFile
            && $last->is_perfect_cut()
            && file_exists($last->get_path())
        ) {
            unlink($last->get_path());
        }
    }
}
