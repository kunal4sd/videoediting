<?php
require('sphinxapi.php');
$cl = new SphinxClient();
$cl->SetServer('192.168.1.118', 9306);

$cl->SetLimits(0, 5);

var_dump($c1);
?>