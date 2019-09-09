<?php

namespace App\Modules\Article\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Article\Entities\ActiveRecords\KeywordAR;
use App\Modules\Article\Entities\Repository\Database\KeywordDB;

class Keyword extends AbstractModule
{

    /**
     * @param string $name
     * @return KeywordAR[]
     */
    public function search_by_name_media($name)
    {
        return (new KeywordDB($this->db[Hosts::MEDIA][Dbs::MEDIA]))->search_by_name_media($name);
    }

    /**
     * @param string $name
     * @return KeywordAR[]
     */
    public function search_by_name($name)
    {
        return (new KeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->search_by_name($name);
    }

    /**
     * @param int[] $ids
     * @return KeywordAR[]
     */
    public function get_by_ids_media(array $ids): array
    {
        return (new KeywordDB($this->db[Hosts::MEDIA][Dbs::MEDIA]))->get_by_ids($ids);
    }

    /**
     * @param int[] $ids
     * @return KeywordAR[]
     */
    public function get_by_ids(array $ids): array
    {
        return (new KeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->get_by_ids($ids);
    }

    /**
     * @param int $id
     * @return KeywordAR
     */
    public function get_by_id_media(int $id): KeywordAR
    {
        return (new KeywordDB($this->db[Hosts::MEDIA][Dbs::MEDIA]))->get_by_id($id);
    }

    /**
     * @param int $id
     * @return KeywordAR
     */
    public function get_by_id(int $id): KeywordAR
    {
        return (new KeywordDB($this->db[Hosts::LOCAL][Dbs::MAIN]))->get_by_id($id);
    }

}
