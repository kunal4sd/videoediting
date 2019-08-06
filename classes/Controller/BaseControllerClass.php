<?php

namespace App\Controller;

use Flintstone\Flintstone;
use Flintstone\Formatter\JsonFormatter;

/**
 * BaseControllerClass
 * 
 * @author Andchir <andycoderw@gmail.com>
 */
class BaseControllerClass
{

    protected $config = array();

    /**
     * BaseControllerClass constructor.
     * @param array $config
     */
    public function __construct($config = array())
    {
        $this->config = array_merge(array(
            'authentication' => true,
            'ffmpeg_path' => 'ffmpeg',
            'ffprobe_path' => 'ffprobe',
            'base_url' => '/',
            'root_path' => '',
            'input_dir' => 'userfiles/input/',
            'output_dir' => 'userfiles/output/',
            'tmp_dir' => 'userfiles/tmp/',
            'log_filename' => 'log.txt',
            'database_dir' => 'database/',
            'ffmpeg_string_arr' => array(),
            'users_restrictions' => array(),
            'watermark_text' => '',
            'watermark_text_font_name' => 'libel-suit-rg.tt',
            'queue_size' => 10,
            'debug' => false
        ), $config);
    }

    /**
     * @param $keyName
     * @return mixed
     */
    public function escapeKeyName( $keyName )
    {
        return preg_replace( '/[^\w-]/', '-', $keyName );
    }

    /**
     * @param $storeName
     * @param string $subDir
     * @return Flintstone
     */
    public function dbGetStore( $storeName, $subDir = '' )
    {
        //$storeDirPath = $this->config['root_path'] . $this->config['database_dir'];
		$storeDirPath = $tmpDirPath = '/var/www/edit.mediaobserver-me.com/public/tmp/'.$_COOKIE['uid'];
        if( $subDir ){
            $storeDirPath .= $subDir . '/';
        }
        if( !is_dir( $storeDirPath ) ){
            mkdir( $storeDirPath );
            chmod( $storeDirPath, 0777 );
        }
        $options = array(
            'dir' => $storeDirPath,
            'formatter' => new JsonFormatter()
        );
        return new Flintstone( $storeName, $options );
    }

    /**
     * @param $storeName
     * @param $key
     * @param $value
     * @param bool $onlyOne
     * @return array
     */
    public function dbGetBy( $storeName, $key, $value, $onlyOne = false ){

        $output = array();
        $store = $this->dbGetStore( $storeName );
        $keys = $store->getKeys();

        foreach ($keys as $k) {
            $data = $store->get( $k );
            if( $data === false ){
                continue;
            }
            if( !empty( $data[ $key ] ) && $data[ $key ] == $value ){
                $data['id'] = $k;
                if( $onlyOne ){
                    $output = $data;
                    break;
                }
                array_push( $output, $data );
            }
        }

        return $output;
    }

    /**
     * @param $storeName
     * @param $dataKey
     * @param $data
     */
    public function dbInsert( $storeName, $dataKey, $data )
    {
        $dataKey = $this->escapeKeyName( $dataKey );
        $store = $this->dbGetStore( $storeName );
        $store->set( $dataKey, $data );
    }

    /**
     * Get request action name
     * @param string $default
     * @return string
     */
    static function getRequestAction( $default = '' )
    {
        $action =  !empty( $_GET['action'] )
            ? trim( $_GET['action'] )
            : (!empty( $_POST['action'] ) ? trim( $_POST['action'] ) : $default);
			
		return $action;
    }

