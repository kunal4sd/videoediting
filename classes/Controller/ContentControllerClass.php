<?php

namespace App\Controller;

/**
 * ContentControllerClass
 *
 * @author Andchir <andycoderw@gmail.com>
 */
class ContentControllerClass extends BaseControllerClass
{

    /**
     * ContentControllerClass constructor.
     * @param array $config
     */
    public function __construct($config = array())
    {

        parent::__construct( $config );

    }

    /**
     * Import media
     * @return array
     */
	 public function updateVInfo($vid, $vtitle, $vtext, $vkeywords){
		GLOBAL $db2;
		$db2->where('article_id', $vid);
		$db2->delete('article_keyword');
		if(sizeof($vkeywords) > 0 ){
			foreach($vkeywords as $kw){
				$da[] = array(
					"article_id" => $vid,
					"keyword_id" => $kw,
					"created" => $db2->now(),
				);
			}
			$ids = $db2->insertMulti('article_keyword', $da);
		}
		
		$iarr = array("headline"=>$vtitle, "text"=>$vtext );
		$db2->where('id',$vid);
		$db2->update('article',$iarr);
		
		return array(
			'success' => true,
		);		
		
	 }
	 
	 
	 public function getVideoInfo($vid){
		 GLOBAL $db2;
		 $db2->where('id',$vid);
		 return $db2->getOne('article');
	 }

