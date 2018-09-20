<?php
$include_json = true;
include('/var/www/edit.mediaobserver-me.com/config/db.php');

$db2->where('id',$_GET['id']);
$info['prog'] = $db2->getOne('grid_show' );

$db2->where('show_id',$_GET['id']);
$info['prog_ep'] = $db2->get('grid_show_episode' );
echo  json_encode($info);