<?php
error_reporting(0);
require('vendor/autoload.php');

use Goose\Client as GooseClient;

$goose = new GooseClient([
    'language' => 'ar',
    'image_min_bytes' => 4500,
    'image_max_bytes' => 5242880,
    'image_min_width' => 120,
    'image_min_height' => 120,
    'image_fetch_best' => false,
    'image_fetch_all' => false,

    'browser' => [
        'timeout' => 60,
        'connect_timeout' => 30
    ]
]);


//$url = 'http://www.alshahedkw.com/index.php?option=com_content&view=article&id=163214:-----5----&catid=58:06&Itemid=396';

$url = urldecode($_GET['url']);
$article = $goose->extractContent( $url  );

$title = $article->getTitle();
$tmparr['title'] = $title;

$articleText = $article->getCleanedArticleText();
$tmparr['body'] = $articleText;
echo  json_encode($tmparr);
?>