    /**
     * Handle request
     * @return array
     */
    public function handleRequest()
    {
		
        $action = self::getRequestAction();
        $output = array();
        $forcePrintOutput = true;

        switch ( $action ){
            case 'auth':

                $forcePrintOutput = false;
                $facebookAuthController = new FacebookAuthControllerClass( $this->config );
                $facebookAuthController->auth();

                break;
            case 'logout':

                $this->cleanTempUserDir();

                self::logout();

                break;
            case 'upload':

                $controller = new ContentControllerClass( $this->config );
                $output = $controller->importMedia();

                break;
            case 'content_list':
				/*Rami get videos menu 
				type = input 
				or output 
				*/

                $type = !empty( $_GET['type'] ) ? trim( $_GET['type'] ) : '';
                $controller = new ContentControllerClass( $this->config );
				if ($type=='input'){
					$output = $controller->getMediaList( $type , $_COOKIE['user']['id'] );
				} else {
					$output = $controller->getMediaList( $type  );
				}

                break;
			
			case 'content_list4':
			{
                $type = !empty( $_GET['type'] ) ? trim( $_GET['type'] ) : '';
                $controller = new ContentControllerClass( $this->config );
				if ($type=='input'){
					$output = $controller->getMediaList( $type , $_COOKIE['user']['id'] );
				} else {
					$output = $controller->getMediaList4( $type  );
				}

                break;
				
			}			
            case 'content_list2':
				/*Rami get videos menu 
				type = input 
				or output 
				*/
				
                $type = !empty( $_GET['type'] ) ? trim( $_GET['type'] ) : '';
                $controller = new ContentControllerClass( $this->config );
				if ($type=='input'){
					$output = $controller->getMediaList( $type , $_COOKIE['user']['id'] );
				} 
				$q=0;
				$narr = array();
				
				foreach($output['data'] as $tmp){
					$narr[$q]['title'] = $tmp['id'];
					$narr[$q]['artist'] = $tmp['title'];
					$narr[$q]['m4v'] = 'http://edit.mediaobserver-me.com/'.$tmp['url'];
					$narr[$q]['free'] = 'Boolean';
					
					$q++;
					
				}
				
				echo json_encode( $narr)  ;
				
				die();
                break;
				
            case 'get_media_info':
				/*Rami get videos info*/
				$controller = new ContentControllerClass( $this->config );
				$output = $controller->getVideoInfo( $_GET['vid'] );

                break;	

				
            case 'update_video_info':
				/*Rami get videos info*/
				
				$controller = new ContentControllerClass( $this->config );
				if( is_array($_POST['kwz']) ){ //check old system
					$kwz = ( isset( $_POST['kwz']) )? $_POST['kwz'] : array();
				} else {
					if( isset( $_POST['kwz']) ){  // check with new system
						$kwz = explode(',',$_POST['kwz'] );
					} else { 
						$kwz = array(); 
					}
				}
				
				$output = @$controller->updateVInfo( $_POST['vid'], $_POST['title'],$_POST['atext'], $kwz );

                break;	
				
            case 'get_media_keywords':
				/*Rami get videos info*/
				$controller = new ContentControllerClass( $this->config );
				$output = $controller->getVideoKeywords( $_GET['vid'] );

                break;					
				
            case 'search_list':
			
                $type = !empty( $_GET['type'] ) ? trim( $_GET['type'] ) : '';
                $controller = new ContentControllerClass( $this->config );
				$options = array( 
								'channels'=>@$_REQUEST['channels'],
								'sta'=> $_REQUEST['sta'],
								'fdate'=>$_REQUEST['fdate'],
								'tdate'=> $_REQUEST['tdate']
								);
                $output = $controller->getSearchList( $options );

                break;				
            case 'delete':
				
                $itemId = !empty( $_POST['itemId'] ) ? trim( $_POST['itemId'] ) : 0;
                $type = !empty( $_POST['type'] ) ? trim( $_POST['type'] ) : '';
				$inPage = $_POST['inPage'];
				
                $controller = new ContentControllerClass( $this->config );
                $output = $controller->deleteItem( $itemId, $type );
				$output['redirect'] = ($inPage) ? 'user' : '' ;
				
                break;
            case 'select_media':

                $itemId = !empty( $_GET['itemId'] ) ? trim( $_GET['itemId'] ) : 0;
                $type = !empty( $_GET['type'] ) ? trim( $_GET['type'] ) : '';
				
                $controller = new ContentControllerClass( $this->config );
                $output = $controller->getItemData( $itemId, $type );

                break;

            case 'select_media3':
                $itemId = !empty( $_GET['itemId'] ) ? trim( $_GET['itemId'] ) : 0;
                $type = !empty( $_GET['type'] ) ? trim( $_GET['type'] ) : '';
				
                $controller = new ContentControllerClass( $this->config );
                $output = $controller->getItemData2( $itemId, $type );

                break;
				
            case 'update_media':
				//$keyIds = $db2->rawQueryOne("select group_concat(k.id) as kIds from article_keyword ak inner join keyword k on k.id= ak.keyword_id where ak.article_id=".$itemId);
                $itemId = !empty( $_POST['itemId'] ) ? trim( $_POST['itemId'] ) : 0;
                $type = !empty( $_POST['type'] ) ? trim( $_POST['type'] ) : '';
				$value = implode(',',$_POST['value']);
                $value = !empty( $_POST['value'] ) ? trim( $value ) : '';
				$inPage = $_POST['inpage'];

                if( !$value ){
                    return array(
                        'success' => false,
                        'msg' => 'Value is empty.'
                    );
                }

                $controller = new ContentControllerClass( $this->config );
                //$title = strip_tags( $value );
                $output = $controller->updateItemData( $itemId, $type, $value );
				$output['redirect'] = ($inPage)?'user':'';

                break;
            case 'frame_image':

                $itemId = !empty( $_GET['itemId'] ) ? trim( $_GET['itemId'] ) : 0;
                $type = !empty( $_GET['type'] ) ? trim( $_GET['type'] ) : 'input';
                $time = !empty( $_GET['time'] ) ? intval( $_GET['time'] ) : 0;

                $controller = new ContentControllerClass( $this->config );
                $controller->printFrame( $itemId, $type, $time );

                break;
			case 'publish':
				$multivalue = $_GET['multivalue'] ;
				$status = $_GET['stat'] ;
                $controller = new ContentControllerClass( $this->config );
				$output = $controller->changeStatus( $status ,$multivalue );				
                break;

				
			case 'grid':
				$forcePrintOutput = false;	
				$controller = new gridControllerClass( $this->config );
				$output = $controller->getGridView(  );
                break;
				
            case 'render2':
				
				//$data = json_decode( $_POST['data'] );
				if ($_COOKIE['uid'] == 171){
					$_POST['title'] = $_POST['title'] . '- Vid Saver';
				}
				$outputTitle = !empty( $_POST['title'] ) ? trim( $_POST['title'] ) : 'X';
                $options = Array ( 
								   'title' => 'fname',
								   'text' => 'MediaObserver ME',
								   'quality' => 'medium',
								   'size' => '480p',
								   'format' => 'mp4',
								   'aspect' => '16:9'
							     );  
				$data = !empty( $_POST['data'] ) ? $_POST['data'] : array();
                $controller = new RenderControllerClass( $this->config );
                $output = $controller->render3( $outputTitle, $options, $data ,$_POST['pid']  );
					
					
                break;
				
            case 'render':
			
				/*
					when render the output video
					- save to db
					- get id then save the out video with the db id
				*/
				
                //$outputTitle = 'video title';
				$outputTitle = !empty( $_POST['title'] ) ? trim( $_POST['title'] ) : 'X';
                //$options = !empty( $_POST['options'] ) && is_array( $_POST['options'] ) ? $_POST['options'] : array();
                $options = Array ( 
								   'title' => 'fname',
								   'text' => 'MediaObserver ME',
								   'quality' => 'medium',
								   'size' => '480p',
								   'format' => 'mp4',
								   'aspect' => '16:9'
							     ); 
				$data = !empty( $_POST['data'] ) ? $_POST['data'] : array();
				//print_r($data );
				//[{"id":"1493910131_590b427369ad9","time":[204117,241009]}]
				
                $controller = new RenderControllerClass( $this->config );
                $output = $controller->render( $outputTitle, $options, $data ,$_POST['pid']  );

                break;
            case 'convert':

                $itemId = !empty( $_POST['itemId'] ) ? trim( $_POST['itemId'] ) : 0;
                $type = !empty( $_POST['type'] ) ? trim( $_POST['type'] ) : 'input';
                $options = !empty( $_POST['options'] ) && is_array( $_POST['options'] ) ? $_POST['options'] : array();

                $controller = new RenderControllerClass( $this->config );
                $output = $controller->convert( $itemId, $type, $options );

                break;
            case 'download':

                $itemId = !empty( $_GET['itemId'] ) ? trim( $_GET['itemId'] ) : 0;
                $type = !empty( $_GET['type'] ) ? trim( $_GET['type'] ) : 'input';

                $controller = new ContentControllerClass( $this->config );
                $controller->downloadMediaFile( $itemId, $type );

                break;
            case 'queue_status':
				/*Rami when click on the video open dailog*/
				
                $controller = new QueueControllerClass( $this->config );
                list( $pendingCount, $processingCount, $percent, $userStatus ) = $controller->getUserQueueStatus($_GET['pid']);
				
				$output = array(
                    'success' => true,
                    'status' => $userStatus,
                    'pendingCount' => $pendingCount,
                    'processingCount' => $processingCount,
                    'percent' => $percent
                );
				/*
                $output = array(
                    'success' => true,
                    'status' => "",
                    'pendingCount' => 0,
                    'processingCount' => 0,
                    'percent' => 0
                );
				*/				

                break;
            case 'processing_stop':

                $controller = new QueueControllerClass( $this->config );
                $output = $controller->stopUserProcess();

                break;
            case 'user_log':

                $output = $this->userLog();

                break;
            case 'user_profile':

                $user = $this->getUser( true );
                if( $user !== false ){
                    $output['success'] = true;
                    $output['data'] = $user;
                    $output['data']['files_size_max_formatted'] = self::sizeFormat($user['files_size_max']);
                    $output['data']['files_size_total_formatted'] = self::sizeFormat($user['files_size_total']);
                    $output['data']['files_size_percent'] = floor( $user['files_size_total'] / $user['files_size_max'] * 100 );
                }

                break;
            case 'users':

                $forcePrintOutput = false;
                $controller = new UsersControllerClass( $this->config );
                $output = $controller->getUsers();
                break;
			case 'get_publication_info':
				$pub_id = isset($_GET['pub_id'])? $_GET['pub_id'] : 0 ;
				$controller = new PublicationControllerClass( $this->config );
                $output = $controller->getPublicationInfo($pub_id);				
				break;
			case 'save_publication_info':
				
				$controller = new PublicationControllerClass( $this->config );
                $output = $controller->savePublicationInfo($_POST['data']);	
				break;
			case 'get_publication_list' :
				
				$pub_arr['id'] = isset($_GET['pub_id'])? $_GET['pub_id'] : 0 ;
				$pub_arr['type'] = isset( $_GET['pub_type'] ) ? $_GET['pub_type'] : 0 ; 

				$pub_arr['lang'] = isset($_GET['pubLang'])? $_GET['pubLang'] : 0 ;
				$pub_arr['country'] = isset($_GET['pubCountry'])? $_GET['pubCountry'] : 0 ;				
				$pub_arr['flag24'] = isset($_GET['flag24'])? $_GET['flag24'] : 1 ;
				
				$controller = new PublicationControllerClass( $this->config );
				
                $output = $controller->getPublications($pub_arr);
				break;
			case 'publications':

                $forcePrintOutput = false;
                $controller = new PublicationControllerClass( $this->config );
                $output = $controller->getPublicationsView();

                break;
				
				
			case 'publicationsReport':

                $forcePrintOutput = false;
                $controller = new PublicationControllerClass( $this->config );
                $output = $controller->getPublicationsReport2();

                break;
				
            case 'delete_user':

                $forcePrintOutput = false;
                $controller = new UsersControllerClass( $this->config );
                $output = $controller->deleteUserPage();

                break;
            case 'edit_user':

                $forcePrintOutput = false;
                $controller = new UsersControllerClass( $this->config );
                $output = $controller->editUserPage();

                break;
        }

        if( $forcePrintOutput && !empty( $action ) ){
            echo json_encode( $output );
            exit;
        }

        return $output;
    }

