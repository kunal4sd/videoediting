<?php

namespace App\Controller;

/**
 * QueueControllerClass
 *
 * @author Andchir <andycoderw@gmail.com>
 */
class QueueControllerClass extends BaseControllerClass
{

    /**
     * QueueControllerClass constructor.
     * @param array $config
     */
    public function __construct($config = array())
    {

        parent::__construct($config);

    }

    /**
     * Run processing new task
     * @return bool|array
     */
    public function process( $quid = 0 )
    {
        $task = $this->getNextTask($quid , $quid);
		
        if( $task === false ){
            return false;
        }

        $queueStore = $this->dbGetStore( 'queue_'.$quid );

        $task['status'] = 'processing';

        $tmpDirPath = '/var/www/edit.mediaobserver-me.com/public/tmp/'.$_COOKIE['uid'];
        $cmdFilePath = $tmpDirPath . DIRECTORY_SEPARATOR . $task['id'] . '.txt';
        if( !file_exists( $cmdFilePath ) ){
            $queueStore->delete( $task['id'] );
            return false;
        }

        $progressLogPath = $tmpDirPath . DIRECTORY_SEPARATOR . $task['id'] . '_progress_.txt';

        $cmd = file_get_contents( $cmdFilePath );
        $cmd .= ' \\' . PHP_EOL . ' -stats 2> "' . $progressLogPath . '"';

        $pid = $this->execInBackground( $cmd );
		/*Problem the queue.dat file not update processing status*/
        $task['pid'] = $pid;
        $queueStore->set( $task['id'], $task );

        return $task;
    }

    /**
     * Get next task
     * @param int $userId
     * @return bool|array
     */
    public function getNextTask( $userId = 0 , $quid=0 )
    {

        $queueStore = $this->dbGetStore( 'queue_'.$quid );
        $keys = $queueStore->getKeys();
        $output = false;
	
        foreach ($keys as $taskId) {
            $item = $queueStore->get( $taskId );
            if( $item['status'] == 'pending' ){
                $output = $item;
                $output['id'] = $taskId;
                break;
            }
        }
        return $output;
    }

    /**
     * Get current task
     * @param int $userId
     * @return bool|mixed
     */
    public function getCurrentTask( $userId = 0 , $quid = 0 )
    {

        $queueStore = $this->dbGetStore( 'queue_'.$quid );
        $keys = $queueStore->getKeys();
        $output = false;

        foreach ($keys as $taskId) {
            $item = $queueStore->get($taskId);
            if( $item['status'] == 'processing' && ( !$userId || $userId == $item['user_id'] ) ){
                $output = $item;
                $output['id'] = $taskId;
                break;
            }
        }

        return $output;
    }

    /**
     * Close queue task
     * @param $taskId
     * @return bool
     */
    public function closeTask( $taskId , $quid = 0 )
    {

        $queueStore = $this->dbGetStore( 'queue_'.$quid );
        $task = $queueStore->get( $taskId );
        if( empty( $task ) ){
            return false;
        }

        $tmpDirPath = '/var/www/edit.mediaobserver-me.com/public/tmp/'.$_COOKIE['uid'];//$this->getPublicPath('tmp_dir', $task['user_id']);
        $cmdFilePath = $tmpDirPath . DIRECTORY_SEPARATOR . $task['id'] . '.txt';
        $progressLogPath = $tmpDirPath . DIRECTORY_SEPARATOR . $task['id'] . '_progress_.txt';
        $outputFormat = !empty( $task['options'] ) && !empty( $task['options']['format'] )
            ? $task['options']['format']
            : 'mp4';
        $outputPath = $task['output_path'];

        if( file_exists( $outputPath ) ){
            chmod( $outputPath, 0777 );

            $user = $this->getUser( true, $task['user_id'] );
            if( $user === false ){
                return false;
            }
            $freeSpace = $user['files_size_max'] - $user['files_size_total'];

            //Check file size
            $fileSize = filesize( $outputPath );
            if( $fileSize > $freeSpace ){
                @unlink( $outputPath );
                $this->logging('ERROR. The file size exceeds the allowed limit.', $task['user_id']);
                return false;
            }

            $outputType = !empty( $task['type'] ) ? $task['type'] : 'output';

            $videoProperties = $this->getVideoProperties( $outputPath );
            $data = array(
                'id' => $task['output_id'],
                'title' => $task['title'],
                'ext' => $outputFormat,
                'file_size' => filesize( $outputPath ),
                'time_stump' => time(),
                'width' => 0,
                'height' => 0,
                'duration_ms' => 0
            );
            $data = array_merge( $data, $videoProperties );

            $mediaOutputStore = $this->dbGetStore( 'video_' . $outputType, $task['user_id'] );
            $mediaOutputStore->set( $task['output_id'], $data );
        }

        //Add to log
        if( file_exists( $progressLogPath ) ){
            $logContent = file_get_contents( $progressLogPath );
            $this->logging( $logContent, $task['user_id'] );
        }
        //Delete log files
        if( file_exists( $cmdFilePath ) ){
            @unlink( $cmdFilePath );
        }
        if( file_exists( $progressLogPath ) ){
            @unlink( $progressLogPath );
        }

        $queueStore->delete( $task['id'] );

        return true;
    }

