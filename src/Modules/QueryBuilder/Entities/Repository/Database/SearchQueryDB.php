<?php

namespace App\Modules\QueryBuilder\Entities\Repository\Database;

use App\Modules\QueryBuilder\Entities\ActiveRecords\SearchQueryAR;
use \PDO;
use App\Modules\Abstracts\AbstractDatabase;

class SearchQueryDB extends AbstractDatabase
{
    /**
     * adds to the search_query,search_query_user, and search_query_keyword tables
     * @param SearchQueryAR $searchQueryAR
     * @return mixed - query insert id
     */
    public function saveSearchQuery (SearchQueryAR $searchQueryAR){
        $user_ids = array_filter($searchQueryAR->user_ids);
        $keyword_ids = array_filter($searchQueryAR->keyword_ids);

        //insert search_query

        $search_query_array = array_filter($searchQueryAR->build_to_array(), function($val) {
            return !is_null($val);
        });

        unset($search_query_array['user_ids']);
        unset($search_query_array['keyword_ids']);
        $search_query_fields = array_keys($search_query_array);
        $query = sprintf(
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
            );
        $insert_id =  $this->db->insert_id(
            $query,
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

                $this->db->row_count("DELETE FROM search_query_user WHERE query_id='$insert_id' AND user_id NOT IN (".implode(',', $user_ids).")");
                $qry = sprintf(
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
                );
                    
                $users_count =  $this->db->row_count(
                    $qry,
                    $values
                );

            } else {
                //delete already assigned users here
                $this->db->row_count("DELETE FROM search_query_user WHERE query_id='$insert_id'");
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
                $searchkeyword = "DELETE FROM search_query_keyword WHERE query_id=$insert_id AND keyword_id NOT IN (".implode(',', $keyword_ids).")";             
                $this->db->row_count($searchkeyword);
                $sqlKeywords = sprintf(
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
                    );

                    $keywords_count =  $this->db->row_count(
                    $sqlKeywords,
                    $values
                );
            } else {
                // delete already assigned keywords here
               $deltekeyword = "DELETE FROM search_query_keyword WHERE query_id=$insert_id";
               $this->db->row_count($deltekeyword);
                
            }
        }

        return $insert_id;
    }

    /**
     * @return SearchQueryAR[]
     */
    public function getSearchQueries (){
        $result = [];
        $data = $this->db->fetch_all(
            "  SELECT  
                *
                FROM search_query 
            ");
        foreach ($data as $row){
            $userIds =  [];
            $userIdsResult = $this->db->fetch_all(
                "  SELECT  
                    user_id
                FROM search_query_user
                WHERE query_id = :query_id
                ",
                ['query_id' => [$row['id'],PDO::PARAM_INT]]
            );
            foreach ($userIdsResult as $userIdResult){
                $userIds[] = $userIdResult['user_id'];
            }
            $keywordIds = [];
            $keywordIdsResult = $this->db->fetch_all(
                "  SELECT
                    keyword_id
                FROM search_query_keyword
                WHERE query_id = :query_id
                ",
                ['query_id' => [$row['id'],PDO::PARAM_INT]]
            );
            foreach ($keywordIdsResult as $keywordIdResult){
                $keywordIds[] = $keywordIdResult['keyword_id'];
            }
            $row['user_ids'] = $userIds;
            $row['keyword_ids'] = $keywordIds;
            $result[] = new SearchQueryAR($row);

        }
        return $result;
    }

    /**
     * @param int $id
     * @return SearchQueryAR
     */
    public function get_by_id(int $id)
    {
        $data = $this->db->fetch(
            "
                SELECT
                    *
                FROM search_query
                WHERE 1
                    AND id = :id
            ",
            [
                'id' => $id
            ]
        );
        if(!empty($data)){
            $userIds =  [];
            $userIdsResult = $this->db->fetch_all(
                "  SELECT  
                    user_id
                FROM search_query_user
                WHERE query_id = :query_id
                ",
                ['query_id' => [$data['id'],PDO::PARAM_INT]]
            );
            foreach ($userIdsResult as $userIdResult){
                $userIds[] = $userIdResult['user_id'];
            }
            $keywordIds = [];
            $keywordIdsResult = $this->db->fetch_all(
                "  SELECT
                    keyword_id
                FROM search_query_keyword
                WHERE query_id = :query_id
                ",
                ['query_id' => [$data['id'],PDO::PARAM_INT]]
            );
            foreach ($keywordIdsResult as $keywordIdResult){
                $keywordIds[] = $keywordIdResult['keyword_id'];
            }
            $data['user_ids'] = $userIds;
            $data['keyword_ids'] = $keywordIds;
        }

        return new SearchQueryAR($data);
    }
}
