<?php

namespace App\Modules\Publication\Actions\Ajax;

use App\Libs\Json;
use App\Libs\Enums\Config\MandatoryFields;
use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use phpseclib\Net\SSH2;
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

                    $ssh = new SSH2($server['host'], $server['port']);
                    if (!$ssh->login($server['user'])) {
                        $result['message'] = 'Login Failed';
                        $code = 500;
                    }
                    else{
                        $result['message'] = $ssh->exec($cmd);
                        $this->logger->write(new Exception("output: " . $result['message'], 200));
                    }
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
