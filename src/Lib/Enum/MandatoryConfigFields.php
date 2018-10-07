<?php

namespace App\Lib\Enum;

class MandatoryConfigFields
{
    const CORE = 'core';
    const ENV  = 'core.env';
    const HOST = 'core.host';
    const SLIM = 'slim';
    const LOGS = 'monolog';
    const LOGS_ENABLED = 'monolog.enabled';
    const LOGS_LEVEL = 'monolog.min_level';
    const LOGS_PATH = 'monolog.path';
    const DBS = 'db';
    const LOCALHOST = 'db.localhost';
    const VIEW = 'view';
    const TEMPLATES_PATH = 'view.templates_path';
    const TWIG = 'view.twig';
}