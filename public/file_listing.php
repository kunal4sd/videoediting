<?php
include('public_functions.php');
date_default_timezone_set('Asia/Amman');


$path = '/storage/recordings';

if (!is_dir($path)) {
	die('Please specify storage directory');
}



function create_playlist($filename, $playlist) {
	if( file_exists($filename) ){
		unlink($filename);
	}
	$fh = fopen($filename, 'w') or die('Could not open file "' . $filename . '" $!');

	fwrite($fh, "#EXTM3U\n");
	fwrite($fh, "#EXT-X-VERSION:3\n");
	fwrite($fh, "#EXT-X-MEDIA-SEQUENCE:0\n");
	fwrite($fh, "#EXT-X-ALLOW-CACHE:NO\n");
	fwrite($fh, "#EXT-X-TARGETDURATION:5\n");

	foreach($playlist as $file) {
		fwrite($fh, "#EXTINF:-1\n");
		$file = preg_replace('/[^[:print:]]/', '', $file);
		$file = preg_replace('/\/storage\/recordings/', 'https://edit.mediaobserver-me.com/videos', $file);
		fwrite($fh, $file . "\n");
	}

	fwrite($fh, "#EXT-X-ENDLIST\n");
	fwrite($fh, "\n");
	fclose($fh);
}

$id =$_GET['id'];// $argv[1];
$start_time = $_GET['stime'];//$argv[2];
$end_time =$_GET['etime']; //$argv[3];
$segment_length =$_GET['length'];// $argv[4];	// in seconds
/*
$str = 'find /storage/recordings/'.$id.'/ -name "*.ts"  -type f -printf \'%T@ %p\n\' | sort -n | tail -1 | cut -f2- -d" "';

//2018-03-11 23:00:00
$last_file = exec($str);
$last_file = basename($last_file);

$tmp = explode('.',$last_file);
$last_file = str_replace(array('-','_') , array(' ','-'), $tmp[1] ) ;
if( $end_time > $last_file){
	$end_time = $last_file;
}
*/
$error_message = '';

$start_file = get_best_file($id, $start_time, 'ago');


if ($start_file === false) {
	$error_message = "No sfile with $start_time!";
	//return;
}

$end_file = get_best_file($id, $end_time);
if($end_file === false) {
	$error_message =  "No efile with $end_time!";
	$empty_arr = true;
	//return;
}

if(!$error_message){
	$sfile_mtime = date('Y/m/d H:i:s', filemtime($start_file));
	$efile_mtime = date('Y/m/d H:i:s', filemtime($end_file));
	//echo $sfile_mtime;
	$sdir = date('Y/m/d', filemtime($start_file));

	//echo "\t$start_file mtime: $sfile_mtime\n";
	//echo "\t$end_file mtime: $efile_mtime\n";

	// find . -type f -newermt "2018-02-15 07:22:27" ! -newermt "2018-02-15 07:23:17" | sort -n | cut -f2
	$find_command = "find $path/$id/$sdir -type f -newermt '$sfile_mtime' ! -newermt '$efile_mtime' | sort -n | cut -f2";
	//echo "Find command: $find_command\n";
	$files_string = shell_exec($find_command);
	$files = explode("\n", trim($files_string));

	//echo "Files returned are:\n " . implode("\n ", $files) . "\n";

	// 3 seconds each clip is, so we do that
	$files_count = count($files);
	$segment_count = intval($segment_length / 5);
	//echo "\n\t\tNumber of files: $files_count\tLengh of segment: $segment_count\n";
	$PATH_TO_PLAYLIST = "/var/www/edit.mediaobserver-me.com/public/tmp/playlist/";
	if (!is_dir($PATH_TO_PLAYLIST)){
		if(!mkdir($PATH_TO_PLAYLIST)){
			$error_message = "Couldn't create $PATH_TO_PLAYLIST";
			//return;
		}
	}

	if (!is_writable($PATH_TO_PLAYLIST)) {
		$error_message =  "Could not write $PATH_TO_PLAYLIST";
		//return;
	}

	$playlists = array();
	while($chunks = array_splice($files, 0, $segment_count)) {
		//echo "Chunks are: " . implode("\n ", $chunks) . "\n\n-----------------------------------------\n";
		$filename = $PATH_TO_PLAYLIST . '/' . basename($chunks[0]);
		$filename = preg_replace('/[^[:print:]]/', '', $filename);
		$filename = preg_replace('/\.ts/i', '.m3u8', $filename);
		create_playlist($filename, $chunks);
		$playlists[] = $filename;
	}

}
if(sizeof($playlists) == 0){
	$error_arr = array('error'=>$error_message);
	echo json_encode($error_arr);
} else {
	echo json_encode($playlists);
}


