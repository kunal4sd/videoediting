<?php

use App\Libs\Enums\Videos;

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

function seconds_to_time($sec, $with_micro = true)
{
    if( !is_float( $sec ) ) $sec = floatval( $sec );

    $hours   = floor($sec / 3600);
    $minutes = floor(($sec - ($hours * 3600)) / 60);
    $seconds = $sec - ($hours * 3600) - ($minutes * 60);

    if ($with_micro) {
        $result = sprintf('%02d:%02d:%05.2f', $hours, $minutes, $seconds);
    }
    else {
        $result = sprintf('%02d:%02d:%02d', $hours, $minutes, intval($seconds));
    }

    return $result;
}

function time_to_seconds($time)
{
    if( strlen($time) === 0 ) return 0;

    $details = explode(':', $time);
    if( count($details) !== 3 ) return 0;

    $hours = floatval( array_shift($details) );
    $minutes = floatval( array_shift($details) );
    $seconds = floatval( array_shift($details) );

    return $hours * 3600 + $minutes * 60 + $seconds;
}

function choose_time_to_seconds($time1 = false, $time2 = false)
{
    $time_1 = time_to_seconds($time1);
    $time_2 = time_to_seconds($time2);

    return $time_1 > $time_2 ? $time_1 : $time_2;
}

/**
 * Return the objects from $source_objs that have the value of $source_field
 * found in any of $target_objs' $target_field values
 * @param Object[] $source_objs
 * @param string $source_field
 * @param Object[] $target_objs
 * @param string $target_field
 * @return Object[] : filtered $source_objs
 */
function intersect_objects_by_fields(
    array $source_objs,
    $source_field,
    array $target_objs,
    $target_field
) {

    if (
        empty($source_objs)
        || empty($target_objs)
        || strlen($source_field) === 0
        || strlen($target_field) === 0
    ) {
        return [];
    }

    $target_fields_values = array_map(
        function($obj) use ($target_field) {
            return $obj->$target_field;
        },
        $target_objs
    );

    return array_filter(
        $source_objs,
        function($obj) use ($source_field, $target_fields_values) {
            return in_array($obj->$source_field, $target_fields_values);
        }
    );
}

function path_to_url($file_path)
{
    if (strlen($file_path)) {
        $url_base = sprintf('%s://%s', SCHEME, HOST);
        if (PORT) $url_base .= sprintf(':%s', PORT);

        $file_path = str_replace(PUBLIC_PATH, '', $file_path);
        $file_path = str_replace($url_base, '', $file_path);

        return sprintf('%s/%s', $url_base, ltrim($file_path, '/'));
    }

    return false;
}

function url_to_path($file_url)
{
    if (strlen($file_url)) {
        $url_base = sprintf('%s://%s', SCHEME, HOST);
        if (PORT) $url_base .= sprintf(':%s', PORT);

        $file_url = str_replace(PUBLIC_PATH, '', $file_url);
        $file_url = str_replace($url_base, '', $file_url);

        return sprintf('%s/%s', PUBLIC_PATH, ltrim($file_url, '/'));
    }

    return false;
}

function get_file_details_from_path($path)
{
    $path_details = explode('/', $path);
    if ( ($filename = array_pop($path_details)) !== null ) {
        $filename_details = explode('.', $filename);
        return $filename_details;
    }

    return array_fill(0, 5, false);
}

function get_seconds_since_file($file_name, $max_limit = null)
{
    if (!$file_name) return $max_limit;

    $file_details = explode('.', $file_name);
    $file_name =  $file_details[1];
    $file_date = str_replace(array('-','_'), array(' ','-'), $file_name);

    $to_time = strtotime($file_date);
    $from_time = strtotime(date("Y-m-d H:i:s"));

    return $from_time - $to_time;
}

/**
 * @param string[] $files
 * @param boolean $is_radio
 * @return array
 */
function get_video_files_duration(array $files, bool $is_radio = false): array
{
    $result = [];

    if ($is_radio) {
        $chunks = array_chunk($files, 8);
        foreach($chunks as $chunk) {
            $output = json_decode(
                shell_exec(
                    sprintf(
                        "%s/duration_multiple %s",
                        BIN_PATH,
                        implode(' ', $chunk)
                    )
                ),
                true
            );

            if (is_array($output)) {
                $filenames = array_map(function($row) {
                    return $row['filename'];
                }, $output);
                $durations = array_map(function($row) {
                    return round(
                        choose_time_to_seconds($row['duration'], $row['time']), 4, PHP_ROUND_HALF_UP
                    );
                }, $output);
                $result = array_merge($result, array_combine($filenames, $durations));
            }
        }
    }
    else {
        $output = shell_exec(
            sprintf(
                '%s/duration %s',
                BIN_PATH,
                implode(' ', $files)
            )
        );
        $output = json_decode($output, true);

        if (is_array($output)) {
            $filenames = array_map(function($row) {
                return $row['filename'];
            }, $output);
            $durations = array_map(function($row) {
                return round($row['duration'], 4, PHP_ROUND_HALF_UP);
            }, $output);
            $result = array_combine($filenames, $durations);
        }
    }

    return $result;
}

/**
 * Iterates from start_date to end_date, regardless of which one is first or last time-wise
 *
 * @param string $start_date
 * @param string $end_date
 * @return string
 */
function get_dates_in_range($start_date, $end_date)
{
    $tz = new DateTimeZone('Asia/Amman');
    $start_date = Datetime::createFromFormat('Y-m-d H:i:s', $start_date, $tz);
    $end_date = Datetime::createFromFormat('Y-m-d H:i:s', $end_date, $tz);
    $diff = strtotime($end_date->format('Y-m-d')) - strtotime($start_date->format('Y-m-d'));
    $diff = (int) floor($diff / 3600 / 24);
    $step = $diff <=> 0;

    yield $start_date->format('Y-m-d');
    while ($diff !== 0) {
        $current_date = $start_date->modify(sprintf('%s days', $step))->format('Y-m-d');
        $diff -= $step;

        yield $current_date;
    }
}

function time_diff_human_format($time)
{

    $time = time() - $time;
    $time = $time < 1 ? 1 : $time;
    $tokens = array (
        31536000 => 'year',
        2592000 => 'month',
        604800 => 'week',
        86400 => 'day',
        3600 => 'hour',
        60 => 'minute',
        1 => 'second'
    );

    foreach ($tokens as $unit => $text) {
        if ($time < $unit) continue;
        $number_of_units = floor($time / $unit);

        return sprintf(
            '%s %s%s',
            $number_of_units,
            $text,
            $number_of_units > 1 ? 's' : ''
        );
    }
}

function get_raw_video_path($publication_id, $timestamp)
{
    $reference_date = '2020-05-19';
    $alternative_path_pub_ids = [
        3066,
	4947,
	13644,
	16510,
	13048,
	3938,
	10912,
	34425,
	34427,
	3054,
	5371,
	5639,
	8340,
	18674,
	18676,
	18678,
	18680,
	18682,
	3953,
	2858,
	18908,
	25284,
	18952,
	19983,
	26617,
	18358,
	6423,
	3936,
	6404,
	6416,
	6538,
	6540,
	2161,
	31977,
	32105,
	36815
    ];

    if (
        in_array((int) $publication_id, $alternative_path_pub_ids)
        && $timestamp >= strtotime($reference_date)
    ) {
        return Videos::RAW_VIDEO_PATH2;
    }
    return Videos::RAW_VIDEO_PATH;
}
