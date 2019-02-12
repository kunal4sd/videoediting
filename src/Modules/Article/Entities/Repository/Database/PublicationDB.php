<?php

namespace App\Modules\Article\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Article\Entities\ActiveRecords\PublicationAR;

class PublicationDB extends AbstractDatabase
{

    /**
     * @param int $id : publication database id
     * @return PublicationAR
     */
    public function get_by_id($id)
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
                    p.*
                FROM publication AS p
                WHERE 1
                    AND p.type_id IN (3,4)
                    AND p.active = 1
                GROUP BY
                    p.id
                ORDER BY
                    p.name_en
            "
        );

        foreach($data as $row) {
            $result[] = new PublicationAR($row);
        }

        return $result;
    }

}