	 public function getVideoKeywords($vid){
		 GLOBAL $db2;
		 GLOBAL $db;
		 $query = 'select GROUP_CONCAT(k.id) as keyIds from 
					article_keyword ak 
					inner join keyword k on k.id = ak.keyword_id
					where ak.article_id = '.$vid;
		 $arr['ids'] =  $db2->rawQueryOne($query);
		
		 if( $arr['ids']['keyIds'] ){
			$query = 'select concat(name_en,\'::\',name_ar) as key_name, id from keyword k 	where k.id in( '.$arr['ids']['keyIds'].' )';
			$arr['words'] =  $db->rawQuery($query);
		 }
		 return $arr;

	 }

	 
	public function importMedia()
    {
		
        @ini_set('memory_limit', '-1');
        $output = array();

        $inputUrl = !empty( $_POST['input_url'] ) ? trim( $_POST['input_url'] ) : '';
        $inputFile = !empty( $_FILES['input_file'] ) ? $_FILES['input_file'] : '';

        $user = $this->getUser( true );
        if( $user === false ){
            return array(
                'success' => false,
                'msg' => 'Forbidden.'
            );
        }

        $data = array();
        $uploadPath = $this->getPublicPath('input_dir', $user['id']);
        $fileName = time() . '_' . uniqid();
        $freeSpace = $user['files_size_max'] - $user['files_size_total'];

        if( !is_dir( $uploadPath ) ){
            mkdir( $uploadPath );
            chmod( $uploadPath, 0777 );
        }

        //Upload file
        if( !empty( $inputFile ) && $inputFile['error'] == UPLOAD_ERR_OK ){

            $tmp_name = $inputFile['tmp_name'];
            $name = $inputFile["name"];
            $ext = $this->getExtension( $name );
            $fileSize = filesize( $tmp_name );

            if( !in_array( $ext, $this->config['upload_allowed'] ) ){
                return array(
                    'success' => false,
                    'msg' => 'File type is not allowed.'
                );
            }
            //Check file size
            if( $fileSize > $freeSpace ){
                return array(
                    'success' => false,
                    'msg' => 'The file size exceeds the allowed limit.'
                );
            }

            $fileNameFull = $fileName . '.' . $ext;
            $uploadPath .= DIRECTORY_SEPARATOR . $fileNameFull;

            move_uploaded_file( $tmp_name, $uploadPath );
            chmod( $uploadPath, 0777 );

            $videoProperties = $this->getVideoProperties( $uploadPath );

            $data = array(
                'id' => $fileName,
                'title' => strip_tags( str_replace( '.' . $ext , '', $name ) ),
                'ext' => $ext,
                'file_size' => filesize( $uploadPath ),
                'time_stump' => time()
            );

            $data = array_merge( $data, $videoProperties );
        }

        //Import from YouTube
        else if( !empty( $inputUrl ) ){

            $result = $this->getUrlFromYouTube( $inputUrl );

            if( $result === false ){
                return array(
                    'success' => false,
                    'msg' => 'File type is not allowed.'
                );
            }
            else if( is_array( $result ) && !$result['success'] ){
                return $result;
            }

            $fileNameFull = $fileName . '.mp4';
            $uploadPath .= DIRECTORY_SEPARATOR . $fileNameFull;

            $uploaded = file_put_contents( $uploadPath, file_get_contents( $result['data']['url'] ) );

            if( $uploaded && file_exists( $uploadPath ) ){

                chmod( $uploadPath, 0777 );

                //Check file size
                $fileSize = filesize( $uploadPath );
                if( $fileSize > $freeSpace ){
                    @unlink( $uploadPath );
                    return array(
                        'success' => false,
                        'msg' => 'The file size exceeds the allowed limit.'
                    );
                }

                $videoProperties = $this->getVideoProperties( $uploadPath );

                $data = array(
                    'id' => $fileName,
                    'title' => strip_tags( $result['data']['title'] ),
                    'ext' => 'mp4',
                    'file_size' => filesize( $uploadPath ),
                    'time_stump' => time()
                );

                $data = array_merge( $data, $videoProperties );
            }
            else {
                return array(
                    'success' => false,
                    'msg' => 'Error while downloading video.'
                );
            }
        }

        //Save to DB
        if( !empty( $data ) ){

            $fileStore = $this->dbGetStore( 'video_input', $user['id'] );
            $fileStore->set( $fileName, $data );

            $output = array('success' => true);
        }

        return $output;
    }

	
	public function changeStatus($status , $items){
		GLOBAL $db2;
		GLOBAL $db;
		
		$items = substr($items,0, -1);


		switch( $status ){
			case 'new':
				$class ='success';
				break;
			case 'pending':
				$class ='warning';
				break;
			case 'approve':
				$class ='info';
				break;
			case 'live':
				$class ='default';
				break;						
		}
		
		if($status == 'live') {
			$query = 'SELECT * from article where id in ('. $items .')' ;
			$articles = $db2->rawQuery($query);
			$uploadPath			=  '/var/www/edit.mediaobserver-me.com/public/userfiles/output/testOutput/';//$tmp['file_path'];
			$livePath			=  '/var/www/edit.mediaobserver-me.com/public/userfiles/output/liveVideos/';//$tmp['file_path'];
			
			$co = 0;
			foreach($articles  as $article){
				
				if(is_null($article['publish_id'])){
					
					
					$db2->where('id',$article['publication_id']);
					$pub_info = $db2->getOne('publication');	
		
					$co++;
					$ori_id = $article['id'];
					
					/*check if issue is set copy ID else add new issue */
					$db->where('date',$article['issue_date'] );
					$db->where('publication_id',$article['publication_id'] );
					$issue_info = $db->get("issue");

					$dataz = Array ("user_id" => $_COOKIE['uid'],
					   "publication_id" => $article['publication_id'],
					   "article_id" => $article['id'],
					   "issue_date" => $article['issue_date'],
					   "activity_id" => 1,
					   "created" => $db2->now(),
					   
					);

					$xid = $db2->insert ('user_activity', $dataz);

					
					if ( !isset($issue_info[0]['id']) ){
						$arrdata = array(
											'date'=>$article['issue_date'],
											'publication_id'=>$article['publication_id'],
											'status'=>0,
											'pages_number'=>0,
											'issue_number'=>0,
											'volume_number'=>0
											
										);
						$db->insert('issue', $arrdata);
					}
					
			

					unset($article['publish_id']);
					unset($article['id']);
					unset($article['status']);
					unset($article['file_path']);					
					

					
					$article['size'] = '0.00';
					$article['section_id'] = 10;
					$article['page_name']  = ' ';
					$article['ave']  = $pub_info['adrate'] * $article['duration'] ;
					$article['created']= $db->now();
					
					$id = $db2->insert ('article1', $article);	
					
					$article['headline_modified']= $db->now();
					$id = $db->insert ('article', $article);
					
					$remote_file['path'] = $article['issue_date'].'/'.$id.'-1.mp4';
					$remote_file['status'] = 0;
					$remote_file['type'] = 0;
					$remote_file['created'] = $db->now();
					$db2->insert( 'remote_file', $remote_file);
					$db->insert( 'remote_file', $remote_file);
					
					/*Copy keywords*/
					$db2->where('article_id',$ori_id);
					$keywords = $db2->get('article_keyword');

					$kdata = array();
					foreach($keywords as $keyword){
						$kdata[] = Array (
							"article_id" => $id,
							"keyword_id" => $keyword['keyword_id'],
							"coordinates" => $keyword['coordinates'],
							"created" => $keyword['created']
						);
					}
					
					
					$ids = $db->insertMulti('article_keyword', $kdata);
					
					
					$livePath2 = $livePath.$article['issue_date'];
					if (!file_exists($livePath2 )) {
						mkdir($livePath2, 0777, true);
					}
					
					copy($uploadPath.$ori_id.'.mp4', $livePath2.'/'.$id.'-1.mp4');
					$db2->where ('id', $ori_id);
					$data = Array (
						'publish_id' => $id,
						'status'=>'live',
						);
						
					$db2->update ('article', $data);
					
				}	
			}
			
			/*save log in media database user activity db*/
			$dataz2 = Array ("user_id" => $_COOKIE['uid'],
			   "publication_id" => $article['publication_id'],
			   "article_id" => $id,
			   "issue_date" => $article['issue_date'],
			   "activity_id" => 23,
			   "created" => $db->now(),
			   
			);

			$db->insert ('user_activity', $dataz2);			
			
			$db2->where('article_id',$ori_id);
			$db2->where('activity_id',2);
			$activity_info = $db2->getOne('user_activity');
			
			$dataz3 = Array ("user_id" => $activity_info['user_id'],
			   "publication_id" => $activity_info['publication_id'],
			   "article_id" => $id,
			   "issue_date" => $activity_info['issue_date'],
			   "activity_id" => 25,
			   "created" =>$activity_info['created'],
			   
			);

			$db->insert ('user_activity', $dataz3);				
			/*End Of*/
			
			return array(
				'success' => true,
				'items'=>$items,
				'sta'=>$status,
				'clas'=>$class,
				'livecount'=>$co
			);	

			
			
		} else { // if pending
			$tmp_arr = explode( ',',$items);
			$db2->where('id', $tmp_arr  , 'IN');
			$data = Array ('status'=>$status);
			$db2->update('article', $data);			
		}

		return array(
            'success' => true,
			'items'=>$items,
			'sta'=>$status,
			'clas'=>$class
        );
	}
	public function get_file_info ($path, $fileId22 = false ){
		/*Rami I create this function */
		//global $controller;

		$data = array();
		$cancel_files = array ('.','..');
		$fileContent = '';
		
		if ( $fileId22 == $_COOKIE['uid'] ){// if get the list
		
			$vides = scandir($path );
			if( sizeof($vides) == 0 ){
				return array();
			}
			foreach($vides as $tmp){
				
				if( in_array($tmp, $cancel_files) ){
					continue;
				}
				
				$fileName			= $tmp;
				$uploadPath			= $path.'/'.$tmp;
				//$videoProperties	= $this->getVideoProperties($uploadPath);

				$videoProperties['duration_ms'] = 1000*60;
				$videoProperties['width'] = 854;
				$videoProperties['height'] = 480 ;				
				
				$ext				= $this->getExtension( $fileName );
				/*
				if($ext != 'mp4'){
					continue;
				}
				*/
				$fileId 			= strip_tags( str_replace( '.' . $ext , '', $fileName ) );

				$vurl = str_replace( array('/storage/recordings/','/var/www/edit.mediaobserver-me.com/public/'),array('videos/',''),$path);
				$datatmp = array(
					'id' => $fileId ,
					'title' => $fileId,
					'ext' => $ext,
					'path' => $path,
					'vurl'=> $vurl,
					'file_size' => filesize( $uploadPath ),
					'time_stump' => time()
				);
				$data[$fileId] = array_merge( $datatmp, $videoProperties );			
				//$jsn = json_encode($data);
				//$fileContent .= $data['id']."=$jsn \n" ;

			}

		} else { // if get one video 
			$fileId =  $fileId22.'.mp4';	
			$fileName			= $fileId;
			$uploadPath			= $path.'/'.$fileId;
			$videoProperties	= $this->getVideoProperties($uploadPath);
			$ext				= $this->getExtension( $fileName );
			$fileId 			= strip_tags( str_replace( '.' . $ext , '', $fileName ) );
			
			
			$vurl = str_replace( array('/storage/recordings/','/var/www/edit.mediaobserver-me.com/public/'),array('videos/',''),$path);
			$datatmp = array(
				'id' => $fileId ,
				'title' => $fileId,
				'ext' => $ext,
				'path' => $path,
				'vurl'=> $vurl,
				'file_size' => @filesize( $uploadPath ),
				'time_stump' => time()
			);
			$data[$fileId] = array_merge( $datatmp, $videoProperties );				
		}
	
		return $data;
	}
	
