<?php

$config['db'] = [
    'localhost' => [
        'main' => [
            'host' => 'localhost',
            'port' => 3307,
            'database' => 'recordings',
            'username' => '',
            'password' => '',
            'driver' => 'mysql',
            'charset' => 'utf8mb4'
        ],
        'all' => [
            'host' => 'localhost',
            'port' => 3307,
            'database' => '',
            'username' => '',
            'password' => '',
            'driver' => 'mysql',
            'charset' => 'utf8mb4'
        ],
        'texts' => [
            'host' => 'office.mediaobserver-me.com',
            'port' => 33067,
            'database' => 'recordings_text',
            'username' => '',
            'password' => '',
            'driver' => 'mysql',
            'charset' => 'utf8mb4'
        ],
    ],
    'media' => [
        'media_media' => [
            'host' => 'localhost',
            'port' => 3307,
            'database' => 'recordings',
            'username' => 'root',
            'password' => '',
            'driver' => 'mysql',
            'charset' => 'utf8mb4'
        ]
    ],
    'manticore' => [
        'main' => [
            'host' => 'localhost',
            'port' => 9306,
            'database' => 'recordings_text',
            'username' => '',
            'password' => '',
            'driver' => 'mysql',
            'charset' => 'utf8mb4'
        ]
    ]
];
$config['cron']['jobs']['video_streams_alert']['mailing_list'] = [
    'Eduard Crafti' => 'craftieduard@gmail.com'
];
$config['cron']['jobs']['video_streams_alert']['mail_config'] = [

    //Tell PHPMailer to use SMTP
    'isSMTP', // interpreted as a method

    //Enable SMTP debugging
    // 0 = off (for production use)
    // 1 = client messages
    // 2 = client and server messages
    'SMTPDebug' => 0, // interpreted as a property

    // Set the hostname of the mail server
    // 'Host' => gethostbyname('smtp.gmail.com');
    // if your network does not support SMTP over IPv6
    'Host' => 'smtp.gmail.com',
    'Port' => 587,
    'SMTPSecure' => 'tls',
    'SMTPAuth' => true,
    'Username' => 'craftieduard@gmail.com',
    'Password' => '*****'
];

// for development, you would normally want cache disabled (false), and debug true
$config['view']['twig'] = [
    'cache' => APP_PATH . '/cache/twig',
    'debug' => false
];
