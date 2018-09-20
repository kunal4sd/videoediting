<?php

require_once dirname( __DIR__ ) . '/vendor/autoload.php';
use \App\Controller\UsersControllerClass as UsersController;

/** @var array $config */
/** @var array $user */
/** @var array $page_content */

if( empty( $user ) || $user['role'] != 'admin' ){
    UsersController::redirectTo( $config['base_url'] );
}
?>

<script>
$(document).ready(function() {
	
    $('#dtable').dataTable( {
	  "pageLength": 50,
	  "stateSave": true
	} );
	
} );
</script>
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
     
<!-- Output list -->
<div class="card">
    <div class="card-block">

        <div class="bottom-list-container" style="max-height:none !important;">

            <table class="table table-bordered table-hover no-margin " style="width:99% !important;" id="dtable">
     
				<thead>
				<tr>
					<th >#</th>
					<th >ID</th>
					<th >Channel Name</th>
					<th >Country</th>
					<th >Type</th>
					
					<th >Date</th>
					<th >Time</th>
					<th>Time Since Update</th>
				</tr>				
				</thead>
                <tbody id="">
					<?php 
						$i=1;
						foreach($page_content as $content){?>
					<tr style="<?php echo (@$content['DT_RowClass'])?'background-color:'.$content['DT_RowClass']: '';?>" >
						<td ><?php echo $i;?></td>
						<td ><?php echo $content['channel_id'];?></td>
						<td ><?php echo $content['channel'];?></td>
						<td ><?php echo $content['country'];?></td>
						<td ><?php echo $content['type_id'];?></td>
						<td ><?php echo isset($content['date'])?$content['date']:'-';?></td>
						<td ><?php echo isset($content['time'])?$content['time']:'-';?></td>
						<td><?php echo  isset($content['time_since_update'])?$content['time_since_update']:'-';?></td>
					</tr>
					<?php $i++; }?>
				</tbody>
            </table>

        </div>

    </div>

	
</div>
<!-- /Output list -->