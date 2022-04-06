<?php

namespace App\Modules\Publication\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Publication\Entities\ActiveRecords\CountryAR;

class RecordSE extends AbstractDatabase
{

    /**
     * @return array
     */
    public function get_countries(): array
    {
        return $this->db->fetch_all(
            "
                SELECT
                    country as iso
                FROM recordings_text
                GROUP BY country
            "
        );
    }

}
