<?php

namespace App\Libs\Db\Abstracts;

use App\Libs\Db\Credentials;
use \PDO;
use \Exception;
use \PDOException;

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

    /**
     * @var integer
     */
    private $max_nb_retries = 3;

    /**
     * @var integer
     */
    private $nb_retries = 0;

    public function __construct(Credentials $credentials)
    {
        $this->credentials = $credentials;
    }

    protected function connect()
    {
        try {
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
            $this->nb_retries = 0;
        }
        catch(PDOException $e) {
            if ($this->nb_retries < $this->max_nb_retries) {
                sleep($this->nb_retries * 5);
                $this->nb_retries++;
                $this->connect();
            }
            else {
                throw new Exception(sprintf('%s (%s)', $e->getMessage(), $e->getCode()), 200);
            }
        }
    }

    public function __destruct()
    {
        $this->pdo = null;
    }
}
