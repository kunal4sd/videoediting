<?php
date_default_timezone_set('Asia/Amman');

use App\Controller\BaseControllerClass as BaseController;

/** @var array $config */
/** @var array $user */
$total_file_size = 300 * 1024 * 1024;
$file_size = 1000 * 1024 * 1024;
$userOptions = array(
    'files_size_total' => BaseController::sizeFormat( $total_file_size  ),
    'files_size_max' => BaseController::sizeFormat( $file_size ),
    'files_size_percent' => floor( $total_file_size  / $file_size * 100 ),
    'show_log' => !empty( $config['users_restrictions'][ $user['role'] ] )
        && isset( $config['users_restrictions'][ $user['role'] ]['show_log'] )
            ? $config['users_restrictions'][ $user['role'] ]['show_log']
            : true
);

?>
<div class="row">
    <div class="col-md-2 push-md-10 text-right">

        <div class="dropdown display-inline-block">
            <button class="btn btn-lg btn-outline-info" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="icon-menu"></span>
            </button>
			<?php include('topMenu.php'); ?>
        </div>

    </div>
    <div class="col-md-6 pull-md-2 text-sm-left text-center">
        <h2 class="logo">
            <img src="<?php echo $config['base_url']; ?>assets/img/logo_sm.png" alt="<?php echo $config['app_title']; ?>">
            <?php echo $config['app_title']; ?>
        </h2>
    </div>
    <!-- div class="col-md-4 pull-md-2">
        <div id="wve-user-stat">
            <div class="progress mt-3">
                <div class="progress-bar <?php if($userOptions['files_size_percent'] >= 85): ?>bg-danger<?php else: ?>bg-success<?php endif; ?>" role="progressbar" style="width: <?php echo $userOptions['files_size_percent']; ?>%" aria-valuenow="<?php echo $userOptions['files_size_percent']; ?>" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="text-center small mb-3">
                Used:
                <?php echo $userOptions['files_size_percent']; ?>%
                &mdash;
                <?php echo $userOptions['files_size_total']; ?>
                /
                <?php echo $userOptions['files_size_max']; ?>
            </div>
        </div>
    </div -->
</div>

<hr>

<div class="row">
    <div class="col-md-4 push-md-8">

        <div class="form-group">
            <!-- button type="button" class="btn btn-lg btn-smp btn-outline-primary btn-block" data-toggle="action" data-action="import">
                <span class="icon-download"></span>
                Import media
            </button -->

			<form  action="index.php?tab_id=<?php echo (isset($_GET['tab_id']))? $_GET['tab_id'] : uniqid();?>" autocomplete="off" method="post" >

				<select required placeholder="channel"  id="channel" name="channel" class="form-control form-control-sm option-control channelSelect" style=" width:335px; margin-bottom:5px; padding-bottom:5px;">
					<option value="0">-- Select -- </option>
					<?php
						foreach( $channels as $channel ){
							$selected = ($channel['id'] == $getData['publication_id']) ? 'selected ' : '';
							echo '<option '.$selected.' value="'.$channel['id'].'">'.$channel['name_en'].'</option>';
						}
					?>

				</select>

				<input type="text" id="fdate" required value="<?php echo @$getData['from_time'];?>"  name="fdate" placeholder="From Date" class="form-control form-control-sm option-control datetimepicker1" style="float:left; width: 150px; margin-right:10px;">
				<input type="text" id="tdate" required value="<?php echo @$getData['to_time'];?>"  name="tdate" placeholder="To	 Date" class="form-control form-control-sm option-control datetimepicker1" style="float:left; width: 150px; margin-right:10px;">
				<select required placeholder="duration"  id="fduration" name="fduration" class="form-control form-control-sm option-control channelSelect" style=" width:335px; margin-bottom:5px; padding-bottom:5px;">
					<option value="600" <?php if (@$getData['duration'] == 600){ echo 'selected';}?> >10 Min</option>
					<option value="1200" <?php if (@$getData['duration'] == 1200){ echo 'selected';}?>>20 Min</option>
					<option value="1800" <?php if (@$getData['duration'] == 1800){ echo 'selected';}?>>30 Min</option>
					<option value="2700" <?php if (@$getData['duration'] == 2700){ echo 'selected';}?>>45 Min</option>
					<option value="3600" <?php if (@$getData['duration'] == 3600){ echo 'selected';}?>>60 Min</option>


				</select>
