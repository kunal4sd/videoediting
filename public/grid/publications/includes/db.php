<?php
session_start();
error_reporting(0);

$path = ($include_json)? '../../' : '';
include($path.'includes/MysqliDb.php');
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
                'db'=> 'project',
                'port' => 3306,
                'prefix' => '',
                'charset' => 'utf8'));
				*/

if(!@$dont_check_login){
	if(!$_SESSION['uid']){
		header("Location: index.php?err=2");
		die();			
	}
}
/*
$dblocalhost = new MysqliDb (Array (
                'host' => 'localhost',
                'username' => 'root', 
                'password' => '',
                'db'=> 'test',
                'port' => 3306,
                'prefix' => '',
                'charset' => 'utf8'));					
*/				
$db = new MysqliDb (Array (
                'host' => '192.168.1.19',
				//'host' => 'mediaobserver-me.com',
                'username' => 'app_user', 
                'password' => 'UFGBsfrhjuj42',
                'db'=> 'media_media',
                'port' => 3306,
                'prefix' => '',
                'charset' => 'utf8'));	
				
$localDB = new MysqliDb (Array (
                'host' => '192.168.1.19',
                'username' => 'app_user', 
                'password' => 'UFGBsfrhjuj42',
                'db'=> 'media_media',
                'port' => 3306,
                'prefix' => '',
                'charset' => 'utf8'));

		
?>