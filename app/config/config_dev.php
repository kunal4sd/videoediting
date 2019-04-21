<?php

$config['db'] = [
    'localhost' => [
        'main' => [
            'host' => 'localhost',
            'port' => 3306,
            'database' => 'recordings',
            'username' => 'root',
            'password' => 'test1234',
            'driver' => 'mysql',
            'charset' => 'utf8mb4'
        ],
        'all' => [
            'host' => 'localhost',
            'port' => 3306,
            'database' => '',
            'username' => 'root',
            'password' => 'test1234',
            'driver' => 'mysql',
            'charset' => 'utf8mb4'
        ]
    ],
    'media' => [
        'media_media' => [
            'host' => 'localhost',
            'port' => 3306,
            'database' => 'recordings',
            'username' => 'root',
            'password' => 'test1234',
            'driver' => 'mysql',
            'charset' => 'utf8mb4'
        ]
    ]
];

// for development, you would normally want cache disabled (false), and debug true
// $config['view']['twig'] = [
//     'cache' => BASE_PATH . '/app/cache/twig',
//     'debug' => false
// ];