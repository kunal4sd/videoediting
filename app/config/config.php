<?php

$config = [
    'core' => [
        'env' => 'dev'
    ],
    'db' => [],
    'slim' => [
        'displayErrorDetails' => true
    ],
    'monolog' => [
        'enabled' => true,
        'min_level' => 100,
        'path' => APP_PATH . '/logs',
        'filename' => sprintf('%s.csv', date("Y_m_d"))
    ],
    'view' => [
        'templates_path' => APP_PATH . '/templates',
        'twig' => [
            'cache' => false,
            'debug' => true
        ]
    ],
    'user' => [
        'sessions' => [
            'max' => 4
        ]
    ],
    'cron' => [
        'main' => [
            'php_binary' => '/usr/bin/php',
            'log_path' => APP_PATH . '/logs',
            'log_filename' => sprintf('cron_%s.log', date("Y_m_d")),
            'default_schedule' => '30 * * * *'
        ],
        'jobs' => [
            'video_streams_alert' => [
                'schedule' => '* * * * *',
                'mail_config' => [],
                'mailing_list' => []
            ],
            'delete_old_tmp_files' => [
                'schedule' => '*/2 * * * *'
            ]
        ]
    ],
    'ssh' => []
];


/**
 * DODGY CODE
 * MAIN REASON: $_SERVER['SERVER_NAME'] (aka HOST) can be manipulated on ...
 * ... the client side if the Apache2 server is not configured correctly.
 * SOLUTION: see http://php.net/manual/ro/reserved.variables.server.php ### SERVER_NAME
 * If a safer alternative exists to automatically detect the environment, implement it!
 * Or if it's better to drop this part altogether, and manually set env, do so.
 */

// script is run from cli
if (php_sapi_name() === 'cli') {

    // no staging available at this point
    // just check for production env if running from cli
    if (isset($_SERVER['LOGNAME']) && $_SERVER['LOGNAME'] !== 'vagrant') {
        $config['core']['env'] = 'prod';
    }
}
else {

    // check for staging env
    if (strpos(dirname(__FILE__), '/staging/') !== false) {
        $config['core']['env'] = 'staging';
    }

    // check for prod env
    elseif (!in_array(HOST, array('localhost', '192.168.33.4'), true)) {
        $config['core']['env'] = 'prod';
    }
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
