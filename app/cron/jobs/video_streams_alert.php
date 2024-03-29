<?php

require realpath(__DIR__ . '/../..') . '/bootstrap/constants.php';
require BASE_PATH . '/vendor/autoload.php';
require APP_PATH . '/bootstrap/functions.php';

use App\Libs\Db\Db;
use Slim\Container;
use App\Libs\Config;
use PHPMailer\PHPMailer\PHPMailer;
use App\Modules\Publication\Entities\Publication;
use App\Modules\Publication\Entities\PublicationDetails;

define('JOB_NAME', basename(__FILE__, '.php'));
define('MAX_ALERT', 12 * 3600); // 12 h
define('ALERT_THRESHOLD', 15 * 60); // 15 minutes
define('MIN_MINUTES_BETWEEN_ALERTS', 15); // 15 minutes (must be divisors of 15 to work as expected)

$container = new Container();
$container->config = new Config();

$mail_config = get_from_array(
    sprintf('jobs.%s.mail_config', JOB_NAME),
    $container->config->cron
);
if (!$mail_config) throw new \Exception('Email config missing! Execution stopped!', 500);

Db::build($container);
$entity_publication = new Publication($container);
$publications_ar = $entity_publication->get_all_active_tv_and_radio_media();
$publications_details_ar = (new PublicationDetails($container))->get_all_recording247();
$publications_active = intersect_objects_by_fields(
    $publications_ar,
    'id',
    $publications_details_ar,
    'publication_id'
);
$grouped_latest_datetimes = $entity_publication->get_latest_stream_update($publications_active, 14);
$time = time();
$seconds_since_update_arr = [];
$alerts = array_filter(
    $publications_active,
    function($publication) use ($grouped_latest_datetimes, $time, $seconds_since_update_arr) {
        $datetime = $grouped_latest_datetimes[$publication->id];
        $unix = strtotime($datetime);
        $seconds_since_update = $time - $unix;
        $seconds_since_update_arr[$publication->id] = $seconds_since_update;
        if (
            $seconds_since_update >= ALERT_THRESHOLD
            && intval($seconds_since_update / 60) % MIN_MINUTES_BETWEEN_ALERTS === 0
        ) {
            return true;
        }
        return false;
    }
);
$old_alerts = array_filter(
    $publications_active,
    function($publication) use ($grouped_latest_datetimes, $time) {
        $datetime = $grouped_latest_datetimes[$publication->id];
        $unix = strtotime($datetime);
        $seconds_since_update = $time - $unix;
        if (
            $seconds_since_update >= ALERT_THRESHOLD
            && intval($seconds_since_update / 60) % MIN_MINUTES_BETWEEN_ALERTS
        ) {
            return true;
        }
        return false;
    }
);

if (!empty($alerts)) {

    $alerts = $alerts + $old_alerts;
    $mail = new PHPMailer();

    ksort($mail_config, SORT_NATURAL);
    foreach($mail_config as $field => $value) {
        if (is_int($field)) {
            $mail->{$value}();
        }
        else {
            $mail->{$field} = $value;
        }
    }

    $mail->setFrom('video.alerts@mediaobserver-me.com', 'MOVE Alerts');
    $mail->addReplyTo('no-reply@mediaobserver-me.com', 'MOVE Alerts');

    $mailing_list = get_from_array(
        sprintf('jobs.%s.mailing_list', JOB_NAME),
        $container->config->cron
    );

    foreach($mailing_list as $name => $email) {
        $mail->addAddress($email, !is_int($name) ? $name : '');
    }
    $mail->Subject = 'MOVE alert - Video Streams Delay';

    $body = '
    <html>
        <table width="600" style="border:1px solid #333" cellpadding="5" cellspacing="2">
            <tr>
                <td align="left" style="font-weight: bold; background-color: #d8d8d8">Publication ID</td>
                <td align="left" style="font-weight: bold; background-color: #d8d8d8">Publication Name</td>
                <td align="left" style="font-weight: bold; background-color: #d8d8d8">Video Stream Delay</td>
            </tr>
    ';

    $has_background = false;
    foreach($alerts as $publication) {

        if (isset($seconds_since_update_arr[$publication->id]))
        {
            $seconds_since_update = $seconds_since_update_arr[$publication->id];
        }
        else {
            // safest to just presume this is bad and trigger an alarm for it
            $seconds_since_update = MAX_ALERT;
        }

        if ($seconds_since_update >= MAX_ALERT) {
            $time_passed = ' > ' . seconds_to_time(MAX_ALERT, false);
        }
        else {
            $time_passed = seconds_to_time($seconds_since_update, false);
        }
        $style = $has_background ? 'background-color: #e8e8e8' : '';
        $body .= sprintf(
            '
                <tr>
                    <td align="left" style="%1$s">%2$s</td>
                    <td align="left" style="%1$s">%3$s</td>
                    <td align="left" style="%1$s">%4$s</td>
                </tr>
            ',
            $style,
            $publication->id,
            $publication->name_en,
            $time_passed
        );
        $has_background = !$has_background;
    }
    $body .= '
            </table>
        </html>
    ';
    $mail->msgHTML($body);

    if (!$mail->send()) {
        echo sprintf(
            "Failed sending alerts for %s streams with issues",
            count($alerts)
        );
    }
    else {
        echo sprintf(
            "Alerts sent successfuly for %s streams with issues",
            count($alerts)
        );
    }
}
else {
    echo "ALL OK!";
}
