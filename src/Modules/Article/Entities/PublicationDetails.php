<?php

namespace App\Modules\Article\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Article\Entities\Repository\Database\PublicationDetailsDB;
use \Exception;

class PublicationDetails extends ModuleAbstract
{

    /**
     * @throws Exception : if no publication details are found
     * @return PublicationDetailsAR[]
     */
    public function get_all_recording247_media()
    {
        $publication_db = new PublicationDetailsDB($this->db[Hosts::MEDIA][Dbs::MEDIA]);
        $publications = $publication_db->get_all_recording247();

        if (empty($publications)) {
            throw new Exception("Failed getting publications details found in database", 200);
        }

        return $publications;
    }

    /**
     * @throws Exception : if no publication details are found
     * @return PublicationDetailsAR[]
     */
    public function get_all_recording247()
    {
        $publication_db = new PublicationDetailsDB($this->db[Hosts::LOCAL][Dbs::MAIN]);
        $publications = $publication_db->get_all_recording247();

        if (empty($publications)) {
            throw new Exception("Failed getting publications details found in database", 200);
        }

        return $publications;
    }

}
