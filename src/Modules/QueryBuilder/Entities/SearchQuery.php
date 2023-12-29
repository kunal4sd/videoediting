<?php

namespace App\Modules\QueryBuilder\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\QueryBuilder\Entities\ActiveRecords\SearchQueryAR;
use App\Modules\QueryBuilder\Entities\Repository\Database\SearchQueryDB;

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

    /**
     * @param int $id
     * @return SearchQueryAR
     */
    public function get_by_id (int $id){
        return (new SearchQueryDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->get_by_id($id);
    }

}
