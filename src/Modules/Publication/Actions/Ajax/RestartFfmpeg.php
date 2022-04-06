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
        $publication_id = (int) $request->getParam('id');
        $server_name = $request->getParam('server');
        try {
            if ($publication_id) {
                list($result, $code) = $this->restart_by_id($servers, $publication_id);
            }
            else {
                list($result, $code) = $this->restart_all($servers, $server_name);
            }
        }
        catch(Exception $e) {
            $this->logger->write($e);
            $result['message'] = 'Error encountered while trying to restart ffmpeg process';
            $code = $e->getCode();
        }

        return Json::build($response, $result, $code);
    }

    private function restart_all($servers, $server_name)
    {
        $result = [
            'message' => []
        ];
        $code = 500;
        $target_server = array_filter($servers, function($server) use ($server_name) {
            return $server['name'] === $server_name;
        });

        if (!empty($target_server)) {

            $kill_cmd = "ps aux | grep ffmpeg | xargs kill -9";
            $this->logger->write(new Exception($kill_cmd, 200));
            $code = 0;
            $ssh = new SSH2($target_server['host']);
            if (!$ssh->login($target_server['user'], $target_server['password'])) {
                if ($code === 0) {
                    $code = 500;
                    $result['message'][] = sprintf('Connecting to server %s failed', $server_name);
                }
            }
            else {
                $code = 200;
                $result['message'][] = $ssh->exec($kill_cmd);
            }
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

        return [$result, $code];
    }

    private function restart_by_id($servers, $publication_id)
    {
        $result = [
            'message' => []
        ];
        $code = 500;
        $publication_ar = $this->entity_publication->get_by_id($publication_id);

        if ((int) $publication_ar->id) {

            $kill_cmd = sprintf(
                "ps aux | grep ffmpeg | grep %s | awk '{print \$2;}' | xargs kill -9",
                (int) $publication_ar->id
            );
            $this->logger->write(new Exception($kill_cmd, 200));
            $code = 0;
            foreach($servers as $server) {

                $ssh = new SSH2($server['host']);
                if (!$ssh->login($server['user'], $server['password'])) {
                    if ($code === 0) {
                        $code = 500;
                        $result['message'][] = sprintf('Connecting to server %s failed', $server['name']);
                    }
                }
                else {
                    $code = 200;
                    $result['message'][] = $ssh->exec($kill_cmd);
                }
            }
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

        return [$result, $code];
    }
}
