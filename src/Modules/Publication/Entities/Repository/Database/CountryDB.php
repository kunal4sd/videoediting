<?php

namespace App\Modules\Publication\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Publication\Entities\ActiveRecords\CountryAR;
use PDO;

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

    /**
     * @param array $in_iso
     * @return CountryAR[]
     */
    public function get_by_iso(array $in_iso): array
    {
        $result = [];

        foreach($in_iso as $iso) {
            $key = "iso_{$iso}";
            $params[$key] = [$iso, PDO::PARAM_STR];
        }
        $iso_str = ":iso_" . implode(', :iso_', $in_iso);
        $sql = sprintf("
                    SELECT
                        *
                    FROM country
                    WHERE iso IN (%s)
                    GROUP BY
                        iso
                    ORDER BY
                        name_en
                ", $iso_str);

        $data = $this->db->fetch_all($sql, $params);

        foreach($data as $row) {
            $result[] = new CountryAR($row);
        }

        return $result;
    }

}
