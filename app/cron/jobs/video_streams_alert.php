<?php

require realpath(__DIR__ . '/../..') . '/bootstrap/constants.php';
require BASE_PATH . '/vendor/autoload.php';
require APP_PATH . '/bootstrap/functions.php';

use App\Libs\Db\Db;
use App\Libs\Config;
use App\Modules\Article\Entities\Publication;
use App\Modules\Article\Entities\PublicationDetails;
use Slim\Container;
use PHPMailer\PHPMailer\PHPMailer;

define('JOB_NAME', basename(__FILE__, '.php'));
define('MAX_ALERT', 12 * 3600); // 12 h
define('ALERT_THRESHOLD', 15 * 60); // 15 minutes
define('MIN_MINUTES_BETWEEN_ALERTS', 15); // 15 minutes (must be divisors of 15 to work as expected)

$container = new Container();
$container->config = new Config();
Db::build($container);
$publications_ar = (new Publication($container))->get_all_active_tv_and_radio_media();
$publications_details_ar = (new PublicationDetails($container))->get_all_recording247_media();
$publications_active = intersect_objects_by_fields(
    $publications_ar,
    'id',
    $publications_details_ar,
    'publication_id'
);

$alerts = [];
$old_alerts = [];
foreach($publications_active as $idx => $publication_ar) {

    $id = $publication_ar->id;
    $curr_date = date("Y/m/d");
    $cmd_raw = 'find /storage/recordings/%s/%s -name "*.ts" -type f -printf \'%%T@ %%p\n\' 2>/dev/null \
    | sort -n \
    | tail -1 \
    | cut -f2- -d" "';
    $cmd = sprintf($cmd_raw, $id, $curr_date);
    $file = exec($cmd);

    if (!$file) {
        $cmd = sprintf($cmd_raw, $id, date("Y/m/d", strtotime('-1 day')));
        $file = exec($cmd);
    }

    if (isset($file)) {
        $file_name = basename($file);
        $seconds_since_update = get_seconds_since_file($file_name, MAX_ALERT + 90);

        if ($seconds_since_update >= ALERT_THRESHOLD) {
            if (intval($seconds_since_update / 60) % MIN_MINUTES_BETWEEN_ALERTS) {
                $old_alerts[$idx] = $seconds_since_update;
            }
            else {
                $alerts[$idx] = $seconds_since_update;
            }
        }
    }
}

if (!empty($alerts)) {

    $alerts = $alerts + $old_alerts;
    $mail = new PHPMailer();

    $mail_config = get_from_array(
        sprintf('jobs.%s.mail_config', JOB_NAME),
        $container->config->cron
    );
    if (!$mail_config) throw new \Exception('Email config missing! Execution stopped!', 500);

    ksort($mail_config, SORT_NATURAL);
    foreach($mail_config as $field => $value) {
        if (is_int($field)) {
            $mail->{$value}();
        }
        else {
            $mail->{$field} = $value;
        }
    }

    $mail->setFrom('no-reply@mediaobserver-me.com', 'Mediaobserver');
    $mail->addReplyTo('no-reply@mediaobserver-me.com', 'Mediaobserver');

    $mailing_list = get_from_array(
        sprintf('jobs.%s.mailing_list', JOB_NAME),
        $container->config->cron
    );

    foreach($mailing_list as $name => $email) {
        $mail->addAddress($email, !is_int($name) ? $name : '');
    }
    $mail->Subject = 'ALERT: Video Streams Delay';

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
    foreach($alerts as $idx => $seconds_since_update) {

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
            $publications_active[$idx]->id,
            $publications_active[$idx]->name_en,
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
