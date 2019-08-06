<?php 









/**
 * Application configuration
 */

$root_path = dirname( __DIR__ );

$config = array();
$config['app_title'] = 'Web Video Editor';//Title of the application
$config['app_description'] = 'Online Video Editor where you can cut, join and convert videos.';

$config['base_url'] = '/';//Base URL (address without "http://")
$config['root_path'] = $root_path . '/';//Root path
$config['public_path'] = $root_path . '/public/';//Path of the "public" folder
$config['input_dir'] = 'userfiles/input/';//The address of the folder "input" (without "/" at the beginning)
$config['output_dir'] = 'userfiles/output/';//The address of the folder "output" (without "/" at the beginning)
$config['database_dir'] = 'database/';//The address of the folder "database" (without "/" at the beginning)
$config['tmp_dir'] = 'userfiles/tmp/';//The address of the folder "tmp" (without "/" at the beginning)

$config['max_log_size'] = 700 * 1024;//700 KB
$config['log_filename'] = 'log.txt';//File name of the log
$config['queue_size'] = 2;//Queue size
$config['environment'] = 'prod';//prod | dev

$config['ffmpeg_path'] = 'ffmpeg';//FFmpeg path on your server
$config['ffprobe_path'] = 'ffprobe';//FFprobe path on your server
$config['debug'] = true;//Debug mode
$config['upload_allowed'] = array('mp4','m4v','flv','avi','mov','avi','mkv','mpg','webm','3gp','ogv','mpg','wmv');//Allowed to upload

$config['watermark_text'] = '';//Watermark text for all processed video
$config['watermark_text_font_name'] = 'libel-suit-rg.ttf';//Font file name in folder assets/fonts/

$config['authentication'] = true;//Authentication by Facebook open ID
$config['facebook_app_id'] = '1876930809211944';//Facebook App ID
$config['facebook_secret_key'] = '3ae378c6cbd7a1496b1cd1c5adde4def';//Facebook App Secret
$config['admin_facebook_email'] = 'andchir@gmail.com';//Email of the Admin (Facebook account)

//FFmpeg conversion parameters
$config['ffmpeg_string_arr'] = array(
    'flv' => '-c:v flv -b:v {quality} -c:a libmp3lame -b:a 128k -f {format}',
    'mp4' => '-c:v libx264 -b:v {quality} -c:a aac -strict experimental -b:a 128k -f {format}',
    'webm' => '-c:v libvpx -b:v {quality} -c:a libvorbis -b:a 128k -f {format}',
    'ogv' => '-c:v libtheora -b:v {quality} -c:a libvorbis -b:a 128k',
    'mp3' => '-vn -c:a libmp3lame -ab 192k -f {format}'
);

//Users restrictions
$config['users_restrictions'] = array(
    'admin' => array(
        'files_size_max' => 0,//Maximum of the files size
        'show_log' => true//Show log messages
    ),
    'user' => array(
        'files_size_max' => 300 * 1024 * 1024,//300 MB
        'show_log' => true
    )
);