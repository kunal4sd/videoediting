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
        $code = 400;
        $publication_id = (int) $request->getParam('id');
        try {
            $publication_ar = $this->entity_publication->get_by_id($publication_id);
            if ((int) $publication_ar->id) {
                $kill_cmd = sprintf(
                    "ps aux | grep ffmpeg | grep %s | awk '{print \$2;}' | xargs kill -9",
                    (int) $publication_ar->id
                );

                $this->logger->write(new Exception($kill_cmd, 200));
                $code = 0;
                foreach($servers as $server) {

                    $ssh = new SSH2($server['host'], $server['port']);
                    if (!$ssh->login($server['user'], $server['password'])) {
                        if ($code === 0) {
                            $code = 500;
                            $result['message'][] = 'Login Failed';
                        }
                    }
                    else {
                        $code = 200;
                        $result['message'][] = $ssh->exec($kill_cmd);
                    }
                }
            }
        }
        catch(Exception $e) {
            $this->logger->write($e);
            $result['message'] = 'Error encountered while trying to restart ffmpeg process';
            $code = $e->getCode();
        }
        $result['message'] = array_filter($result['message']);

        if (!empty($result['message'])) {
            $result['message'] = implode('; ', $result['message']);
        }
        elseif ($code === 200) {
            $result['message'] = 'Command executed successfully';
        }
        else {
            $result['message'] = 'Failed launching command';
        }

        return Json::build($response, $result, $code);
    }
}
