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
<h2 class="logo">
    <a href="<?php echo $config['base_url']; ?>">
        <img src="<?php echo $config['base_url']; ?>assets/img/logo_sm.png" alt="<?php echo $config['app_title']; ?>">
        <?php echo $config['app_title']; ?>
    </a>
</h2>

<hr>

<h1>
    Videos
</h1>

<?php if( !empty( $page_content['data'] ) ): ?>
<table class="table table-striped table-bordered table-hover">
    <thead>
        <tr>
            <th>#</th>
            <th>Namexxxx</th>
            <th>Social URL</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach($page_content['data'] as $index => $user): ?>
        <tr>
            <th scope="row">
                <?php echo $page_content['pages']['offset'] + $index + 1; ?>
            </th>
            <td>
                <?php echo $user['name']; ?>
            </td>
            <td>
                <?php if( !empty( $user['facebook_id'] ) ): ?>
                    <a href="https://www.facebook.com/app_scoped_user_id/<?php echo $user['facebook_id']; ?>/" target="_blank">
                        <i class="icon-facebook"></i>
                        <?php echo $user['facebook_id']; ?>
                    </a>
                <?php endif; ?>
            </td>
            <td>
                <?php echo $user['email']; ?>
            </td>
            <td>
                <?php if( !empty( $user['blocked'] ) ): ?>
                    <div class="badge badge-default big">Blocked</div>
                <?php elseif( $user['role'] == 'admin' ): ?>
                    <div class="badge badge-warning badge-pill">
                        <?php echo $user['role']; ?>
                    </div>
                <?php else: ?>
                    <div class="badge badge-default badge-pill">
                        <?php echo $user['role']; ?>
                    </div>
                <?php endif; ?>
            </td>
            <td class="text-right">
                <a class="btn btn-secondary btn-sm" href="<?php echo $config['base_url'] . '?action=edit_user&user_id=' . urlencode( $user['id'] ); ?>">
                    Edit
                </a>
                <a class="btn btn-danger btn-sm" href="<?php echo $config['base_url'] . '?action=delete_user&user_id=' . urlencode( $user['id'] ); ?>">
                    Delete
                </a>
            </td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>




<nav aria-label="pagination">
    <?php if( !empty( $page_content['pages'] ) && $page_content['pages']['total'] > 1 ): ?>
    <ul class="pagination">
        <?php if( $page_content['pages']['current'] == 1 ): ?>
            <li class="page-item disabled">
                <a class="page-link" href="#">Previous</a>
            </li>
        <?php else: ?>
            <li class="page-item">
                <a class="page-link" href="<?php echo $config['base_url'] . '?action=users&page=' . ($page_content['pages']['current'] - 1); ?>">
                    Previous
                </a>
            </li>
        <?php endif; ?>

        <?php for( $i = 0; $i< $page_content['pages']['total']; $i++ ): ?>
            <li class="page-item<?php if( $page_content['pages']['current'] == $i + 1 ): ?> active<?php endif; ?>">
                <a class="page-link" href="<?php echo $config['base_url'] . '?action=users&page=' . ($i + 1); ?>">
                    <?php echo $i + 1; ?>
                </a>
            </li>
        <?php endfor; ?>

        <?php if( $page_content['pages']['current'] == $page_content['pages']['total'] ): ?>
            <li class="page-item disabled">
                <a class="page-link" href="#">Next</a>
            </li>
        <?php else: ?>
            <li class="page-item">
                <a class="page-link" href="<?php echo $config['base_url'] . '?action=users&page=' . ($page_content['pages']['current'] + 1); ?>">
                    Next
                </a>
            </li>
        <?php endif; ?>
    </ul>
    <?php endif; ?>
</nav>
<?php endif; ?>
