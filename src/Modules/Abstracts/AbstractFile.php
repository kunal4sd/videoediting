<?php

namespace App\Modules\Abstracts;

use \ReflectionClass;
use \ReflectionMethod;

abstract class AbstractFile
{
    const COLON_REPLACEMENT = "!";

    /**
     * @var string
     */
    protected $name;

    /**
     * @var string
     */
    private $extension;

    /**
     * @var string
     */
    private $path;

    /**
     * @var string
     */
    private $url;

    /**
     * @var int
     */
    private $type;

    public function set_locations($location)
    {
        $this->url = path_to_url($location);
        $this->path = url_to_path($location);
        return $this;
    }

    public function set_name($location)
    {
        $name_details = explode('.', basename($location));
        $this->name = array_shift($name_details);
        return $this;
    }

    public function get_name()
    {
        return $this->name;
    }

    public function get_extension()
    {
        return $this->extension;
    }

    public function get_path()
    {
        return $this->path;
    }

    public function get_url()
    {
        return $this->url = str_replace(self::COLON_REPLACEMENT, ":", $this->url);
    }

    public function get_type()
    {
        return $this->type;
    }

    protected function set_type($type)
    {
        $this->type = $type;
        return $this;
    }

    public function build_from_array(array $data)
    {
        $reflection = new ReflectionClass($this);
        $methods = $reflection->getMethods(ReflectionMethod::IS_PUBLIC);
        foreach($methods as &$m) {
            $m = $m->name;
        }
        foreach ($data as $property => $value) {
            $method = sprintf('set_%s', strtolower($property));
            if (in_array($method, $methods)) {
                $this->{$method}($value);
            }
        }

        return $this;
    }
}
