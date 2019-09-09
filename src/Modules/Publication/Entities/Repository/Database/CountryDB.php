<?php

namespace App\Modules\Publication\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Publication\Entities\ActiveRecords\CountryAR;

class CountryDB extends AbstractDatabase
{

    /**
     * @return CountryAR[]
     */
    public function get_all()
    {
        $result = [];

        $data = $this->db->fetch_all(
            "
                SELECT
                    *
                FROM country
                GROUP BY
                    iso
                ORDER BY
                    name_en
            "
        );

        foreach($data as $row) {
            $result[] = new CountryAR($row);
        }

        return $result;
    }

}
