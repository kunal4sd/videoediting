<?php
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


$url = 'http://www.alshahedkw.com/index.php?option=com_content&view=article&id=163481:2017-01-15-18-52-20&catid=1:02&Itemid=457';

$article = $goose->extractContent($url);

$body  =  $article->getRawHtml();

echo '<div style="text-align:right; direction:rtl">';
$title = $article->getTitle();
echo '<b>Title : </b>'.$title.'<br><hr><br>';

$articleText = $article->getCleanedArticleText();
echo '<b>Body : </b><br>'.$articleText.'<br><hr><br>';

$img = $article->getTopImage();
var_dump($img);


echo '</div>';

// NOT WORKING 
//$url = 'http://alrai.com/article/1035786/%D8%A5%D9%82%D8%AA%D8%B5%D8%A7%D8%AF/%D8%A7%D9%84%D8%B0%D9%87%D8%A8-%D9%8A%D8%B1%D8%AA%D9%81%D8%B9';
//$url = 'http://www.alanbatnews.net/articles/150763';
//$url ='http://www.alwatan.com.sa/Articles/Detail.aspx?ArticleID=32961';
//$url = 'http://www.al-jazirah.com/2017/20170109/ms5.htm';
//$url = 'http://www.aleqt.com/node/1116349';





//$metaDescription = $article->getMetaDescription();
//$metaKeywords = $article->getMetaKeywords();
//$canonicalLink = $article->getCanonicalLink();
//$domain = $article->getDomain();
//$tags = $article->getTags();
//$links = $article->getLinks();
//$videos = $article->getVideos();
//$entities = $article->getPopularWords();
//$image = $article->getTopImage();
//


?>