	public function get_file_info2 ($path, $fileId22 = false ){
		/*Rami I create this function */
		//global $controller;

		$data = array();
		$cancel_files = array ('.','..');
		$fileContent = '';
		
		if ( $fileId22 == $_COOKIE['uid'] ){// if get the list
		
			$vides = scandir($path );
			if( sizeof($vides) == 0 ){
				return array();
			}
			foreach($vides as $tmp){
				
				if( in_array($tmp, $cancel_files) ){
					continue;
				}
				
				$fileName			= $tmp;
				$uploadPath			= $path.'/'.$tmp;
				//$videoProperties	= $this->getVideoProperties($uploadPath);

				$videoProperties['duration_ms'] = 1000*60;
				$videoProperties['width'] = 854;
				$videoProperties['height'] = 480 ;				
				
				$ext				= $this->getExtension( $fileName );
				/*
				if($ext != 'mp4'){
					continue;
				}
				*/
				$fileId 			= strip_tags( str_replace( '.' . $ext , '', $fileName ) );

				$vurl = str_replace( array('/storage/recordings/','/var/www/edit.mediaobserver-me.com/public/'),array('videos/',''),$path);
				$datatmp = array(
					'id' => $fileId ,
					'title' => $fileId,
					'ext' => $ext,
					'path' => $path,
					'vurl'=> $vurl,
					'file_size' => filesize( $uploadPath ),
					'time_stump' => time()
				);
				$data[$fileId] = array_merge( $datatmp, $videoProperties );			
				//$jsn = json_encode($data);
				//$fileContent .= $data['id']."=$jsn \n" ;

			}

		} else { // if get one video 
			$fileId =  $fileId22.'.mp4';	
			$fileName			= $fileId;
			$uploadPath			= $path.'/'.$fileId;
			$videoProperties	= $this->getVideoProperties($uploadPath);
			$ext				= $this->getExtension( $fileName );
			$fileId 			= strip_tags( str_replace( '.' . $ext , '', $fileName ) );
			
			
			$vurl = str_replace( array('/storage/recordings/','/var/www/edit.mediaobserver-me.com/public/'),array('videos/',''),$path);
			$datatmp = array(
				'id' => $fileId ,
				'title' => $fileId,
				'ext' => $ext,
				'path' => $path,
				'vurl'=> $vurl,
				'file_size' => @filesize( $uploadPath ),
				'time_stump' => time()
			);
			$data[$fileId] = array_merge( $datatmp, $videoProperties );				
		}
	
		return $data;
	}	

