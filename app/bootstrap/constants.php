<?php

define("BASE_PATH", realpath(__DIR__ . '/../..'));
define("PUBLIC_PATH", BASE_PATH . '/public');
define("APP_PATH", BASE_PATH . '/app');
define("BIN_PATH", APP_PATH . '/bin');
define("CONFIG_FILE_PATH", APP_PATH . '/config/config.php');
define("HOST", isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'localhost');
define(
    "SCHEME",
    ( isset($_SERVER['HTTPS']) && strlen($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ) ? 'https' : 'http'
);