    /**
     * Get queue status
     * @param int $userId
     * @return array
     */
    public function getUserQueueStatus( $quid = 0 )
    {
		//echo $_GET['tab_id'];
     
		$userId = $_COOKIE['uid'];

        $queueStore = $this->dbGetStore( 'queue_'.$quid );

        $keys = $queueStore->getKeys();
        $pendingCount = 0;
        $processingCount = 0;
        $percent = 0;
        $currentTaskStatus = '';
        $currentTaskId = '';

        foreach ($keys as $taskId) {
            $item = $queueStore->get( $taskId );
            if( $item['user_id'] == $userId && !$currentTaskStatus ){
                $currentTaskId = $taskId;
                $currentTaskStatus = $item['status'];
            }
            if( $item['status'] == 'pending' ){
                $pendingCount++;
            }
            if( $item['status'] == 'processing' ){
                $processingCount++;
            }
        }

    
		if( $pendingCount > 0 && (!$this->config['queue_size'] || $processingCount < $this->config['queue_size']) ){
            $newTask = $this->process($quid);
            if( $newTask !== false && !$currentTaskId && $newTask['user_id'] == $userId ){
                $currentTaskId = $newTask['id'];
                $currentTaskStatus = 'processing';
            }
        }

        if( $currentTaskId && $currentTaskStatus == 'processing' ){

            $percent = $this->getPercent(  $currentTaskId , $quid );

        }

        return array( $pendingCount, $processingCount, $percent, $currentTaskStatus );
    }

    /**
     * Stop user`s process
     * @param int $userId
     * @return array
     */
    public function stopUserProcess( $userId = 0 )
    {

        if( empty( $userId ) ){
            $user = $this->getUser();
            if( !$user || empty($user['id']) ){
                return array(
                    'success' => false,
                    'msg' => 'Forbidden.'
                );
            }
            $userId = $user['id'];
        }

        $output = array(
            'success' => false
        );

        $task = $this->getCurrentTask( $userId );
        if( $task === false ){
            $task = $this->getNextTask( $userId );
        }

        if( $task !== false && !empty( $task['pid'] ) ){
            if( $this->is_running( $task['pid'] ) ){
                if( $this->kill( $task['pid'] ) ){
                    sleep(2);
                    $this->closeTask( $task['id'] );
                    $output['success'] = true;
                }
            } else {
                $this->closeTask( $task['id'] );
            }
        }

        return $output;
    }

