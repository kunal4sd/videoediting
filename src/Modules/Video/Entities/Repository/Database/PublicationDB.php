<?php

namespace App\Modules\Video\Entities\Repository\Database;

use App\Libs\Enums\Hosts;
use App\Libs\Enums\Dbs;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Video\Entities\ActiveRecords\PublicationAR;

class PublicationDB extends ModuleAbstract
{

    /**
     * @param int $id : publication database id
     * @return PublicationAR
     */
    public function get_by_id($id)
    {
        $data = $this->db[Hosts::LOCAL][Dbs::MAIN]->fetch(
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

        $data = $this->db[Hosts::LOCAL][Dbs::MAIN]->fetch_all(
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

        $data = $this->db[Hosts::LOCAL][Dbs::MAIN]->fetch_all(
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

        // TODO in old platform, publication_details is taken from a different server. MUST check.
        $data = $this->db[Hosts::LOCAL][Dbs::MAIN]->fetch_all(
            "
                SELECT
                    p.*
                FROM publication AS p
                INNER JOIN publication_details AS pd
                    ON pd.publication_id = p.id
                    AND pd.recording247 = 'Y'
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
