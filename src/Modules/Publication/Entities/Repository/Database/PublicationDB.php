<?php

namespace App\Modules\Publication\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Publication\Entities\ActiveRecords\PublicationAR;
use PDO;

class PublicationDB extends AbstractDatabase
{

    /**
     * @param int $id : publication database id
     * @return PublicationAR
     */
    public function get_by_id(int $id): PublicationAR
    {
        $data = $this->db->fetch(
            "
                SELECT
                    *
                FROM publication
                WHERE 1
                    AND id = :id
            ",
            [
                'id' => $id
            ]
        );

        return new PublicationAR($data);
    }

    /**
     * @param array $ids
     * @return array
     */
    public function get_by_ids(array $ids): array
    {
        $params = [];

        foreach($ids as $id) {
            $key = "id_{$id}";
            $params[$key] = [$id, PDO::PARAM_INT];
        }
        $ids_str = ":id_" . implode(', :id_', $ids);
        $sql = sprintf("
                    SELECT
                        *
                    FROM publication
                    WHERE id IN (%s)
                ", $ids_str);

        return $this->db->fetch_all($sql, $params);
    }

    /**
     * @return PublicationAR[]
     */
    public function get_all()
    {
        $result = [];

        $data = $this->db->fetch_all(
            "
                SELECT
                    *
                FROM publication
                GROUP BY
                    id
                ORDER BY
                    name_en
            "
        );

        foreach($data as $row) {
            $result[] = new PublicationAR($row);
        }

        return $result;
    }

    /**
     * @return PublicationAR[]
     */
    public function get_all_active()
    {
        $result = [];

        $data = $this->db->fetch_all(
            "
                SELECT
                    *
                FROM publication
                WHERE 1
                    AND active = 1
                GROUP BY
                    id
                ORDER BY
                    name_en
            "
        );

        foreach($data as $row) {
            $result[] = new PublicationAR($row);
        }

        return $result;
    }

    /**
     * @return PublicationAR[]
     */
    public function get_all_active_tv_and_radio()
    {
        $result = [];

        $data = $this->db->fetch_all(
            "
                SELECT
                    *
                FROM publication
                WHERE 1
                    AND type_id IN (3,4)
                    AND active = 1
                GROUP BY
                    id
                ORDER BY
                    name_en
            "
        );

        foreach($data as $row) {
            $result[] = new PublicationAR($row);
        }

        return $result;
    }

    /**
     * @param array $countries
     * @return array
     */
    public function get_by_countries(array $countries): array
    {
        $params = [];

        $sql = "
                    SELECT
                        *
                    FROM publication p
                    INNER JOIN publication_details pd ON p.id = pd.publication_id AND pd.recording247 = 'Y'
                    WHERE p.active = 1 AND p.is_deleted = 0
               ";

        if ($countries) {
            foreach($countries as $iso) {
                $key = "iso_{$iso}";
                $params[$key] = [$iso, PDO::PARAM_STR];
            }
            $ids_str = ":iso_" . implode(', :iso_', $countries);
            $sql .= sprintf(" AND country IN (%s)", $ids_str);
        }
        $sql .= " GROUP BY p.id
                  ORDER BY p.name_en";

        return $this->db->fetch_all($sql, $params);
    }
}
