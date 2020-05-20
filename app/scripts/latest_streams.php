<?php

require realpath(__DIR__ . '/..') . '/bootstrap/constants.php';
require BASE_PATH . '/vendor/autoload.php';
require APP_PATH . '/bootstrap/functions.php';

use App\Modules\Video\Entities\Files\RawVideoFile;

array_shift($argv);
$output_file = array_shift($argv);
$pub_id = array_shift($argv);

if (!is_null($output_file) && !is_null($pub_id) && !empty($argv)) {
    foreach ($argv as $stream_path) {
        $file_arr = file($stream_path);
        if (is_array($file_arr) && !empty($file_arr)) {

            $file_arr = array_reverse($file_arr);
            $duration = 0.0;
            $filename = false;
            $rawVideoFile = false;
            $date_obj = false;
            $date_timestamp = 0;
            $base_path = false;
            foreach($file_arr as $line) {

                $line = trim($line);
                if (
                    strpos($line, '#EXTINF:') === 0
                    && $filename !== false
                    && $rawVideoFile !== false
                ) {
                    $duration = str_replace(['#EXTINF:', ','], '', $line);
                    file_put_contents(
                        $output_file,
                        sprintf(
                            '%s,%s',
                            $pub_id,
                            $rawVideoFile->set_length($duration)->build_end_datetime()
                        )
                    );
                    die();
                }
                elseif (strpos($line, '#') !== 0 && $duration === 0.0) {
                    $filename = basename($line);
                    if ($date_obj === false)
                    {
                        $details = get_file_details_from_path($filename);
                        $date_obj = Datetime::createFromFormat('Y_m_d-H:i:s', $details[1]);
                        $sub_path = $date_obj->format('Y/m/d');
                        $date_timestamp = $date_obj->getTimestamp();
                        $base_path = get_raw_video_path($id, $date_timestamp);
                    }

                    $rawVideoFile = (new RawVideoFile())
                        ->set_locations(
                            sprintf(
                                '%s/%s/%s/%s',
                                $base_path,
                                $pub_id,
                                $sub_path,
                                $filename
                            )
                        )->set_name($filename);
                }
            }
            break;
        }
    }
    file_put_contents(
        $output_file,
        sprintf(
            '%s,%s',
            $pub_id,
            ''
        )
    );
}
