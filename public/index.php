<?php

session_start();
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
