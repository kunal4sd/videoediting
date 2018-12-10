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

/**
 * @param string $field : database or form field name
 * @return string : prettier, human readable format of field
 */
function get_pretty_name($field, $ucwords = false)
{

    $field = strtolower($field);
    $field = str_replace(['_', '-'], [' ', ' '], $field);
    $field = $ucwords ? ucwords($field) : ucfirst($field);

    return $field;
}

function build_hash(...$args)
{
    return md5(json_encode($args));
}

function human_filesize($bytes, $decimals = 2)
{
    $sz = 'BKMGTP';
    $factor = floor((strlen($bytes) - 1) / 3);

    return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor))
        . ' '
        . @$sz[$factor]
        . ( @$sz[$factor] !== 'B' ? 'B' : '' );
}

function seconds_to_time($sec)
{

    if( !is_float( $sec ) ) $sec = floatval( $sec );

    $hours   = floor($sec / 3600);
    $minutes = floor(($sec - ($hours * 3600)) / 60);
    $seconds = $sec - ($hours * 3600) - ($minutes * 60);

    if ( $hours < 10 ) $hours   = "0" . $hours;
    if ( $minutes < 10 ) $minutes = "0" . $minutes;
    if ( $seconds < 10 ) $seconds = "0" . $seconds;

    $seconds = number_format( $seconds, 2, '.', '' );

    return $hours . ':' . $minutes . ':' . $seconds;
}