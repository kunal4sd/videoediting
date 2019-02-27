<?php

define("BASE_PATH", realpath(__DIR__ . '/../..'));
define("PUBLIC_PATH", realpath(__DIR__ . '/../../public'));
define("BIN_PATH", BASE_PATH . '/app/bin');
define("CONFIG_FILE_PATH", BASE_PATH . '/app/config/config.php');
define("HOST", isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'localhost');
define(
    "SCHEME",
    ( isset($_SERVER['HTTPS']) && strlen($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' ) ? 'https' : 'http'
);
