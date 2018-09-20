<?php

namespace App\Controller;

/**
 * RenderControllerClas
 *
 * @author Andchir <andycoderw@gmail.com>
 */
class RenderControllerClass extends BaseControllerClass
{

    /**
     * RenderControllerClass constructor.
     * @param array $config
     */
    public function __construct($config = array())
    {

        parent::__construct( $config );

    }

    /**
     * Get render options
     * @param $opts
     * @return array
     */
    public function getRenderOptions( $opts )
    {
        $output = array();
        $sizes = array(
            '4:3' => array(
                '360p' => '480x360',
                '480p' => '640x480',
                '540p' => '720x540',
                '720p' => '960x720',
                '1080p' => '1440x1080'
            ),
            '16:9' => array(
                '360p' => '640x360',
                '480p' => '854x480',
                '540p' => '960x540',
                '720p' => '1280x720',
                '1080p' => '1920x1080'
            )
        );
        $quality_arr = array(
            'low' => '600k',
            'medium' => '800k',
            'high' => '2500k'
        );

        $output['aspect'] = isset( $sizes[ $opts['aspect'] ] )
            ? $opts['aspect']
            : '4:3';

        $output['size'] = isset( $sizes[ $output['aspect'] ][ $opts['size'] ] )
            ? $sizes[ $output['aspect'] ][ $opts['size'] ]
            : $sizes[ $output['aspect'] ]['360p'];
        $output['size_arr'] = explode( 'x', $output['size'] );

        $output['quality'] = isset( $quality_arr[ $opts['quality'] ] )
            ? $quality_arr[ $opts['quality'] ]
            : $quality_arr[ 'medium' ];

        $output['format'] = in_array( $opts['format'], $this->config['upload_allowed'] )
            ? $opts['format']
            : 'mp4';

        $output['text'] = !empty( $opts['text'] )
            ? trim( $opts['text'] )
            : '';

        $output['fps'] = '25';
		
        return $output;
    }

    /**
     * Get codec string
     * @param $options
     * @return mixed
     */
    public function getCodecString( $options )
    {
        $codecString = isset( $this->config['ffmpeg_string_arr'][ $options['format'] ] )
            ? $this->config['ffmpeg_string_arr'][ $options['format'] ]
            : '';

        return str_replace(array(
            '{quality}',
            '{format}',
            '{size}',
            '{aspect}'
        ), array(
            $options['quality'],
            $options['format'],
            $options['size'],
            $options['aspect']
        ), $codecString);
    }