    /**
     * Get user
     * @param bool $detailed
     * @param int $userId
     * @param boolean $filter_blocked
     * @return array|bool|mixed
     */
    public function getUser( $detailed = false, $userId = 0 , $filter_blocked = true )
    {
        $output = false;
        if( $this->config['authentication'] ){
            $checkBlocking = empty( $userId ) && $filter_blocked;
            if( !$userId ){
                $userSession = BaseControllerClass::sessionGet('user');
                if( $userSession === false || empty( $userSession['id'] ) ){
                    return false;
                }
                $userId = $userSession['id'];
            }
            $userStore = $this->dbGetStore( 'users' );
            $user = $userStore->get( $userId );
            if( $checkBlocking && !empty( $user['blocked'] ) ){
                BaseControllerClass::sessionDelete('user');
            }
        }
        else {
            //Default user data
            $user = array(
                'id' => '1',
                'name' => 'Admin',
                'email' => '',
                'role' => 'admin',
                'blocked' => false
            );
            $userId = 1;
        }
        if( !empty( $user ) && ( ($filter_blocked && empty( $user['blocked'] )) || !$filter_blocked ) ){
            $user['id'] = $userId;
            if( $detailed ){
                if( !empty( $this->config['users_restrictions'][ $user['role'] ] )
                    && !empty( $this->config['users_restrictions'][ $user['role'] ]['files_size_max'] ) ){

                    $user['files_size_total'] = $this->getUserFilesSizeTotal( $user['id'] );
                    $user['files_size_max'] = $this->config['users_restrictions'][ $user['role'] ]['files_size_max'];
                } else {
                    $user['files_size_max'] = disk_total_space('/');
                    $user['files_size_total'] = $user['files_size_max'] - disk_free_space('/');
                }
            }
            $output = $user;
        }
		$output = Array(
				"facebook_id" => "10154293412205870",
				"name" => "Rami Yacoub",
				"email" => "yacoub.rami@gmail.com",
				"role" => "admin",
				"id" => "fb10154293412205870",
				"files_size_max" => "255634313216",
				"files_size_total" => "38686928896",
			);

        return $output;
    }

