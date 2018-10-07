<?php

$config = [
    'core' => [
        'env' => 'dev',
        'host' => isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : 'localhost'
    ],
    'db' => [
        'localhost' => [
            'root' => [
                'port' => 3306,
                'pass' => 'test1234',
                'databases' => ['dev']
            ]
        ]
    ],
    'slim' => [
        'displayErrorDetails' => true
    ],
    'monolog' => [
        'enabled' => true,
        'min_level' => 100,
        'path' => BASE_PATH . '/app/logs'
    ],
    'view' => [
        'templates_path' => BASE_PATH . '/app/templates',
        'twig' => [
            // 'cache' => BASE_PATH . '/app/cache/twig',
            'cache' => false,
            'debug' => true
        ]
    ]
];


/**
 * DODGY CODE
 * MAIN REASON: $_SERVER['SERVER_NAME'] (aka $config['core']['host']) can be manipulated on ...
 * ... the client side if the Apache2 server is not configured correctly.
 * SOLUTION: see http://php.net/manual/ro/reserved.variables.server.php ### SERVER_NAME
 * If a safer alternative exists to automatically detect the environment, implement it!
 * Or if it's better to drop this part altogether, and manually set env, do so.
 */

// check for staging env
if (strpos(dirname(__FILE__), '/staging/') !== false) {
    $config['core']['env'] = 'staging';
}

// check for prod env
elseif (!in_array($config['core']['host'], array('localhost', '192.168.33.4'), true)) {
    $config['core']['env'] = 'prod';
}

/**
 * END OF DODGY CODE.
 * Yeah, right! :)
 */


$target_config_file_path = __DIR__ . '/config_' . $config['core']['env'] . '.php';

if (!file_exists($target_config_file_path)) {
    die("Unable to find the correct configuration file for `{$config['core']['env']}` environment.");
}

require $target_config_file_path;

return $config;
