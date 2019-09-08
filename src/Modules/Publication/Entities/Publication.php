<?php

namespace App\Modules\Publication\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Publication\Entities\ActiveRecords\PublicationAR;
use App\Modules\Publication\Entities\Repository\Database\PublicationDB;
use \Exception;

class Publication extends AbstractModule
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
            throw new Exception("Publication with id #{$id} does not exist", 200);
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
            throw new Exception("No active TV and radio channels found in database", 200);
        }

        return $publications;
    }

    /**
     * @throws Exception : if no publications are found
     * @return PublicationAR[]
     */
    public function get_all_active_tv_and_radio_media()
    {
        $publication_db = new PublicationDB($this->db[Hosts::MEDIA][Dbs::MEDIA]);
        $publications = $publication_db->get_all_active_tv_and_radio();

        if (empty($publications)) {
            throw new Exception("No active TV and radio channels found in database", 200);
        }

        return $publications;
    }

    public function is_radio(PublicationAR $publication_ar): bool
    {
        return (int) $publication_ar->type_id === 4;
    }

    public function is_tv(PublicationAR $publication_ar): bool
    {
        return (int) $publication_ar->type_id === 3;
    }

    /**
     * @param PublicationAR[] $publications_ar
     * @return array: [$publication_ar->id => TV/Radio]
     */
    public function get_types(Array $publications_ar): array
    {
        $publications_type = [];
        foreach($publications_ar as $idx => $publication_ar) {
            if ($this->is_radio($publication_ar)) {
                $publications_type[$publication_ar->id] = 'Radio';
            }
            else {
                $publications_type[$publication_ar->id] = 'TV';
            }
        }

        return $publications_type;
    }

}
