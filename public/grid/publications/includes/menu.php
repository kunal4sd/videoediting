 <nav class="navbar-default navbar-side" role="navigation">
	<div class="sidebar-collapse">
		<ul class="nav" id="main-menu">
<?php 

$q2  = '
		select 
		group_concat( up.section) as sections from group_privilege gp inner join user_privilege up on up.id = gp.privilege_id 
		where gp.group_id='.$_SESSION['gid'].' and up.`function`=\'Access\'
		';

$userSections = $db->rawQueryOne($q2);
$uSections = explode(',' , $userSections['sections'] );

?>


			<?php if( in_array('Dashboard',$uSections) ){?>
				<li>
					<a title="Dashboard" style="<?php echo ($dashboard)? 'active-menu':'';?>"" href="dashboard.php"><i class="fa fa-dashboard fa-2x"></i></a>
				</li>
			<?php }?>
			<?php if( in_array('Locked Article',$uSections) ){?>
				<li  >
					<a title="LockArticle" class="<?php echo ($locked_articles)? 'active-menu':'';?>""  href="lock_articles.php"><i class="fa fa-lock  fa-2x"></i></a>
				</li>
			<?php }?>
			<?php if( in_array('Publications',$uSections) ){?>				
				<li  >
					<a title="Publications" class="<?php echo ($publications_menu)? 'active-menu':'';?>""  href="publication.php"><i class="fa fa-book fa-2x"></i></a>
				</li>	
			<?php }?>
			<?php if( in_array('Publication Issu Status',$uSections) ){?>			
				<li  >
					<a title="Publications Issue Status" class="<?php echo ($wroten_publications)? 'active-menu':'';?>""  href="publication_work_statistics.php"><i class="fa fa-exclamation-circle  fa-2x"></i></a>
				</li>
			<?php }?>
			<?php if( in_array('Publication Work Status',$uSections) ){?>				
				<li  >
					<a title="Issues Worked Status" class="<?php echo ($issue_worked_status)? 'active-menu':'';?>""  href="issue_status.php"><i class="fa fa-bullhorn  fa-2x"></i></a>
				</li>						
			<?php }?>
			<?php if( in_array('Translate Article',$uSections) ){?>
			<li>
				<a title="Translation Articles" class="<?php echo ($article_translate_menu)? 'active-menu':'';?>""  href="article_translate.php"><i class="fa fa-text-height  fa-2x"></i></a>
			</li>
			<?php }?>
			<?php if( in_array('Article',$uSections) ){?>
			<li>
				<a title="Articles" class="<?php echo ($article_editing)? 'active-menu':'';?>"  href="articles.php"><i class="fa fa-pencil-square-o  fa-2x"></i></a>
			</li>
			<?php }?>
			<?php if( in_array('RSS',$uSections) ){?>
			<li>
				<a title="RSS Creator" class="<?php echo ($rss_creator)? 'active-menu':'';?>"  href="create_service_link.php"><i class="fa fa-rss fa-2x"></i></a>
			</li>
			<?php }?>
			<?php if( in_array('Newspaper Logs',$uSections) ){?>
			<li>
				<a title="Newspapers Log" class="<?php echo ($newspapers_logs)? 'active-menu':'';?>"  href="newsletters_log.php"><i class="fa  fa-minus-square fa-2x"></i></a>
			</li>
			<?php }?>
			<?php if( in_array('Keywords Logs',$uSections) ){?>
			<li>
				<a title="Keywords" class="<?php echo ($keywords)? 'active-menu':'';?>"  href="keyword.php"><i class="fa fa-sort-alpha-desc  fa-2x"></i></a>
			</li>	
			<?php }?>
			<?php if( in_array('Yaz Page',$uSections) ){?>			
			<li>
				<a title="Sphinx Search" class="<?php echo ($videos)? 'active-menu':'';?>"  href="yaz_page.php"><i class="fa fa-sun-o   fa-2x"></i></a>
			</li>	
			<?php }?>
			
			<?php if( in_array('Daily Report Generation',$uSections) ){?>			
			<li>
				<a title="Custom Newspaper" class="<?php echo ($daily_report_generation)? 'active-menu':'';?>"  href="custom_newspaper.php"><i class="fa fa-cogs   fa-2x"></i></a>
			</li>	
			<?php }?>
			
		  </ul>
	   
	</div>
	
</nav> 