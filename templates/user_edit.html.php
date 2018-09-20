<?php

/** @var array $config */
/** @var array $currentUser */
/** @var array $input */

?>
<div class="row">
    <div class="col-md-6">

        <p>
            <a href="<?php echo $config['base_url']; ?>?action=users">
                &larr; Back
            </a>
        </p>

        <form action="<?php echo $config['base_url']; ?>?action=edit_user&user_id=<?php echo $input['id']; ?>" method="post">
            <div class="row form-group">
                <div class="col-md-5">
                    <label for="formFieldName">Name:</label>
                </div>
                <div class="col-md-7">
                    <input class="form-control" name="name" value="<?php echo $input['name']; ?>" id="formFieldName">
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-5">
                    <label for="formFieldEmail">Email:</label>
                </div>
                <div class="col-md-7">
                    <input class="form-control" name="email" value="<?php echo $input['email']; ?>" id="formFieldEmail">
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-5">
                    <label for="formFieldRole">Role name:</label>
                </div>
                <div class="col-md-7">
                    <input class="form-control" name="role" value="<?php echo $input['role']; ?>" id="formFieldRole">
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-7 offset-md-5">
                    <label>
                        <input type="checkbox" name="blocked" value="1"<?php if( !empty( $input['blocked'] ) ): ?> checked<?php endif; ?>>
                        Blocked
                    </label>
                </div>
            </div>
            <div class="row form-group">
                <div class="col-md-5">
                    <button type="submit" class="btn btn-primary">
                        Submit
                    </button>
                </div>
            </div>
        </form>

    </div>
    <div class="col-md-6">

        <?php if( !empty( $input['input_data'] ) && !empty( $input['input_data']['data'] ) ): ?>
        <div class="card card-primary mb-3">
            <div class="card-header card-inverse text-center">Input</div>
            <div class="max-height300">
                <ul class="list-group list-group-flush">
                    <?php foreach($input['input_data']['data'] as $item): ?>
                    <li class="list-group-item text-ellipsis">
                        <a href="<?php echo $item['url']; ?>" title="<?php echo $item['title']; ?>">
                            <span class="badge badge-warning">
                                <?php echo $item['ext']; ?>
                            </span>
                            <?php echo $item['title']; ?>
                        </a>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
        <?php endif; ?>

        <?php if( !empty( $input['output_data'] ) && !empty( $input['output_data']['data'] ) ): ?>
        <div class="card card-primary">
            <div class="card-header card-inverse text-center">Output</div>
            <div class="max-height300">
                <ul class="list-group list-group-flush">
                    <?php foreach($input['output_data']['data'] as $item): ?>
                        <li class="list-group-item text-ellipsis">
                            <a href="<?php echo $item['url']; ?>" title="<?php echo $item['title']; ?>">
                        <span class="badge badge-warning">
                            <?php echo $item['ext']; ?>
                        </span>
                                <?php echo $item['title']; ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
        <?php endif; ?>

    </div>
</div>


<!-- Output list -->
<div class="card">
    <div class="card-block">

        <div class="bottom-list-container">

            <table class="table table-bordered table-hover no-margin">
                <colgroup>
                    <col width="40%">
                    <col width="20%">
                    <col width="15%">
                    <col width="15%">
                    <col width="10%">
                </colgroup>
                <tbody id="wve-list_output"></tbody>
            </table>

        </div>

    </div>
</div>
<!-- /Output list -->
