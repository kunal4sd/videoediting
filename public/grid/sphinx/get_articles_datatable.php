<?php
$include_json = true;
include('../../includes/db.php');

$table = 'article';

$max_limit = 10000;
$nu_min_of_empty_text = 3;

$_GET['user_id']  =  ( !$_GET['user_id'] ) ? 0 : $_GET['user_id'];

$query_str = "select * FROM (
SELECT  DISTINCT(a.id) as article_id, CONCAT(s.name_en , ' | ', a.page_name ) as section_name_en, p.name_en as publication_name_en , a.headline as headline, a.created as created_date, a.issue_date as issue_date,
IF( (( (`a`.`text` IS NULL)  or (length(a.`text`) <   3)  or (length(a.`headline`) <   3) or (`a`.`headline` IS NULL) ) and ( (p.type_id!=3) and (p.type_id!=4) ) ),'danger','') as 'DT_RowClass', a.id as 'DT_RowId',
(select name_en from country where iso= p.country ) as country
FROM `article` AS `a` 
JOIN `publication` AS `p` ON ( a.publication_id = p.id  )
JOIN `section` AS `s` ON ( a.section_id = s.id  )";

if( $_GET['keywords_id']  ){
	$query_str .= 'JOIN article_keyword as ak ON ( a.id = ak.article_id  )';
}

if( $_GET['user_id'] != -1){
	$query_str .= 'JOIN user_activity as ua ON ( a.id = ua.article_id  )';
}

$extraWhere = ' where 1 ';
if( $_GET['country'] ){
	$_GET['country'] = str_replace(',',"','",$_GET['country']);
	$extraWhere .= " and `p`.`country` in ('".$_GET['country']."')";   
}
if( $_GET['publication_type'] ){
	$extraWhere .= " and `p`.`type_id` = '".$_GET['publication_type']."'";   
}

if( $_GET['user_id'] != -1 ){
	$extraWhere .= " and `ua`.`user_id` = '".$_GET['user_id']."'";   
}

if($_GET['maxid']){
	$extraWhere .= " and `a`.`id` > ".$_GET['maxid'];   
}

if($_GET['magazine_article_size']){
	$maz = $_GET['magazine_article_size'];
	switch ($maz){
		case 1 : 
			$extraWhere .= " and `a`.`size` <= 0.25";   
			break;
			
		case 2 : 
			$extraWhere .= " and `a`.`size` >0.25  and `a`.`size` <=0.5 ";   
			break;
			
		case 3 : 
			$extraWhere .= " and `a`.`size` >0.5  and `a`.`size` <=0.75 ";  
			break;
			
		case 4 : 
			$extraWhere .= " and `a`.`size` >0.75  and `a`.`size` <=1 ";
			break;	

		case 5 : 
			$extraWhere .= " and `a`.`size` >1  and `a`.`size` <=1.5 ";  
			break;	

		case 6 : 
			$extraWhere .= " and `a`.`size` >1.5  and `a`.`size` <=2 "; 
			break;	
			
		case 7 : 
			$extraWhere .= " and `a`.`size` >2";  
			break;				
	}
}

if( $_GET['publication'] ){
	$extraWhere .= " and `p`.`id` in ( ".$_GET['publication'].")";   
}


if( $_GET['keywords_id'] ){
	$extraWhere .= " and `ak`.`keyword_id` in ( ".$_GET['keywords_id'].")";   
}

if( $_GET['langs'] ){
	$_GET['langs'] = "'".str_replace(',',"','",$_GET['langs'])."'";
	$extraWhere .= " and `p`.`language` in ( ".$_GET['langs'].")";   
}

if( $_GET['artcile_status'] == 1 ){
	$extraWhere .= " and ( (`a`.`text` IS NULL)  or (length(a.`text`) <   $nu_min_of_empty_text)  or (length(a.`headline`) <   $nu_min_of_empty_text) or (`a`.`headline` IS NULL) )	";   
}

if( $_GET['artcile_status'] == 3 ){
	$extraWhere .= " and ( (`a`.`text` IS NULL)  or (length(a.`text`) <   $nu_min_of_empty_text)  )	";   
}

if( $_GET['artcile_status'] == 2 ){
	$extraWhere .= " and (  (length(a.`headline`) <   $nu_min_of_empty_text) or (`a`.`headline` IS NULL) )	";   
}

if( $_GET['create_from'] ){
	$extraWhere .= " and `a`.`created` >= '".$_GET['create_from']."'";   
	
	if( $_GET['create_to'] ){
		$extraWhere .= " and `a`.`created` <= '".$_GET['create_to']."'";   
	}	
}


if( $_GET['issue_from'] ){
	$extraWhere .= " and `a`.`issue_date` >= '".$_GET['issue_from']."'";   
	
	if( $_GET['issue_to'] ){
		$extraWhere .= " and `a`.`issue_date` <= '".$_GET['issue_to']."'";   
	}	
}


$query_str .= "$extraWhere LIMIT 0, $max_limit) t order by t.article_id desc";

//echo $query_str;
//die();

if($_GET['maxid']){ 
	print json_encode($db->rawQuery($query_str));
} else {
	$articles['data'] = $db->rawQuery($query_str);	
	print json_encode($articles);
}


//print_r($articles);