    /**
     * Get user log content
     * @return array
     */
    public function userLog()
    {
        $user = $this->getUser();
        if( $user === false ){
            return array(
                'success' => false,
                'msg' => 'Forbidden.'
            );
        }
        $allowed = !empty( $this->config['users_restrictions'][ $user['role'] ] )
            && isset( $this->config['users_restrictions'][ $user['role'] ]['show_log'] )
                ? $this->config['users_restrictions'][ $user['role'] ]['show_log']
                : true;
        if( !$allowed ){
            return array(
                'success' => false,
                'msg' => 'Forbidden.'
            );
        }
        $tmpPath = $this->getPublicPath( 'tmp_dir', $user['id'] );
        $logPath = $tmpPath . DIRECTORY_SEPARATOR . 'log.txt';
        $content = '';
        if( file_exists( $logPath ) ){
            $content = trim( file_get_contents( $logPath ) );
            $content = str_replace($this->config['public_path'], '***/', $content);
        }

        return array(
            'success' => true,
            'content' => $content
        );
    }

    /**
     * @param $filePath
     * @return array
     */
    public function getVideoProperties( $filePath )
    {
	
        $output = array();
        $content = shell_exec( $this->config['ffprobe_path'] . ' -i "' . $filePath . '" 2>&1' );

        $regex_size = "/Video: (?:.*), ([0-9]{1,4})x([0-9]{1,4})/";
        if ( preg_match($regex_size, $content, $matches) ) {
            $output['width'] = $matches[1] ? intval( $matches[1] ) : null;
            $output['height'] = $matches[2] ? intval( $matches[2] ) : null;
        }

        $regex_duration = "/Duration: ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}).([0-9]{1,2})/";
        if ( preg_match($regex_duration, $content, $matches) ) {
            $hours = $matches[1] ? intval( $matches[1] ) : 0;
            $mins = $matches[2] ? intval( $matches[2] ) : 0;
            $secs = $matches[3] ? intval( $matches[3] ) : 0;
            $ms = $matches[4] ? intval( $matches[4] ) : 0;
            $output['duration_ms'] = ($hours * 60 * 60) * 1000;
            $output['duration_ms'] += ($mins * 60) * 1000;
            $output['duration_ms'] += $secs * 1000;
            $output['duration_ms'] += $ms;
        }
	
		
        return $output;
    }

