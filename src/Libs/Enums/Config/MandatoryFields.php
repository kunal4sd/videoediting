<?php

namespace App\Libs\Enums\Config;

class MandatoryFields
{
    const CORE = 'core';
    const ENV  = 'core.env';
    const HOST = 'core.host';
    const SLIM = 'slim';
    const LOG = 'monolog';
    const DBS = 'db';
    const VIEW = 'view';
    const TEMPLATES_PATH = 'view.templates_path';
    const TWIG = 'view.twig';
}
