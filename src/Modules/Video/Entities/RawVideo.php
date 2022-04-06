<?php

namespace App\Modules\Video\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\ActiveRecords\RawVideoAR;
use App\Modules\Video\Entities\Repository\Database\RawVideoDB;

class RawVideo extends AbstractModule
{

    /**
     * @param string $from : start date
     * @param string $to : end date
     * @param int $publication_id
     * @return RawVideoAR[]
     */
    public function get_for_interval_by_publication(
        string $from,
        string $to,
        int $publication_id,
        bool $tv_only = false
    )
    {
        return (new RawVideoDB($this->db[Hosts::LOCAL][Dbs::MAIN]))
            ->get_for_interval_by_publication($from, $to, $publication_id, $tv_only);
    }

}