    /**
     * @param $taskId
     * @return int
     */
    public function getPercent( $taskId , $quid=0 )
    {

        $queueStore = $this->dbGetStore( 'queue_'.$quid );
        $task = $queueStore->get( $taskId );
        if( empty( $task ) ){
            return 0;
        }

        $tmpDirPath = '/var/www/edit.mediaobserver-me.com/public/tmp/'.$_COOKIE['uid'];//$this->getPublicPath('tmp_dir', $task['user_id']);
        $progressLogPath = $tmpDirPath . DIRECTORY_SEPARATOR . $task['id'] . '_progress_.txt';

        if( !file_exists( $progressLogPath ) ){
            return 0;
        }

        if( $task['pid'] && !$this->is_running( $task['pid'] ) ){
            $percent = 100;
        } else {
            $percent = $this->getFfmpegPercent( $progressLogPath, $task['duration'] );
        }

        if( $percent >= 99 ){
            sleep(2);
            $this->closeTask( $taskId ,$quid );
            $percent = 100;
        }

        return $percent;
    }

    /**
     * Queue processing
     */
    public function queueProcessing( )
    {
        $queueStore = $this->dbGetStore( 'queue' );

        $keys = $queueStore->getKeys();
        $pendingCount = 0;
        $processingCount = 0;

        foreach ($keys as $taskId) {
            $item = $queueStore->get( $taskId );
            if( $item['status'] == 'pending' ){
                $pendingCount++;
            }
            if( $item['status'] == 'processing' ){
                if( !$this->is_running( $item['pid'] ) ){
                    sleep(2);
                    $this->closeTask( $item['id'] );
                } else {
                    $processingCount++;
                }
            }
        }

        if( $pendingCount > 0 && (!$this->config['queue_size'] || $processingCount < $this->config['queue_size']) ){
            $this->process();
        }

        return array( $pendingCount, $processingCount );
    }

    /**
     * Get FFMpeg duration
     * @param string $content
     * @return array|int|mixed
     */
    public function getFfmpegDuration( $content = '' )
    {
        $duration = 0;
        $output = 0;

        if( $content ){

            preg_match_all("/Input #([^\,]), .* '(.+)'/", $content, $matches);
            $inputs = array();
            $isAudioExists = false;
            if( !empty( $matches ) && !empty( $matches[2] ) ){
                foreach ( $matches[2] as $inp ){
                    $ext = $this->getExtension($inp);
                    if( in_array( $ext, array('mp3','wav') ) ){
                        $isAudioExists = true;
                    }
                    array_push( $inputs, $inp );
                }
            }

            preg_match_all("/Duration: (.*?), start:/", $content, $matches);
            $rawDuration = $matches[1];

            if( is_array( $rawDuration ) && count( $rawDuration ) > 1 ){
                foreach( $rawDuration as $index => $dur ){
                    $ext = $this->getExtension($inputs[$index]);
                    if( !$ext ){
                        continue;
                    }
                    if( $isAudioExists ){
                        if( in_array( $ext, array('mp3','wav') ) ){
                            $duration += self::timeToSeconds( $dur );
                        }
                    } else {
                        $duration += self::timeToSeconds( $dur );
                    }
                }
                $output = $duration;
            }else{
                $output = self::timeToSeconds( $rawDuration[0] );
            }
        }

        return $output;
    }

    /**
     * Get Ffmpeg percent
     * @param $logPath
     * @param $totalDuration
     * @return float|int
     */
    public function getFfmpegPercent( $logPath, $totalDuration = 0 )
    {

        $output = 0;
        $content = file_exists( $logPath )
            ? file_get_contents( $logPath )
            : '';

        if( !$totalDuration ){
            $totalDuration = $this->getFfmpegDuration( $content );
        }
        if( !$totalDuration ){
            return $output;
        }

        //current time
        preg_match_all( "/time=(.*?) bitrate/", $content, $matches );

        $rawTime = array_pop( $matches );
        if ( is_array( $rawTime ) ){ $rawTime = array_pop($rawTime); }
        if( !empty( $rawTime ) ){
            $time = self::timeToSeconds( $rawTime );
        }else{
            $time = $totalDuration;
        }

        $output = round( ( $time / $totalDuration ) * 100 );
        if( $output >= 99 ) $output = 100;

        return $output;
    }

}