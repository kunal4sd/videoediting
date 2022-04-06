<?php

namespace App\Modules\Abstracts;

use App\Modules\Abstracts\AbstractModule;
use \ReflectionClass;

abstract class AbstractActiveRecord extends AbstractModule
{

    public function build_from_array(array $array)
    {
        foreach ($array as $property => $value) {
            $property = strtolower($property);
            if (property_exists($this, $property)) {
                $this->$property = $value;
            }
        }

        return $this;
    }

    public function build_to_array()
    {
        $result = [];
        $reflection = new ReflectionClass($this);
        $properties = $reflection->getProperties();

        foreach ($properties as $property) {
            $name = $property->getName();
            if ($property->isPublic()) {
                $result[$name] = $this->$name;
            }
        }

        return $result;
    }

}
