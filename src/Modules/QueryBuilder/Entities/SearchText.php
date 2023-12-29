<?php

namespace App\Modules\QueryBuilder\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\QueryBuilder\Entities\Repository\Database\TextDB;

class SearchText extends AbstractModule
{

    /**
     * @param string $start_date
     * @param string $end_date
     * @param array $publication_ids
     * @param array $countries
     * @param string $text
     * @return string[]
     */
    public function get_search_text(string $start_date, string $end_date, array $publication_ids, array $countries, string $text): array
    {
        return (new TextDB($this->db[Hosts::MANTICORE][Dbs::MAIN]))
            ->get_search_text($start_date, $end_date, $publication_ids, $countries, $text);
    }
}
