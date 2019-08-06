<?php
$q = $_POST['data']['q'];

include(dirname(__DIR__) .'/config/MysqliDb.php');

$db = new MysqliDb (Array (
                'host' => 'moo.hopto.org',
                'username' => 'app_user', 
                'password' => 'UFGBsfrhjuj42',
                'db'=> 'media_media',
                'port' => 3306,
                'prefix' => '',
                'charset' => 'utf8'));
				

				
if (preg_match('/[أ-ي]/ui', $q)) {
    $field = 'name_ar';
} else {
    $field = 'name_en';
}
$strq = "select id,name_en, name_ar from keyword where ". $field ." like '%".$q."%' " ;

$states = $db->rawQuery($strq);

//echo $db->getLastQuery();
//die();

$results = array();
foreach($states as $i => $state){
	
	if ( stripos( $state[$field] , $q) !== false  ){
		$results[] = array('id' => $state['id'], 'text' => $state['name_en'].'::'.$state['name_ar']);
	}
}
echo json_encode(array('q' => $q, 'results' => $results));
