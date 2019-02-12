<?php

namespace App\Modules\Parameters;

class PlaylistParameter
{

    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $value;

    public function get_name()
    {
        return $this->name;
    }

    public function set_name($name)
    {
        $this->name = $name;
        return $this;
    }

    public function get_value()
    {
        return $this->value;
    }

    public function set_value($value)
    {
        $this->value = $value;
        return $this;
    }

    public function get_row()
    {
        $value = $this->value === null ? '' : sprintf(":%s", $this->value);
        return sprintf("#%s%s", $this->name, $value);
    }
}