    /**
     * Convert video
     * @param $itemId
     * @param $type
     * @param $opts
     * @return array
     */
    public function convert( $itemId, $type, $opts )
    {
        $user = $this->getUser();
        if( !$user || empty($user['id']) ){
            return array(
                'success' => false,
                'msg' => 'Forbidden.'
            );
        }

        $output = array();
        $fileStore = $this->dbGetStore( 'video_' . $type, $user['id'] );

        $inputMedia = $fileStore->get( $itemId );
        if( $inputMedia === false ){
            return array(
                'success' => false,
                'msg' => 'File not found.'
            );
        }

        $outputFileName = time() . '_' . uniqid();
        $tmpDirPath = $this->getPublicPath('tmp_dir', $user['id']);
        $outputDirPath = $this->getPublicPath($type . '_dir', $user['id']);

        if( !is_dir( $tmpDirPath ) ){
            mkdir( $tmpDirPath );
            chmod( $tmpDirPath, 0777 );
        }
        if( !is_dir( $outputDirPath ) ){
            mkdir( $outputDirPath );
            chmod( $outputDirPath, 0777 );
        }

        $options = $this->getRenderOptions( $opts );
        $filePath = $this->getMediaFilePath( 'input', $user['id'], $inputMedia );
        if( !file_exists( $filePath ) ){
            return array(
                'success' => false,
                'msg' => 'File not found.'
            );
        }

        $cmdFilters = '';
        $videoOutName = '';
        $outputPath = $outputDirPath . DIRECTORY_SEPARATOR . $outputFileName . '.' . $options['format'];

        $cmd = $this->config['ffmpeg_path'];
        $cmd .= ' \\' . PHP_EOL . '-i "' . $filePath . '"';

        $tmp = $this->getFilterScale( '0:v', $options['size_arr'][0], $options['size_arr'][1], array($inputMedia['width'], $inputMedia['height']), 'v_scaled' );
        if( $tmp ){
            $cmdFilters .= $tmp . ';';
            $videoOutName = 'v_scaled';
        }
        if( !empty( $options['text'] ) ){
            $fontPath = $this->config['public_path'] . 'assets/fonts/' . $this->config['watermark_text_font_name'];
            $cmdFilters .= $this->getFilterText( $videoOutName, $options['text'], $fontPath, 'video_out_watermarked', 'x=25:y=25' ) . ';';
            $videoOutName = 'video_out_watermarked';
        }

        if( $cmdFilters ){
            $cmd .= $this->addFiltersCommand( $cmdFilters );
            $cmd .= ' \\' . PHP_EOL . '-map "[' . $videoOutName . ']" -map "0:a"';
        }

        $cmd .= ' \\' . PHP_EOL . '-s ' . $options['size'];
        $cmd .= ' \\' . PHP_EOL . '-aspect ' . number_format( $options['size_arr'][0] / $options['size_arr'][1] , 6, '.', '' );
        $cmd .= ' \\' . PHP_EOL . '-r ' . $options['fps'];

        $codecString = $this->getCodecString( $options );
        $cmd .= ' \\' . PHP_EOL . $codecString;
        $cmd .= ' \\' . PHP_EOL . '-y "' . $outputPath . '"';

        $this->logging( $cmd );

        //Add to queue
        $queueStore = $this->dbGetStore( 'queue' );
        $queue = array(
            'user_id' => $user['id'],
            'output_id' => $outputFileName,
            'output_path' => $outputPath,
            'title' => $inputMedia['title'],
            'duration' => $inputMedia['duration_ms'] / 1000,
            'type' => $type,
            'options' => $options,
            'status' => 'pending',
            'time_stump' => time()
        );
        $queueStore->set($outputFileName, $queue);

        $cmdFilePath = $tmpDirPath . DIRECTORY_SEPARATOR . $outputFileName . '.txt';
        file_put_contents( $cmdFilePath, $cmd );
        chmod( $cmdFilePath, 0777 );

        $queueController = new QueueControllerClass( $this->config );
        list( $pendingCount, $processingCount, $percent, $userStatus ) = $queueController->getUserQueueStatus();
        $output['data'] = array(
            'success' => true,
            'status' => $userStatus,
            'pendingCount' => $pendingCount,
            'processingCount' => $processingCount,
            'percent' => $percent
        );
        $output['success'] = true;

        return $output;
    }
	public function dateOp($fdate,$duration, $op){
			$duration = (int)$duration;		
			$dateinsec=strtotime($fdate);
			return date('Y-m-d H:i:s',strtotime($op.$duration.' seconds',strtotime($fdate)));
			
	}
	
