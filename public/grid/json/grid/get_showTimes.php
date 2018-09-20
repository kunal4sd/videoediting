<?php
$include_json = true;
include('/var/www/edit.mediaobserver-me.com/config/db.php');

$sid = $_GET['sid'];
$query_str = "select * from grid_show_episode gse where gse.show_id = $sid";
$data['data'] = $db2->rawQuery($query_str);	

print json_encode($data);

