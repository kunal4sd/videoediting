<?php
$section_name= 'Publications';
include('/var/www/edit.mediaobserver-me.com/config/db.php');
$publications_menu = true;

$pupID = 3;

$grids = $db2->rawQuery(' select * from grids where publication_id ='.$pupID );

$callURL = 'json/grid/get_datatable.php?gid=';

 
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
      <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MediaObserver Admin page</title>
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
	<link href="assets/css/jquery-ui.min.css" rel="stylesheet" />
	<link href="assets/css/daterangepicker.css" rel="stylesheet" />
	<link href="assets/css/timepicker.css" rel="stylesheet" />
	<link href="assets/js/include/ui-1.10.0/ui-lightness/jquery-ui-1.10.0.custom.min.css" rel="stylesheet" />
	<link href="assets/js/jquery.ui.timepicker.css" rel="stylesheet" />
	
	<link href="assets/js//jquery-ui-timepicker-addon.css" rel="stylesheet" />
	<link href="assets/css/jquery.ptTimeSelect.css" rel="stylesheet" />
	
	
    
	<script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>

    <script src="assets/js/jquery-1.10.2.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <script src="assets/js/dataTables/jquery.dataTables.js"></script>	
    <script src="assets/js/bootstrap-select.min.js"></script>	
    <script src="assets/js/jquery.chained.remote.js"></script>
	<script src="assets/js/bootstrap-datetimepicker.min.js"></script>
	<script src="assets/js/bootstrap-notify.min.js"></script>
    <script src="assets/js/select2.js"></script>
	<script src="assets/js/jquery.popup.min.js"></script>
	<script src="assets/js/jquery.form-validator.min.js"></script>
	<script src="assets/js/jquery-ui.min.js"></script>
	<script src="assets/js/moment.min.js"></script>
	<script src="assets/js/timepicker.js"></script>
	<script src="assets/js/daterangepicker.js"></script>
	<!-- script src="assets/js/jquery.ui.timepicker.js"></script -->
	<script src="assets/js/jquery-ui-timepicker-addon.js"></script>
	<script src="assets/js/jquery.ptTimeSelect.js"></script>
	
	<style>
	td.details-control {
		background: url('assets/img/editIcon.png') no-repeat center center;
		cursor: pointer;
	}
	tr.shown td.details-control {
		background: url('assets/img/editIcon.png') no-repeat center center;
	}	
	.pointer{cursor: pointer;}
	.radio_lbl{width:70px;}
	.daysTable td{
		padding:2px;
	}
	.ui-timepicker-table td a{
		padding : 0.2em 0em .1em 0em !important;
	}
	.timerInput{
		width:100px;
	}
	
    </style>

<script>
function enable(ac , act=false){
	//$('#'+ac+' input').val('');

	$('#'+ac+' input').prop('disabled', act);
	$('#'+ac+' button').prop('disabled', act);	
}


function savegrid(){
	$.ajax({
		url: 'json/grid/savegrid.php', // url where to submit the request
		type : "POST", // type of action POST || GET
		dataType : 'json', // data type
		data : $("#gridFormData").serialize(), // post data || get data
		success : function(result) {
			
			$.notify(result['message']);
			if(result['action'] == 'add'){
				addGrid(result['title'], result['gid'])
			}
		},
		error: function(xhr, resp, text) {
			$.notify('Somthing goes wrong');
		}
		
	})	
	enable('gridFormData',true)		
		
}

function AddEditGrid(id=0){
	enable('gridForm');
	

	
	
	if( id > 0 ){
		$.getJSON( "json/grid/getGridInfo.php?id="+id, function( json ) {
			$('#fdate').val(json.from_date+' - '+json.to_date);
			//$('#tdate').val(json.to_date);
			$('#grid_id').val(id);
			$('#name_en').val(json.name);
			
		});
		$('#pub_name').html('Edit Grid');
	} else {
		$('#pub_name').html('Add Grid');
	}
	onReadyPage()
}