<br />
				<input type="submit" id="submitBTN" style="margin-top:10px;background-color:#fff; width:84%;"  class="btn btn-lg btn-smp btn-outline-primary "  value="Display Videos">
			</form>
        </div>

        <div class="mb-3" style="max-height: 338px; overflow: auto;">
			<div id="input-loading"></div>
            <ul class="list-group" id="wve-list_input">

            </ul>
        </div>

    </div>
    <div class="col-md-8 pull-md-4">


        <div class="card mb-3" style="height:500px;padding-top:4px;" >
         <script>
			var i=0;
  		    var vArray = new Array();
		    //var src2 = 'https://edit.mediaobserver-me.com/tmp/playlist/3266.2018_02_27-11:23:16.m3u8'

			var channel_id = $("#channel").chosen().val()
			var durationS = $("#fduration").chosen().val()

			function moveSTo(rt=true){
				var  mplayer=videojs("preview-player");
				var whereYouAt = mplayer.currentTime();

				var rangeInfo = mplayer.getValueSlider();
				var rstart = rangeInfo.start
				var rend = rangeInfo.end

				if(rt==true){
					mplayer.playBetween(whereYouAt, rend);
				} else {
					mplayer.playBetween(rstart, whereYouAt);
				}
			}

			function gotoSec(){

				var  mplayer=videojs("preview-player");
				var tsecS = parseInt ( $('#tsecS').val() );
				var tsecM = parseInt ( $('#tsecM').val());

				var fsecS = parseInt( $('#fsecS').val());
				var fsecM = parseInt( $('#fsecM').val()) ;

				var fromTime = (fsecM*60)+fsecS
				var toTime = (tsecM*60)+tsecS

				tsecS = tsecS ? tsecS : 0;
				tsecM = tsecM ? tsecM : 0;
				fsecS = fsecS ? fsecS : 0;
				fsecM = fsecM ? fsecM : 0;

				var msg = '';
				if ( tsecS > 60 || tsecS < 0){
					msg = 'To Sec Must be between 0 - 60'
				}

				if ( fsecS > 60 || fsecS < 0){
					msg = 'From Sec Must be between 0 - 60'
				}

				var fromTime = (fsecM*60)+fsecS
				var toTime = (tsecM*60)+tsecS


				if(fromTime >= toTime ){
					msg = 'From time must be less than to time'
				}

				if (msg){
					alert(msg)
				}else {
					mplayer.playBetween(fromTime,toTime);
				}

			}
		   function delEpisode(id){
			   $('#id-'+id).remove();
			   vArray.splice(id, 1);

		   }

			function showRange(){
			var txt1 = '<div id="id-'+i+'" class="col-md-4 col-sm-4 col-6 episode-item"><div class="loading" style="z-index:3; background-color:white;   position: absolute; width:430px; height:226px;">Loading ... </div><div  class="card card-outline-secondary show-on-hover-parent"><div class="" id="vid_'+i+'" style=""></div><div class="show-on-hover"><button onClick="delEpisode('+i+')" type="button" class="btn btn-sm btn-icon btn-secondary toggle-tooltip"  data-index="'+i+'" title="Remove"><span class="icon-cross"></span></button></div></div></div>';
			$("#wve-episode-container").append(txt1);     // Append new elements
			$("#wve-episode-container").show();

				var  mplayer=videojs("preview-player");


				var rangeInfo = mplayer.getValueSlider();
				var rstart = rangeInfo.start
				var rend = rangeInfo.end

				var ssrc1 = mplayer.currentSrc()
				ssrc1 = ssrc1.replace('https://edit.mediaobserver-me.com/tmp/playlist/','');
				//vArray.push([rstart,rend, ssrc1]);
				vArray[i] = [rstart,rend, ssrc1]


				var player_id =   'videoID_'+i;
				var vidTag = '<video id="'+player_id+'" class="video-js vjs-default-skin vim"  controls="true" preload="true" width="426" height="225" ></video>';
				$('#vid_'+i).append(vidTag);

				$.getJSON( "https://edit.mediaobserver-me.com/episode_creator.php?file="+ssrc1+"&stime="+rstart+"&etime="+rend, function( data ) {
					var curI = i-1;

					var fpath  = 'https://edit.mediaobserver-me.com/tmp/playlist/episodes/'+data;

					var player = videojs(player_id, {
						controls: true,
						sources: [{src: fpath, type: 'application/x-mpegURL'}],
					});

					videojs(player_id, { plugins: { offset: { start: rstart, end: rend } } });
					player.currentTime(0.1);

					var options = { hidden:true, responsive: true, width: 1600, height: 900 }
					player.rangeslider(options);
					$('#id-'+curI+' .loading').remove();


				});

			   i++;


			//player.offset({
			//	start:rstart,
			//	end:  rend,
			//	restart_beginning: true //Should the video go to the beginning when it ends
			//});


			}


		 </script>
		 <div>
			<span id="vplayer" >
				<video id="preview-player" class="video-js vjs-default-skin vim" controls="true" preload="true"	width="800" height="450" data-setup=''>
				</video>

			</span>
			</div>

			<div>
			<div style="float:left; width:40%;  margin:10px;" align="center" >Cut :
				<span  onclick="moveSTo()"><img src="/assets/img/cut_left.png" /></span>	<span onclick="moveSTo(false)"><img src="/assets/img/cut_right.png" /></span>
			</div>
			<div style="float: left; width:40%; padding-top:10px; ">
						From:<input name="fsecM" min="0"  id="fsecM" style="width:50px" type="number" placeholder="Min"> <input style="width:50px" min="0" max="59" name="fsecS" placeholder="Sec" id="fsecS" type="number">
						To:<input name="tsecM"  min="0" style="width:50px" id="tsecM" type="number" placeholder="Min"> <input name="tsecS" style="width:50px" min="0" max="59" placeholder="Sec" id="tsecS" type="number" >
						<input type="button" onClick="gotoSec()" value="Go To">

			</div>
			</div>
        </div>

    </div>
