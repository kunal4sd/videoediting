<?php 

function get_best_file($id, $start_date, $increment = null) {
	global $path;
	$ago = '';
	if (!is_null($increment) && $increment == 'ago') {
		//echo "-----------------$start_date in ago\n";
		$ago = 'ago';
	}
	
	$tz = new DateTimeZone('Asia/Amman');
	$date = Datetime::createFromFormat('Y-m-d H:i:s', $start_date, $tz);
	$offset = intval($date->getOffset() / 3600);
	$timezone = sprintf('+%02d00', $offset);

	
	//echo "Timezone value is : $timezone"." d = " . $d . "&d3=".$d30;
	//die();
	//echo '<script language="javascript">';
	//echo 'alert("$d")';
	//echo 'alert("$d30")';
	//echo 'alert("$timezone")';
	//echo '</script>';
	//exit;

	for($i=0; $i <= 30; $i++) {
		$file = shell_exec("date '+$path/$id/%Y/%m/%d/$id.%Y_%m_%d-%H:%M:%S.ts' --date=\"$start_date $timezone + $i seconds $ago\"");
		$file = trim($file);
		if (file_exists($file)){
			//echo "File $file exists.\n";
			return $file;
		}
	}

	//echo "Could not find name returned\n";
	return false;
}
?>