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
	if(!$_COOKIE['uid']){
		header("Location: index.php?err=2");
		die();			
	}
}
				
				
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

$recDB = new MysqliDb (Array (
                'host' => 'mod.mediaobserver-me.com',
                'username' => 'app_user', 
                'password' => 'UFGBsfrhjuj42',
                'db'=> 'recordings',
                'port' => 3306,
                'prefix' => '',
                'charset' => 'utf8'));
				
				
$mocDB = new MysqliDb (Array (
                'host' => 'moc.mediaobserver-me.com',
                'username' => 'office', 
                'password' => 'UFGBsfrhjuj42',
                'db'=> 'moc',
                'port' => 3306,
                'prefix' => '',
                'charset' => 'utf8'));				
				
if(isset($section_name) ){
	$q2  	   = 'select group_concat( up.`function`) as functions from group_privilege gp inner join user_privilege up on up.id = gp.privilege_id 
				  where gp.group_id='.$_COOKIE['gid'] .' and up.section=\''.$section_name.'\'';

	$uprivilege = $db->rawQueryOne($q2);
	$ufunctions = explode(',' , $uprivilege['functions'] );
	

	if( !in_array('Access',$ufunctions) ){
		//die('You Cant Access this page');
	}

}

				
?>