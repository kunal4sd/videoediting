<?php

namespace App\Modules\Publication\Views;

use App\Libs\Enums\Config\MandatoryFields;
use App\Modules\Abstracts\AbstractModule;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class Report extends AbstractModule
{
    public function __invoke(Request $request, Response $response)
    {

        $publications_active = [];
        try {
            $publications = $this->entity_publication->get_all_active_tv_and_radio_media();
            $publications_details = $this->entity_publication_details->get_all_recording247();
            $publications_active = intersect_objects_by_fields(
                $publications,
                'id',
                $publications_details,
                'publication_id'
            );
            $countries_ar = $this->entity_country->get_all();
            $grouped_countries_ar = $this->entity_country->group_by_iso($countries_ar);
            $grouped_latest_datetimes = $this->entity_publication->get_latest_stream_update(
                $publications_active,
                14
            );
            $timestamps = [];
            $grouped_dates = [];
            $grouped_times = [];
            $grouped_times_since_update = [];
            foreach($grouped_latest_datetimes as $publication_id => $latest_datetime) {
                $unix = strtotime($latest_datetime);
                $timestamps[$publication_id] = $unix;
                $grouped_dates[$publication_id] = date('Y-m-d', $unix);
                $grouped_times[$publication_id] = date('H:i:s', $unix);
                $grouped_times_since_update[$publication_id] = time_diff_human_format($unix);
                if (strpos($grouped_times_since_update[$publication_id], 'week') !== false) {
                    $grouped_times_since_update[$publication_id] = sprintf(
                        'over %s', $grouped_times_since_update[$publication_id]
                    );
                }
            };
        }
        catch(Exception $e) {
            $this->logger->write($e);
        }

        return $this->view->render($response, 'publication/report/report.twig', [
            'page_title' => 'Publications Report',
            'page_name' => 'report',
            'channels' => $publications_active,
            'countries' => $grouped_countries_ar,
            'dates' => $grouped_dates,
            'times' => $grouped_times,
            'times_since_update' => $grouped_times_since_update,
            'timestamps' => $timestamps,
            'types' => $this->entity_publication->get_types($publications_active),
            'is_admin' => $this->entity_user->is_admin($this->session_user->get_user()),
            'processes' => $this->config->{MandatoryFields::SSH}
        ]);
    }
}