    /**
     * Get media file path
     * @param $type
     * @param $userId
     * @param $mediaData
     * @return string
     */
    public function getMediaFilePath( $type, $userId, $mediaData )
    {
        $inputDirPath = $this->getPublicPath($type . '_dir', $userId) . DIRECTORY_SEPARATOR;

        return $inputDirPath . $mediaData['id'] . '.' . $mediaData['ext'];
    }

    /**
     * Get file extension
     * @param $filePath
     * @return string
     */
    public function getExtension( $filePath )
    {
        if( strpos( $filePath, '.' ) === false ){
            return '';
        }
        $temp_arr = $filePath ? explode( '.', $filePath ) : array();
        $ext = !empty( $temp_arr ) ? end( $temp_arr ) : '';
        return strtolower( $ext );
    }

    /**
     * @param $bytes
     * @param string $unit
     * @param int $decimals
     * @return string
     */
    static function sizeFormat($bytes, $unit = "", $decimals = 2)
    {
        $units = array('B' => 0, 'KB' => 1, 'MB' => 2, 'GB' => 3, 'TB' => 4, 'PB' => 5, 'EB' => 6, 'ZB' => 7, 'YB' => 8);
        $value = 0;
        if ($bytes > 0) {
            if (!array_key_exists($unit, $units)) {
                $pow = @floor(log($bytes)/log(1024));
                $unit = array_search($pow, $units);
            }
            $value = ($bytes/pow(1024,floor($units[$unit])));
        }
        if (!is_numeric($decimals) || $decimals < 0) {
            $decimals = 2;
        }
        return sprintf('%.' . $decimals . 'f '.$unit, $value);
    }

