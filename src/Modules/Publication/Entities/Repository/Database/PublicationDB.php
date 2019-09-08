<?php

namespace App\Modules\Publication\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Publication\Entities\ActiveRecords\PublicationAR;

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
                    p.id,
                    p.name_en,
                    p.name_ar,
                    p.name_formatted,
                    IFNULL(c.name_en, p.country) AS country,
                    p.circulation,
                    p.language,
                    p.logo,
                    p.adrate,
                    p.column_width,
                    p.frequency_id,
                    p.type_id,
                    p.created_by,
                    p.modified,
                    p.created,
                    p.issue_day,
                    p.distribution,
                    p.genre_id,
                    p.telephone,
                    p.url,
                    p.email,
                    p.skip_ocr,
                    p.is_deleted,
                    p.active,
                    p.download_instruction,
                    p.repetition_values,
                    p.language_iso,
                    p.publisher,
                    p.distributer
                FROM publication AS p
                LEFT JOIN country AS c
                    ON c.iso = p.country
                WHERE 1
                    AND p.id = :id
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
                    p.id,
                    p.name_en,
                    p.name_ar,
                    p.name_formatted,
                    IFNULL(c.name_en, p.country) AS country,
                    p.circulation,
                    p.language,
                    p.logo,
                    p.adrate,
                    p.column_width,
                    p.frequency_id,
                    p.type_id,
                    p.created_by,
                    p.modified,
                    p.created,
                    p.issue_day,
                    p.distribution,
                    p.genre_id,
                    p.telephone,
                    p.url,
                    p.email,
                    p.skip_ocr,
                    p.is_deleted,
                    p.active,
                    p.download_instruction,
                    p.repetition_values,
                    p.language_iso,
                    p.publisher,
                    p.distributer
                FROM publication AS p
                LEFT JOIN country AS c
                    ON c.iso = p.country
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

    /**
     * @return PublicationAR[]
     */
    public function get_all_active()
    {
        $result = [];

        $data = $this->db->fetch_all(
            "
                SELECT
                    p.id,
                    p.name_en,
                    p.name_ar,
                    p.name_formatted,
                    IFNULL(c.name_en, p.country) AS country,
                    p.circulation,
                    p.language,
                    p.logo,
                    p.adrate,
                    p.column_width,
                    p.frequency_id,
                    p.type_id,
                    p.created_by,
                    p.modified,
                    p.created,
                    p.issue_day,
                    p.distribution,
                    p.genre_id,
                    p.telephone,
                    p.url,
                    p.email,
                    p.skip_ocr,
                    p.is_deleted,
                    p.active,
                    p.download_instruction,
                    p.repetition_values,
                    p.language_iso,
                    p.publisher,
                    p.distributer
                FROM publication AS p
                LEFT JOIN country AS c
                    ON c.iso = p.country
                WHERE 1
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

    /**
     * @return PublicationAR[]
     */
    public function get_all_active_tv_and_radio()
    {
        $result = [];

        $data = $this->db->fetch_all(
            "
                SELECT
                    p.id,
                    p.name_en,
                    p.name_ar,
                    p.name_formatted,
                    IFNULL(c.name_en, p.country) AS country,
                    p.circulation,
                    p.language,
                    p.logo,
                    p.adrate,
                    p.column_width,
                    p.frequency_id,
                    p.type_id,
                    p.created_by,
                    p.modified,
                    p.created,
                    p.issue_day,
                    p.distribution,
                    p.genre_id,
                    p.telephone,
                    p.url,
                    p.email,
                    p.skip_ocr,
                    p.is_deleted,
                    p.active,
                    p.download_instruction,
                    p.repetition_values,
                    p.language_iso,
                    p.publisher,
                    p.distributer
                FROM publication AS p
                LEFT JOIN country AS c
                    ON c.iso = p.country
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
