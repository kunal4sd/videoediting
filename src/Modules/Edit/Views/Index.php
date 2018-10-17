<?php

namespace App\Modules\Edit\Views;

use App\Modules\Abstracts\ModuleAbstract;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\Dbs;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class Index extends ModuleAbstract
{
    public function __invoke(Request $request, Response $response)
    {
        // var_dump($this->db[Hosts::LOCAL][Dbs::MAIN]->fetch("
        //     SELECT CONNECTION_ID()
        // "));
        // echo "<br><br>";
        // var_dump($this->db[Hosts::LOCAL][Dbs::MAIN]->fetch_all("
        //     SELECT CONNECTION_ID()
        // "));
        // echo "<br><br>";
        // var_dump($this->db[Hosts::LOCAL][Dbs::MAIN]->fetch_column("
        //     SELECT CONNECTION_ID() AS id
        // "));
        // echo "<br><br>";
        // var_dump($this->db[Hosts::LOCAL][Dbs::MAIN]->row_count("
        // SELECT CONNECTION_ID()
        // "));
        // echo "<br><br>";
        // echo "<br><br>";
        // var_dump($this->db[Hosts::LOCAL][Dbs::ALL]->fetch("
        //     SELECT CONNECTION_ID()
        // "));
        // echo "<br><br>";
        // var_dump($this->db[Hosts::LOCAL][Dbs::ALL]->fetch_all("
        //     SELECT CONNECTION_ID()
        // "));
        // echo "<br><br>";
        // var_dump($this->db[Hosts::LOCAL][Dbs::ALL]->fetch_column("
        //     SELECT CONNECTION_ID() AS id
        // "));
        // echo "<br><br>";
        // var_dump($this->db[Hosts::LOCAL][Dbs::ALL]->row_count("
        //     SELECT CONNECTION_ID()
        // "));

        $this->logger->write(new Exception('Testing logger', 200));

        return $this->view->render($response, 'edit/index.twig', [
            'name' => 'World',
            'page_title' => 'Video Editing Tool'
        ]);
    }
}
