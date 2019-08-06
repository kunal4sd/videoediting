<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit7b4519d7f00613610336e06604375b62
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Flintstone\\' => 11,
        ),
        'A' => 
        array (
            'App\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Flintstone\\' => 
        array (
            0 => __DIR__ . '/..' . '/fire015/flintstone/src',
        ),
        'App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/classes',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit7b4519d7f00613610336e06604375b62::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit7b4519d7f00613610336e06604375b62::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}