<?php

namespace App\Modules\Article\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\ModuleAbstract;
use App\Modules\Article\Entities\ActiveRecords\IssueAR;
use App\Modules\Article\Entities\Repository\Database\IssueDB;
use \Exception;

class Issue extends ModuleAbstract
{

    /**
     * @param string $issue_date : article issue_date
     * @param int $publication_id : publication id
     * @throws Exception
     * @return IssueAR
     */
    public function get_by_issue_date_and_publication_id_media($issue_date, $publication_id)
    {
        $issue_db = new IssueDB($this->db[Hosts::MEDIA][Dbs::MEDIA]);
        $issue_ar = $issue_db->get_by_issue_date_and_publication_id(
            $issue_date, $publication_id
        );

        if (is_null($issue_ar->id)) {
            throw new Exception("Issue with provided details does not exist", 400);
        }

        return $issue_ar;
    }

    /**
     * @throws Exception
     * @return int
     */
    public function save_media(IssueAR $issue_ar)
    {

        $insert_id = (new IssueDB($this->db[Hosts::MEDIA][Dbs::MEDIA]))->save($issue_ar);

        if (is_null($insert_id)) {
            throw new Exception("Failed saving issue", 400);
        }

        return $insert_id;
    }

}