    /**
     * @param $type
     * @param $userId
     * @return array
     */
	public function getOutputMediaList( $type, $fileId = 0 ){
		
		GLOBAL $db2;
		GLOBAL $getData;
		
		if($fileId){ 
			$details = $db2->rawQueryOne('select * from article where id = '.$fileId ); 
			$getData = array('publication_id'=>$details['publication_id'], 'from_time'=> $details['issue_date']);
		}else{
			if( !isset($getData['publication_id'])){
				return array();
			}
		}
		
		$where = ( $getData['publication_id'] ) ? ' where  publication_id = '.$getData['publication_id'].' and issue_date=\''.$getData['from_time'].'\''  : ' ';

		$articles = $db2->rawQuery('select * from article '.$where.' order by id desc '); 

		if( sizeof($articles)>0 ){
			foreach($articles as $tmp){
				
				$fileName			=  $tmp['id'].'.mp4' ;//;basename( $tmp['file_path'] );
				$uploadPath			=  '/var/www/edit.mediaobserver-me.com/public/userfiles/output/testOutput/'.$fileName;//$tmp['file_path'];
				$path_parts 		= pathinfo($uploadPath);
				$videoProperties	= $this->getVideoProperties($uploadPath);
				$ext				= $this->getExtension( $fileName );
				$fileId 			= strip_tags( str_replace( '.' . $ext , '', $fileName ) );
				$vurl = str_replace( array('/storage/recordings/','/var/www/edit.mediaobserver-me.com/public/'),array('videos/',''), $path_parts['dirname']);

				$q = "select GROUP_CONCAT( k.name_en SEPARATOR  ' , ' ) as keywords from article_keyword ak inner join keyword k on k.id = ak.keyword_id where ak.article_id = ".$tmp['id'];
				$ktemp =  $db2->rawQueryOne($q);
				switch( $tmp['status'] ){
					case 'new':
						$status ='success';
						break;
					case 'pending':
						$status ='warning';
						break;
					case 'approve':
						$status ='info';
						break;
					case 'live':
						$status ='default';
						break;						
				}				
				$datatmp = array(
					'id' => $fileId ,
					'title' => $tmp['headline'].' ('.$fileId.')',
					'ext' => $ext,
					'path' => $path_parts['dirname'],
					'vurl'=> $vurl,
					'labelColor' => $status,
					'labelText' => $tmp['status'],					
					'file_size' => @filesize( $uploadPath ),
					'time_stump' => strtotime($tmp['issue_date'].' '.$tmp['broadcast_time']),
					'iDatetime' => $tmp['issue_date'].' '.$tmp['broadcast_time'],
					'cDatetime' => $tmp['created'],
					'channel' => $tmp['publication_id'],					
					'keywords' => ( $ktemp['keywords'] ) ? $ktemp['keywords'] : 'No Keywords' ,
				);
				

				
				$data[$fileId] = array_merge( $datatmp, $videoProperties );			
			}
			return $data;
		} else {
			return '';
		}
	}
	
