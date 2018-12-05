<?php

namespace App\Libs\Db;

use App\Libs\Db\Abstracts\Runnable;
use App\Libs\Db\Abstracts\Connection;
use \Exception;

class Pdo extends Connection implements Runnable
{

    /**
     * @param string $query : the query to be executed
     * @param array $params : associative array of params to be prepared and inserted into the query
     * @throws Exception : if query execution fails
     * @return \PDOStatement : prepared PDOStatement
     */
    public function run($query, array $params = [])
    {
        if ($this->pdo === null) {
            $this->connect();
        }

        try {
            $stmt = $this->pdo->prepare($query);

            foreach($params as $name => $details) {

                if (!is_array($details)) $details = [$details];
                $stmt->bindValue(":{$name}", array_shift($details), array_shift($details));
            }

            $stmt->execute();
        } catch(Exception $e) {

            if ($e->getCode() === 'HY000') {
                $this->pdo = null;

                return $this->run($query, $params);
            }
            else {
                throw new Exception($e->getMessage(), 500);
            }
        }

        return $stmt;
    }

    public function last_insert_id()
    {
        return $this->pdo->lastInsertId();
    }

}