	public function get_best_file($id, $start_date, $path, $increment = null) {
		 
		$ago = '';
		if (!is_null($increment) && $increment == 'ago') {
			$ago = 'ago';
		}

		$timezone = '+0300';
		if('2018-03-30 00:00:00' > $start_date)
		{
			$timezone = '+0200';
		}

		for($i=0; $i <= 30; $i++) {
			$file = shell_exec("date '+$path/$id/%Y/%m/%d/$id.%Y_%m_%d-%H:%M:%S.ts' --date=\"$start_date $timezone + $i seconds $ago\"");
			$file = trim($file);
			if (file_exists($file)){
				return $file;
			}
		}
		return false;
	}
	public function render2 ( $title, $opts, $data , $quid ){
		GLOBAL $db2;
		GLOBAL $getData;
		$path = '/storage/recordings';
		
		if ($_COOKIE['uid'] == 171){
			$output_path = '/var/www/edit.mediaobserver-me.com/public/tmp/vidsaver/';
		} else {
			$output_path = '/var/www/edit.mediaobserver-me.com/public/userfiles/output/testOutput/';
		}
		

			$data = json_decode( $_POST['data'] );

			foreach ($data as $i => $row) {
				if ( !isset($row)) {
					unset($data[$i]);
				}
			}
			$data = array_values($data);
		
			
			$fnamez = explode('.',$data[0][2]);
			$issue_date = str_replace(array('-','_') , array(' ','-'), $fnamez[1]) ;
			$article_data = Array (
				   "publication_id" => $getData['publication_id'],
				   "issue_date" => $issue_date,
				   "section_id" => 0,
				   "headline" => $title,
				   "type_id" => 0,
				   "modified" =>  $db2->now(),
				   "created" => $db2->now(),
				   "created_by" => $_COOKIE['uid'],
				   "duration" => 0,
				   "broadcast_time" => 0,
				   "file_path"=>'',
				   
			);	
						
			 $dbid = $db2->insert ('article', $article_data);
			$outputFileName = $output_path.$dbid.'.mp4';
		
		$dataz = Array ("user_id" => $_COOKIE['uid'],
		   "publication_id" => $getData['publication_id'],
		   "article_id" => $dbid ,
		   "issue_date" =>$issue_date,
		   "activity_id" => 2,
		   "created" => $db2->now(),
		);

		$xid = $db2->insert ('user_activity', $dataz);		
		$files_ar = array();
		$get_first_video = true;
		foreach($data as $tmp){
			
			$file_name = explode('.',$tmp[2]);
			$fdate = str_replace( array('-','_') , array(' ','-'), $file_name[1]);
			
			$from_time 	= $this->dateOp($fdate, $tmp[0],'+'); 
			$to_date 	= $this->dateOp($fdate, $tmp[1],'+'); 
			
			$id = $file_name[0];
			$start_file = $this->get_best_file($id, $from_time, $path, 'ago');
			$end_file = $this->get_best_file($id, $to_date, $path);
			$sfile_mtime = date('Y/m/d H:i:s', filemtime($start_file));
			$efile_mtime = date('Y/m/d H:i:s', filemtime($end_file));
			$sdir = date('Y/m/d', filemtime($start_file));
			
			$find_command = "find $path/$id/$sdir -type f -newermt '$sfile_mtime' ! -newermt '$efile_mtime' | sort -n | cut -f2";
			
			$files_string = shell_exec($find_command);
			$files = explode("\n", trim($files_string));
			if ($get_first_video){
				$first_video_name = basename($files[0]);
				$brodcast = $files[0];
				$tmp3 = explode('-',$brodcast);
				$brodcast = substr($tmp3[1],0,-3);
				$get_first_video = false;
			}
			foreach($files as $ffile){
				array_push($files_ar, $ffile);
			}
		}
		
		
		$files_ar  = array_unique($files_ar );
		
		$files_str = implode('|',$files_ar);
		 
		$ffmpeg_str = 'ffmpeg -i  "concat:'.$files_str.'" -c copy '.$outputFileName."\n\r";
		$output =  shell_exec($ffmpeg_str) ;

		
		$duration = exec('ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 '.$outputFileName);
		$duration =  (int)$duration;

		$first_video_name = explode('.',$first_video_name);
		$new_issue_date = str_replace(array('-','_') , array(' ','-'), $first_video_name[1] ) ;
		
		$db2->where ('id', $dbid);
		$db2->update ('article', Array ('duration' => $duration,'broadcast_time'=>$brodcast,'issue_date'=>$new_issue_date))	;

        $output['success'] = true;
		return $output;
		
	}
	
    /**
     * Render movie
     * @param $title
     * @param $opts
     * @param $data
     * @return array
     */
	
