<?php

namespace App\Modules\Video\Actions;

use App\Libs\Json;
use App\Libs\Enums\Videos;
use App\Modules\Abstracts\AbstractModule;
use App\Modules\Video\Entities\Files\VideoFile;
use Slim\Http\Stream;
use Slim\Http\Request;
use Slim\Http\Response;
use \Exception;

class DownloadMovie extends AbstractModule
{

    public function __invoke(Request $request, Response $response, $args)
    {

        if (isset($args['article_id'])) {

            $article_ar = $this->entity_article->get_by_id($args['article_id']);
            $file_path = VideoFile::build_movie_path($article_ar);
            $resource = fopen($file_path, 'rb');
            $stream = new Stream($resource);

            return $response->withHeader('Content-Type', 'application/force-download')
                            ->withHeader('Content-Type', 'application/octet-stream')
                            ->withHeader('Content-Type', 'application/download')
                            ->withHeader('Content-Description', 'File Transfer')
                            ->withHeader('Content-Transfer-Encoding', 'binary')
                            ->withHeader(
                                'Content-Disposition',
                                sprintf(
                                    'attachment; filename="%s.%s"',
                                    $args['article_id'],
                                    Videos::MOVIE_FORMAT
                                )
                            )
                            ->withHeader('Expires', '0')
                            ->withHeader('Cache-Control', 'must-revalidate, post-check=0, pre-check=0')
                            ->withHeader('Pragma', 'public')
                            ->withBody($stream);
        }

        return Json::build($response);
    }

}
