<?php
session_start();
error_reporting(0);
if(!$_COOKIE['uid']){
	header("Location: index.php?err=2");
    die();			
}

include('includes/db.php');

/*
$db->where ('username', $uname );
$db->where ('password', $upass);				

$users = $db->getOne('users');
*/

$country = $_POST['country'];
$publication_type = $_POST['publication_type'];
$publication = @implode(",", $_POST['publication']);

$issue_from = $_POST['issue_from'];
$issue_to = $_POST['issue_to'];

$create_from = $_POST['create_from'];
$create_to = $_POST['create_to'];


$artcile_status = $_POST['artcile_status'];

$countries = $db->rawQuery('SELECT DISTINCT( select name_en from country where iso = `country` ) as country_name , country as country_code FROM `publication`  ' );

if($country){
	$publication_types = $db->rawQuery('SELECT DISTINCT(select name_en from publication_type where id=`type_id`) as publication_type_name, type_id as publication_type_code   FROM `publication` where country = "'.$country.'"');	
}


if($publication_type){
	$publications  = $db->rawQuery('SELECT *  FROM `publication` where type_id="'.$publication_type.'" and country ="'.$country.'"');
}

$callURL = 'server_processing.php?country='.$country.'&publication_type='.$publication_type.'&publication='.$publication.'&issue_from='.$issue_from.'&issue_to='.$issue_to.'&create_from='.$create_from.'&create_to='.$create_to.'&artcile_status='.$artcile_status;

?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
      <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MediaObserver Admin page</title>
	
    <link href="assets/css/bootstrap.css" rel="stylesheet" />
    <link href="assets/css/font-awesome.css" rel="stylesheet" />
    <link href="assets/css/custom.css" rel="stylesheet" />
    <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css' />
    <link href="assets/js/dataTables/dataTables.bootstrap.css" rel="stylesheet" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.1/css/bootstrap-select.min.css">
	

    <script src="assets/js/jquery-1.10.2.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/dataTables/jquery.dataTables.js"></script>	
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.12.1/js/bootstrap-select.min.js"></script>	
    <script src="assets/js/jquery.chained.remote.js"></script>
	<script src="assets/js/bootstrap-datetimepicker.min.js"></script>

	
	  <style>
  .carousel-inner > .item > img,
  .carousel-inner > .item > a > img {
      width: auto;
      margin: auto;
  }
  </style>
	
	<style type="text/css" class="init">
	
	td.details-control {
		background: url('assets/img/editIcon.png') no-repeat center center;
		cursor: pointer;
	}
	tr.shown td.details-control {
		background: url('assets/img/editIcon.png') no-repeat center center;
	}
	
	.modal-dialog {
	  width: 99%;
	  height: 95%;
	  margin: 0;
	  padding:  0 ;
	}

	.modal-content {
	  height: auto;
	  min-height: 90%;
	  border-radius: 0;
	}
	</style>
	
<script>
$(function() {

$('#article_form_sumbit').on('click', function(e) {
	
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "save_artile.php",
        data: $('#article_form').serialize(),
        success: function(data) {
			var obj = jQuery.parseJSON(data);
            alert(obj.message);
			$('#myModal').modal('hide');
        },
        error: function() {
            alert('Error');
        }
    });
    return false;
});
});
</script>
<script type="text/javascript" language="javascript" class="init">
	
function format ( d ) {
	  $.ajax({
		  url: 'article_form_content.php',
		  type: 'POST',
		  data: 'id='+d['article_id'],
		  dataType: 'json'
	  })
	  .done(function(data){
		  console.log(data);
		  
		  if (data.message == 'false'){
			   $('#myModal').modal('hide');
			   alert('article is being used');
			   return false;
		  }
		  
		  $('#article_id').val(data.id);
		  $('#article_text').val(data.text);
		  $('#headline').val(data.headline);
		 
	  })
	  .fail(function(){
		  $('.modal-body').html('<i class="glyphicon glyphicon-info-sign"></i> Something went wrong, Please try again...');
	  });
	  
	 $('#myModal').modal('show');
	 return 'Viewed ..';
  
}
 