    public function render( $title, $opts, $data , $quid )
    {
		/*Rami render function 
		- add to db
		*/
		
		GLOBAL $db2;
		GLOBAL $db;
		GLOBAL $getData;
		$audio = false;
		$db->where('id',$getData['publication_id']);
		$pubInfo = $db->getOne('publication');
		
		if($pubInfo['type_id'] == '4'){
			$audio = true;
		}
		$startCutTime = '';
		$contentController = new ContentControllerClass( $this->config );
        if( !is_array( $data ) ){
            $data = json_decode( $data, true );
        }
        if( empty( $title ) ){
            return array(
                'success' => false,
                'msg' => 'The title of the movie is empty.'
            );
        }
        if( empty( $data ) ){
            return array(
                'success' => false,
                'msg' => 'Data are not available.'
            );
        }

        $user = $this->getUser();
        if( $user === false ){
            return array(
                'success' => false,
                'msg' => 'Forbidden.'
            );
        }

        $output = array();
 
        $options = $this->getRenderOptions( $opts );
        //$fileStore = $this->dbGetStore( 'video_input', $user['id'] );
	
        $tmpDirPath = '/var/www/edit.mediaobserver-me.com/public/tmp/'.$_COOKIE['uid'];//$this->getPublicPath('tmp_dir', $user['id']);
        $outputDirPath = '/var/www/edit.mediaobserver-me.com/public/userfiles/output/testOutput'; //$this->getPublicPath('output_dir', $user['id']);

        if( !is_dir( $tmpDirPath ) ){
            mkdir( $tmpDirPath );
            chmod( $tmpDirPath, 0777 );
        }
        if( !is_dir( $outputDirPath ) ){
            mkdir( $outputDirPath );
            chmod( $outputDirPath, 0777 );
        }

        //Input data
        $inputData = array();
		
		/*Rami
			$startCutTime = $data[0]['time'][0] ;
		*/
		
		
        foreach ( $data as $input ){
            //$media = $fileStore->get( $input['id'] );
			$media = $contentController->getMediaList('input', $input['id'] );
			
            if( empty( $media ) ){
                continue;
            }
            $filePath = $media['path']  . DIRECTORY_SEPARATOR . $media['id'] . '.' . $media['ext']; //$this->getMediaFilePath( 'input', $user['id'], $media );
            if( file_exists( $filePath ) ){
                $media['time'] = $input['time'];
                $media['file_path'] = $filePath;
                $inputData[] = $media;
            }
        }
		
		
		if($startCutTime == ''){
			$timetmp = explode('-',$media['id']);
			$dateval= $timetmp[1];
			
			$startCutTime1 = round( number_format($inputData[0]['time'][0] / 1000, 3, '.', '') )	;
			$startCutTime =date('H:i:s',strtotime("+".$startCutTime1." seconds",strtotime($dateval)));
			
		
			$issue_date = str_replace('_','-',substr($timetmp[0], strpos($timetmp[0]  , '.')+1)) ;
			
			$data = Array (
				   "publication_id" => $getData['publication_id'],
				   "issue_date" => $issue_date,
				   "section_id" => 0,
				   "headline" => $title,
				   "type_id" => 0,
				   "modified" =>  $db2->now(),
				   "created" => $db2->now(),
				   "created_by" => $_COOKIE['uid'],
				   "duration" => 0,
				   "broadcast_time" => $startCutTime,
				   "file_path"=>'',
				   
			);
			
			//$outputFileName = $db2->insert ('article', $data);	
			$outputFileName = uniqid();
		}		
		$outputPath = $outputDirPath . DIRECTORY_SEPARATOR . $outputFileName . '.' . $options['format'];
		
        //$outputFileName = time() . '_' . uniqid();
		/*
        if( !is_dir( $outputDirPath ) ){
            mkdir( $outputDirPath );
            chmod( $outputDirPath, 0777 );
        }
		*/


        $inputIndex = 0;
        $cmdFilters = '';
        $cmdInput = '';
        $inputs = array();
        $inputsAudio = array();
        $videoOutName = '';
        $audioOutName = '';
        $totalDuration = 0;

        $cmd = $this->config['ffmpeg_path'] . '{{input}}{{output}}';

        //Black input
        $cmdInput .= ' \\' . PHP_EOL . '-f lavfi -i color=c=black';
        $blackIndex = 0;
        $inputIndex++;

		
		//if(!$audio){
        //Video input
	
			foreach ( $inputData as $index => $input ){
				$ind = $inputIndex;
				$videoOutName = $ind . ':v';

				$cmdInput .= $this->getFilterTrim( $videoOutName, $input['time'], 'input_trim', $ind . '_trimmed' );
				$cmdInput .= ' \\' . PHP_EOL . "-i \"{$input['file_path']}\"";

				$cmdFilters .= $this->getFilterFps( $videoOutName, $ind . '_fps' ) . ';';
				$videoOutName = $ind . '_fps';

				$tmp = $this->getFilterScale( $videoOutName, $options['size_arr'][0], $options['size_arr'][1], array(@$input['width'], @$input['height']), $ind . '_scaled' );
				if( $tmp ){
					$cmdFilters .= $tmp . ';';
					$videoOutName = $ind . '_scaled';
				}

				$totalDuration += ($input['time'][1] - $input['time'][0]) / 1000;

				array_push( $inputs, $videoOutName );
				$inputIndex++;
			}

			//Concat video
			if( count( $inputs ) > 1 ){
				$videoOutName = 'video_out';
				$cmdFilters .= $this->getFilterConcat( $inputs, $videoOutName ) . ';';
			}

			if( !empty( $this->config['watermark_text'] ) ){
				$fontPath = $this->config['public_path'] . 'assets/fonts/' . $this->config['watermark_text_font_name'];
				$cmdFilters .= $this->getFilterText( $videoOutName, $this->config['watermark_text'], $fontPath, 'video_out_watermarked' ) . ';';
				$videoOutName = 'video_out_watermarked';
			}

			if( !empty( $options['text'] ) ){
				$fontPath = $this->config['public_path'] . 'assets/fonts/' . $this->config['watermark_text_font_name'];
				$cmdFilters .= $this->getFilterText( $videoOutName, $options['text'], $fontPath, 'video_out_watermarked', 'x=25:y=25' ) . ';';
				$videoOutName = 'video_out_watermarked';
			}
		//} else {
			//Audio input
			foreach ( $inputData as $index => $input ){
				$ind = $index + 1;
				$audioOutName = $ind . ':a';
				$time = $input['time'];

				if( !$this->audioStreamExists( $input['file_path'] ) ){
					$cmdInput .= ' \\' . PHP_EOL . '-f lavfi -i anullsrc=r=44100';
					$inputIndex++;
					$audioOutName = ($inputIndex - 1) . ':a';
					$time = array( 0, ($input['time'][1] - $input['time'][0]));

					$cmdFilters .= $this->getFilterTrim( $audioOutName, $time, 'atrim', $ind . '_trimmed' ) . ';';
					$audioOutName = $ind . '_trimmed';
				}

				array_push( $inputsAudio, $audioOutName );
			}

			//Concat audio
			if( count( $inputsAudio ) > 1 ){
				$audioOutName = 'audio_out';
				$cmdFilters .= $this->getFilterConcat( $inputsAudio, $audioOutName, 'audio' ) . ';';
			}
		//}
		if( $cmdFilters ){
			$cmdFilters = $this->addFiltersCommand( $cmdFilters );
		}

		if( strpos( $videoOutName, ':' ) === false ){
			$videoOutName = "[{$videoOutName}]";
		}
		

        $cmd .= ' \\' . PHP_EOL . '-map "' . $videoOutName . '"';
		
		

        if( $audioOutName ){
            if( strpos( $audioOutName, ':' ) === false ){
                $audioOutName = "[{$audioOutName}]";
            }
            $cmd .= ' -map "' . $audioOutName . '"';
        }

        $cmd = str_replace( ['{{input}}', '{{output}}'], [$cmdInput, $cmdFilters], $cmd );

        $cmd .= ' \\' . PHP_EOL . '-s ' . $options['size'];
        $cmd .= ' \\' . PHP_EOL . '-aspect ' . number_format( $options['size_arr'][0] / $options['size_arr'][1] , 6, '.', '' );
        $cmd .= ' \\' . PHP_EOL . '-r ' . $options['fps'];

        $codecString = $this->getCodecString( $options  );
        $cmd .= ' \\' . PHP_EOL . $codecString;

        $cmd .= ' \\' . PHP_EOL . '-t ' . number_format( $totalDuration, 3, '.', '' ) . ' -async 1';
        $cmd .= ' \\' . PHP_EOL . '-y "' . $outputPath . '"';

		
		if($audio){ // change the commen
			$nu_of_files = substr_count($cmd,'-ss');
			if( $nu_of_files == 1){
				$complexPOS = strpos($cmd,'-filter_complex " \\');
				$sPOS = strpos($cmd,'-s 854x480 \\');
				$audioCMD = substr($cmd , 0 , $complexPOS );		
				$audioCMD2 =substr($cmd , $sPOS  );	
			
				$cmd =  $audioCMD.$audioCMD2;
			} else {
				$pattern = "/(.*)-s(.*)-filter(.*)-y(.*).mp4\"/Usi";
				$replacement = "ffmpeg \\\n-s$2-filter_complex \"[0][1]concat=n=$nu_of_files:v=0:a=1\" \\\n-y $4.mp4\"";
				$cmd =  preg_replace($pattern, $replacement, $cmd);	
			}	

		
		}

        //Add to queue
        $queueStore = $this->dbGetStore( 'queue_'. $quid );
        $queue = array(
            'user_id' => $_COOKIE['uid'],
            'output_id' => $outputFileName,
            'output_path' => $outputPath,
            'title' => $title,
            'type' => 'output',
            'options' => $options,
            'status' => 'pending',
            'duration' => $totalDuration,
            'time_stump' => time()
        );
        $queueStore->set($outputFileName, $queue);

        $cmdFilePath = $tmpDirPath . DIRECTORY_SEPARATOR . $outputFileName . '.txt';
        file_put_contents( $cmdFilePath, $cmd );
        chmod( $cmdFilePath, 0777 );

        $queueController = new QueueControllerClass( $this->config );
        list( $pendingCount, $processingCount, $percent, $userStatus ) = $queueController->getUserQueueStatus($quid);
        $output['data'] = array(
            'success' => true,
            'status' => $userStatus,
            'pendingCount' => $pendingCount,
            'processingCount' => $processingCount,
            'percent' => $percent
        );
        $output['success'] = true;

        $this->logging( $cmd );
		sleep(3);
		$outputFileName2 = $db2->insert ('article', $data);
		$rename_file = str_replace($outputFileName,$outputFileName2,$outputPath);
		rename ($outputPath, $rename_file);

		
		$db2->where ('id', $outputFileName2);
		$db2->update ('article', Array ('duration' => $totalDuration))	;	
	
        return $output;
    }

