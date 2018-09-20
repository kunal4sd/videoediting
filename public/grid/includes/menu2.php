 <nav class="navbar-default navbar-side" role="navigation">
	<div class="sidebar-collapse">
		<ul class="nav" id="main-menu">
		
		
			<?php 
				if($_COOKIE['type']  == 0){ // this is only for admin
			?>
				<li>
					<a title="Dashboard" style="<?php echo ($dashboard)? 'active-menu':'';?>"" href="dashboard.php"><i class="fa fa-dashboard fa-2x"></i></a>
				</li>
				<li  >
					<a title="LockArticle" class="<?php echo ($locked_articles)? 'active-menu':'';?>""  href="lock_articles.php"><i class="fa fa-lock  fa-2x"></i></a>
				</li>
				<li  >
					<a title="Publications" class="<?php echo ($publications_menu)? 'active-menu':'';?>""  href="publication.php"><i class="fa fa-book fa-2x"></i></a>
				</li>	
			
				<li  >
					<a title="Publications Issue Status" class="<?php echo ($wroten_publications)? 'active-menu':'';?>""  href="publication_work_statistics.php"><i class="fa fa-exclamation-circle  fa-2x"></i></a>
				</li>								
				<li  >
					<a title="Issues Worked Status" class="<?php echo ($issue_worked_status)? 'active-menu':'';?>""  href="issue_status.php"><i class="fa fa-bullhorn  fa-2x"></i></a>
				</li>						

			<li  >
				<a title="Translation Articles" class="<?php echo ($article_translate_menu)? 'active-menu':'';?>""  href="article_translate.php"><i class="fa fa-text-height  fa-2x"></i></a>
			</li>

			<li  >
				<a title="Articles" class="<?php echo ($article_editing)? 'active-menu':'';?>"  href="articles.php"><i class="fa fa-pencil-square-o  fa-2x"></i></a>
			</li>

			<li  >
				<a title="RSS Creator" class="<?php echo ($rss_creator)? 'active-menu':'';?>"  href="create_service_link.php"><i class="fa fa-rss fa-2x"></i></a>
			</li>			
			<?php }?>
			<?php 
				if($_COOKIE['type']  == 1){ // editor menu
			?>			
			<li  >
				<a title="Articles" class="<?php echo ($article_editing)? 'active-menu':'';?>"  href="articles.php"><i class="fa fa-pencil-square-o  fa-2x"></i></a>
			</li>
				<li  >
					<a title="Publications Issue Status" class="<?php echo ($wroten_publications)? 'active-menu':'';?>""  href="publication_work_statistics.php"><i class="fa fa-exclamation-circle  fa-2x"></i></a>
				</li>								
				<li  >
					<a title="Issues Worked Status" class="<?php echo ($issue_worked_status)? 'active-menu':'';?>""  href="issue_status.php"><i class="fa fa-bullhorn  fa-2x"></i></a>
				</li>			
			<?php }?>	
			<?php 
				if($_COOKIE['type']  == 2){ //translate menu
			?>
			<li  >
				<a title="Translation Articles" class="<?php echo ($article_translate_menu)? 'active-menu':'';?>""  href="article_translate.php"><i class="fa fa-text-height  fa-2x"></i></a>
			</li>	
				<?php }?>			
		  </ul>
	   
	</div>
	
</nav> 