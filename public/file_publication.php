<?php
date_default_timezone_set('Asia/Amman');
include(dirname(__DIR__) .'/config/db.php');

$path = 'videos/';
$today = date('Y/m/d');

$yesterday = date('Y/m/d',strtotime("-1 days"));
$folders = scandir($path);

function explodeDate($file_name){
	//10912.2017_08_27-11:00:01.mp4
	if(!$file_name){
		return '-';
	}
	$file_name =  substr($file_name, strpos($file_name,'.')+1, -4) ;
	$file_date = str_replace( array('-','_') , array(' ','-') , $file_name);
	
	$to_time = strtotime($file_date);
	$from_time = strtotime(date("Y-m-d H:i:s"));
	
	$diff_time = round(round(abs($to_time - $from_time) / 60 ,2)/60 ,2);
	
	return $file_date . '='.$diff_time .'H';
	
}

foreach($folders as $folder){
	if( is_numeric($folder)){
		
		$channel = $db->rawQueryOne( "select name_en from publication where id= ".$folder);
		
		$today_path = $path.'/'.$folder.'/'.$today;	
		$files = glob($today_path.'/*.mp4');
		
		if(!$files[0]){
			$today_path = $path.'/'.$folder.'/'.$yesterday;	
			$files = glob($today_path.'/*.mp4');	
		} 
		$file_name = basename($files[0]);
		
		$table_str  .=  '<b>'.$channel['name_en'].'</b> ( '.explodeDate($file_name).')<br>';		
	}
}

mail("yacoub.rami@gmail.com","Channels Report", $table_str );

echo $table_str;
?>