function AddEditProgram(showID, programID=0){
	var dayNu = 0;
	var saveDate = 0;
	var repeatTr = false;
	var repeatCounter = 0;
	var repeatCB;
	removeCloneTR();
	if( programID > 0 ){
		
		$.getJSON( "json/grid/getProgInfo.php?id="+programID, function( json ) {
			
			$('#pgrid_id').val(json.prog.grid_id);
			$('#pname_en').val(json.prog.show_name);

			$( 'input[name^=pftime_]' ).val('')
			$( 'input[name^=pttime_]' ).val('')
			$( 'input[name^=selBox_]' ).prop( "checked", false );
			$( 'input[name^=repeat_]' ).prop( "checked", false );
			
			 $.each( json.prog_ep	, function( key, val ) {
				repeatCB = (val.repeat == 'N') ? false : true;
				
				if(val.day == saveDate){
						repeatTr = true;
				}
				saveDate=val.day;
				switch(val.day) {
					case 'SAT': dayNu =0 ;     break;
					case 'SUN': dayNu =1 ;     break;
					case 'MON': dayNu =2 ;     break;
					case 'TUE': dayNu =3 ;     break;
					case 'WED': dayNu =4 ;     break;
					case 'THU': dayNu =5 ;     break;
					case 'FRI': dayNu =6 ;     break;
				}
				if (repeatTr){
					addTr( '[name^=addbtn_'+dayNu+']:eq('+repeatCounter+')');
					repeatCounter++;
				} else {
					repeatCounter = 0;
				}
				for(i=0;i<7;i++){
					if (dayNu == i){
						if(repeatTr){
							$( 'input[name^=pftime_'+dayNu+']:eq('+repeatCounter+')' ).val(val.from_date_time)
							$( 'input[name^=pttime_'+dayNu+']:eq('+repeatCounter+')' ).val(val.to_date_time)
							$( 'input[name^=selBox_'+dayNu+']:eq('+repeatCounter+')' ).prop( "checked", true );
							$( 'input[name^=repeat_'+dayNu+']:eq('+repeatCounter+')' ).prop( "checked", repeatCB );							
						} else {
							
							$( 'input[name^=pftime_'+dayNu+']' ).val(val.from_date_time)
							$( 'input[name^=pttime_'+dayNu+']' ).val(val.to_date_time)
							$( 'input[name^=selBox_'+dayNu+']' ).prop( "checked", true );
							$( 'input[name^=repeat_'+dayNu+']' ).prop( "checked", repeatCB );
						}
						
					} 
				}
				if (repeatTr){
					repeatTr = false;
				}
			 });
			
		});
		//$('#pub_name').html('Edit Grid');
	} else {
		//$('#pub_name').html('Add Grid');
	}
	enable('progForm');	
	$('#pgrid_id').val (showID);
	$('#program_id').val (programID);
	onReadyPage()
}
function convertCheckToStr(checkName){
	var str ='';
	//var repeat = false
	$('input[name^='+checkName+']').each(function () {
		if ( $(this).is(':checked')) {
			var repeat = $(this).parent().next().next().next().find('input').is(':checked');
			str += (repeat) ? 'on,':'off,';
		} 
	});
	return str;
}
function saveProg(){
		$('#repeatStr').val( convertCheckToStr('selBox_') );
		//$('#selStr').val( convertCheckToStr('') );
		
		$.ajax({
		url: 'json/grid/saveprog.php', // url where to submit the request
		type : "POST", // type of action POST || GET
		dataType : 'json', // data type
		data : $("#progFormData").serialize(), // post data || get data
		success : function(result) {
			$.notify(result);
		},
		error: function(xhr, resp, text) {
			$.notify('Somthing goes wrong');
		}
		
	})	
	
	//enable('progFormData',true)		
	
}

function openDatatable(id){
		
		  var dt = $('#fulltable'+id).DataTable( {

				"ajax": "<?php echo $callURL ;?>"+id,
				"autoWidth": false,
				 "retrieve": true,
				 "stateSave": true,
				 // "searching": false,
				 
				// "dom": '<"top"i>rt<"bottom"flp><"clear">',
				 
				"columns": [
					{
						"className":      'details-control',
						"orderable":      false,
						"data":           null,
						"defaultContent": '',
						"width": "2%"
					},
					{ "data": "id" , "width": "5%", },
					{ "data": "show_name" ,  "width": "30%",},
				],
				"columnDefs": [
					{
						"render": function ( data, type, row ) {
							return '<a  class="pointer" onclick="AddEditProgram(0, '+row.id+')" >Edit</a>'; 						
						
						},
						"targets": 3
					},
					
					//row.article_id		
								
				],
				
				"order": [[1, 'desc']]
			} );



    $('#fulltable'+id+' tbody').on('click', 'td.details-control', function () {
		
        var tr = $(this).closest('tr');
        var row = dt.row( tr );
 
        if ( row.child.isShown() ) {
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
			//var gdate = format(row.data());
		
		
		$.getJSON( "json/grid/get_showTimes.php?sid="+row.data().id, function( json ) {
			
			var tableTxt = '<table cellpadding="5" cellspacing="0" border="1" style="padding-left:50px; width:100%">';
			  $.each( json.data, function( key, val ) {
				  
				tableTxt +='<tr>'+
							'<td>'+val.day+' </td>'+
							'<td>'+val.from_date_time+' - '+val.to_date_time+' </td>'+
							'</tr>';
							
			  });
			tableTxt +='</table>'
				row.child(tableTxt ).show();
				tr.addClass('shown');
				
			
		});				
			
            
        }
    } );	

	
			
}