	public function getOutputSearchList( $options ){

		GLOBAL $db2;
		GLOBAL $db;
	
	
		$channels = ($options['channels']) ?  implode($options['channels'],',') : '';
	

		$where = ' where  1  ';// and issue_date=\''.$getData['from_time'].'\''  : ' ';
		if ($channels){
			$where .= ' and publication_id in ('.$channels.')';
		}
		if( $options['fdate'] ){
			$where .='and issue_date >=\''.$options['fdate'].'\'';
			if(@$options['tdate']){
				$where .=' and issue_date <=\''.$options['tdate'].'\'';				
			}	
		}
		if($options['sta']){
			$where .=' and status =\''.$options['sta'].'\'';				
		}
		
		
		if ($_COOKIE['uid'] != 171){
			$where .=' and created_by !=171 ';				
		} 
		
		$query = 'select * from article '.$where.' order by id desc ';
	
		$articles = $db2->rawQuery($query); 

		//echo date('h:i:s');
		
		if( sizeof($articles)>0 ){
			foreach($articles as $tmp){
				
				$fileName			=  $tmp['id'].'.mp4' ;//;basename( $tmp['file_path'] );
				$uploadPath			=  '/var/www/edit.mediaobserver-me.com/public/userfiles/output/testOutput/'.$fileName;//$tmp['file_path'];
				
				$path_parts 		= pathinfo($uploadPath);
				
				//$videoProperties	= $this->getVideoProperties($uploadPath);
				$videoProperties= array();
				$db2->where('id',(int)$tmp['publication_id']);
				$channel = $db2->getOne('publication');
				
				$ext				= $this->getExtension( $fileName );
				$fileId 			= strip_tags( str_replace( '.' . $ext , '', $fileName ) );
				$vurl = str_replace( array('/storage/recordings/','/var/www/edit.mediaobserver-me.com/public/'),array('videos/',''), $path_parts['dirname']);

				$q = "select GROUP_CONCAT( k.name_en SEPARATOR  ' , ' ) as keywords from article_keyword ak inner join keyword k on k.id = ak.keyword_id where ak.article_id = ".$tmp['id'];
				$ktemp =  $db2->rawQueryOne($q);
				

				
				switch( $tmp['status'] ){
					case 'new':
						$status ='success';
						break;
					case 'pending':
						$status ='warning';
						break;
					case 'approve':
						$status ='info';
						break;
					case 'live':
						$status ='default';
						break;						
				}
				$datatmp = array(
					'id' => $fileId ,
					'title' => $tmp['headline'].' ('.$fileId.')',
					'ext' => $ext,
					'labelColor' => $status,
					'labelText' => $tmp['status'],
					'path' => $path_parts['dirname'],
					'vurl'=> $vurl,
					'file_size' => @filesize( $uploadPath ),
					'time_stump' => strtotime($tmp['issue_date'].' '.$tmp['broadcast_time']),
					'iDatetime' => $tmp['issue_date'].' '.$tmp['broadcast_time'],
					'cDatetime' => $tmp['created'],
					'channel' => $channel['name_en'],					
					'keywords' => ( $ktemp['keywords'] ) ? $ktemp['keywords'] : 'No Keywords' ,
				);

				$data[$fileId] = array_merge( $datatmp, $videoProperties );
			
				unset($data[$fileId]['duration_ms']);				
			}
			//echo '<br />'.date('h:i:s');
			return $data;
		} else {
			return '';
		}
	}
	
    public function getSearchList( $options )
    {
		GLOBAL $db2;
		
		
		$data = array();
		$path = '/var/www/edit.mediaobserver-me.com/public/userfiles/output/testOutput';
		$data = $this->getOutputSearchList($options);
		
	
		if(is_array($data) ){
			foreach ( $data as &$item ){
				$item['datetime'] = @date( 'm.d.Y H:i:s', $item['time_stump'] );
				$item['file_size'] = self::sizeFormat( $item['file_size'] );
				if( !isset($item['duration_ms']) ){
					$item['duration_ms'] = 600004;
					//$item['title'] = '[Inprocess]';//$item['title'];	
					$item['title'] = '**'.$item['title'];	
					$item['width']=854;
					$item['height']=480;
					 
				} 
				
				$item['duration_time'] = self::secondsToTime( $item['duration_ms'] / 1000 );
				$item['url'] = $item['vurl'] . DIRECTORY_SEPARATOR . $item['id'] . '.' . $item['ext'];
			}
		}
		
        return array(
            'success' => true,
            'data' => !empty( $data ) ? array_values( $data ) : array()
        );	
		
    }

	public function getOutputMediaList2( $type, $fileId = 0 ){
		
		GLOBAL $db2;
		GLOBAL $getData;
		
	
		if($fileId){ 
			
			$articles = $db2->rawQuery('select * from article where id = '.$fileId ); 
			$getData = array('publication_id'=>$articles[0]['publication_id'], 'from_time'=> $articles[0]['issue_date']);
		}else{
			if( !isset($getData['publication_id'])){
				return array();
			}
		

			if (!$getData['publication_id'] || !$getData['from_time'] || !$getData['to_time'] ){
				return false;
			}
			$where = ' where  publication_id = '.$getData['publication_id']  ;
			$where .= ' and  issue_date >= DATE_FORMAT("'.$getData['from_time'].'",\'%Y-%m-%d\') ';
			$where .= ' and  issue_date <=  DATE_FORMAT("'.$getData['to_time'].'",\'%Y-%m-%d\')' ;
			
			if( $_COOKIE['uid'] != 171){
				$where .= ' and created_by !=171 ' ;
			} else {
				$where .= ' and created_by =171 ' ;
			}
			$sqlQuery= 'select * from article '.$where.' order by id desc ';
			
			$articles = $db2->rawQuery($sqlQuery); 
		}
		
		if( sizeof($articles)>0 ){
			foreach($articles as $tmp){
				
				$fileName			=  $tmp['id'].'.mp4' ;//;basename( $tmp['file_path'] );
				$uploadPath			=   '/var/www/edit.mediaobserver-me.com/public/userfiles/output/testOutput/'.$fileName;//$tmp['file_path'];
				$path_parts 		= pathinfo($uploadPath);
				$videoProperties	= $this->getVideoProperties($uploadPath);
				$ext				= $this->getExtension( $fileName );
				$fileId 			= strip_tags( str_replace( '.' . $ext , '', $fileName ) );
				$vurl = str_replace( array('/storage/recordings/','/var/www/edit.mediaobserver-me.com/public/'),array('videos/',''), $path_parts['dirname']);

				$q = "select GROUP_CONCAT( k.name_en SEPARATOR  ' , ' ) as keywords from article_keyword ak inner join keyword k on k.id = ak.keyword_id where ak.article_id = ".$tmp['id'];
				$ktemp =  $db2->rawQueryOne($q);
				switch( $tmp['status'] ){
					case 'new':
						$status ='success';
						break;
					case 'pending':
						$status ='warning';
						break;
					case 'approve':
						$status ='info';
						break;
					case 'live':
						$status ='default';
						break;						
				}				
				$datatmp = array(
					'id' => $fileId ,
					'title' => $tmp['headline'].' ('.$fileId.')',
					'ext' => $ext,
					'path' => $path_parts['dirname'],
					'vurl'=> $vurl,
					'labelColor' => $status,
					'labelText' => $tmp['status'],					
					'file_size' => @filesize( $uploadPath ),
					'time_stump' => strtotime($tmp['issue_date'].' '.$tmp['broadcast_time']),
					'iDatetime' => $tmp['issue_date'].' '.$tmp['broadcast_time'],
					'cDatetime' => $tmp['created'],
					'channel' => $tmp['publication_id'],					
					'keywords' => ( $ktemp['keywords'] ) ? $ktemp['keywords'] : 'No Keywords' ,
				);
				

				
				$data[$fileId] = array_merge( $datatmp, $videoProperties );			
			}
			return $data;
		} else {
			return '';
		}
	}
	
