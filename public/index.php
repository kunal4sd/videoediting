<?php

define("BASE_PATH", __DIR__ . '/..');

session_start();

require BASE_PATH . '/vendor/autoload.php';
$config = require BASE_PATH . '/app/config/config.php';

echo "Hello, World!";
