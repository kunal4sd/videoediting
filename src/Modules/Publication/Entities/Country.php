<?php

namespace App\Modules\Publication\Entities;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Publication\Entities\ActiveRecords\CountryAR;
use App\Modules\Publication\Entities\Repository\Database\CountryDB;
use \Exception;

class Country extends AbstractModule
{

    /**
     * @throws Exception
     * @return CountryAR[]
     */
    public function get_all(): array
    {
        $country = new CountryDB($this->db[Hosts::LOCAL][Dbs::MAIN]);
        $country_ar = $country->get_all();

        return $country_ar;
    }

    /**
     * @param CountryAR[] $countries_ar
     * @return array: [$country_ar->iso3 => $country_ar]
     */
    public function group_by_iso(Array $countries_ar): array
    {
        $result = [];
        foreach($countries_ar as $country_ar) {
            $result[$country_ar->iso] = $country_ar;
        }

        return $result;
    }
}
