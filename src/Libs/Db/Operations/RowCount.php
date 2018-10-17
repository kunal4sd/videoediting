<?php

namespace App\Libs\Db\Operations;

use App\Libs\Db\Abstracts\PdoCommand;

class RowCount extends PdoCommand
{

    /**
     * @param string $query : the query to be executed
     * @param array $params : associative array of params to be prepared and inserted into the query
     * @throws Exception : if query execution fails
     * @return int : the number of rows returned by the query
     */
    public function __invoke($query, array $params = [])
    {
        return $this->pdo->run($query, $params)->rowCount();
    }

}
