<?php

namespace App\Modules\Video\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\ActiveRecords\SearchQueryAR;
use App\Modules\Video\Entities\Repository\Database\SearchQueryDB;

class SearchQuery extends AbstractModule
{

    public function saveSearchQuery (SearchQueryAR $searchQueryAR){
        return (new SearchQueryDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->saveSearchQuery($searchQueryAR);
    }

    /**
     * @return SearchQueryAR[]
     */
    public function getSearchQueries (){
        return (new SearchQueryDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->getSearchQueries();
    }

}
