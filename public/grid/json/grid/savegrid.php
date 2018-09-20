<?php
$include_json = true;
include('/var/www/edit.mediaobserver-me.com/config/db.php');

$tmp = explode(' - ', $_POST['fdate']);

$data = array(
	'name'=>$_POST['name_en'],
	'from_date'=>$tmp[0],
	'to_date'=>$tmp[1],
	'publication_id'=>$_POST['pubID'],
);

if($_POST['grid_id']){
	$db2->where ('id', $_POST['grid_id']);
	$db2->update ('grids', $data);
	$arr= array('message'=>'update Successfully','gid'=>$gid,'title'=>$_POST['name_en'].'('.$tmp[0].'-'.$tmp[1].')','action'=>'edit');
} else {
	
	$gid = $db2->insert('grids', $data);
	$arr= array('message'=>'added Successfully','gid'=>$gid,'title'=>$_POST['name_en'].'('.$tmp[0].'-'.$tmp[1].')','action'=>'add');
}
echo json_encode($arr);

?>