$(document).ready(function() {
	 $(".form_datetime").datetimepicker({
    minView: 2,
    format: 'yyyy-mm-dd',
    autoclose: true
		 });

$('.myCarousel').carousel({
    interval: false
}); 

$('#myModal').on('hidden.bs.modal', function () {
  var article_id = $('#article_id').val() ;
	  $.ajax({
		  url: 'close_article.php',
		  type: 'POST',
		  data: 'id='+article_id,
		  dataType: 'json'
	  })
	  .done(function(data){
		 //alert(data.message);
	  })
	  .fail(function(){
		 alert('Something went wrong, Please try again...');
	  });
	  
 });
		 
	$("#publication_type").remoteChained({
		parents : "#country",
		url : "json.php",
		loading : "Loading...",
		
	});

	$("#publication").remoteChained({
		parents : "#publication_type",
		url : "json.php",
		loading : "Loading...",
		 depends : "#country"
	
	});
	
  $('#publication').on('change', function(){
	$('.selectpicker').selectpicker('refresh');
  });
  
    var dt = $('#fulltable').DataTable( {
        "processing": true,
        "serverSide": true,
         "ajax": "<?php echo $callURL;?>",
        
        "columns": [
            {
                "class":          "details-control",
                "orderable":      false,
                "data":           false,
                "defaultContent": ""
            },
         
            { "data": "article_id" },
            { "data": "publication_name_en" },
			{ "data": "issue" },
			{ "data": "section_name_en" },
			{ "data": "headline" },
			{ "data": "created" },
			
        ],
        "order": [[1, 'asc']]
    } );
 
    // Array to track the ids of the details displayed rows
    var detailRows = [];
 
    $('#fulltable tbody').on( 'click', 'tr td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = dt.row( tr );
        var idx = $.inArray( tr.attr('id'), detailRows );
 
        if ( row.child.isShown() ) {
            tr.removeClass( 'details' );
            row.child.hide();
 
            // Remove from the 'open' array
            detailRows.splice( idx, 1 );
        }
        else {
            tr.addClass( 'details' );
            row.child( format( row.data() ) ).show();
 
            // Add to the 'open' array
            if ( idx === -1 ) {
                detailRows.push( tr.attr('id') );
            }
        }
    } );
 
    // On each draw, loop over the `detailRows` array and show any child rows
    dt.on( 'draw', function () {
        $.each( detailRows, function ( i, id ) {
            $('#'+id+' td.details-control').trigger( 'click' );
        } );
    } );
} );
	</script>	
</head>
<body>
    <div id="wrapper">
        <nav class="navbar navbar-default navbar-cls-top " role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <span class="navbar-brand">MediaObserver</span> 
            </div>
  <div style="color: white;
padding: 15px 50px 5px 50px;
float: right;
font-size: 16px;">  <a href="logout.php" class="btn btn-danger square-btn-adjust">Logout</a> 
</div>
        </nav>   
           <!-- /. NAV TOP  -->
                <nav class="navbar-default navbar-side" role="navigation">
            <div class="sidebar-collapse">
                <ul class="nav" id="main-menu">
				<li class="text-center">
                    <img src="assets/img/find_user.png" class="user-image img-responsive"/>
					</li>
				
					
                    <li>
                        <a  href="index.html"><i class="fa fa-dashboard fa-3x"></i> Dashboard</a>
                    </li>
                   <li>
                        <a  href="ui.html"><i class="fa fa-desktop fa-3x"></i> UI Elements</a>
                    </li>
                    <li>
                        <a  href="tab-panel.html"><i class="fa fa-qrcode fa-3x"></i> Tabs & Panels</a>
                    </li>
						   <li  >
                        <a  href="chart.html"><i class="fa fa-bar-chart-o fa-3x"></i> Morris Charts</a>
                    </li>	
                      <li  >
                        <a class="active-menu"  href="table.html"><i class="fa fa-table fa-3x"></i> Table Examples</a>
                    </li>
                    <li  >
                        <a  href="form.html"><i class="fa fa-edit fa-3x"></i> Forms </a>
                    </li>				
					
					                   
              
                 	
                </ul>
               
            </div>
            
        </nav>  
        <!-- /. NAV SIDE  -->