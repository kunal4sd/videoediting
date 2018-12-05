<?php

namespace App\Libs\Db\Operations;

use App\Libs\Db\Abstracts\PdoCommand;

class Now extends PdoCommand
{

    /**
     * @throws Exception : if query execution fails
     * @return string : current datetime on db server
     */
    public function __invoke()
    {
        return $this->pdo->run('SELECT NOW()')->fetchColumn();
    }

}
