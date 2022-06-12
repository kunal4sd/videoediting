<?php
ini_set('memory_limit', '256M');
ini_set('max_execution_time', 60);

date_default_timezone_set('Asia/Amman');

require '../vendor/autoload.php';
require '../app/bootstrap/constants.php';
require '../app/bootstrap/functions.php';

try {
    $app = new App\App();
    $app->run();
}
catch(\Exception $e) {
    die($e->getMessage()); // much safe
}
