<?php
include('includes/MysqliDb.php');
header('Content-Type: text/html; charset=utf-8');
set_time_limit (65);
 
$save_path = '/var/www/html/screen_shot_image_creator/images/';
$paglrCode = 'SKtNJqsElEeU6U5PX3lSuA';


$db = new MysqliDb (Array ('host' => '192.168.1.19', 'username' => 'app_user',  'password' => 'UFGBsfrhjuj42','db'=> 'media_media','port' => 3306,'prefix' => '', 'charset' => 'utf8'));
$id = (int) (isset($argv[1]))? $argv[1] : 0;
if($id == 0 ){
	die('die');
}

function save_image($img,$fullpath,$id){
	GLOBAL $db;
	
	$ch = curl_init ($img);
	curl_setopt($ch, CURLOPT_HEADER, 0);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0); 
	curl_setopt($ch, CURLOPT_TIMEOUT, 60); //timeout in seconds	
	$rawdata=curl_exec($ch);
	$cinfo = curl_getinfo($ch, CURLINFO_HTTP_CODE) ;
	curl_close ($ch);


	if ( $cinfo>=200 && $cinfo<300 ){   // if curl sucssfully 

		if(file_exists($fullpath)){
			unlink($fullpath);
		}
		file_put_contents($fullpath, $rawdata);

		$fsize = filesize($fullpath);
		
		if ( exif_imagetype( $fullpath ) != IMAGETYPE_JPEG ) { // if pagelr return message not file
			
			$msg = json_decode($rawdata);
			$db->where ('id', $id);
			$db->update ('site_screenshot2', array( 'status_enum'=>'error message', 'error_message'=>$msg->Message) );
			unlink($fullpath);		
		} elseif( $fsize / 1024 <= 100 ){ // file size < 100K
			$db->where ('id', $id);
			$db->update ('site_screenshot2', array( 'status_enum'=>'error_size') );

		} else { // kolo tamam
			$db->where ('id', $id);
			$db->update ('site_screenshot2', array( 'status_enum'=>'done') );
		}
	} else {// if curl call failed 
		$db->where ('id', $id);
		$db->update ('site_screenshot2', array('status_enum'=>'new') ); 
	}
	
} //end function


$default_data = $db->rawQueryOne('select ps.* from publication_screenshot_settings ps where ps.id=0');

$db->where ('id', $id);
$db->update ('site_screenshot2', array('status_enum'=>'in process', 'in_process_date'=>$db->now(),'try_count'=>$db->inc(1) ) );

$db->where('id', $id);
$data = $db->getOne('site_screenshot2');
$wurl = rawurlencode ($data['url']);

$data = $db->rawQueryOne("select ps.* from publication_screenshot_settings ps   where ps.publication_id = (	select p.id from site_screenshot2 s inner join article a on a.id = s.article_id inner join publication p on p.id = a.publication_id	where s.id = $id )");
$setting = ($data['id']) ? json_decode($data['setting']) : json_decode($default_data['setting']);

if ($setting->js) { 
	$call = 'capture/javascript'; 
	$delay = '&delay='.$setting->delay; 
} else {
	$call = 'capture' ;
	$delay= '';
} 
$width =  '&width='.$setting->width ;
$height = '&height='.$setting->height ;
$maxage = '&maxage='.$setting->maxage;
$cookies = '&cookies='.$setting->cookies; // not used any more
$ads = '&ads='.$setting->ads;	

$url = 'https://api.pagelr.com/'.$call."?uri=".$wurl."&format=jpg&b_width=1280".$delay.$width.$height.$maxage.$ads.'&key='.$paglrCode;

save_image($url, $save_path.$id.'.jpg', $id);