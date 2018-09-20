<?php
include("../config/db.php");

	if( isset($_POST['submit']) ){
		$uname = $db->escape($_POST['username']);
		$upass = $db->escape($_POST['password']);

		
		$q1  = "select * from user where username='$uname' and password= PASSWORD('$upass') and  isnull(expiry_date) ";
	
		$users = $db->rawQueryOne($q1);

		if($users['id']){
			$tmpPath = '/var/www/edit.mediaobserver-me.com/public/tmp/'.$users['id'];
			if( !file_exists( $tmpPath ) ){ // check if there is temp folder or no, if no create and change mod
				mkdir($tmpPath);
				chmod( $outputPath, 0777 );
			}
			$_SESSION['uid'] = $users['id'];
			$_SESSION['uname'] = $users['username'];
			$_SESSION['type'] = $users['type_id'];
			$_SESSION['group_id'] = $users['group_id'];
			
			setcookie("uid", $users['id'],0);
			setcookie("uname", $users['username'],0);
			setcookie("type", $users['type_id'],0);
			setcookie("group_id", $users['group_id'],0);
			
			
			header("Location: index.php");
			
			//if($users['id'] == 171){				
			//} else {
			//}
				//header("Location: index.php");
			
			die();
		} else {
			$message = 'Login information is not correct';
		}	
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="favicon.ico">

    <title>Login To Video Editor</title>

    <link href="lib/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <script src="lib/jquery/dist/jquery.min.js"></script>
    <script src="lib/bootstrap/dist/js/bootstrap.min.js"></script>


</head>
<body>



    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4 offset-md-4">

                <div class="card" style="margin-top: 200px">
                    <div class="card-block">
						<span style="color:red"><?php echo $message;?></span>
                        <form action="login.php" method="post">
                            <div class="form-group">
                                <label class="form-control-label">Username</label>
                                <input type="text" name="username" class="form-control" value="" required>
                            </div>
                            <div class="form-group">
                                <label class="form-control-label">Password</label>
                                <input type="password" name="password" class="form-control" value="" required>
                            </div>							
                            <div class="form-group-bottom">
                                <button type="submit" name="submit" class="btn btn-outline-primary btn-block">
                                    Log in
                                </button>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </div>
    </div>

</body>
</html>