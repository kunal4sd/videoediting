<?php

namespace App\Modules\Video\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Repository\Database\TextDB;

class SearchText extends AbstractModule
{

    /**
     * @param string $date
     * @param integer $publication_id
     * @param string $text
     * @return SearchTextAR[]
     */
    public function get_search_text(
        string $date,
        int $publication_id,
        string $text
    )
    {
        return (new TextDB($this->db[Hosts::MANTICORE][Dbs::MAIN]))
            ->get_search_text($date, $publication_id, $text);
    }

}
