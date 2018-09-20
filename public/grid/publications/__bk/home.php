<?php
$section_name= 'Publications';
include('includes/db.php');
$publications_menu = true;

if( sizeof($_POST) > 0 ){
	unset($_COOKIE['search_country']);
	unset($_COOKIE['publication']);
	unset($_COOKIE['langs']);
	unset($_COOKIE['freq']);
	unset($_COOKIE['types']);

} 


$search_country = ($_POST['search_country'])? $_POST['search_country'] :  $_COOKIE['search_country'];
$publication = ($_POST['publication'])? $_POST['publication'] :  $_COOKIE['publication'];
$langs =  ( $_POST['langs'] )? @implode(",", $_POST['langs']) :   $_COOKIE['langs'];
$freq =  ( $_POST['freq'] )? @implode(",", $_POST['freq']) :   $_COOKIE['freq'];
$types =  ($_POST['types'])? @implode(",", $_POST['types'])   : $_COOKIE['types'];



if( sizeof($_POST) > 0 ){
	setcookie("search_country", $search_country);
	setcookie("publication", $publication);
	setcookie("langs", $langs);
	setcookie("freq", $langs);	
	setcookie("types", $types);
} 

//$languages = $db->rawQuery(' select DISTINCT(p.`language`) from publication p ' ); 
$languages = $db->rawQuery(' select * from publication_language ' ); 
$countries = $db->rawQuery(' select * from country  ' ); 
$frequency = $db->rawQuery(' select * from publication_frequency  ' ); 
$genre = $db->rawQuery(' select * from publication_genre ' ); 

//$types_id = ($_SESSION['gid'] == 7)? '1,2,3,4':'1,2';
$types_id = '1,2,3,4,5';
$publication_types = $db->rawQuery(' select * from publication_type where id in ('.$types_id.')' );

$callURL = 'json/publications/get_datatable.php?country='.$search_country.'&publication='.$publication.'&langs='.$langs.'&freq='.$freq.'&types='.$types.'&rates='.$rates.'&active='.$active;


?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
      <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MediaObserver</title>
	<link rel="shortcut icon" type="image/x-icon" href="/project/favicon.ico">
	
    <link href="assets/css/bootstrap.css" rel="stylesheet" />
    <link href="assets/css/font-awesome.css" rel="stylesheet" />
    <link href="assets/css/custom.css" rel="stylesheet" />
    <link href="assets/js/dataTables/dataTables.bootstrap.css" rel="stylesheet" />
	<link rel="stylesheet" href="assets/css/bootstrap-select.min.css">
	<link href="assets/css/animate.css" rel="stylesheet" />
	<link href="assets/css/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <link href="assets/css/select2.css" rel="stylesheet" />
	<link href="assets/css/popup.css" rel="stylesheet" />	
	<link href="assets/js/dataTables/plugs/buttons.dataTables.min.css" rel="stylesheet" />	

    <script src="assets/js/jquery-1.10.2.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/dataTables/jquery.dataTables.min.js"></script>	
    <script src="assets/js/bootstrap-select.min.js"></script>	
    <script src="assets/js/jquery.chained.remote.js"></script>
	<script src="assets/js/bootstrap-datetimepicker.min.js"></script>
	<script src="assets/js/bootstrap-notify.min.js"></script>
    <script src="assets/js/select2.js"></script>
	<script src="assets/js/jquery.popup.min.js"></script>
	<script src="assets/js/jquery.form-validator.min.js"></script>
	
	<script src="assets/js/dataTables/plugs/dataTables.buttons.min.js"></script>
	<script src="assets/js/dataTables/plugs/buttons.flash.min.js"></script>
	<script src="assets/js/dataTables/plugs/jszip.min.js"></script>
	<script src="assets/js/dataTables/plugs/pdfmake.min.js"></script>
	<script src="assets/js/dataTables/plugs/vfs_fonts.js"></script>
	<script src="assets/js/dataTables/plugs/buttons.html5.min.js"></script>
	<script src="assets/js/dataTables/plugs/buttons.print.min.js"></script>

	









<script>



$(document).ready(function() {
	
	$.validate({
		form : '#editpubForm',
		validateOnBlur : true,
		showHelpOnFocus : true,
	});

		
	$("#publication").select2({
		
		tokenSeparators: [",", " "],
		multiple: true,
		closeOnSelect: true,
		minimumInputLength: 2,
		ajax: {
			placeholder: 'Name',
			url: 'json/publications/menu_json.php?getBy=publication',
			dataType: 'json',
			data: function (term, page) {
				
				return {
					searchTerm: term
				};
			},
			results: function (data, page) {
				
				return { results: data };
			}
		},
		initSelection: function (element, callback) {
			var x = document.getElementById("hdntype").value;
			$.ajax('json/publications/menu_json.php?getBy=publication&id=' + x, {
				type: 'GET',
				dataType: 'json'
			}).done(function (data) {
				callback(data);
			});
		}
	}).select2('val', []);		
	
	$('#frequency_name').on('change', function () {
		var vals = $(this).find("option:selected").val();
		var repetition = $(this).find("option:selected").attr('repetition');
		
		if(vals){
			changeIssueMenu(vals, repetition);
		}
	});
	
	
	$("#country").select2({
	
	tokenSeparators: [",", " "],
	multiple: true,
	closeOnSelect: true,
	minimumInputLength: 2,
	ajax: {
		placeholder: 'Select Country',
		url: 'json/publications/menu_json.php?getBy=country',
		dataType: 'json',
		data: function (term, page) {
			
			return {
				searchTerm: term
			};
		},
		results: function (data, page) {
			
			return { results: data };
		}
	},
	initSelection: function (element, callback) {
		var x = document.getElementById("hdcountry").value;
		$.ajax('json/publications/menu_json.php?getBy=country&id=' + x, {
			type: 'GET',
			dataType: 'json'
		}).done(function (data) {
			callback(data);
		});
	}
	}).select2('val', []);
	
	var rateStr = 'Rates';
  
    var dt = $('#fulltable').DataTable( {

         "ajax": "<?php echo $callURL ;?>",
        "autoWidth": false,
		 "retrieve": true,
		 "stateSave": true,
		 "searching": false,
		 "pageLength": 25,
		 //"dom": 'Bfrtip',
		 "buttons": [ 'csv', 'excel', 'pdf', 'print'],		 
		 // "searching": false, 'copy',
		// "dom": '<"top"i>rt<"bottom"flp><"clear">',
		 
        "columns": [
            { "data": "name_en" ,  "width": "30%",},
			{ "data": "name_ar" ,  "width": "30%",},
			{ "data": "display_date" , "width": "10%", },
			{ "data": "type_name" , "width": "10%", },
			{ "data": "country" , "width": "20%", },
			{ "data": "language" , "width": "20%", },
        ],
      	
        "order": [[0, 'desc']]
    } );
} );
	</script>	
