<?php

namespace App\Modules\Abstracts;

use \ReflectionClass;

abstract class ActiveRecordAbstract
{

    public function build_from_array(array $array)
    {
        foreach ($array as $key => $value) {
            if (property_exists($this, $key)) {
                $this->$key = $value;
            }
        }
    }

    public function build_to_array()
    {

        $result = array();

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
