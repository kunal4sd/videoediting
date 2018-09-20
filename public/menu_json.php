<?php
include(dirname(__DIR__) .'/config/MysqliDb.php');

$db = new MysqliDb (Array (
                'host' => 'localhost',
                'username' => 'app_user', 
                'password' => 'UFGBsfrhjuj42',
                'db'=> 'recordings',
                'port' => 3306,
                'prefix' => '',
                'charset' => 'utf8'));	

				
if($_GET['getById']){
		$kInfo = $db->rawQueryOne ('select GROUP_CONCAT(k.id) as keyIds from 
					article_keyword ak 
					inner join keyword k on k.id = ak.keyword_id
					where ak.article_id = '.$_GET['getById']);
		echo $kInfo['keyIds'];	
} else {
	if( !$_GET['id'] && !$_GET['searchTerm'] ){
		echo '[]';
		die();
	}

	if($_GET['id']){
		
		$idstr = " and id in (".$_GET['id'].")";
	}	

	$info = $db->rawQuery("SELECT id as id,Concat(name_en,' :: ',name_ar) as text FROM keyword WHERE 1 $idstr AND (name_en like  '%".$_GET['searchTerm']."%' OR name_ar like'%".$_GET['searchTerm']."%')");
	//echo '--'.$db->getLastQuery();
	//die();	
		

	 echo json_encode($info);
}
?>