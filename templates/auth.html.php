<?php

require_once dirname( __DIR__ ) . '/vendor/autoload.php';
use \App\Controller\FacebookAuthControllerClass as FacebookAuthController;

$errors = FacebookAuthController::getFlash('errors');

?>

<h2 class="logo">
    <img src="<?php echo $config['base_url']; ?>assets/img/logo_sm.png" alt="<?php echo $config['app_title']; ?>">
    <?php echo $config['app_title']; ?>
</h2>

<hr>

<p>
    <?php echo $config['app_description']; ?>
</p>

<hr>

<?php if( !empty( $errors ) && is_array( $errors ) ): ?>
    <div class="alert alert-danger">
        <?php echo implode( '<br>', $errors ); ?>
    </div>
<?php endif; ?>

<div>
    <a class="btn btn-lg btn-primary" href="<?php echo FacebookAuthController::getAuthUrl($config['facebook_app_id']); ?>">
        <i class="icon-facebook2"></i>
        &nbsp;
        Signup with Facebook
    </a>
</div>