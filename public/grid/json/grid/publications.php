<?php

$include_json = true;
include('/var/www/edit.mediaobserver-me.com/config/db.php');
$id = $_GET['id']; 

$query = "select * from customer_mediatype where customer_id = $id";

$result = $db2->rawQueryOne($query); 

function get_type_name($id){
	GLOBAL $db2;
	 return $db2->rawQueryOne("select * from publication_type where id =$id");
	
}

?>
<div style="height: 600px; overflow: scroll;">
	<table  border="1" style="color: #333;font-family: Helvetica, Arial, sans-serif;width: 1100px;collapse; border-spacing: 0; padding:5px;">
	<tr>
	<td style="border: 1px solid #CCC; height: 30px; background: #F3F3F3; font-weight: bold; padding:5px; width: 50%; ">English Name</td>
	<td style="border: 1px solid #CCC; height: 30px; background: #F3F3F3; font-weight: bold; padding:5px; width: 20%; ">Arabic Name </td>
	</tr>

	<?php 
	$tmp = explode(',',$result['publication_types']);
	;
	foreach( $tmp as $ua){
		$t1 = get_type_name($ua);
	?>
	<tr style="">
	<td style="border: 1px solid #CCC; height: 30px; background: #FAFAFA; padding:5px; width: 50%;"><?php echo $t1['name_en']?></td>
	<td style="border: 1px solid #CCC; height: 30px; background: #FAFAFA; padding:5px; width: 20%; "><?php echo $t1['name_ar']?></td>

	</tr>
	<?php }?>
	</table>
</div>