<?php

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
if( isset($_REQUEST['fdate'])){

	unset($_COOKIE[$cookie_name]);
	$_POST['day2'] = (isset($_REQUEST['day2']) )? true : false ;
	$getData = array(
			"publication_id"=> @$_REQUEST['channel'] ,
			"from_time"=> @$_REQUEST['fdate'] ,
			"day2"=> @$_REQUEST['day2'],
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

$action = BaseController::getRequestAction('main2');
if( $config['authentication'] && (empty( $user ) || empty( $user['id'] )) && $action != 'auth' ){
    $action = 'auth';
}
if( $action == 'auth' && (!$config['authentication'] || !empty( $user )) ){
    BaseController::redirectTo( $config['base_url'] );
}

$channels = $db->rawQuery( "select * from publication p where p.type_id in (3,4) and p.active=1 order by name_en ");
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
    <link rel="stylesheet" href="<?php echo $config['base_url']; ?>assets/css/styles2.css">
	<link rel="stylesheet" href="<?php echo $config['base_url']; ?>assets/js/dataTables/dataTables.bootstrap.css" rel="stylesheet">
	<link rel="stylesheet" href="<?php echo $config['base_url']; ?>assets/css/bootstrap-datetimepicker.min.css" />
	<link rel="stylesheet" href="<?php echo $config['base_url']; ?>assets/css/jquery-ui-timepicker-addon.css" />

	<link href="<?php echo $config['base_url']; ?>assets/css/chosen.min.css" rel="stylesheet" />

    <?php if( $config['environment'] == 'dev' ): ?>
        <script src="<?php echo $config['base_url']; ?>lib/jquery/dist/jquery.min.js"></script>
        <script src="<?php echo $config['base_url']; ?>lib/jquery-ui/jquery-ui.min.js"></script>
        <script src="<?php echo $config['base_url']; ?>lib/tether/dist/js/tether.min.js"></script>
        <script src="<?php echo $config['base_url']; ?>lib/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="<?php echo $config['base_url']; ?>lib/underscore/underscore-min.js"></script>



        <script src="<?php echo $config['base_url']; ?>assets/js/webvideoedit2.js"></script>
    <?php else: ?>
        <script src="<?php echo $config['base_url']; ?>assets/js/app2.min.js"></script>
		<script src="<?php echo $config['base_url']; ?>assets/js/bootstrap-datetimepicker.min.js"></script>
    <?php endif; ?>
		<script src="<?php echo $config['base_url']; ?>assets/js/chosen.jquery.js"></script>
		<script src="<?php echo $config['base_url']; ?>assets/js/dataTables/jquery.dataTables.js"></script>
		<script src="<?php echo $config['base_url']; ?>assets/js/jquery-ui-timepicker-addon.js"></script>

	<link href="<?php echo $config['base_url']; ?>jPlayer/jPlayer-2.9.2/dist/skin/blue.monday/css/jplayer.blue.monday.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<?php echo $config['base_url']; ?>jPlayer/jPlayer-2.9.2/dist/jplayer/jquery.jplayer.js"></script>
	<script type="text/javascript" src="<?php echo $config['base_url']; ?>jPlayer/jPlayer-2.9.2/dist/add-on/jplayer.playlist.js"></script>
	<script type="text/javascript">

//<![CDATA[
$(document).ready(function(){
          $('.datetimepicker1').datepicker({
			    dateFormat: "yy-mm-dd"
			});

	var myPlaylist = new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_N",
		cssSelectorAncestor: "#jp_container_N"
	}, [], {
		playlistOptions: {
			enableRemoveControls: true,
			autoPlay: true,
		},
		swfPath: "<?php echo $config['base_url']; ?>jPlayer/jPlayer-2.9.2/dist/jplayer",
		supplied: "webmv, ogv, m4v, oga, mp3",
		useStateClassSkin: true,
		autoBlur: true,
		smoothPlayBar: true,
		keyEnabled: true,
		audioFullScreen: true,
		loop : false,
		repeat :false,
		size: {
			 width: "100%",
			 height: "480px"
		}
	});

	$('#mvTxt').timepicker({
		timeFormat: 'mm:ss',
		minuteMin: 0,
		minuteMax: 9,
		onClose: function(dateText, inst) {
			gotoFun()
		},
        //gotoCurrent: true,
        orientation: "bottom" // add this
	});

	var $jp = $('#jquery_jplayer_N');
	$( "#mvBtn" ).click(function() {
		var time = $jp.data("jPlayer").status.currentTime + 1;
        $jp.jPlayer( "play", time);
		$jp.jPlayer("pause")
	});

	$( "#mvBtn2" ).click(function() {
	   var time = $jp.data("jPlayer").status.currentTime - 1;
       $jp.jPlayer( "play", time);
	   $jp.jPlayer("pause")
	});
	$( "#mvBtn21" ).click(function() {
		var time = $jp.data("jPlayer").status.currentTime - 10;
        $jp.jPlayer( "play", time);
		$jp.jPlayer("pause")
	});

	$( "#mvBtn22" ).click(function() {
	   var time = $jp.data("jPlayer").status.currentTime + 10;
       $jp.jPlayer( "play", time);
	   $jp.jPlayer("pause")
	});
	$( "#mvBtG" ).click(function() {
		gotoFun()
	});

	function gotoFun(){
		time= $('#mvTxt').val()

	    time = time.split(/:/);
		var smsm = parseInt(time[0]) * 60 + parseInt(time[1]);
		$jp.jPlayer( "play", parseInt(smsm) );
		$jp.jPlayer("pause")
	}

	var webVideoEditor = new WebVideoEditor({
		baseUrl: '<?php echo $config['base_url']; ?>'
	});


	setInterval(function(){
		if ( $( "#mvTxt" ).is(":focus") || $("#mvTxt").datepicker( "widget" ).is(":visible")) {
		} else {
			$('#mvTxt').val( $('.jp-current-time').text()  )
		}
	}, 500);

	$( "#jquery_jplayer_N" ).click(function() {
	  if($("#jquery_jplayer_N").data().jPlayer.status.paused === false){
		 $("#jquery_jplayer_N").data().jPlayer.pause();
		}
		else{
			$("#jquery_jplayer_N").data().jPlayer.play();
		}
	});


	<?php if ( @$_POST['channel'] ){ ?>

		url = "https://edit.mediaobserver-me.com/indexn.php?action=content_list2&tab_id=5a2807b3da695&type=input&_=1512653189172&channel=<?php echo $_POST['channel'];?>&fdate=<?php echo $_POST['fdate']?>&day2=0";

		$.ajax({
			url: url ,
			success: function(data){
				jsonList = data;

			},
			async: false
		});
		myPlaylist.option("enableRemoveControls", false);
		myPlaylist.option("autoPlay", true);

		myPlaylist.setPlaylist(jQuery.parseJSON(jsonList))

	<?php }?>
});
//]]>
</script>


<style>

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

	.jp-playlist-current{
		font-weight:bold;
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
                include $config['root_path'] . "templates/default2.html.php";
            }
            ?>

        </div>
    </div>

</div>

<?php
include $config['root_path'] . "templates/main_templates2.html.php";
if( file_exists( $config['root_path'] . "templates/{$action}_templates.html.php" ) ) {
    include $config['root_path'] . "templates/{$action}_templates.html.php";
}
?>

</body>
</html>