    public function getMediaList4( $type, $fileId = 0 )
    {
	
		/*Rami 
		this function to write the input (left menu video list) or 
								   output (footer menu video list)
		Must change to read from db
		*/
		
		GLOBAL $db2;
		GLOBAL $getData;
		 
		$data = array();

	
		$path = '/var/www/edit.mediaobserver-me.com/public/userfiles/output/testOutput';
		$data = $this->getOutputMediaList2($path, $fileId);
		
		//$data = array_merge($data, $this->get_file_info2($path, $fileId) ) ;
			
		/*
		[1493910131_590b427369ad9] => Array
        (
            [id] => 1493910131_590b427369ad9
            [title] => Amazing Things only seen In Dubai
            [ext] => mp4
            [file_size] => 39.26 MB
            [time_stump] => 1493910131
            [width] => 1280
			[keywords]=> string
            [height] => 720
            [duration_ms] => 241009
            [datetime] => 05.04.2017 17:02:11
            [duration_time] => 00:04:1.01
            [url] => /video/public/userfiles/input/fb10154293412205870\1493910131_590b427369ad9.mp4
        )		
		*/

		if(is_array($data) ){
			foreach ( $data as &$item ){
				$item['datetime'] = @date( 'm.d.Y H:i:s', $item['time_stump'] );
				$item['file_size'] = self::sizeFormat( $item['file_size'] );
				if( !isset($item['duration_ms']) ){
					$item['duration_ms'] = 600004;

					if ($_COOKIE['uid'] == 171){
						$item['title'] = $item['title'];	
					} else {
						$item['title'] = '[Inprocess]';//$item['title'];	
					}
					
					
					$item['width']=854;
					$item['height']=480;
					 
				} 
				$item['duration_time'] = self::secondsToTime( $item['duration_ms'] / 1000 );
				$item['url'] = $item['vurl'] . DIRECTORY_SEPARATOR . $item['id'] . '.' . $item['ext'];
			}
		}
		
		if($fileId){
			return $data;
		}
		
        return array(
            'success' => true,
            'data' => !empty( $data ) ? array_values( $data ) : array()
        );	
		
    }
	
