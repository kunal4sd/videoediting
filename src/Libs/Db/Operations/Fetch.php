<?php

namespace App\Libs\Db\Operations;

use App\Libs\Db\Abstracts\PdoCommand;

class Fetch extends PdoCommand
{

    /**
     * @param string $query : the query to be executed
     * @param array $params : associative array of params to be prepared and inserted into the query
     * @throws Exception : if query execution fails
     * @return array
     */
    public function __invoke($query, array $params = [])
    {
        $result = $this->pdo->run($query, $params)->fetch();
        return is_array($result) ? $result : [];
    }

}
