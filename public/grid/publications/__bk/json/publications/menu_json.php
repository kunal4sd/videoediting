<?php
$include_json = true;
include('../../includes/db.php');

$id  =  $db->escape($_GET['id']);
$searchTerm  =  $db->escape($_GET['searchTerm']);

if( !$id  && !$searchTerm ){
	
	echo '[]';
	die();
}

if($_GET['getBy'] == 'country'){

	if($id){
		$id = str_replace(',',"','",$id);
		$db->where (" iso in ('".$id."') ");
	}	
	if($searchTerm){
		$db->where (" (name_en like  '%".$searchTerm."%' or name_ar like  '%".$searchTerm."%')");
	}
	
	$info = $db->get ("country",null, "iso as id, concat(name_en,' ',name_ar) as text" );
	
	 
} elseif($_GET['getBy'] == 'publication') {
	
	if($id){
		$db->where ("id in (".$id.") ");
	}	
	if($searchTerm){
		$db->where ("(name_en like  '%".$searchTerm."%' or name_ar like  '%".$searchTerm."%')");
	}
	$db->where ("type_id  in (1,2,3,4) ");
	$db->where ("active = 1 ");
	
	$info = $db->get ("publication",null, "id as id, concat(name_en,' ',name_ar)  as text" );	
	//echo $db->getLastQuery();
	//die();
} 
 echo json_encode($info);
?>