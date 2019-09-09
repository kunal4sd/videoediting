<?php

namespace App\Modules\Publication\Actions\Ajax;

use App\Libs\Json;
use App\Modules\Abstracts\AbstractModule;
use App\Libs\Enums\Config\MandatoryFields;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class RestartRsync extends AbstractModule
{

    public function __invoke(Request $request, Response $response)
    {

        $servers = $this->config->{MandatoryFields::SSH}['rsync'] ?: [];
        $result = [];
        $code = 200;
        $publication_id = (int) $request->getParam('id');
        try {
            $publication_ar = $this->entity_publication->get_by_id($publication_id);
            if ((int) $publication_ar->id) {
                $kill_cmd = sprintf(
                    'ps aux | grep rsync | grep %s | awk "{print $2;}" | xargs kill -9',
                    (int) $publication_ar->id
                );

                foreach($servers as $server) {
                    $cmd = sprintf(
                        "ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -o LogLevel=quiet %s@%s -p %s '%s'",
                        $server['user'],
                        $server['host'],
                        $server['port'],
                        $kill_cmd
                    );
                    $this->logger->write(new Exception($cmd, 200));
                    $result['message'] = shell_exec($cmd);
                }
            }
        }
        catch(Exception $e) {
            $this->logger->write($e);
            $result['message'] = 'Error encountered while trying to restart rsync process';
            $code = $e->getCode();
        }

        return Json::build($response, $result, $code);
    }
}
