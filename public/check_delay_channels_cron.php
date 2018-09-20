<?php


$to      = 'ryacoub@gmail.com';
$subject = 'the subject';
$message = 'hello';
$headers = 'From: webmaster@mediaobserver-me.com' . "\r\n" .
    'Reply-To: webmaster@mediaobserver-me.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

mail($to, $subject, $message, $headers);


die();
include(dirname(__DIR__) .'/config/db.php');
require_once dirname(__DIR__) . '/config/config.php';


$ac_ids = $db2->rawQueryOne( "select group_concat(pd.publication_id) as acid from publication_details pd where pd.recording247 ='Y' ");

$str = 'select p.name_en ,(select c.name_en from country c where c.iso = p.country) as country,
	   (select pt.name_en from publication_type pt where pt.id=p.type_id) as type_id,p.id from publication p 
		where p.type_id in(3,4) and p.id in ('.$ac_ids['acid'].')  and p.active=1 ';
$channel = $db->rawQuery( $str);
$i=0;


foreach($channel as $tmp){

	
	//$arr[$i]['country'] = $tmp['country'];	
	//$arr[$i]['type_id'] = $tmp['type_id'];	
	//$arr[$i]['channel_id'] = $tmp['id'];	
	$dateStr =  date("Y/m/d");
	
	$str = 'find /storage/recordings/'.$tmp['id'].'/'.$dateStr.'  -name "*.ts"   -type f -printf \'%T@ %p\n\' | sort -n | tail -1 | cut -f2- -d" "';
	$file = exec($str);

	if(!$file){
		$str = 'find /storage/recordings/'.$tmp['id'].'/'.$dateStr.' -name "*.ts" -type f -printf \'%T@ %p\n\' | sort -n | tail -1 | cut -f2- -d" "';
		$file = exec($str);
	}

	if(isset($file)){
		$file_name = basename($file);
		if( explodeDate($file_name) ) {
			$arr[$i]['channel'] = $tmp['name_en'];	
			$i++;
		}

	}
	
	
}

if( sizeof($arr) > 0 ){
	$table ='<table><tr><td><br>Channels</br></td><tr>';
	foreach($arr as $tmp){
		$table .='<tr><td>'.$tmp['channel'].'</td></tr>';
	}
	$table.='</tr></table>';
	



	$to = 'yacoub.rami@gmail.com';
	$subject = 'Channels Delay More than 1 Hour';
	$from = 'webmaster@media-observer.com';
 
	// To send HTML mail, the Content-type header must be set
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
 
	// Create email headers
	$headers .= 'From: '.$from."\r\n".
		'Reply-To: '.$from."\r\n" .
		'X-Mailer: PHP/' . phpversion();
	 
	// Compose a simple HTML email message
	$message = '<html><body>';
	$message .= '<h1 style="color:#f40;">Check channels below</h1>';
	$message .= $table;
	$message .= '</body></html>';
	
	// Sending email
	if(mail($to, $subject, $message, $headers)){
		echo 'Your mail has been sent successfully.';
	} else{
		echo 'Unable to send email. Please try again.';
	}

}
function  explodeDate($file_name){
	//10912.2017_08_27-11:00:01.mp4
	//echo $file_name.'<br>';
	if(!$file_name){
		return '-';
	}
	$file_name =  substr($file_name, strpos($file_name,'.')+1, -3) ;
	$file_date = str_replace( array('-','_') , array(' ','-') , $file_name);
	
	$to_time = strtotime($file_date);
	$from_time = date("Y-m-d H:i:s");
	
	$cur_date = 	date("Y-m-d H:i:s") ;
	//echo $cur_date .'---'. $file_date.'<br>';

	$timediff = strtotime($cur_date) - strtotime($file_date);
	if($timediff > 3600){  // if more than one hour
		return true;
	} else {
		return false;
	}		

	
}

?>