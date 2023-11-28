<?php

namespace App\Modules\Video\Entities\Repository\Database;

use App\Modules\Video\Entities\ActiveRecords\SearchQueryAR;
use \PDO;
use App\Modules\Abstracts\AbstractDatabase;

class SearchQueryDB extends AbstractDatabase
{
    public function saveSearchQuery (SearchQueryAR $searchQueryAR){
        $user_ids = $searchQueryAR->user_ids;
        $keyword_ids = $searchQueryAR->keyword_ids;
        //insert search_query
        $search_query_array = array_filter($searchQueryAR->build_to_array(), function($val) {
            return !is_null($val);
        });
        unset($search_query_array['user_ids']);
        unset($search_query_array['keyword_ids']);
        $search_query_fields = array_keys($search_query_array);
        $insert_id =  $this->db->insert_id(
            sprintf(
                "
                    INSERT INTO search_query
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
                implode(',', $search_query_fields),
                implode(',', array_map( function($val) { return ":{$val}"; }, $search_query_fields )),
                implode(',', array_map(
                    function($val) { return sprintf('%1$s=VALUES(%1$s)', $val); },
                    $search_query_fields
                ))
            ),
            $search_query_array
        );
        //insert users and keywords
        if($insert_id){
            //insert users
            if(count($user_ids) > 0){
                $counter = 0;
                $rows_counter = 0;
                $search_query_user_fields = ['query_id','user_id'];
                $values = [];
                $rows = [];
                foreach($user_ids as $user_id) {

                    $search_query_user_array = [
                        'query_id' => $insert_id,
                        'user_id' => $user_id
                    ];

                    foreach($search_query_user_array as $field => $value) {
                        $values["{$field}_{$counter}"] = $value;
                        $rows[$rows_counter][] = ":{$field}_{$counter}";
                        $counter++;
                    }
                    $rows_counter++;
                }
                $users_count =  $this->db->row_count(
                    sprintf(
                        "
                    INSERT INTO search_query_user
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
                        implode(',', $search_query_user_fields),
                        implode('), (', array_map( function($row) { return implode(',', $row); }, $rows )),
                        implode(',', array_map(
                            function($val) { return sprintf('%1$s=VALUES(%1$s)', $val); },
                            $search_query_user_fields
                        ))
                    ),
                    $values
                );
            }
            //insert keywords
            if(count($keyword_ids) > 0){
                $counter = 0;
                $rows_counter = 0;
                $search_query_keyword_fields = ['query_id','keyword_id'];
                $values = [];
                $rows = [];
                foreach($keyword_ids as $keyword_id) {
                    $search_query_keyword_array = [
                        'query_id' => $insert_id,
                        'keyword_id' => $keyword_id
                    ];

                    foreach($search_query_keyword_array as $field => $value) {
                        $values["{$field}_{$counter}"] = $value;
                        $rows[$rows_counter][] = ":{$field}_{$counter}";
                        $counter++;
                    }
                    $rows_counter++;
                }
                $keywords_count =  $this->db->row_count(
                    sprintf(
                        "
                    INSERT INTO search_query_keyword
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
                        implode(',', $search_query_keyword_fields),
                        implode('), (', array_map( function($row) { return implode(',', $row); }, $rows )),
                        implode(',', array_map(
                            function($val) { return sprintf('%1$s=VALUES(%1$s)', $val); },
                            $search_query_keyword_fields
                        ))
                    ),
                    $values
                );
            }
        }

        return $insert_id;
    }

}