</head>
<body>
    <div id="wrapper">
        <nav class="navbar navbar-default navbar-cls-top " role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <span class="navbar-brand"><img src="assets/img/find_user2.png" /></span> 
            </div>
  <div style="color: white;
padding: 15px 50px 5px 50px;
float: right;
font-size: 16px;">  <a href="logout.php" class="btn btn-danger square-btn-adjust">Logout</a> 
</div>
        </nav>   
           <!-- /. NAV TOP  -->
  
        <!-- /. NAV SIDE  -->

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta name="generator" content=  "MediaObserver Developer Department" />
  <title>MediaObserver </title>
</head>

<body>
  <div id="page-wrapper">
    <div id="page-inner">
      <div class="row">
        <div class="col-md-11">
          <div class="panel panel-default">
            <div class="panel-heading">
              Publications  
            </div>
			<form role="form" action="home.php" method="post" id="search_form">
            <div class="panel-body">
				<div class="col-md-2" style="padding-left:0px !important">
                  <div class="form-group">
					<input type="hidden" name="hdntype" id="hdntype" value="<?php echo $publication;?>" />
				    <input name="publication" type="text" id="publication" placeholder="Name (English or Arabic)" style="width:100%"  />
                  </div>
                </div>

				
				
			<div class="col-md-2">
			  <div class="form-group">
				
				<select data-live-search="true"   multiple="multiple" data-selected-text-format="count > 3" id="langs" title="Languages" name="langs[]" class="form-control selectpicker">
				 <?php 
							  if (sizeof($languages) > 0 ){
									  foreach ($languages as $l_item) {
										   $selected = '';
										   $arr_langs = explode(',',$langs);
											  if( in_array(  $l_item['name_en'], $arr_langs) ){
													  $selected = 'selected';
											  }									  
										  
											  echo '<option value="'.$l_item['name_en'].'" '.$selected.'>'.$l_item['name_en'].'</option>';
									  }                                                                                                                       
									  
							  }
					  ?>
				</select>
			  </div>
			</div>

			<div class="col-md-2">
			  <div class="form-group">
				
				<select data-live-search="true"   multiple="multiple" data-selected-text-format="count > 3" id="freq" title="Frequency" name="freq[]" class="form-control selectpicker">
				 <?php 
							  if (sizeof($frequency) > 0 ){
									  foreach ($frequency as $l_item) {
										   $selected = '';
										   $arr_langs = explode(',',$freq);
											  if( in_array(  $l_item['id'], $arr_langs) ){
													  $selected = 'selected';
											  }									  
											  echo '<option value="'.$l_item['id'].'" '.$selected.'>'.$l_item['name_en'].'</option>';
									  }                                                                                                                       
									  
							  }
					  ?>
				</select>
			  </div>
			</div>			
			
			<div class="col-md-3">
			  <div class="form-group">
				
				<select data-live-search="true"   multiple="multiple" data-selected-text-format="count > 3" id="types" title="Types" name="types[]" class="form-control selectpicker">
				 <?php 
							  if (sizeof($publication_types) > 0 ){
									  foreach ($publication_types as $l_item) {
										   $selected = '';
											  $arr_types = explode(',',$types);
											  
											  if( in_array(  $l_item['id'], $arr_types) ){
													  $selected = 'selected';
											  }									  
										  
											  echo '<option value="'.$l_item['id'].'"  '.$selected.'>'.$l_item['name_en'].'</option>';
									  }                                                                                                                       
									  
							  }
					  ?>
				</select>
			  </div>
			</div>			
			<div class="col-md-2">
			  <div class="form-group">
					<input type="hidden" name="hdntype" id="hdcountry" value="<?php echo $search_country;?>" />
				    <input name="search_country" type="text" id="country" placeholder="Country" style="width:100%" />				
			
			  </div>
			</div>
			
			<div class="form-group">
				<!-- input name="publication"  id="publication" placeholder="Select Publication" style="width:80%"  / -->
				<button type="submit"  class="btn btn-primary add">Search</button>
				
			</div>
			</form>			
			
                <table id="fulltable" class="display table" width="100%" cellspacing="0">
                  <thead>
                    <tr>
                      
                      <th >Name (EN)</th>
					  <th >Name (AR)</th>
					  <th >Last Issue</th>
					  <th >Type</th>
					  <th >Country</th>
					  <th >Language</th>
                    </tr>
                  </thead>
                </table>
            </div>
         
        </div>

	  </div>		
      	  
   
    </div><!-- Modal -->


  </div>
	<?php   include('includes/footer.php');
    ?>

</body>
</html>
