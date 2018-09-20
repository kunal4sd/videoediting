<?php

$dont_check_login = true;
include('/var/www/edit.mediaobserver-me.com/config/db.php');

/*
$data = Array ("username" => "rami",
               "password" => $db->func( 'PASSWORD(?)',Array ("123123") )
);
$id = $db->insert ('user', $data);
echo 'id = '.$id;
die();
*/
$uname = $db->escape($_POST['username']);
$upass = $db->escape($_POST['password']);

$q1  = "select * from user where username='$uname' and password= PASSWORD('$upass') and  isnull(expiry_date) and id !=167 ";
$users = $db->rawQueryOne($q1);

if($users['id']){
	
	//$_SESSION['uid'] = $users['id'];
	setcookie('uid', $users['id']);
	
	//$_SESSION['gid'] = $users['group_id'];
	setcookie('gid', $users['group_id']);
	
	//$_SESSION['uname'] = $users['username'];
	setcookie('uname', $users['username']);
	
	//$_SESSION['type'] = $users['type_id'];
	setcookie('type', $users['type_id']);
	
	
	$data = Array ("user_id" => $users['id'],
				   "publication_id" => 0,
				   "article_id" => 0,
				   "issue_date" => '0000-00-00',
				   "activity_id" => 21,
				   "created" => $db->now(),
				   
	);

	$id = $db->insert ('user_activity', $data);
	//echo '---'.$db->getLastQuery();
	
	if( $users['group_id']=='5' ){
		header("Location: article_translate.php");
	} else { 
		header("Location: articles_new.php");
	}
	
	die();
} else {
	header("Location: index.php?err=1");
    die();	
}