    public function getMediaList( $type, $fileId = 0 )
    {
		/*Rami 
		this function to write the input (left menu video list) or 
								   output (footer menu video list)
		Must change to read from db
		*/
		
		GLOBAL $db2;
		GLOBAL $getData;
		
		$data = array();
		if($type == 'input'){
			//$path[0] = '/var/www/edit.mediaobserver-me.com/public/userfiles/input/test';
			
			$tmp = explode(' ',$getData['from_time'] );
			$date_arr = explode('-', $getData['from_time'] );
			$search_date = $tmp[0];
			$path = array();
			$path[0]  = '/storage/recordings/'.$getData['publication_id'].'/'.$date_arr[0].'/'.$date_arr[1].'/'.$date_arr[2];	
			
			if($getData['day2']){
				$tomorrow = date('Y-m-d',strtotime( $getData['from_time'] . "+1 days"));
				$date_arr2 = explode('-', $tomorrow );
				$path[1]  = '/storage/recordings/'.$getData['publication_id'].'/'.$date_arr2[0].'/'.$date_arr2[1].'/'.$date_arr2[2];	
			}	


			foreach($path as $ptemp){
				$data = array_merge($data, $this->get_file_info($ptemp, $fileId) ) ;
			}	
		} else { //output
			$path = '/var/www/edit.mediaobserver-me.com/public/userfiles/output/testOutput';
			$data = $this->getOutputMediaList($path, $fileId);
			//$data = array_merge($data, $this->get_file_info($path, $fileId) ) ;
			
			
		}

		if ($fileId){
			
			if(is_array($data) ){
				foreach($data as $item){
					if($item['id'] == $fileId){
						return $item;
					} 
				}
			}
		}
		
	/*
		[1493910131_590b427369ad9] => Array
        (
            [id] => 1493910131_590b427369ad9
            [title] => Amazing Things only seen In Dubai
            [ext] => mp4
            [file_size] => 39.26 MB
            [time_stump] => 1493910131
            [width] => 1280
			[keywords]=> string
            [height] => 720
            [duration_ms] => 241009
            [datetime] => 05.04.2017 17:02:11
            [duration_time] => 00:04:1.01
            [url] => /video/public/userfiles/input/fb10154293412205870\1493910131_590b427369ad9.mp4
        )		
		*/

		if(is_array($data) ){
			foreach ( $data as &$item ){
				$item['datetime'] = @date( 'm.d.Y H:i:s', $item['time_stump'] );
				$item['file_size'] = self::sizeFormat( $item['file_size'] );
				if( !isset($item['duration_ms']) ){
					$item['duration_ms'] = 600004;
					$item['title'] = '[Inprocess]';//$item['title'];	
					$item['width']=854;
					$item['height']=480;
					 
				} else {
					if($type == 'input'){
						$tmpTitle = substr($item['title'], strpos($item['title'],'.')+1 );
						$tmpTitle = explode('-',$tmpTitle);
						

						/*$item['title'] = date("M d, Y", strtotime(  str_replace('_','-',$tmpTitle[0])  )).' '.substr($tmpTitle[1],0,5); */
						$item['title'] = date("M d, Y", strtotime(  str_replace('_','-',$tmpTitle[0])  )).' '.substr($tmpTitle[1],0,8); 
					}
					
				}
				
				$item['duration_time'] = self::secondsToTime( $item['duration_ms'] / 1000 );
				
				/*$item['url'] = $this->config['base_url'] . $this->config[$type . '_dir'];
				  $item['url'] .= $user['id'] . DIRECTORY_SEPARATOR . $item['id'] . '.' . $item['ext'];
				*/
				$item['url'] = $item['vurl'] . DIRECTORY_SEPARATOR . $item['id'] . '.' . $item['ext'];
				//$item['url'] = str_replace(':','%3A',$item['url']);
			}
		}
		
        return array(
            'success' => true,
            'data' => !empty( $data ) ? array_values( $data ) : array()
        );	
		
    }

	
	public function getItemData2( $itemId, $type )
    {

       /*Rami modify */
		GLOBAL $db;
		
        $item = $this->getMediaList4($type, $itemId );
		$item = $item[$itemId];
		
		$kInfo = $db->rawQueryOne ('select group_concat(id) as kids from article_keyword where article_id='.$itemId);
		$item['keyIds'] = $kInfo['kids'];
        if( empty( $item ) ){
            return array(
                'success' => false,
                'msg' => 'Media not found.'
            );
        }
		
		
        $item['datetime'] = date( 'm.d.Y H:i:s', $item['time_stump'] );
        $item['file_size'] = self::sizeFormat( $item['file_size'] );
		
		$item['duration_ms'] = isset($item['duration_ms'])? $item['duration_ms'] : 599090;
        $item['duration_time'] = self::secondsToTime( $item['duration_ms'] / 1000 );
        
		$item['url'] = $item['vurl'] . DIRECTORY_SEPARATOR . $item['id'] . '.' . $item['ext'];
		
		//$item['url'] = $this->config['base_url'] . $this->config[$type . '_dir'];
        //$item['url'] = $user['id'] . DIRECTORY_SEPARATOR . $item['id'] . '.' . $item['ext'];
		
	
        return array(
            'success' => true,
            'data' => $item
        );
    }
	
    /**
     * @param $itemId
     * @param $type
     * @return array
     */
    public function getItemData( $itemId, $type )
    {

       /*Rami modify */
		//GLOBAL $db2;
        $item = $this->getMediaList($type, $itemId );

        if( empty( $item ) ){
            return array(
                'success' => false,
                'msg' => 'Media not found.'
            );
        }
		
		
        $item['datetime'] = date( 'm.d.Y H:i:s', $item['time_stump'] );
        $item['file_size'] = self::sizeFormat( $item['file_size'] );
		
		$item['duration_ms'] = isset($item['duration_ms'])? $item['duration_ms'] : 599090;
        $item['duration_time'] = self::secondsToTime( $item['duration_ms'] / 1000 );
        
		$item['url'] = $item['vurl'] . DIRECTORY_SEPARATOR . $item['id'] . '.' . $item['ext'];
		
		//$item['url'] = $this->config['base_url'] . $this->config[$type . '_dir'];
        //$item['url'] = $user['id'] . DIRECTORY_SEPARATOR . $item['id'] . '.' . $item['ext'];
		
	
        return array(
            'success' => true,
            'data' => $item
        );
    }

