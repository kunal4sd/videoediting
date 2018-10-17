<?php

namespace App\Libs\Db\Abstracts;

use App\Libs\Db\Credentials;
use \PDO;

abstract class Connection
{

    /**
     * @var Credentials
     */
    private  $credentials;

    /**
     * @var PDO
     */
    protected $pdo;

    public function __construct(Credentials $credentials)
    {
        $this->credentials = $credentials;
    }

    protected function connect()
    {
        $this->pdo = new PDO(
            $this->credentials->get_dsn(),
            $this->credentials->username,
            $this->credentials->password,
            [
                PDO::ATTR_TIMEOUT => 1,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]
        );
    }

    public function __destruct()
    {
        $this->pdo = null;
    }
}
