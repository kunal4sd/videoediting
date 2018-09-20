<?php

include('public_functions.php');


date_default_timezone_set('Asia/Amman');
/*this use videojs package in nplayer folder*/
/** @var array $config */
include(dirname(__DIR__) .'/config/db.php');
require_once dirname(__DIR__) . '/config/config.php';

/*
if(!$_SESSION['uid'] ){
	header("Location: login.php");
	die();
}
*/
if(!$_COOKIE['uid'] ){
	header("Location: login.php");
	die();
}

if( $config['debug'] ){
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
}

//$_SESSION['user'] = array('id'=>$_SESSION['uid'], 'role'=>'admin');
$_COOKIE['user'] = array('id'=>$_COOKIE['uid'], 'role'=>'admin');

$tab_id = ( isset($_REQUEST['tab_id']) ) ? $_REQUEST['tab_id'] : '';
$cookie_name = 'getData'.$tab_id ;
if(isset($_POST['fdate'])){
	unset($_COOKIE[$cookie_name]);
	$getData = array(
			"publication_id"=> $_POST['channel'] , 
			"from_time"=> $_POST['fdate'] , 
			"to_time"=> $_POST['tdate'], 				
			"duration"=> $_POST['duration'], 				
			
		);	
	setcookie($cookie_name, serialize($getData));	
} else {
	$getData = ( isset($_COOKIE[$cookie_name]) )? unserialize($_COOKIE[$cookie_name]) : 0;
}

require_once dirname(__DIR__) . '/vendor/autoload.php';
use \App\Controller\BaseControllerClass as BaseController;

$controller = new BaseController($config);
$page_content = $controller->handleRequest();
$user = $controller->getUser( false );

$action = BaseController::getRequestAction('main4');
if( $config['authentication'] && (empty( $user ) || empty( $user['id'] )) && $action != 'auth' ){
    $action = 'auth';
}
if( $action == 'auth' && (!$config['authentication'] || !empty( $user )) ){
    BaseController::redirectTo( $config['base_url'] );
}

$ac_ids = $db2->rawQueryOne( "select group_concat(pd.publication_id) as acid from publication_details pd where pd.recording247 ='Y' ");

$channels = $db->rawQuery( "select * from publication p where p.type_id in (3,4) and p.active=1 and p.id in (".$ac_ids['acid'].") order by name_en ");

$keywords_list = $db->rawQuery( "select * from keyword where active =1");




