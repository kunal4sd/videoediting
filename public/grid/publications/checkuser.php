<?php
$dont_check_login = true;
include('includes/db.php');

$uname = $db->escape($_POST['username']);
$upass = $db->escape($_POST['password']);

$q1  = "select * from user where username='$uname' and password= PASSWORD('$upass') and  isnull(expiry_date) and group_id in (0, 7) ";

$users = $db->rawQueryOne($q1);

if($users['id']){
	$_SESSION['uid'] = $users['id'];
	header("Location: home.php");
	exit();
} else {
	header("Location: index.php?err=1");
    die();	
}