function onReadyPage(){
	/*$('.timerInput').ptTimeSelect();*/
	$('.timerInput').timepicker({
		timeFormat: 'HH:mm',
		/*stepMinute: 5,*/
		
		});
		
		$('.selectpicker').selectpicker({
		  style: 'btn-info',
		  size: 4
		});

		
    $(".repeatV").click(function(){
		copyToTime   = $(this).parent().prev().prev().find( "input[name^='pttime']" ).val();
		copyFromTime = $(this).parent().prev().prev().find( "input[name^='pftime']" ).val();
		
		dialog = $("#dialog-form").dialog({
			autoOpen: false,
			height: 300,
			width: 350,
			modal: true,
			buttons: {
				Save: function () {
				   $('#dialog-form input[type=checkbox]').each(function () {
						if( this.checked ){
							lo = $(this).val();
							var fele = $('input[name^="pftime_'+lo+'"]:last');
							var tele = $('input[name^="pttime_'+lo+'"]:last');
							var cele = $('input[name^="selBox_'+lo+'"]:last');
							if (  cele.is(':checked') ){
								addTr('input[name^="pftime_'+lo+'"]');
								var fele = $('input[name^="pftime_'+lo+'"]:last');
								var tele = $('input[name^="pttime_'+lo+'"]:last');
								var cele = $('input[name^="selBox_'+lo+'"]:last');								
							} 
							fele.val(copyFromTime);
							tele.val(copyToTime);
							cele.prop('checked', true);
													
							
						} ;
					});
				}			

			},
			close: function () {
				$('#dialog-form input:checkbox').prop('checked', false);
			}
		});		
        dialog.dialog("open");
    });		
}

var lo;
var elz = '';
var copyToTime='';
var copyFromTime='';


	
$(document).ready(function() {

	$('.datetimepicker2').datetimepicker({
		controlType: 'select',
		oneLine: true,
		timeFormat: 'HH:mm:ss',
		dateFormat:'yy-mm-dd'
	});
	
	 $('.daterange2').daterangepicker({
        timePicker: false,
        timePickerIncrement: 10,
        locale: {
            format: 'YYYY-MM-DD'
        }
    });
	
	 $( "#accordion" ).accordion({
		heightStyle: "content",
		activate: function(event, ui) {
          var tabID = ui.newHeader.attr( 'gridID' );
		  openDatatable(tabID)
		}
     });
	 
	 openDatatable(<?php echo $grids[0]['id'];?>);	
	
	 enable('progForm',true);
	 enable('gridForm',true);
	
    onReadyPage()
	$('#dialog-form').hide();
	
	

} );

var wdays  = ['SAT','SUN','MON','TUE','WED','THU','FRI'];

function removeCloneTR(){
	$(".cloneElent").remove();
	$(".timerInput").val('');
	$("INPUT[type='checkbox']").prop('checked', false); 
	$("#pgrid_id").val(0);
	$("#program_id").val(0);
	$("#pname_en").val('');
		
	
}
function addTr(elm){
	
	var tr    = $(elm).closest('tr');
	var clone = tr.clone();
	clone.find(':text').val('');
	tr.after(clone);
	clone.addClass('cloneElent');
	clone.find('input:not(:checkbox):not(:button)').removeClass('hasDatepicker').timepicker(); 
	
	onReadyPage()
};	

function addGrid(title, id){
		var newDiv = '<h3 gridID="'+id+'"> '+title+' <a onclick="AddEditGrid('+id+')">Edit</a> | <a onclick="AddEditProgram('+id+')">Add Program</a></h3><div><table id="fulltable'+id+'" class="display table" width="100%" cellspacing="0"><thead><tr><th></th><th >ID</th><th >Name</th><th >Edit</th></tr></thead></table></div>';
		$('#accordion').append(newDiv)
		$('#accordion').accordion("refresh");        
}

function addProg(progID){
	$('#fulltable'+progID).DataTable().row.add( [
            '0',
            '1',
            '2',
            '3'
        ] ).draw( false );
}

	</script>	
</head>

    
 
<body>
  
    <div id="page-inner">
      <div class="row">
        <div class="col-md-7">
          <div class="panel panel-default">
            <div class="panel-heading">
              <a  id="addAccordion" onClick="addProg(12);">AAAA</a> Publications  <button type="button" style="float:right; padding:0 10px 0px 10px !important;" onclick="AddEditGrid()" class="btn btn-default">Add Grid</button>
            </div>
				
