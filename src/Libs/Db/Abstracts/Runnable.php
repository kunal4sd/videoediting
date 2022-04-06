<?php

namespace App\Libs\Db\Abstracts;

interface Runnable
{
    public function run($query, array $params = []);
}