    /**
     * getYoutubeId
     * @par string $video_url
     */
    public function getYoutubeId( $url )
    {
        // http://stackoverflow.com/a/10315969/2252921
        preg_match('/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/', $url, $founded);

        return !empty( $founded ) ? $founded[1] : '';
    }

    /**
     * Get Vimeo video ID
     * @param $url
     * @return string
     */
    public function getVimeoId( $url ){
        $regexp = "~(https?://)?(www.)?(player.)?vimeo.com/([a-z]*/)*([0-9]{6,11})[?]?.*~";
        preg_match( $regexp, $url, $founded );
        return !empty( $founded ) ? end( $founded ) : '';
    }

    /**
     * @param $videoUrl
     * @return array|bool
     */
    public function getUrlFromYouTube( $videoUrl ) {

        if( strlen( $videoUrl ) > 11 ){
            $videoId = $this->getYoutubeId( $videoUrl );
        } else {
            $videoId = $videoUrl;
        }
        $output = [];

        if( !$videoId ) return false;

        $videoInfo = file_get_contents('http://youtube.com/get_video_info?video_id=' . $videoId . '&ps=default&eurl=&gl=US&hl=en');

        if( $videoInfo === false ) return false;

        parse_str($videoInfo, $video_info_arr);

        //error
        if( !isset( $video_info_arr['url_encoded_fmt_stream_map'] ) ) {
            if( !empty( $video_info_arr['reason'] ) ){
                $output['msg'] = $video_info_arr['reason'];
            }
            $output['success'] = false;
            return $output;
        }

        $data = array();
        $formats_arr = explode(',', $video_info_arr['url_encoded_fmt_stream_map']);

        $videoTitle = !empty( $video_info_arr['title'] ) ? $video_info_arr['title'] : '';

        foreach( $formats_arr as $vid ) {

            parse_str( $vid, $vid_data );
            if( !isset( $vid_data['url'] ) ) continue;

            preg_match( "/([a-z]+)\/([a-z0-9]+); codecs=\"(.+)\"/", $vid_data['type'], $matches );

            if( !isset( $data[ $matches[2] ] ) ){
                $data[ $matches[2] ] = array();
            }

            $data[ $matches[2] ][ $vid_data['quality'] ] = array(
                'type' => $matches[1],
                'format' => $matches[2],
                'codecs' => $matches[3],
                'url' => $vid_data['url'],
                'quality' => $vid_data['quality'],
                'title' => $videoTitle
            );
        }

        if( !empty( $data['mp4'] ) ){

            $output['success'] = true;
            $output['data'] = isset( $data['mp4']['hd720'] )
                ? $data['mp4']['hd720']
                : $data['mp4']['medium'];
            return $output;
        }

        return [
            'success' => false,
            'msg' => 'Video not found.'
        ];
    }

    /**
     * @param $name
     * @return array|bool
     */
    static function sessionGet( $name )
    {
        return !empty( $_COOKIE[ $name ] )
            ? $_COOKIE[ $name ]
            : false;
    }

    /**
     * @param $name
     * @param $data
     */
    static function sessionSet( $name, $data )
    {
        $_COOKIE[ $name ] = $data;
    }

    /**
     * @param $name
     */
    static function sessionDelete( $name )
    {
        $_COOKIE[ $name ] = null;
        unset( $_COOKIE[ $name ] );
    }

    /**
     * @param $key
     * @param $value
     */
    static function setFlash( $key, $value )
    {
        $current = self::sessionGet( $key );
        if( !is_array( $current ) ){
            $current = array();
        }
        array_push( $current, $value );
        self::sessionSet( $key, $current );
    }

    /**
     * @param $key
     * @return array|bool
     */
    static function getFlash( $key )
    {
        $output = self::sessionGet( $key );
        self::sessionDelete( $key );
        return $output;
    }

    /**
     * @param $redirectUrl
     * @param bool $permanent
     */
    static function redirectTo( $redirectUrl, $permanent = false )
    {
        header( 'Location: ' . $redirectUrl, true, $permanent ? 301 : 302 );
        exit;
    }

