<?php

namespace App\Modules\Edit\Entities;

use \Exception;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Edit\Entities\Repository\Database\PublicationDB;

class Publication extends ModuleAbstract
{

    /**
     * @param int $id : publication database id
     * @throws Exception : if publication with provided $id does not exist
     * @return PublicationAR
     */
    public function get_by_id($id)
    {
        $publication = new PublicationDB($this->container);
        $publication_ar = $publication->get_by_id($id, $with_password);

        if (is_null($publication_ar->id)) {
            throw new Exception("Publication with id #{$id} does not exist", 404);
        }

        return $publication_ar;
    }

    /**
     * @throws Exception : if no publications are found
     * @return PublicationAR[]
     */
    public function get_all_active_tv_and_radio()
    {
        $publication_db = new PublicationDB($this->container);
        $publications = $publication_db->get_all_active_tv_and_radio();

        if (empty($publications)) {
            throw new Exception("No active TV and radio channels found in database", 404);
        }

        return $publications;
    }

}
