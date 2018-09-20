<?php

$db = new PDO('mysql:host=192.168.1.118;port=9306;charset=utf8', '', '');

$sth = $db->prepare("SELECT * FROM index1 WHERE MATCH(:query) and country = 'Jordan' and section_name = 'Main' and issue_date > 1496107194 limit 10000");

$sth->execute(array(':query' => '"jordan"'));

print_r($sth->fetchAll(PDO::FETCH_ASSOC));
?>