    /**
     * @param $cmdFilters
     * @return string
     */
    public function addFiltersCommand( $cmdFilters )
    {
        $output = '';
        if( $cmdFilters ){
            if( substr( $cmdFilters, -1 ) == ';' ){
                $cmdFilters = substr( $cmdFilters, 0, -1 );
            }
            $output = ' \\' . PHP_EOL . '-filter_complex "' . $cmdFilters . ' \\' . PHP_EOL . '"';
        }
        return  $output;
    }

    /**
     * @param $inputs
     * @param $outputName
     * @param string $type
     * @return string
     */
    public function getFilterConcat( $inputs, $outputName, $type = 'video' )
    {
        $cmd = '';
        if( $type == 'video' ){
            $tmp = $inputs;
            $inputs = [ $tmp[0] ];
            for($i = 1; $i < count($tmp); $i++){
                $cmd .= " \\\n" . '[' . $tmp[$i] . '][' . $tmp[0] . ']scale2ref[scaled_' . $tmp[$i] . '][' . $tmp[0] . '];';
                $inputs[] = 'scaled_' . $tmp[$i];
            }
        }

        $tmp = '[' . implode( '][', $inputs ) . ']';
        $cmd .= ' \\' . PHP_EOL . $tmp . 'concat=n=' . count( $inputs );
        $cmd .= $type == 'video' ? ':v=1:a=0' : ':v=0:a=1';
        $cmd .= "[{$outputName}]";
        return $cmd;
    }

