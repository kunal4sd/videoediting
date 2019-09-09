<?php

namespace App\Modules\Publication\Actions\Ajax;

use App\Libs\Json;
use App\Libs\Enums\Config\MandatoryFields;
use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class RestartFfmpeg extends AbstractModule
{

    public function __invoke(Request $request, Response $response)
    {

        $servers = $this->config->{MandatoryFields::SSH}['ffmpeg'] ?: [];
        $result = [];
        $code = 200;
        $publication_id = (int) $request->getParam('id');
        try {
            $publication_ar = $this->entity_publication->get_by_id($publication_id);
            if ((int) $publication_ar->id) {
                $cmd = sprintf(
                    "ps aux | grep ffmpeg | grep %s | awk '{print $2;}' | xargs kill -9",
                    (int) $publication_ar->id
                );

                $this->logger->write(new Exception($cmd, 200));
                foreach($servers as $server) {
                    $connection = ssh2_connect($server['address'], $server['port']);
                    ssh2_exec($connection, $cmd);
                    ssh2_disconnect($connection);
                }
            }
        }
        catch(Exception $e) {
            $this->logger->write($e);
            $result['message'] = 'Error encountered while trying to restart ffmpeg process';
            $code = $e->getCode();
        }

        return Json::build($response, $result, $code);
    }
}
