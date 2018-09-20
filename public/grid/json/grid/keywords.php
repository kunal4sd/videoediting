<?php

$include_json = true;
include('/var/www/edit.mediaobserver-me.com/config/db.php');
$id = $_GET['id']; 

$query = "select (select k.name_en from keyword k where k.id = keyword_id) as name_en from customer_keyword where customer_id =  $id";

$result = $db->rawQuery($query); 



?>
<div style="height: 600px; overflow: scroll;">
	<table  border="1" style="color: #333;font-family: Helvetica, Arial, sans-serif;width: 1100px;collapse; border-spacing: 0; padding:5px;">
	<tr>
	<td style="border: 1px solid #CCC; height: 30px; background: #F3F3F3; font-weight: bold; padding:5px; width: 50%; ">English Name</td>
	</tr>

	<?php 

	foreach( $result as $ua){
	?>
	<tr style="">
	<td style="border: 1px solid #CCC; height: 30px; background: #FAFAFA; padding:5px; width: 50%;"><?php echo $ua['name_en']?></td>
	

	</tr>
	<?php }?>
	</table>
</div>