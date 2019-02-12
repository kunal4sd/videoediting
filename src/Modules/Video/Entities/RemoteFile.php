<?php

namespace App\Modules\Video\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\ActiveRecords\RemoteFileAR;
use App\Modules\Video\Entities\Repository\Database\RemoteFileDB;
use \Exception;

class RemoteFile extends AbstractModule
{

    /**
     * @throws Exception
     * @return int
     */
    public function save_media(RemoteFileAR $remote_file_ar)
    {

        $insert_id = (new RemoteFileDB($this->db[Hosts::MEDIA][Dbs::MEDIA]))->save($remote_file_ar);

        if (is_null($insert_id)) {
            throw new Exception("Failed saving remote file", 400);
        }

        return $insert_id;
    }

    /**
     * @throws Exception
     * @return int
     */
    public function save(RemoteFileAR $remote_file_ar)
    {

        $insert_id = (new RemoteFileDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->save($remote_file_ar);

        if (is_null($insert_id)) {
            throw new Exception("Failed saving remote file", 400);
        }

        return $insert_id;
    }

}
