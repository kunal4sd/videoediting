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
        <div class="panel-body">
            <form method="post" id="reset">
            <div class="row">
                <div class="col-md-4">
				<select id="channel" multiple  placeholder="channel" name="channel" class="form-control form-control-sm option-control channelSelect" >
					<option value="0">-- Select -- </option>
					<?php
						foreach( $channels as $channel ){
							$selected = ($channel['id'] == $getData['publication_id']) ? 'selected ' : '';
							echo '<option '.$selected.' value="'.$channel['id'].'">'.$channel['name_en'].'</option>';	
						}
					?>
					
				</select>
                </div>
                <div class="col-md-2">
                    <select id="status" name="status" class="form-control form-control-sm option-control channelSelect" title="status"  data-live-search="true"  data-width="100%" >
					<option value="">--All--</option>
					<option value="new">New</option>
					<option value="approve">Approved</option>
					<option value="pending">Pendding</option>
					<option value="live">Live</option>
                    </select>
                </div>
                     <div class="col-md-3">
                           <div class="form-group">
                              <div class='input-group date' >
                                 <input id="date" name="date_from" type="text" class="form-control datetimepicker1" placeholder="Date From" value="">
                                 <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                                 </span>
                              </div>
                          
                           </div>
                        </div>
                        <div class="col-md-3">
                           <div class="form-group">
                              <div class='input-group date' >
                                 <input id="date1" name="date_to" type="text" class="form-control datetimepicker1" class="form-control" placeholder="Date To"  value="">
                                 <span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>
                                 </span>
                              </div>
                           </div>
                        </div>
					 </div>
					<div class="row">
                          <div class="col-md-3">
                           <button id="searchSubmit" type="submit" class="btn btn-primary" data-toggle="action" data-action="updateUserResult">Search</button>
                            <button id=reset type="button" class="btn btn-primary" onclick="resetForm()">Reset</button>
                        </div>
						</div>

                    </div>
                    </form>
                    
         </div>

<!-- Output list -->
<div class="card">
    <div class="card-block">

        <div class="bottom-list-container" style="max-height:none !important;" >

            <table class="table table-bordered table-hover no-margin " id="dtable" style="display: none;">
     
				<thead>
				<tr>
					<th >Video Name (ID)</th>
					<th>Issue Date</th>
					<th>Create Date</th>
					<th>Channel</th>
					<th>Duration</th>
					<th>Size</th>
					<th>Actions</th>
				</tr>				
				</thead>
                <tbody id="wve-list_output">

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