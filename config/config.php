<?php

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

// check for dev env
if (in_array($config['base']['host'], array('localhost', '192.168.33.4'), true)) {
    $config['env'] = 'dev';
}

// check for staging env
if (strpos(dirname(__FILE__), '/staging/') !== false) {
    $config['env'] = 'staging';
}

$target_config_file_path = __DIR__ . '/config_' . $config['env'] . '.php';

try {
    if (!file_exists($target_config_file_path)) {
        throw new \Exception("Unable to find the correct configuration file for current environment.");
    }

    require $target_config_file_path;
}
catch(\Exception $e) {
    die($e->getMessage());
}

return $config;
