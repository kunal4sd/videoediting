<?php

include('includes/MysqliDb.php');
$db = new MysqliDb (Array ('host' => '192.168.1.19','username' => 'app_user', 'password' => 'UFGBsfrhjuj42','db'=> 'media_media', 'port' => 3306,'prefix' => '', 'charset' => 'utf8'));

$total_callz = 2;
$run_file = '/var/www/html/screen_shot_image_creator/mtest.php';
$sleep_time = 5;
$in_process_die_mins = 3;


function bgExec($cmd) {
 if(substr(php_uname(), 0, 7) == "Windows"){
  pclose(popen("start /B ". $cmd, "r")); 
 }else {
  exec($cmd . " > /dev/null &"); 
 }
}


while(true){
	
	$db->where ('status_enum', 'in process') ;
	$db->where ('in_process_date <= date_sub(now(), interval '.$in_process_die_mins.' minute)') ;
	$db->where ('try_count <=3');
	$db->update('site_screenshot2', array('status_enum'=>'new'));

	
	$db->where ("status_enum", 'in process');
	$db->where ('try_count <=3');
	$process_files = $db->get ("site_screenshot2");
	$limit = $total_callz - sizeof($process_files) ;
	
	$files = array();
	if($limit !=0 ){
		
		$db->where ("status_enum", 'new');
		$files = $db->get ("site_screenshot2", $limit);
		
		for($i=0;$i<sizeof($files);$i++){
			$fid = $files[$i]['id'];
			$cmd = 'php  '.$run_file.' '.$fid;
			echo $fid."\n";
			
			bgExec($cmd);
		}
		if(sizeof($files) == 0 ){
			die('finish');
		}
	}

	sleep($sleep_time);
}