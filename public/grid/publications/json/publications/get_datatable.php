<?php
$include_json = true;
include('../../includes/db.php');


function get_number_of_rates($id){
	global $db;
	$str = 'select count(*) as nu from (SELECT count(id) AS cnt    FROM ad_rate where publication_id= '.$id.' group by section_id) as b';
	$rs = $db->rawQueryOne($str);
	return $rs['nu']; 
}

$query_str = "
select p.id, p.name_en, p.name_ar, 
(select name_en from publication_frequency where id=p.frequency_id) as frequency ,

(select name_en from publication_type pt where pt.id = p.type_id) as type_name, 
(select name_en from country c  where c.iso= p.country) as country, p.language, p.adrate ,
p.id as 'DT_RowId'
from publication p 
";


$extraWhere = ' where  p.`active` = 1 ';
if( $_GET['country'] ){
	$_GET['country'] = str_replace(',',"','",$_GET['country']);
	$extraWhere .= " and `country` in ('".$_GET['country']."')";   
}


if( $_GET['publication'] ){
	$_GET['publication'] = str_replace(',',"','",$_GET['publication']);
	$extraWhere .= " and `id` in ('".$_GET['publication']."')";   
}

if( $_GET['langs'] ){
	$_GET['langs'] = "'".str_replace(',',"','",$_GET['langs'])."'";
	$extraWhere .= " and `language` in ( ".$_GET['langs'].")";   
}

if( $_GET['freq'] ){
	$_GET['freq'] = "'".str_replace(',',"','",$_GET['freq'])."'";
	$extraWhere .= " and `frequency_id` in ( ".$_GET['freq'].")";   
}


if( $_GET['types'] ){
	$_GET['types'] = "'".str_replace(',',"','",$_GET['types'])."'";
	$extraWhere .= " and `type_id` in ( ".$_GET['types'].")";   
} else {
	$extraWhere .= " and `type_id` in ( 1,2,3,4)";   
	
}


$query_str .= $extraWhere . $having ;


//die($query_str);

$publication['data'] = $db->rawQuery($query_str);	

for( $i=0 ; $i<sizeof($publication['data']);$i++ ){
	$issue_date = $db->rawQueryOne('select i.date from issue i where i.publication_id = '.$publication['data'][$i]['id'].' order by id desc limit 1');
	$publication['data'][$i]['display_date'] = time2str( $issue_date['date'] );
	
	
}

print json_encode($publication);




//Relative Date Function
function time2str($ts)
{
    if(!ctype_digit($ts))
        $ts = strtotime($ts);

    $diff = time() - $ts;
    if($diff == 0)
        return 'now';
    elseif($diff > 0)
    {
        $day_diff = floor($diff / 86400);
        if($day_diff == 0)
        {
             return 'Today';
        }
        if($day_diff == 1) return 'Yesterday';
       // if($day_diff < 7) return $day_diff . ' days ago';
       // if($day_diff < 31) return ceil($day_diff / 7) . ' weeks ago';
       // if($day_diff < 60) return 'last month';
        return date('d M Y', $ts);
    }
    else
    {
        $diff = abs($diff);
        $day_diff = floor($diff / 86400);
        if($day_diff == 0)
        {
            if($diff < 120) return 'in a minute';
            if($diff < 3600) return 'in ' . floor($diff / 60) . ' minutes';
            if($diff < 7200) return 'in an hour';
            if($diff < 86400) return 'in ' . floor($diff / 3600) . ' hours';
        }
        if($day_diff == 1) return 'Tomorrow';
        if($day_diff < 4) return date('l', $ts);
        if($day_diff < 7 + (7 - date('w'))) return 'next week';
        if(ceil($day_diff / 7) < 4) return 'in ' . ceil($day_diff / 7) . ' weeks';
        if(date('n', $ts) == date('n') + 1) return 'next month';
        return date('F Y', $ts);
    }
}