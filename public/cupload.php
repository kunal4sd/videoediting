<?php
session_start();

$success = false;
$image_details = [
    'name' => false,
    'file_size_bytes' => false,
    'file_type' => false,
    'mime_type' => false,
    'width' => false,
    'height' => false
];
if (isset($_POST['issue_date'])) {

    $issue_date = filter_var($_POST['issue_date'], FILTER_UNSAFE_RAW);

    if (isset($_FILES['image'])) {
        $image_tmp_path = $_FILES['image']['tmp_name'];
        $image_name = $_FILES['image']['name'];
        $file_size = $_FILES['image']['size'];
        $file_type = $_FILES['image']['type'];
        $image_name_details = explode(".", $image_name);
        $image_extension = strtolower(end($image_name_details));
        $image_mime_type = mime_content_type($image_tmp_path);
        list($width, $height, $type, $attr) = getimagesize($image_tmp_path);

        $image_details['name'] = $image_name;
        $image_details['file_size_bytes'] = $file_size;
        $image_details['file_type'] = $file_type;
        $image_details['mime_type'] = $image_mime_type;
        $image_details['width'] = $width;
        $image_details['height'] = $height;
    }
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {

        $allowedimage_extensions = array('jpg', 'jpeg');
        if (
            $image_mime_type === 'image/jpeg'
            && in_array($image_extension, $allowedimage_extensions)
            && $width
            && $height
        ) {

            $dest_path = sprintf(
                '%s/%s/%s',
                __DIR__,
                'uploaded_files',
                date('Y-m-d', strtotime($issue_date))
            );
            $file_path = sprintf('%s/%s', $dest_path, $image_name);
            if (!file_exists($dest_path) && !mkdir($dest_path, 0777, true)) {
                $message = 'Failed creating path';
            }
            elseif (move_uploaded_file($image_tmp_path, $file_path)) {
                $message = 'Image was successfully uploaded';
                $success = true;
            }
            else {
                $message = 'Failed moving image to final directory';
            }
        }
        else {
            $message = 'Uploaded file not accepted';
        }
    }
    elseif (isset($_FILES['image'])) {
        switch ($_FILES['image']['error']) {
            case UPLOAD_ERR_INI_SIZE:
                $message = "The uploaded file exceeds the upload_max_file_size directive in php.ini";
                break;
            case UPLOAD_ERR_FORM_SIZE:
                $message = "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form";
                break;
            case UPLOAD_ERR_PARTIAL:
                $message = "The uploaded file was only partially uploaded";
                break;
            case UPLOAD_ERR_NO_FILE:
                $message = "No file was uploaded";
                break;
            case UPLOAD_ERR_NO_TMP_DIR:
                $message = "Missing a temporary folder";
                break;
            case UPLOAD_ERR_CANT_WRITE:
                $message = "Failed to write file to disk";
                break;
            case UPLOAD_ERR_EXTENSION:
                $message = "File upload stopped by extension";
                break;
            default:
                $message = "Unknown upload error";
                break;
        }
    }
    else {
        $message = 'Missing file';
    }
}
else {
    $message = 'Missing fields';
}

header('Content-Type: application/json');
$result = [
    'time' => date('Y-m-d H:i:s'),
    'success' => $success,
    'message' => $message,
    'image' => $image_details
];
if (!$success) {
    $result['debug'] = ['post' => var_export($_POST, true), 'files' => var_export($_FILES, true)];
}

file_put_contents(__DIR__ . '/cupload.log', json_encode($result) . "\n", FILE_APPEND);
echo json_encode($result);

