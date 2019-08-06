<?php
include('/var/www/edit.mediaobserver-me.com/config/db.php');

/*
$nq = "select k.*
		from customer c 
		inner join customer_mediatype cm on cm.customer_id = c.id
		inner join customer_keyword ck on ck.customer_id = c.id 
		inner join keyword k on k.id = ck.keyword_id

		where
		c.expiry_date >= now() 
		and ( 
		FIND_IN_SET('3',cm.publication_types) > 0 or FIND_IN_SET('4',cm.publication_types) > 0 
		) and k.active =1
	";
	$res = $db->rawQuery($nq);

	foreach($res as $tmp){
		$db2->insert('keyword_videos',$tmp);
	}
	
die();
*/
function dbAction($arr, $action, $table){
	GLOBAL $db2;

	
	if($action == 'update') {
		$id = $arr['id'];
		unset($arr['id']);
		$db2->where('id',$id);
		$db2->update($table,$arr);
	} else {
		$db2->insert ($table,$arr);
	}
	//echo $db2->getLastQuery().'<br>';
	
}

/*Update*/
$action_arr[0] = array('table'=>'keyword','field'=>'created','action'=>'insert');
$action_arr[1] = array('table'=>'keyword','field'=>'modified','action'=>'update');

$action_arr[2] = array('table'=>'publication','field'=>'created','action'=>'insert');
$action_arr[3] = array('table'=>'publication','field'=>'modified','action'=>'update');



foreach($action_arr as $actInfo){
	
	$table = $actInfo['table'];
	$field = $actInfo['field'];
	$action = $actInfo['action'];
	//print_r($actInfo);
	
	$q = "select $field  as res from $table where id = (select max(id) from $table order by $field limit 1)";

	$tarr = $db2->rawQueryOne($q);
	$tarr = $tarr['res'];
	//$tarr = '2018-07-23 12:51:43';

	$db->where("$field >'$tarr'");
	$dbarrs = $db->get($table);
	
	if(sizeof($dbarrs)>0 ){
		
		foreach($dbarrs as $dbarr){
			dbAction($dbarr,$action,$table);
		}
	}
	
}
echo 'Done';
?>