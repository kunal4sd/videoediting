<?php

namespace App\Modules\Video\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Repository\Database\TextDB;

class SearchText extends AbstractModule
{

    /**
     * @param string $start_date
     * @param string $end_date
     * @param integer $publication_id
     * @param string $text
     * @return SearchTextAR[]
     */
    public function get_search_text(
        string $start_date,
        string $end_date,
        int $publication_id,
        string $text
    )
    {
        return (new TextDB($this->db[Hosts::MANTICORE][Dbs::MAIN]))
            ->get_search_text($start_date, $end_date, $publication_id, $text);
    }

}
