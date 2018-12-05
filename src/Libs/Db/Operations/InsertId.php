<?php

namespace App\Libs\Db\Operations;

use App\Libs\Db\Abstracts\PdoCommand;

class InsertId extends PdoCommand
{

    /**
     * @param string $query : the query to be executed
     * @param array $params : associative array of params to be prepared and inserted into the query
     * @throws Exception : if query execution fails
     * @return int : the id of the inserted row
     */
    public function __invoke($query, array $params = [])
    {
        $this->pdo->run($query, $params);
        return $this->pdo->last_insert_id();
    }

}
