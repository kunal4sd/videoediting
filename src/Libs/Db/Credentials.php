<?php

namespace App\Libs\Db;

use \Exception;
use App\Libs\Enums\Config\MandatoryPdoFields;

class Credentials
{

    /**
     * @var string
     */
    public $host;

    /**
     * @var string
     */
    public $database;

    /**
     * @var int
     */
    public $port;

    /**
     * @var string
     */
    public $username;

    /**
     * @var string
     */
    public $password;

    /**
     * @var string
     */
    public $driver;

    /**
     * @var string
     */
    public $charset;

    public function __construct(array $config = [])
    {
        try {
            check_mandatory_fields(new MandatoryPdoFields(), $config);
            $this->assign_values($config);
        }
        catch(Exception $e) {
            throw $e;
        }
    }

    private function assign_values(array $config)
    {
        $this->host = $config[MandatoryPdoFields::HOST];
        $this->database = $config[MandatoryPdoFields::DB];
        $this->port = $config[MandatoryPdoFields::PORT];
        $this->username = $config[MandatoryPdoFields::USER];
        $this->password = $config[MandatoryPdoFields::PASS];
        $this->driver = $config[MandatoryPdoFields::DRIVER];
        $this->charset = $config[MandatoryPdoFields::CHARSET];
    }

    public function get_dsn()
    {
        return sprintf(
            "%s:dbname=%s;host=%s;port=%d;charset=%s",
            $this->driver,
            $this->database,
            $this->host,
            $this->port,
            $this->charset
        );
    }
}
