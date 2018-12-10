<?php

namespace App\Modules\Article\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Article\Entities\Repository\Database\PublicationDB;
use \Exception;

class Publication extends ModuleAbstract
{

    /**
     * @param int $id : publication database id
     * @throws Exception : if publication with provided $id does not exist
     * @return PublicationAR
     */
    public function get_by_id($id)
    {
        $publication = new PublicationDB($this->db[Hosts::LOCAL][Dbs::MAIN]);
        $publication_ar = $publication->get_by_id($id);

        if (is_null($publication_ar->id)) {
            throw new Exception("Publication with id #{$id} does not exist", 400);
        }

        return $publication_ar;
    }

    /**
     * @throws Exception : if no publications are found
     * @return PublicationAR[]
     */
    public function get_all_active_tv_and_radio()
    {
        $publication_db = new PublicationDB($this->db[Hosts::LOCAL][Dbs::MAIN]);
        $publications = $publication_db->get_all_active_tv_and_radio();

        if (empty($publications)) {
            throw new Exception("No active TV and radio channels found in database", 400);
        }

        return $publications;
    }

}
