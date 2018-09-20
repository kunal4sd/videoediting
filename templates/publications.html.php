<?php

require_once dirname( __DIR__ ) . '/vendor/autoload.php';
use \App\Controller\UsersControllerClass as UsersController;

/** @var array $config */
/** @var array $user */
/** @var array $page_content */

if( empty( $user ) || $user['role'] != 'admin' ){
    UsersController::redirectTo( $config['base_url'] );
}
//http://localhost/project/json/articles/get_articles_datatable.php?country=&publication_type=5&langs=&publication=&issue_from=2017-06-07&issue_to=&create_from=&create_to=&artcile_status=&keywords_id=&user_id=-1&magazine_article_size=&_=1497271549854

$country = $db->rawQuery( "select * from country c ");
$language = $db->rawQuery( "select * from publication_language");
$allChannels = $db->rawQuery( "select * from publication p where p.type_id in (3,4) and p.active=1  order by name_en ");

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
			<a href="<?php echo $config['base_url']; ?>">
				<img src="<?php echo $config['base_url']; ?>assets/img/logo_sm.png" alt="<?php echo $config['app_title']; ?>">
				<?php echo $config['app_title']; ?>
			</a>
		</h2>
    </div>

</div>

<hr>
        <div class="panel-body">
            <form method="post" id="reset">
            <div class="row">
                <div class="col-md-4">
				<select id="channel" multiple  placeholder="channel" name="channel" class="form-control form-control-sm option-control channelSelect" >
					<option value="0">-- Select -- </option>
					<?php
						foreach( $allChannels as $channel ){
							$selected = ($channel['id'] == $getData['publication_id']) ? 'selected ' : '';
							echo '<option '.$selected.' value="'.$channel['id'].'">'.$channel['name_en'].'</option>';	
						}
					?>
					
				</select>
                </div>
                <div class="col-md-2">
                    <select id="pubType" name="pubType" class="form-control form-control-sm option-control channelSelect" title="pubType"  data-live-search="true"  data-width="100%" >
					<option value="0">--All--</option>
					<option value="3">TV Channel</option>
					<option value="4">Radio</option>
                    </select>
                </div>

                <div class="col-md-2">
                    <select id="pubLang" name="pubLang" class="form-control form-control-sm option-control channelSelect" title="pubLang"  data-live-search="true"  data-width="100%" >
					<option value="0">--All--</option>
					<?php foreach($language as $tmp){
						echo '<option value="'.$tmp['id'].'">'.$tmp['name_en'].'</option>';
					}?>
                    </select>
                </div>

                <div class="col-md-2">
                    <select id="pubCountry" name="pubCountry" class="form-control form-control-sm option-control channelSelect" title="pubCountry"  data-live-search="true"  data-width="100%" >
					<option value="0">--All--</option>
					<?php foreach($country as $tmp){
						echo '<option value="'.$tmp['iso'].'">'.$tmp['name_en'].'</option>';
					}?>
                    </select>
                </div>

                <div class="col-md-2">
                    
				   <select name="flag24" id="flag24">
					<option value="1">-- All Channels --</option>
					<option value="2">Recording</option>
					<option value="3">Not Recording</option>
					</select>
                </div>
				
                   
			</div>
			<div class="row">
				  <div class="col-md-3">
				   <button id="searchSubmit" type="submit" class="btn btn-primary" data-toggle="action" data-action="searchPublication">Search</button>
					<button id=reset type="button" class="btn btn-primary" onclick="resetForm()">Reset</button>
				</div>
				</div>

			</div>
            </form>
                    
         </div>

<!-- Output list -->
<div class="card">
    <div class="card-block">

        <div class="bottom-list-container" style="max-height:none !important;">

            <table class="table table-bordered table-hover no-margin " id="dtable">
     
				<thead>
				<tr>
					<th >ID</th>
					<th >Publication Name</th>
					<th >Country</th>
					<th>Language</th>
					
					<th>Manage</th>
					
					
				</tr>				
				</thead>
                <tbody id="wve-publication_output">

				</tbody>
            </table>

        </div>

    </div>
	
	<div id="publishBtn" class="col-md-6" style="display:none">
	      <button id="Publish" type="button" class="btn btn-primary" data-toggle="action" data-action="approveVideos" >Approve</button>
	      <button id="Pendding" type="button" class="btn btn-primary" data-toggle="action" data-action="penddingVideos" >Pendding</button>
		  <button id="live" type="button" class="btn btn-primary" data-toggle="action" data-action="liveVideos" >Live</button>
	</div>
	
</div>
<!-- /Output list -->