<?php
$include_json = true;
include('/var/www/edit.mediaobserver-me.com/config/db.php');

$gid = $_GET['gid'];
$query_str = "select * from grid_show gs where gs.grid_id = $gid";
$data['data'] = $db2->rawQuery($query_str);	

print json_encode($data);

