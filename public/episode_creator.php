<?php
include('public_functions.php');
date_default_timezone_set('Asia/Amman');

$path = '/storage/recordings';

if (!is_dir($path)) {
	die('Please specify storage directory');
}


function create_playlist($filename, $playlist) {
	$fh = fopen($filename, 'w') or die('Could not open file "' . $filename . '" $!');

	fwrite($fh, "#EXTM3U\n");
	fwrite($fh, "#EXT-X-VERSION:3\n"); 
	fwrite($fh, "#EXT-X-MEDIA-SEQUENCE:0\n");
	fwrite($fh, "#EXT-X-ALLOW-CACHE:NO\n");
	fwrite($fh, "#EXT-X-TARGETDURATION:5\n");

	foreach($playlist as $file) {
		fwrite($fh, "#EXTINF:-1\n");
		$file = preg_replace('/[^[:print:]]/', '', $file);
		$file = preg_replace('/\/storage\/recordings/', 'http://edit.mediaobserver-me.com/videos', $file);
		fwrite($fh, $file . "\n");
	}

	fwrite($fh, "#EXT-X-ENDLIST\n");
	fwrite($fh, "\n");
	fclose($fh);
}

function dateOp($fdate,$duration, $op){
	
		$duration = (int)$duration;		
		$dateinsec=strtotime($fdate);
		return date('Y-m-d H:i:s',strtotime($op.$duration.' seconds',strtotime($fdate)));
		
}

	

$fname =$_GET['file'];// $argv[1];
$start_time = $_GET['stime'];//$argv[2];
$end_time =$_GET['etime']; //$argv[3];


$file_name = explode('.',$fname);

$fdate = str_replace( array('-','_') , array(' ','-'), $file_name[1]);

$from_time 	= dateOp($fdate, $start_time,'+'); 

$to_date 	= dateOp($fdate, $end_time,'+'); 



$id = $file_name[0];
$start_file = get_best_file($id, $from_time, $path, 'ago');
$end_file = get_best_file($id, $to_date, $path);
$sfile_mtime = date('Y/m/d H:i:s', filemtime($start_file));
$efile_mtime = date('Y/m/d H:i:s', filemtime($end_file));
$segment_length = 100*60;
/*
$find_command = "find $path/$id/ -type f -newermt '$sfile_mtime' ! -newermt '$efile_mtime' | sort -n | cut -f2";

$files_string = shell_exec($find_command);
$files = explode("\n", trim($files_string));
*/


if ($start_file === false) {
	$error_message = "No sfile with $start_time!";
	//return;
}

if($end_file === false) {
	$error_message =  "No efile with $end_time!";
	$empty_arr = true;
	//return;
}


$sfile_mtime = date('Y/m/d H:i:s', filemtime($start_file));

$efile_mtime = date('Y/m/d H:i:s', filemtime($end_file));

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
$segment_count = intval($segment_length / 3);
//echo "\n\t\tNumber of files: $files_count\tLengh of segment: $segment_count\n";
$PATH_TO_PLAYLIST = "/var/www/edit.mediaobserver-me.com/public/tmp/playlist/episodes";
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
	$playlists[] = basename($filename);
}



echo json_encode($playlists);	