</div>


<div class="clearfix"></div>

<!-- Timeline slider -->
<div class="card mb-3" >
    <div class="card-block">



        <!-- buttons -->
        <div class="row">


            <div class="clearfix hidden-md-up"></div>

            <div class="col-md-2 col-sm-6">

                <div class="margin-bottom-md">
                    <button onClick="showRange()" class="btn btn-lg  btn-outline-primary toggle-tooltip"   title="Take episode">
                        <span class="icon-plus"></span>
						Take Episode
                    </button>
                </div>

            </div>


        </div>


        <div class="episode-container" id="wve-episode-container" style="display: none;">

            <div class="row wve-episode-container" id="wve-episode-container-inner"></div>
            <div class="clearfix"></div>
        </div>

    </div>
	        <div class="row">
             <div class="clearfix hidden-md-up"></div>
           <div class="col-md-4 col-sm-6">
                <div class="margin-bottom-md">
                    <button type="button" class="btn  btn-lg btn-smp btn-outline-primary toggle-tooltip" style="margin:0 0 10px 20px;" data-toggle="action" data-action="render">
                        <span class="icon-checkmark"></span>
                        Create Movie
                    </button>
                </div>
            </div>
        </div>
</div>
<!-- /Timeline slider -->

<!-- Output list -->
<div class="card">
    <div class="card-block">

        <div class="bottom-list-container">

            <table class="table table-bordered table-hover no-margin">
                <colgroup>
                    <col width="40%">
                    <col width="20%">
                    <col width="15%">
                    <col width="15%">
                    <col width="10%">
                </colgroup>
                <tbody id="wve-list_output"></tbody>
            </table>

        </div>

    </div>
</div>
<!-- /Output list -->
