<?php

namespace App\Modules\Article\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Article\Entities\ActiveRecords\IssueAR;

class IssueDB extends AbstractDatabase
{

    /**
     * @param int $id : publication database id
     * @return IssueAR
     */
    public function get_by_issue_date_and_publication_id($date, $publication_id)
    {
        $data = $this->db->fetch(
            "
                SELECT
                    *
                FROM issue
                WHERE 1
                    AND date = :date
                    AND publication_id = :publication_id
            ",
            [
                'date' => $date,
                'publication_id' => $publication_id
            ]
        );

        return new IssueAR($data);
    }

    /**
     * Updating of existing rows is made based on the tables Primary Key (column `id`)
     * @param IssueAR
     * @return int id of inserted row
     */
    public function save(IssueAR $issue)
    {

        $issue_array = array_filter($issue->build_to_array(), function($val) {
            return !is_null($val);
        });
        $issue_fields = array_keys($issue_array);

        return $this->db->insert_id(
            sprintf(
                "
                    INSERT INTO issue
                    (
                        %s
                    )
                    VALUES
                    (
                        %s
                    )
                    ON DUPLICATE KEY UPDATE
                        %s
                ",
                implode(',', $issue_fields),
                implode(',', array_map( function($val) { return ":{$val}"; }, $issue_fields )),
                implode(',', array_map(
                    function($val) { return sprintf('%1$s=VALUES(%1$s)', $val); },
                    $issue_fields
                ))
            ),
            $issue_array
        );
    }

}