    /**
     * Update item data
     * @param $itemId
     * @param $type
     * @param $data
     * @return array
     */
    public function updateItemData( $itemId, $type, $data )
    {
		
		/*Rami , change function from rename to add keywords and save to real article table*/
        
		/*
		$user = $this->getUser();
        if( $user === false ){
            return array(
                'success' => false,
                'msg' => 'Forbidden.'
            );
        }

        $fileStore = $this->dbGetStore( 'video_' . $type, $user['id'] );
        $item = $fileStore->get( $itemId );
		*/
		GLOBAL $db2;
		$db2->where('article_id', $itemId);
		$db2->delete('article_keyword');
		
        $item = $this->getMediaList('output', $itemId );
		
		$kws = explode(',',$data);
		$da  = array();
		foreach($kws as $kw){
			$da[] = array(
				"article_id" => $itemId,
				"keyword_id" => $kw,
				"created" => $db2->now(),
			);
		}

		$ids = $db2->insertMulti('article_keyword', $da);
	

        if( empty( $ids ) ){
            return array(
                'success' => false,
                'msg' => 'Media not found.'
            );
        }
		
		
        //$item = array_merge( $item, $data );
        //$fileStore->set( $itemId, $item );

        return array(
            'success' => true,
            'data' => $item
        );
    }

    /**
     * Delete item
     * @param $itemId
     * @param $type
     * @return array
     */
    public function deleteItem( $itemId, $type )
    {

	/*Rami Modify */
		GLOBAL $db2;
        $output = array();
        
		// $fileStore = $this->dbGetStore( 'video_' . $type, $user['id'] ); change this line to the next line
		$item = $this->getMediaList('output', $itemId );
		  //if( $item = $fileStore->get( $itemId ) ){

            $filePath = '/var/www/edit.mediaobserver-me.com/public/userfiles/output/testOutput';
            $filePath .= DIRECTORY_SEPARATOR . @$item['id'] . '.' . @$item['ext'];
			
			
            if( file_exists( $filePath ) ){
				@unlink( $filePath );
            }

			$db2->where('article_id', $itemId );
			$db2->delete('article_keyword');					
			
			$db2->where('id', $itemId );
			$db2->delete('article');		
			//echo $db2->getLastQuery();

			
            //$fileStore->delete( $item['id'] );
            $output['success'] = true;

       // }

        return $output;
    }

    /**
     * Download media file
     * @param $itemId
     * @param $type
     */
    public function downloadMediaFile( $itemId, $type )
    {
 

        $item = $this->getMediaList('output', $itemId );
		
        if( $item ){

            $filePath = '/var/www/edit.mediaobserver-me.com/public/userfiles/output/testOutput';
			$filePath .= DIRECTORY_SEPARATOR . $item['id'] . '.' . $item['ext'];
            if( file_exists( $filePath ) ){

                $this->downloadFile( $filePath, $item['title'] . '.' . $item['ext'] );

            }

        }

        exit;
    }

    /**
     * Print video frame
     * @param $itemId
     * @param $type
     * @param int $time
     */
    public function printFrame( $itemId, $type, $time = 0 )
    {
        $user = $this->getUser();
        if( $user === false ){
            $this->printBlankImage();
        }

        $item = $this->getMediaList('input', $itemId );
		
        if( empty( $item ) ){
            $this->printBlankImage();
        }

             $videoFilePath = $item['path']  . DIRECTORY_SEPARATOR . $item['id'] . '.' . $item['ext'];;
        if( !file_exists( $videoFilePath ) ){
            $this->printBlankImage();
        }

       // $tmpPath = $this->getPublicPath('tmp_dir', $user['id']);
	    $tmpPath = '/var/www/edit.mediaobserver-me.com/public/tmp/'.$_COOKIE['uid'];
        if( !is_dir( $tmpPath ) ){
            mkdir( $tmpPath );
            chmod( $tmpPath, 0777 );
        }

        $time = $time ? $time / 1000 : 0;
        $time = number_format( $time, 2, '.', '' );
        $frameImagePath = $tmpPath . DIRECTORY_SEPARATOR . 'frame_' . $item['id'];
        $frameImagePath .= '_' . str_replace( '.', '-', $time ) . '.jpg';

        if( !file_exists( $frameImagePath ) ){

            $cmd = $this->config['ffmpeg_path'] .  " -i \"{$videoFilePath}\" -ss $time";
            $cmd .= ' \\' . PHP_EOL . '-vf scale=400:300:force_original_aspect_ratio=increase';
            $cmd .= ' \\' . PHP_EOL . '-vframes 1';
            $cmd .= ' \\' . PHP_EOL . "-y \"{$frameImagePath}\" 2>&1";

            shell_exec( $cmd );
            if( !file_exists( $frameImagePath ) ){
                $this->printBlankImage();
            }

            chmod( $frameImagePath, 0777 );
        }

        $content = file_get_contents( $frameImagePath );
        header('Content-Type: image/jpeg');
        echo $content;

        exit;
    }

    /**
     * Print blank image
     */
    public function printBlankImage()
    {
        $im = imagecreatetruecolor(300, 250);
        $color = imagecolorallocate($im, 212, 212, 212);
        imagefilledrectangle($im, 0, 0, 300, 250, $color);
        header('Content-Type: image/jpeg');
        imagejpeg($im);
        imagedestroy($im);
        exit;
    }

    /**
     * Get video file path
     * @param $userId
     * @param $type
     * @param $itemData
     * @return string
     */
    public function getVideoPath( $userId, $type, $itemData )
    {
        $filePath = $this->getPublicPath($type . '_dir', $userId);
        $filePath .= DIRECTORY_SEPARATOR . $itemData['id'] . '.' . $itemData['ext'];
        return $filePath;
    }

}