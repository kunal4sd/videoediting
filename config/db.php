<?php
	
session_start();
include(dirname(__DIR__) .'/config/MysqliDb.php');
	/*
    m_host = "192.168.1.19";
    m_port = 3306;
    m_name = "media_media";
    m_user = "app_user";
    m_password = "UFGBsfrhjuj42";
	

$db = new MysqliDb (Array (
                'host' => 'localhost',
                'username' => 'root', 
                'password' => '',
                'db'=> 'mov',
                'port' => 3306,
                'prefix' => '',
                'charset' => 'utf8'));
				

			
if(!@$dont_check_login){
	if(!$_SESSION['uid']){
		header("Location: index.php?err=2");
		die();			
	}
}




*/	
			
$db = new MysqliDb (Array (
                'host' => '212.35.72.18',
                'username' => 'app_user', 
                'password' => 'UFGBsfrhjuj42',
                'db'=> 'media_media',
                'port' => 3306,
                'prefix' => '',
                'charset' => 'utf8'));

$db2 = new MysqliDb (Array (
                'host' => 'localhost',
                'username' => 'app_user', 
                'password' => 'UFGBsfrhjuj42',
                'db'=> 'recordings',
                'port' => 3306,
                'prefix' => '',
                'charset' => 'utf8'));				
/*
$db2 = new MysqliDb (Array (
                'host' => '192.168.1.219',
                'username' => 'tvuser', 
                'password' => '22448866',
                'db'=> 'recordings',
                'port' => 3306,
                'prefix' => '',
                'charset' => 'utf8'));	
*/
				
		
		//$users = $db2->rawQueryOne('select * from user');				
		
?>