?>
<html>
<head>
    <title><?php echo $config['app_title']; ?></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="<?php echo $config['app_description']; ?>">
    <meta name="keywords" content="video edit, online editor, cut, video">

    <meta property="og:url" content="<?php echo BaseController::getCurrentBaseUrl(); ?>">
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?php echo $config['app_title']; ?>">
    <meta property="og:description" content="<?php echo $config['app_description']; ?>">
    <meta property="og:image" content="<?php echo BaseController::getCurrentBaseUrl(); ?>assets/img/logo_sm.png">

    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo $config['base_url']; ?>assets/img/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo $config['base_url']; ?>assets/img/favicon-16x16.png">
    <link rel="icon" type="image/x-icon" href="<?php echo $config['base_url']; ?>favicon.ico">

    <link rel="stylesheet" href="<?php echo $config['base_url']; ?>lib/bootstrap/dist/css/bootstrap.css">
    <link rel="stylesheet" href="<?php echo $config['base_url']; ?>lib/jquery-ui/themes/smoothness/jquery-ui.min.css">
    <link rel="stylesheet" href="<?php echo $config['base_url']; ?>assets/css/icomoon/style.css">
    <link rel="stylesheet" href="<?php echo $config['base_url']; ?>assets/css/styles.css">
	<link rel="stylesheet" href="<?php echo $config['base_url']; ?>assets/js/dataTables/dataTables.bootstrap.css" rel="stylesheet">	
	<link rel="stylesheet" href="<?php echo $config['base_url']; ?>assets/css/bootstrap-datetimepicker.min.css" />

	<link href="<?php echo $config['base_url']; ?>assets/css/chosen.min.css" rel="stylesheet" />
	

        <script src="<?php echo $config['base_url']; ?>assets/js/app.min3.js"></script>
		<script src="<?php echo $config['base_url']; ?>assets/js/bootstrap-datetimepicker.min.js"></script>


		<script src="<?php echo $config['base_url']; ?>assets/js/dataTables/jquery.dataTables.js"></script>	
		
		<script src="<?php echo $config['base_url']; ?>assets/js/jquery-ui.min.js"></script>	

		
		
  <link href="nplayer/video.js/dist/video-js.css" rel="stylesheet">

  <link href="nplayer/rangeslider-videojs/rangeslider.css" rel="stylesheet">
 
  <link type='text/css' rel='stylesheet' href='nplayer/jQuery-Timepicker-Addon-master/dist/jquery-ui-timepicker-addon.css' />
  
  <script src="nplayer/video.js/dist/video.js"></script>
  <script src="nplayer/videojs-contrib-hls/dist/videojs-contrib-hls.js"></script>
  <script src="nplayer/rangeslider-videojs/rangeslider-videojs.js"></script>
  <script src="nplayer/videojs-offset/dist/videojs-offset.js"></script>
  <script src="nplayer/popupjs/js/jquery.popup.js"></script>
  <script src="nplayer/jQuery-Timepicker-Addon-master/dist/jquery-ui-timepicker-addon.js"></script>
 
		
		<script src="<?php echo $config['base_url']; ?>assets/js/chosen.jquery.js"></script>
		<script type="text/javascript" src="/assets/js/chosen.ajaxaddition.jquery.js"></script>
		
    <script>
        var webVideoEditor = new WebVideoEditor({
            baseUrl: '<?php echo $config['base_url']; ?>'
        });
		function resetForm() {
         $("#reset").closest('form').find("input[type=text] ").val("");
		 $('.channelSelect').find('option:first-child').prop('selected', true).end().trigger('chosen:updated');

        };

		
	

		/*
		$(function () {
           $('.datetimepicker1').datepicker({
			    dateFormat: "yy-mm-dd"
			});
        });
		*/
		
		function changeDateFormat(str){
			//var  str= '3266.2018_03_05-01:19:58.m3u8'
			var tmp = str.split(".");
			
			var tmp2 = tmp[1].split('-');
			
			var tmpStr = tmp[1].replace("-", " ");
			tmpStr = tmpStr.replace("_", "-");
			tmpStr = tmpStr.replace("_", "-");
			
			
			
			
			var dd = $.datepicker.formatDate('DD :: M d, yy ', new Date(tmpStr));
			return (dd +'<span style="color:#800000;">[ '+tmp2[1] +' ]</span>')			
		}
		
		$(document).ready(function() {

			
				     $("*").tooltip({
						  disabled: true
						});
		
			$(".channelSelect").chosen({disable_search_threshold: 10});
			
			$('.datetimepicker1').datetimepicker(
				{
					controlType: 'select',
					oneLine: true,
					timeFormat: 'HH:mm:ss',
					dateFormat:'yy-mm-dd'
				}
			);

		});
		
		var vhtml = '<video id="preview-player" class="video-js vjs-default-skin vim" controls="true" preload="none"	width="800" height="400" data-setup=\'\'>	</video>'		
		function plist(vsrc, itemid =0){
				var listStr = "#EXTM3U \n #EXT-X-VERSION:3 \n #EXT-X-MEDIA-SEQUENCE:0 \n #EXT-X-ALLOW-CACHE:NO \n #EXT-X-TARGETDURATION:5 \n #EXTINF:-1 \n http://edit.mediaobserver-me.com/videos/3266/2018/03/04/3266.2018_03_04-00:59:57.ts \n #EXTINF:-1 \n http://edit.mediaobserver-me.com/videos/3266/2018/03/04/3266.2018_03_04-01:00:03.ts \n #EXTINF:-1 \n http://edit.mediaobserver-me.com/videos/3266/2018/03/04/3266.2018_03_04-01:00:07.ts \n #EXTINF:-1 \n http://edit.mediaobserver-me.com/videos/3266/2018/03/04/3266.2018_03_04-01:00:12.ts \n #EXTINF:-1 \n http://edit.mediaobserver-me.com/videos/3266/2018/03/04/3266.2018_03_04-01:00:17.ts \n #EXTINF:-1 \n http://edit.mediaobserver-me.com/videos/3266/2018/03/04/3266.2018_03_04-01:00:22.ts \n #EXTINF:-1 \n http://edit.mediaobserver-me.com/videos/3266/2018/03/04/3266.2018_03_04-01:00:28.ts \n #EXTINF:-1 \n http://edit.mediaobserver-me.com/videos/3266/2018/03/04/3266.2018_03_04-01:00:33.ts \n #EXTINF:-1 \n http://edit.mediaobserver-me.com/videos/3266/2018/03/04/3266.2018_03_04-01:00:38.ts \n #EXTINF:-1 \n http://edit.mediaobserver-me.com/videos/3266/2018/03/04/3266.2018_03_04-01:00:42.ts \n #EXTINF:-1 \n http://edit.mediaobserver-me.com/videos/3266/2018/03/04/3266.2018_03_04-01:00:47.ts \n #EXTINF:-1 \n http://edit.mediaobserver-me.com/videos/3266/2018/03/04/3266.2018_03_04-01:00:53.ts \n #EXTINF:-1 \n http://edit.mediaobserver-me.com/videos/3266/2018/03/04/3266.2018_03_04-01:00:57.ts \n #EXT-X-ENDLIST \n ";
	
				videojs("preview-player").dispose();
			
			$('#vplayer').append(vhtml)
			var options = { hidden:false, responsive: true, width: 1600, height: 900, controlTime:false }
			
			
			
			src1 = 'http://edit.mediaobserver-me.com/tmp/playlist/'+vsrc
			
			var mplayer = videojs("preview-player", {
                controls: true,
                sources: [{src: src1, type: 'application/x-mpegURL'}],
            });
			mplayer.rangeslider(options);
			mplayer.hideSliderPanel();
			
			$('.list-group  li.active').removeClass('active');
			$('#id'+itemid).addClass( "active" );
			$('#id'+itemid).css('z-index', 0);
			
		}

    </script>
<style>


	.video-js{
		margin:auto;
	}
	.table.dataTable{
		width:99%;
	}
	.date{
	   background: gray;
	   height: 30px !important;
	}
	.chosen-single{
		height:30px !important;
	    background: gray;
	}
	
	
	
</style>
</head>
<body>

<div class="container-fluid">

    <div class="card card-default">
        <div class="card-block">

            <?php
            if( file_exists( $config['root_path'] . "templates/{$action}.html.php" ) ) {
                include $config['root_path'] . "templates/{$action}.html.php";
            } else {
                include $config['root_path'] . "templates/default.html.php";
            }
            ?>

        </div>
    </div>

</div>

<?php
include $config['root_path'] . "templates/main_templates.html.php";
if( file_exists( $config['root_path'] . "templates/{$action}_templates.html.php" ) ) {
    include $config['root_path'] . "templates/{$action}_templates.html.php";
}
?>

</body>
</html>