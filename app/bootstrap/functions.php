<?php

/**
 * @param object $object : instance of class
 * @param array $array : target array to check fields in
 * @throws Exception : if const field in $object is not found in $array, throw Exception
 * @return boolean true : only if everything checks, return true
 */
function check_mandatory_fields($object, array $array = [])
{

    $constants = get_all_constants($object);

    foreach($constants as $const => $value) {
        if (get_from_array($value, $array) === null) {
            throw new Exception("Mandatory field `{$value}` not found in provided config.");
        }
    }

    return true;
}

/**
 * @param string $needle   : searched field or field path
 * @param array  $haystack : associative array
 * @return mixed : found value, $default otherwise
 */
function get_from_array($needle, array $haystack, $default = null)
{

    $path = explode('.', $needle);

    $current = $haystack;
    while ($step = array_shift($path)) {
        if (!isset($current[$step])) {
            return $default;
        }

        $current = $current[$step];
    }

    return $current;
}

/**
 * @param mixed $class : instance of class or string with class name
 * @return array : associative array [ 'CONSTANT_NAME' => value ]
 */
function get_all_constants($class)
{
    $reflection = new ReflectionClass($class);

    return $reflection->getConstants();
}
