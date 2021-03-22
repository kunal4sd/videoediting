<?php

/**
 * IN ORDER FOR THIS TO WORK, PLEASE FOLLOW THE STEPS:
 * 1. go to the project's base path:
 * `cd /var/www/ve.mediaobserver-me.com/` # or wherever the project is located
 * 2. run:
 * `composer install`
 * 3. run:
 * `crontab -l | { cat; echo "* * * * * $(which php) $(pwd)/app/cron/main.php >> $(pwd)/app/logs/cron.log 2>&1"; } | crontab -`
 * or append the echo output manually to the correct crontab
 *
 * ANY CRON JOBS HAVE TO BE CREATED INSIDE THE `./jobs/` DIRECTORY.
 * IN ORDER TO ACTIVATE THEM, ADD THEM IN THE CONFIG FILE
 */

ini_set('display_errors', 1);
error_reporting(E_ALL);

require realpath(__DIR__ . '/../bootstrap') . '/constants.php';
require BASE_PATH . '/vendor/autoload.php';
require APP_PATH . '/bootstrap/functions.php';
require CONFIG_FILE_PATH;

use Cron\Cron;
use Cron\Job\ShellJob;
use Cron\Executor\Executor;
use Cron\Resolver\ArrayResolver;
use Cron\Schedule\CrontabSchedule;

$php_bin = get_from_array('cron.main.php_binary', $config);
$log_path = get_from_array('cron.main.log_path', $config);
$log_filename = get_from_array('cron.main.log_filename', $config);
$default_schedule = get_from_array('cron.main.default_schedule', $config);
$config_jobs = get_from_array('cron.jobs', $config);

$output = '';

try {
    if ($php_bin && $config_jobs) {

        $jobs_map = [];
        $resolver = new ArrayResolver();
        foreach($config_jobs as $job_name => $config) {
                $schedule = $config['schedule'] ?: $default_schedule;
                $job = new ShellJob();
                $cmd = sprintf(
                    '%s %s/cron/jobs/%s.php 2>&1',
                    $php_bin,
                    APP_PATH,
                    $job_name,
                    APP_PATH
                );
                $job->setCommand($cmd);
                $job->setSchedule(new CrontabSchedule($schedule));
                $jobs_map[spl_object_hash($job)] = $job_name;
                $resolver->addJob($job);
        }
        $cron = new Cron();
        $cron->setExecutor(new Executor());
        $cron->setResolver($resolver);
        $report = $cron->run();

        while($cron->isRunning()) {
            sleep(1);
        }

        $jobs = $resolver->resolve();
        foreach($jobs as $job) {
            $job_report = $report->getReport($job);
            $output .= sprintf(
                "%s ::: %s ::: %s\n",
                date("Y-m-d H:i:s", $job_report->getStartTime()),
                $jobs_map[spl_object_hash($job)],
                implode(' ', $job_report->getOutput())
            );
        }
    }
    else {
        throw new \Exception(
            'Could not start the cron jobs because of missing configuration details.',
            500
        );
    }
    file_put_contents(
        sprintf('%s/%s', $log_path, $log_filename),
        $output,
        FILE_APPEND
    );
}
catch(\Exception $e) {
    echo sprintf(
        "%s ::: %s ::: %s\n",
        date("Y-m-d H:i:s"),
        'main cron',
        sprintf("%s %s", $e->getCode(), $e->getMessage())
    );
}
