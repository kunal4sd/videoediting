<?php

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
