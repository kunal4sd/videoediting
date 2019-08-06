<?php
if(@$_GET['x']){
	print_r($_GET);
	die();
}
?>
      <div class="dropdown-menu dropdown-menu-right">
                <!-- a class="dropdown-item" href="#" data-toggle="action" data-action="profile">
                    <span class="icon-user-tie"></span>
                    Profile
                </a -->
				<?php if( $_COOKIE['uid'] != 171){?>
					<?php if( $user['role'] == 'admin' ): ?>
						<div class="dropdown-divider"></div>

						<?php if( isset($_GET['action'])){?>
						<a class="dropdown-item" href="index.php">
							<span class="icon-users"></span>
							Edit Videos
						</a>
						<?php }?>

						<?php if( @$_GET['action'] !='users'){?>
						<a class="dropdown-item" href="index.php?action=users">
							<span class="icon-users"></span>
							Video List
						</a>
						<?php }?>

						<?php if( @$_GET['action'] !='publications'){?>
						<a class="dropdown-item" href="index.php?action=publications">
							<span class="icon-users"></span>
							Publications
						</a>
						<?php }?>


						<?php if( @$_GET['action'] !='publicationsReport'){?>
						<a class="dropdown-item" href="<?php echo $config['base_url']; ?>?action=publicationsReport">
							<span class="icon-users"></span>
							Publications Report
						</a>
						<?php }?>


						<?php if( @$_COOKIE['group_id'] == 7 ){?>
						<a class="dropdown-item" href="https://edit.mediaobserver-me.com/cronJob/importData.php" target="_blank">
							<span class="icon-users"></span>
							Import Keywords & pubs
						</a>
						<?php }?>


					<?php endif; ?>
				<?php }?>
				<?php if( $config['authentication'] ): ?>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" href="<?php echo $config['base_url']; ?>index.php?action=logout">
						<span class="icon-exit"></span>
						Logout
					</a>
				<?php endif; ?>
            </div>