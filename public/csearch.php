<?php

$paths = [];
$result = [];
$destination = '';
$dirs = ['clippings', 'uploaded_files'];
$allowed_extensions = ['jpg', 'jpeg'];
if (isset($_POST['issue_date'])) {

    $issue_date = filter_var($_POST['issue_date'], FILTER_UNSAFE_RAW);
    $formatted_date = date('Y-m-d', strtotime($issue_date));
    if ($formatted_date !== false) {

        unset($_POST['issue_date']);
        if (!empty($_POST)) {
            foreach($dirs as $dir) {
                $paths[] = sprintf(
                    '%s/%s/%s',
                    __DIR__,
                    $dir,
                    $formatted_date
                );
            }

            foreach ($_POST as $article_id_raw => $images) {

                $article_id = filter_var($article_id_raw, FILTER_UNSAFE_RAW);
                if ($article_id !== false && is_numeric($article_id)) {

                    $images_raw = filter_var($images, FILTER_UNSAFE_RAW);
                    $images = explode(',', $images_raw);
                    $total_images = count($images);
                    $found = 0;
                    foreach($images as $post_image) {

                        $image_name = trim(filter_var($post_image, FILTER_UNSAFE_RAW));
                        if ($image_name !== false && strlen($image_name)) {

                            $details = explode('.', $image_name);
                            if (in_array(array_pop($details), $allowed_extensions)) {

                                foreach($paths as $path) {

                                    $file_path = sprintf('%s/%s', $path, $image_name);
                                    if (file_exists($file_path)) {
                                        $found++;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    $result[$article_id] = $found === $total_images;
                }
            }
        }
    }
}

// $logging = ['post' => $_POST, 'result' => $result];
// file_put_contents(__DIR__ . '/csearch.log', json_encode($logging) . "\n", FILE_APPEND);

header('Content-Type: application/json');
echo json_encode($result);

