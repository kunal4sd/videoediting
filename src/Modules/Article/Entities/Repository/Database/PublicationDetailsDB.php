<?php

namespace App\Modules\Article\Entities\Repository\Database;

use App\Modules\Abstracts\DatabaseAbstract;
use App\Modules\Article\Entities\ActiveRecords\PublicationDetailsAR;

class PublicationDetailsDB extends DatabaseAbstract
{

    /**
     * @return PublicationDetailsAR[]
     */
    public function get_all_recording247()
    {

        $result = [];

        $data = $this->db->fetch_all(
            "
                SELECT
                    *
                FROM publication_details
                WHERE 1
                    AND recording247 = 'Y'
            "
        );

        foreach($data as $row) {
            $result[] = new PublicationDetailsAR($row);
        }

        return $result;
    }
}