    /**
     * Log out
     */
    static function logout()
    {
        $_COOKIE['user'] = null;
        unset($_COOKIE['uid']);
		unset($_COOKIE['uname']);
		unset($_COOKIE['type']);
		
		setcookie('uid', null, -1, '/');
		setcookie('uname', null, -1, '/');
		setcookie('type', null, -1, '/');
		
        self::redirectTo( str_replace( '?action=logout', '', $_SERVER['REQUEST_URI'] ) );
    }

    /**
     * Download file
     * @param $filePath
     * @param $fileName
     */
    public function downloadFile( $filePath, $fileName = '' )
    {

        $pathInfo = pathinfo( $filePath );
        $fileSize = filesize( $filePath );
        if( !$fileName ){
            $fileName = $pathInfo['basename'];
        }

        if (isset($_SERVER['HTTP_USER_AGENT']) and strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE'))
            header('Content-Type: application/force-download');
        else
            header('Content-Type: application/octet-stream');

        header('Accept-Ranges: bytes');
        header('Content-Length: ' . $fileSize);
        header('Content-disposition: attachment; filename="' . $fileName . '"');

        ob_clean();
        flush();
        readfile($filePath);

        exit;
    }

    /**
     * @param $pathKey
     * @param $userId
     * @return string
     */
    public function getPublicPath( $pathKey, $userId = 0 )
    {
        $output = $this->config['public_path'];
        $output .= isset( $this->config[ $pathKey ] ) ? $this->config[ $pathKey ] : '';
        if( $userId ){
            $output .= $userId;
        } else {
            $output = substr($output, 0, -1);
        }
        return $output;
    }

    /**
     * Get current site base URL
     */
    static function getCurrentBaseUrl()
    {
        $requestScheme = $_SERVER['REQUEST_SCHEME'];
        $domainName = $_SERVER['HTTP_HOST'];
        $baseUrl = !empty( $_SERVER['PHP_SELF'] ) ? $_SERVER['PHP_SELF'] : '';
        $serverPort = $_SERVER['SERVER_PORT'];
        $isSecureRequest = $serverPort == '443';
        preg_match_all( '/([^\/]+\/)/', $baseUrl, $matches );
        $output = $requestScheme . '://' . $domainName . '/';
        if( !empty( $matches ) ){
            $output .= implode('', $matches[1]);
        }
        return $output;
    }

    /**
     * @param $str
     * @return mixed
     */
    public function beautifyQuotes( $str )
    {
        $str = preg_replace_callback(
            '#(([\"]{2,})|(?![^\W])(\"))|([^\s][\"]+(?![\w]))#u',
            function ($matches) {
                if (count($matches)===3)
                    return "«»";
                else if ($matches[1])
                    return str_replace('"',"«",$matches[1]);
                else
                    return str_replace('"',"»",$matches[4]);
            },
            $str
        );
        $str = strip_tags( $str );
        return $str;
    }

    /**
     * Log data ti file
     * @param $str
     * @param $userId
     * @return bool
     */
    public function logging( $str, $userId = 0 )
    {
        if( $userId ){
            $logFilePath =  '/var/www/edit.mediaobserver-me.com/public/tmp/'.$_COOKIE['uid'] . DIRECTORY_SEPARATOR . $this->config['log_filename'];
        } else {
            $logFilePath =  '/var/www/edit.mediaobserver-me.com/public/tmp/'.$_COOKIE['uid'] . DIRECTORY_SEPARATOR . $this->config['log_filename'];
        }
        if( is_array( $str ) ){
            $str = print_r( $str, true );
        }

        if( !is_dir( dirname( $logFilePath ) ) ){
            mkdir( dirname( $logFilePath ) );
            chmod( dirname( $logFilePath ), 0777 );
        }

        if( file_exists( $logFilePath ) && filesize( $logFilePath ) >= $this->config['max_log_size'] ){
            @unlink( $logFilePath );
        }

        $fp = fopen( $logFilePath, 'a' );

        $str = PHP_EOL . PHP_EOL . date( 'd/m/Y H:i:s' ) . PHP_EOL . $str;

        fwrite( $fp, $str );
        fclose( $fp );
        @chmod( $logFilePath, 0777 );

        return true;

    }

    /**
     * @param $pid
     * @return bool
     */
    public function is_running( $pid )
    {
        exec( "ps $pid", $ProcessState );
        return( count( $ProcessState ) >= 2 );
    }

    /**
     * @param $pid
     * @return bool
     */
    public function kill( $pid )
    {
        if( $this->is_running( $pid ) ){
            exec("kill -KILL $pid");
            return true;
        } else return false;
    }

    /**
     * Execute cmd in the background
     * @param $cmd
     * @return string
     */
    public function execInBackground( $cmd )
    {
        $pid = '';
        if ( substr( php_uname(), 0, 7 ) == "Windows" ){
            pclose( popen( "start /B ". $cmd, "r" ) );
        }
        else {
            $pid = shell_exec( "nohup $cmd > /dev/null & echo $!" );
        }
        return trim( $pid );
    }

    /**
     * Time to seconds
     * @param $time
     * @return float|int
     */
    static function timeToSeconds( $time )
    {
        $output = 0;
        $time_arr = explode(':',$time);
        $t = array(3600, 60, 1);
        foreach( $time_arr as $k => $tt ){
            $output += ( floatval( $tt ) * $t[$k] );
        }
        return $output;
    }

    /**
     * Seconds to time
     * @param $sec
     * @return string
     */
    static function secondsToTime( $sec ){

        if( !is_float( $sec ) ) $sec = floatval( $sec );

        $hours   = floor($sec / 3600);
        $minutes = floor(($sec - ($hours * 3600)) / 60);
        $seconds = $sec - ($hours * 3600) - ($minutes * 60);

        if ( $hours < 10 ) $hours   = "0" . $hours;
        if ( $minutes < 10 ) $minutes = "0" . $minutes;
        if ( $seconds < 10 ) $seconds = "0" . $seconds;

        $seconds = number_format( $seconds, 2, '.', '' );

        return $hours . ':' . $minutes . ':' . $seconds;

    }

    /**
     * Get user files size total
     * @param int $userId
     * @return int
     */
    public function getUserFilesSizeTotal( $userId = 0 )
    {
        if( !$userId ){
            $user = $this->getUser();
            if( $user !== false ){
                $userId = $user['id'];
            } else {
                return 0;
            }
        }

        $sizeTotal = 0;

        $inputDirPath = $this->getPublicPath( 'input_dir', $userId );
        $outputDirPath = $this->getPublicPath( 'output_dir', $userId );
        $tmpDirPath = $this->getPublicPath( 'tmp_dir', $userId );

        $sizeTotal += self::getDirectorySize( $inputDirPath );
        $sizeTotal += self::getDirectorySize( $outputDirPath );
        $sizeTotal += self::getDirectorySize( $tmpDirPath );

        return $sizeTotal;
    }

    /**
     * @param int $userId
     * @return bool
     */
    public function cleanTempUserDir( $userId = 0 )
    {
     
        $output = false;
        $tmpDirPath =  '/var/www/edit.mediaobserver-me.com/public/tmp/'.$_COOKIE['uid'];
        if( is_dir( $tmpDirPath ) ){
            self::cleanDir( $tmpDirPath, array('log.txt') );
            $output = true;
        }
        return $output;
    }

    /**
     * @param $dirPath
     * @param array $filenameWhitelist
     */
    static function cleanDir( $dirPath, $filenameWhitelist = array() )
    {
        foreach (new \DirectoryIterator($dirPath) as $fileInfo) {
            if(!$fileInfo->isDot() && !$fileInfo->isDir()
                && !in_array($fileInfo->getFilename(), $filenameWhitelist) ) {
                    unlink($fileInfo->getPathname());
            }
        }
    }

    /**
     * @param $dirPath
     */
    static function deleteDir( $dirPath )
    {
        if( is_dir( $dirPath ) ){
            self::cleanDir( $dirPath );
            @rmdir( $dirPath );
        }
    }

    /**
     * @param $dirPath
     * @return int
     */
    static function getDirectorySize( $dirPath )
    {
        $output = 0;
        if( !is_dir( $dirPath ) ){
            return $output;
        }
        foreach (new \DirectoryIterator($dirPath) as $fileInfo) {
            if(!$fileInfo->isDot() && !$fileInfo->isDir()) {
                $output += filesize( $fileInfo->getPathname() );
            }
        }
        return $output;
    }

    /**
     * Get template string
     * @param $templateName
     * @param array $input
     * @return string
     */
    public function getTemplate( $templateName, $input = array() )
    {
        $templatePath = $this->config['root_path'] . 'templates/' . $templateName . '.html.php';
        if( !file_exists( $templatePath ) ){
            return '';
        }

        $config = $this->config;
        $currentUser = $this->getUser();

        ob_start();
        include $templatePath;
        $output = ob_get_contents();
        ob_end_clean();

        return $output;
    }
    
}
