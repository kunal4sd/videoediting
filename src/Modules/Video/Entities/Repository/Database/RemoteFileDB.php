<?php

namespace App\Modules\Video\Entities\Repository\Database;

use App\Modules\Abstracts\AbstractDatabase;
use App\Modules\Video\Entities\ActiveRecords\RemoteFileAR;
use \PDO;
use \Exception;

class RemoteFileDB extends AbstractDatabase
{

    /**
     * Updating of existing rows is made based on the tables Primary Key (column `id`)
     * @param RemoteFileAR
     * @return int id of inserted row
     */
    public function save(RemoteFileAR $remote_file_ar)
    {

        $remote_file_array = array_filter($remote_file_ar->build_to_array(), function($val) {
            return !is_null($val);
        });
        $remote_file_fields = array_keys($remote_file_array);

        return $this->db->insert_id(
            sprintf(
                "
                    INSERT INTO remote_file
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
                implode(',', $remote_file_fields),
                implode(',', array_map( function($val) { return ":{$val}"; }, $remote_file_fields )),
                implode(',', array_map(
                    function($val) { return sprintf('%1$s=VALUES(%1$s)', $val); },
                    $remote_file_fields
                ))
            ),
            $remote_file_array
        );
    }

}
