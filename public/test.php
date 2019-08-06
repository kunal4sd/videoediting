<?php

 date_default_timezone_set('Asia/Amman');
 $date= date('m-d-Y h:i:s') ;
 
 echo $date;
 
 echo '<br>-------------<br>';
 $date = new DateTime("now", new DateTimeZone('Asia/Amman') );
echo $date->format('Y-m-d H:i:s');
 ?>