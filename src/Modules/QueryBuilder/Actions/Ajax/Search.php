<?php

namespace App\Modules\QueryBuilder\Actions\Ajax;

use App\Libs\Enums\Dbs;
use App\Libs\Enums\Hosts;
use App\Libs\Enums\UserActivity;
use App\Modules\User\Entities\ActiveRecords\UserActivityAR;
use \Exception;
use App\Libs\Json;
use Slim\Http\Request;
use Slim\Http\Response;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Files\RawVideoFile;

class Search extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {

        $result = [
            'data'      => [],
            'preview'   => [],
            'warnings'  => [],
            'message'   => ''
        ];
        $code = 200;
        $publications = $request->getParam('publications') ?? [];

        try {
            $countries = [];
            if (is_array($request->getParam('countries'))) {
                foreach ($request->getParam('countries') as $country) {
                    if ($country) {
                        $countries[] = $country;
                    }
                }
            }


            $result['data'] = $this->entity_search_text->get_search_text(
                $request->getParam('start_date'),
                $request->getParam('end_date'),
                $publications,
                $countries,
                $request->getParam('text')
            );

            $country_name = [];
            if ($result['data']) {
                $countries_all = $this->entity_country->get_all();
                foreach ($countries_all as $countryAR) {
                    $country_name[$countryAR->iso] = $countryAR->name_en;
                }
            }

            $pub_ids = [];
            $raw_video_file = new RawVideoFile();
            foreach($result['data'] as &$search_text_ar) {
                $raw_video_file->set_locations($search_text_ar->start_segment);
                $end_raw_video_file = (new RawVideoFile())->set_locations($search_text_ar->end_segment);

                $search_text_ar_arr = $search_text_ar->build_to_array();
                $search_text_ar_arr['start_date'] = $raw_video_file->build_start_datetime();
                $search_text_ar_arr['end_date'] = $end_raw_video_file->build_end_datetime();

                $search_text_ar_arr['publication'] = $search_text_ar->pub_id;
                $search_text_ar_arr['country_name'] = $country_name[$search_text_ar->country] ?? '';

                // These required for windows apache, because ":" colon symbol does not allowed in url
                $search_text_ar_arr['start_segment_formatted'] = str_replace(":", "!", $search_text_ar->start_segment);
                $search_text_ar_arr['end_segment_formatted'] = str_replace(":", "!", $search_text_ar->end_segment);

                $pub_ids[] = $search_text_ar->pub_id;

                $search_text_ar = $search_text_ar_arr;
            }

            if ($pub_ids) {
                $publication_url = [];
                $publication_list = $this->entity_publication->get_by_ids($pub_ids);
                foreach ($publication_list as $publication) {
                    $publication_url[$publication['id']] = $publication['language'];
                }

                foreach($result['data'] as &$search_text_ar) {
                    $search_text_ar['publication_language'] = $publication_url[$search_text_ar['publication']] ?? '';
                }
            }

            if (empty($result['data'])) {
                $result['message'] = 'Could not find any segments with the provided details';
            }
        }
        catch(Exception $e) {
            $code = 500;
            $this->logger->write(new Exception(
                sprintf(
                    'Search failed with message: %s',
                    print_r($e->getMessage(), true)
                ),
                $code
            ));
            $result['message'] = $e->getMessage();
        }


        return Json::build($response, $result, $code);
    }

}
