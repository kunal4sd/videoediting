<?php

// make sure to create the correct production and staging config files on the deplyoment server
$config = [
    'base' => [
        'host' => isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'localhost',
        'path' => realpath(__DIR__ . '/..')
    ],
    'db' => [],

    // default env is `prod`
    'env' => 'prod',
    'slim' => [],
    'twig' => []
];


/**
 * DODGY CODE
 * REASON: $_SERVER['SERVER_NAME'] (aka $config['base']['host']) can be manipulated on ...
 * ... the client side if the Apache2 server is not configured correctly.
 * SOLUTION: see http://php.net/manual/ro/reserved.variables.server.php ### SERVER_NAME
 * If a more reliable alternative exists to automatically detect the environment, implement it!
 * Or if it's better to drop this part altogether, do so.
 */

// check for dev env
if (in_array($config['base']['host'], array('localhost', '192.168.33.4'), true)) {
    $config['env'] = 'dev';
}

// check for staging env
if (strpos(dirname(__FILE__), '/staging/') !== false) {
    $config['env'] = 'staging';
}

/**
 * END OF DODGY CODE.
 * Yeah, right! :)
 */


$target_config_file_path = __DIR__ . '/config_' . $config['env'] . '.php';

if (!file_exists($target_config_file_path)) {
    die("Unable to find the correct configuration file for current environment.");
}

require $target_config_file_path;

return $config;
