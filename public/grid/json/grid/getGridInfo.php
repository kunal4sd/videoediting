<?php
$include_json = true;
include('/var/www/edit.mediaobserver-me.com/config/db.php');

$db2->where('id',$_GET['id']);
$grid_info = $db2->getOne('grids' );
echo  json_encode($grid_info);