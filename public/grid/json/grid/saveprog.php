<?php
$include_json = true;
include('/var/www/edit.mediaobserver-me.com/config/db.php');

$prog_name = trim($_POST['name_en']);
$pgrid_id = $_POST['pgrid_id'];
$pid = ($_POST['program_id'])? $_POST['program_id'] : 0 ;
$pgrog_date = array('show_name'=>$prog_name,'grid_id'=>$pgrid_id);


$db2->where('show_name',$prog_name);
$cheks  = $db2->getOne('grid_show');

if($cheks[id] ){
	$pid = $cheks[id];
}

if($pid){
	$db2->where('id',$pid);
	$db2->update('grid_show', $pgrog_date);

	$db2->where('show_id',$pid);
	$db2->delete('grid_show_episode');
} else {
	$pid = $db2->insert('grid_show', $pgrog_date);	
}


$repeats = 0;
$repeatArr = explode(',', $_POST['repeatStr']);

for($i=0;$i<7;$i++){
	$checks  = $_POST['selBox_'.$i];
	switch($i){
		case 0 : $day ='SAT'; break;
		case 1 : $day ='SUN'; break;
		case 2 : $day ='MON'; break;
		case 3 : $day ='TUE'; break;
		case 4 : $day ='WED'; break;
		case 5 : $day ='THU'; break;
		case 6 : $day ='FRI'; break;
	}
	$j=0;
	foreach($checks as $check){
		
		$pftime = $_POST['pftime_'.$i][$j].':00';
		$pttime = $_POST['pttime_'.$i][$j].':00';
		//$repeat = ( $_POST['repeat_'.$i][$j] == 'on' ) ? 'Y' :'N';
		$repeatStt = ($repeatArr[$repeats] =='on')  ? 'Y':'N';
	
		
		if($check ){
			$pgData = array('show_id'=>$pid, 'from_date_time'=>$pftime,'to_date_time'=>$pttime,'day'=>$day,'repeat'=>$repeatStt);
			
			$pgid = $db2->insert('grid_show_episode', $pgData);
			//echo $recDB->getLastQuery();
		}
		$j++;
		$repeats++;
	}
	
	
}

$arr= array('message'=>'added Successfully');
echo json_encode($arr);

?>