<?php

namespace App\Controller;

/**
 * ContentControllerClass
 *
 * @author Andchir <andycoderw@gmail.com>
 */
class PublicationControllerClass extends BaseControllerClass
{

    /**
     * ContentControllerClass constructor.
     * @param array $config
     */
    public function __construct($config = array())
    {

        parent::__construct( $config );

    }


	public function getPublicationsView( )
    {
		return true;
	}
    public function getPublications($pub_arr )
    {
	
		GLOBAL $db;
		GLOBAL $db2;
		
		extract($pub_arr);
		
		

		
		if($flag24 == 2 ){	
			
			$ac_ids = $db2->rawQueryOne( "select group_concat(pd.publication_id) as acid from publication_details pd where pd.recording247 ='Y' ");
			$db2->where('id in ('.$ac_ids['acid'].')'); 
		} if($flag24 == 3 ) {
			$ac_ids = $db2->rawQueryOne( "select group_concat(pd.publication_id) as acid from publication_details pd where pd.recording247 ='N' ");
			$db2->where('id in ('.$ac_ids['acid'].')'); 
			
		} 
		if($id){	$db2->where('id', $id, 'IN'); }
		

		if($type){	$db2->where('type_id',$type); } else {$db2->where('type_id', Array(3, 4), 'IN'); }
		if($lang)	{	$db2->where('language', $lang); } 
		if($country){	$db2->where('country', $country); } 		
		$cols = Array ("id", "name_en", "language","country","type_id");
		$result = $db2->get('publication',10000,$cols);
		
		//die($db2->getLastQuery());
        return array(
            'success' => true,
            'data' => $result
        );
    }
	
	public function getPublicationInfo($pub_id){
		GLOBAL $db2;

		$db2->where('publication_id',$pub_id);
		$result = $db2->getOne('publication_details');		

		if(!$result){
			$db2->insert( 'publication_details',array('publication_id'=>$pub_id) );
			$db2->where('publication_id',$pub_id);
			$result = $db2->getOne('publication_details');		
			
		}
		return $result;
	}

	private function  explodeDate($file_name){
		//10912.2017_08_27-11:00:01.mp4
		if(!$file_name){
			return '-';
		}
		$file_name =  substr($file_name, strpos($file_name,'.')+1, -3) ;
		$file_date = str_replace( array('-','_') , array(' ','-') , $file_name);
		
		$to_time = strtotime($file_date);
		$from_time = strtotime(date("Y-m-d H:i:s"));
		
		$tmp = explode(' ',$file_date);
		$diff_time = round(abs($to_time - $from_time) / 60 ,0) ;
		$diff_time = floor($diff_time / 60).':'.($diff_time -   floor($diff_time / 60) * 60) ;
		$tmpDate = explode(':',$diff_time);
		
		$tmpDate[0] = ($tmpDate[0]<10) ? '0'.$tmpDate[0] : $tmpDate[0] ;
		$tmpDate[1] = ($tmpDate[1]<10) ? '0'.$tmpDate[1] : $tmpDate[1] ;
		
		$DT_RowClass = '';
		if($tmpDate[0] > 3){
			$DT_RowClass = '#f2dede';
		} elseif($tmpDate[0]< 3 && $tmpDate[0] > 1){
			$DT_RowClass = '#fcf8e3';
		}
		$diff_time = $tmpDate[0].':'.$tmpDate[1];
		$array = array('date'=> $tmp[0], 'time'=>$tmp[1], 'since_update'=>$diff_time, 'DT_RowClass'=>$DT_RowClass );
	
		return $array;
		
	}
	public function savePublicationInfo($data){
		GLOBAL $db2;

		$dataArr = json_decode( $data , true );
		$dataArr = $dataArr[0];
		
		$db2->where('publication_id',$dataArr['publication_id']);
		unset( $dataArr['publication_id'] );
	
		$db2->update( 'publication_details', $dataArr );
		
        return array(
            'success' => true,
        );
	}
	
	public function getPublicationsReport(){
		GLOBAL $db;
		$arr = array();
		$path = 'videos/';
		$today = date('Y/m/d');

		$yesterday = date('Y/m/d',strtotime("-1 days"));
		$folders = scandir($path);	
		$i=-1;
		
		foreach($folders as $folder){
			if( is_numeric($folder)){
				$channel = $db->rawQueryOne( "select name_en, active,(select c.name_en from country c where c.iso = country) as country,(select pt.name_en from publication_type pt where pt.id=type_id) as type_id from publication where id= ".$folder);
				$get_details ='';
				$today_path = $path.'/'.$folder.'/'.$today;	
				$files = glob($today_path.'/*.mp4');
				
				usort($files, function($a,$b){
					return filemtime($b) - filemtime($a);
				});

				if( $channel['active'] == 1 ){
					$i++;
					$arr[$i]['channel'] = $channel['name_en'];	
					$arr[$i]['country'] = $channel['country'];	
					$arr[$i]['type_id'] = $channel['type_id'];	
					$arr[$i]['channel_id'] = $folder;						
					
					if(!isset($files[0])){
						$today_path = $path.'/'.$folder.'/'.$yesterday;	
						$files = glob($today_path.'/*.mp4');	
					}
					
					if(isset($files[0])){
						$file_name = basename($files[0]);
						$get_details = $this->explodeDate($file_name);
						$arr[$i]['fname'] =$file_name;
						$arr[$i]['date'] = $get_details['date'];
						$arr[$i]['time'] = $get_details['time'];
						$arr[$i]['time_since_update'] = $get_details['since_update'];
					}
				} // end if channel is active
			}
		}
		return $arr;
	}
	
	public function getPublicationsReport2(){
		GLOBAL $db;
		GLOBAL $db2;


		$ac_ids = $db2->rawQueryOne( "select group_concat(pd.publication_id) as acid from publication_details pd where pd.recording247 ='Y' ");

		
		$str = 'select p.name_en ,(select c.name_en from country c where c.iso = p.country) as country,
		       (select pt.name_en from publication_type pt where pt.id=p.type_id) as type_id,p.id from publication p 
			    where p.type_id in(3,4) and p.id in ('.$ac_ids['acid'].')  and p.active=1 ';

		$channel = $db->rawQuery( $str);
		$i=0;
		foreach($channel as $tmp){
		
			$arr[$i]['channel'] = $tmp['name_en'];	
			$arr[$i]['country'] = $tmp['country'];	
			$arr[$i]['type_id'] = $tmp['type_id'];	
			$arr[$i]['channel_id'] = $tmp['id'];	
			$dateStr =  date("Y/m/d");
			
			$str = 'find /storage/recordings/'.$tmp['id'].'/'.$dateStr.'  -name "*.ts"   -type f -printf \'%T@ %p\n\' | sort -n | tail -1 | cut -f2- -d" "';
			$file = exec($str);
	
		
			if(!$file){
				$str = 'find /storage/recordings/'.$tmp['id'].'/'.$dateStr.' -name "*.ts" -type f -printf \'%T@ %p\n\' | sort -n | tail -1 | cut -f2- -d" "';
				$file = exec($str);
				
			}
			
		
			if(isset($file)){
				$file_name = basename($file);
				$get_details = $this->explodeDate($file_name);
				$arr[$i]['fname'] =$file_name;
				$arr[$i]['date'] = @$get_details['date'];
				$arr[$i]['time'] = @$get_details['time'];
				$arr[$i]['time_since_update'] = @$get_details['since_update'];
				$arr[$i]['DT_RowClass'] = @$get_details['DT_RowClass'];
			}
			
			$i++;
		}
		
		return $arr;
		}	
	

}