<div id="accordion">

<?php foreach($grids as $grid){?>
  <h3 gridID="<?php echo $grid['id'];?>"><?php echo $grid['name'] .'('.$grid['from_date'].'To '.$grid['to_date'].')'?> <a onclick="AddEditGrid(<?php echo $grid['id'];?>)">Edit</a> | <a onclick="AddEditProgram(<?php echo $grid['id'];?>)">Add Program</a></h3>
  <div>
  
    <table id="fulltable<?php echo $grid['id'];?>" class="display table" width="100%" cellspacing="0">
                  <thead>
                    <tr>
					  <th></th>
                      <th >ID</th>
                      <th >Name</th>
					  <th >Edit</th>
                    </tr>
                  </thead>
                </table>
				
				
       
        
   
  </div>
  <?php }?>


       

</div>			
            
            </div>
         
        </div>

        <div class="col-md-5" id="pub_info" >
          <div class="panel panel-default">
            <div class="panel-heading"><span id="pub_name"></span></div>
			<div id="pub_info_data">

        <div id="gridForm"  >
				<form id="gridFormData">
					<div class="col-md-12">
						<div class="form-group">
							<label>Grid Name</label>	<input name="name_en"  id="name_en"  class="form-control"  data-validation="required">
						</div>
					</div>

					<div class="col-md-6">
						<div class="form-group">
							<input name="fdate"  id="fdate"  class="form-control daterange2"  data-validation="required">
						</div>
					</div>
					
					<div class="clearfix"></div>
					<div class="form-group">
						<button type="button" onclick="enable('gridFormData',true)" id="EditPub" class="btn btn-default">Close</button>
						<input type="hidden" value="" id="grid_id" name="grid_id" />
						<input type="hidden" value="<?php echo $pupID;?>" id="pubID" name="pubID" />
						<button type="button" class="btn btn-primary" onclick="savegrid()"  id="savePub">Save </button>
					</div>	
					
			</form>
        </div>
		</div>
		<hr>
		<div id="pub_info_data2">
			<div id="progForm" >
			<form id="progFormData">
				<div class="col-md-12">
					<div class="form-group">
						<label>Program Name</label>	<input name="name_en"  id="pname_en"  class="form-control"  data-validation="required">
					</div>
				</div>
				<div class="col-md-12">
					<div class="form-group">
						<table class="daysTable">
							<?php 
								$arr  = array('Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday');
								$ii = 0;
								foreach($arr as $key=>$day){
									echo '<tr>
												<td><input name="selBox_'.$key.'[]" value="1" type="checkbox"></td>
												<td>'.$day.'</td>
												<td><input type="text" name="pftime_'.$key.'[]" class="timerInput"/> / <input type="text" name="pttime_'.$key.'[]" class="timerInput"/> </td> 
												<td><input name="repeat_'.$key.'[]" class="repeatC" value="xyz"  type="checkbox">&reg;</td> 
												<td><input type="button" name="addbtn_'.$key.'" value="Add" onclick="addTr(this)" class="btn-default"> <input type="button" name="repeatbtn_'.$key.'" value="Repeat" class="repeatV"  class="btn-default "> </td></tr>';
								$ii++;
								}
								?>
						</table>
						
					</div>
				</div>
							
				<div class="form-group">
					<button type="button" onclick="enable('progFormData',true)" id="EditPub" class="btn btn-default">Close</button>
					<input type="hidden" value="" id="pgrid_id" name="pgrid_id" />
					<input type="hidden" value="" id="program_id" name="program_id" />
					<input type="hidden" value="" id="repeatStr" name="repeatStr" />
					<input type="hidden" value="" id="selStr" name="selStr" />
					
					
					<button type="button" class="btn btn-primary" onclick="saveProg()"  id="savePub">Save </button>
				</div>	
				
		</form>
        </div>
			
			</div>			
		
		  </div>	  
		 </div>

       

    <div id="dialog-form" style="height:350px;" title="Create new user">
        <form>
            <fieldset>
                <label for="month">Repeat Days</label><br />
                
				<input type="checkbox" value="0" /> Saturday<br />
				<input type="checkbox" value="1" /> Sunday<br />
				<input type="checkbox" value="2" /> Monday<br />
				<input type="checkbox" value="3" /> Tuesday<br />
				<input type="checkbox" value="4" /> Wednesday<br />
				<input type="checkbox" value="5" /> Thursday<br />
				<input type="checkbox" value="6" /> Friday<br />
                <input type="submit" tabindex="-1" style="position:absolute; top:-1000px">
            </fieldset>
        </form>
    </div>		
    	
		

	<?php   include('includes/footer.php');
    ?>

</body>
</html>