    /**
     * @param $inputName
     * @param string $outputName
     * @param int $fps
     * @return string
     */
    public function getFilterFps( $inputName, $outputName, $fps = 25 )
    {
        return ' \\' . PHP_EOL . "[{$inputName}]fps=fps={$fps}[{$outputName}]";
    }

    /**
     * Get filter input
     * @param $inputName
     * @param $time
     * @param $type
     * @param $outputName
     * @return string
     */
    public function getFilterTrim( $inputName, $time, $type = 'trim', $outputName )
    {
        $timeStart = number_format($time[0] / 1000, 3, '.', '');
        $timeEnd = number_format($time[1] / 1000, 3, '.', '');
        $timeDur = number_format(($time[1] - $time[0]) / 1000, 3, '.', '');
        if( $type == 'input_trim' ){
            return ' \\' . PHP_EOL . "-ss {$timeStart } -t {$timeDur}";
        }
        else {
            return ' \\' . PHP_EOL . "[{$inputName}]{$type}={$timeStart}:{$timeEnd}[{$outputName}]";
        }
    }

    /**
     * @param $inputName
     * @param $width
     * @param $height
     * @param array $inputSizeArr
     * @param $outputName
     * @param bool $forceAspect
     * @return string
     */
    public function getFilterScale( $inputName, $width, $height, $inputSizeArr = [], $outputName, $forceAspect = true )
    {
        if( $inputSizeArr[0] == $width && $inputSizeArr[1] == $height ){
            return '';
        }

        $cmd = '';
        $uniqid = str_replace( ':', '', $inputName );

        $tmpWidth = $width;
        $tmpHeight = $height;
        $outAspect = $width / $height;
        $inpAspect = ($inputSizeArr[1] > 0 )? $inputSizeArr[0] / $inputSizeArr[1] : 0;

        if( $forceAspect ){
            $tmpHeight = $outAspect > $inpAspect ? $height : floor( $width / $inpAspect );
            $tmpWidth = $outAspect > $inpAspect ? floor( $height * $inpAspect ) : $width;
        }

        $cmd .= ' \\' . PHP_EOL . "[{$inputName}]scale={$tmpWidth}:{$tmpHeight}";
        if( $forceAspect ){
            $cmd .= ":force_original_aspect_ratio=increase";
        }
        $cmd .= "[{$uniqid}_tmpsize];";

        $xoffset = $tmpWidth < $width ? ($width - $tmpWidth) / 2 : 0;
        $yoffset = $tmpHeight < $height ? ($height - $tmpHeight) / 2 : 0;
        $cmd .= ' \\' . PHP_EOL . "[{$uniqid}_tmpsize]pad={$width}:{$height}:x={$xoffset}:y={$yoffset}:color=black[{$outputName}]";

        return $cmd;
    }

    /**
     * @param $inputName
     * @param $text
     * @param $fontPath
     * @param $outputName
     * @param string $pos
     * @param string $color
     * @return string
     */
    public function getFilterText( $inputName, $text, $fontPath, $outputName, $pos = 'x=25:y=h-50', $color = 'white' )
    {
        $text = str_replace( "'", "", $text );
        $text = str_replace( ":", "\\:", $text );
        $text = $this->beautifyQuotes( $text );
        $cmd = ' \\' . PHP_EOL . "[{$inputName}]drawtext=fontfile='{$fontPath}'";
        $cmd .= ' \\' . PHP_EOL . ":{$pos}:fontsize=16:text='{$text}':fontcolor={$color}[{$outputName}]";
        return $cmd;
    }

    /**
     * Check audio stream exists
     * @param $videoFilePath
     * @return bool
     */
    public function audioStreamExists( $videoFilePath )
    {
        $cmd = $this->config['ffprobe_path'];
        $cmd .= ' \\' . PHP_EOL . "-i \"{$videoFilePath}\" 2>&1";
        $content = shell_exec( $cmd );
        if( !preg_match( '/Audio:/', $content ) ){
            return false;
        }
        return true;
    }

}