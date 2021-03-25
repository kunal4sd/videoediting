<?php

namespace App\Modules\Video;

use Pimple\Container;
use App\Modules\Video\Views\Index;
use App\Modules\Video\Views\Listing;
use Pimple\ServiceProviderInterface;
use App\Modules\Video\Entities\Movie;
use App\Modules\Video\Views\TextSearch;
use App\Modules\Video\Entities\Playlist;
use App\Modules\Video\Entities\RawVideo;
use App\Modules\Video\Actions\Ajax\Search;
use App\Modules\Video\Entities\RemoteFile;
use App\Modules\Video\Entities\SearchText;
use App\Modules\Video\Actions\Ajax\GetText;
use App\Modules\Video\Actions\Ajax\GetMovie;
use App\Modules\Video\Actions\DownloadMovie;
use App\Modules\Video\Actions\Ajax\GetEpisode;
use App\Modules\Video\Actions\Ajax\GetPlaylist;
use App\Modules\Video\Actions\Ajax\GetMovieList;
use App\Modules\Video\Actions\Ajax\GetVideoList;
use App\Modules\Video\Actions\Ajax\TextSearchSave;
use App\Modules\Core\Middleware\Persistant as PersistantMiddleware;
use App\Modules\Video\Middleware\Validation\GetText as GetTextValidationMiddleware;
use App\Modules\Video\Middleware\Validation\GetMovie as GetMovieValidationMiddleware;
use App\Modules\Core\Middleware\Authorization\SameIp as SameIpAuthorizationMiddleware;
use App\Modules\Video\Middleware\Validation\TextSearchSave as TextSearchSaveMiddleware;
use App\Modules\Video\Middleware\Validation\GetEpisode as GetEpisodeValidationMiddleware;
use App\Modules\Video\Middleware\Validation\SearchText as SearchTextValidationMiddleware;
use App\Modules\Video\Middleware\Validation\GetPlaylist as GetPlaylistValidationMiddleware;
use App\Modules\Core\Middleware\Authorization\KnownUser as KnownUserAuthorizationMiddleware;
use App\Modules\Video\Middleware\Validation\GetMovieList as GetMovieListValidationMiddleware;
use App\Modules\Video\Middleware\Validation\GetVideoList as GetVideoListValidationMiddleware;
use App\Modules\Core\Middleware\Standardization\DateRange as DateRangeStandardizationMiddleware;
use App\Modules\Video\Middleware\Validation\GetTextPreview as GetTextPreviewValidationMiddleware;
use App\Modules\Core\Middleware\Authorization\SameSessionId as SameSessionIdAuthorizationMiddleware;

class VideoServiceProvider implements ServiceProviderInterface
{
    public function register(Container $container)
    {
        $this->register_views($container);
        $this->register_actions($container);
        $this->register_routes($container);
        $this->register_entities($container);
    }

    private function register_views(Container $container)
    {
        $container['video.view.index'] = function ($container) {
            return new Index($container);
        };
        $container['video.view.listing'] = function ($container) {
            return new Listing($container);
        };
        $container['video.view.search'] = function ($container) {
            return new TextSearch($container);
        };
        $container['video.view.search_save'] = function ($container) {
            return new TextSearchSave($container);
        };
    }

    private function register_actions(Container $container)
    {
        $container['video.action.ajax.get_playlist'] = function ($container) {
            return new GetPlaylist($container);
        };
        $container['video.action.ajax.get_episode'] = function ($container) {
            return new GetEpisode($container);
        };
        $container['video.action.ajax.get_movie'] = function ($container) {
            return new GetMovie($container);
        };
        $container['video.action.ajax.download_movie'] = function ($container) {
            return new DownloadMovie($container);
        };
        $container['video.action.ajax.get_movie_list'] = function ($container) {
            return new GetMovieList($container);
        };
        $container['video.action.ajax.get_video_list'] = function ($container) {
            return new GetVideoList($container);
        };
        $container['video.action.ajax.get_text'] = function ($container) {
            return new GetText($container);
        };
        $container['video.action.ajax.search'] = function ($container) {
            return new Search($container);
        };
    }

    private function register_routes(Container $container)
    {

        // video editing
        $container->slim->get('/[/{activity_id}]', 'video.view.index')
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('video.view.index');

        $container->slim->post('/videos/actions/get/playlist', 'video.action.ajax.get_playlist')
                        ->add(new DateRangeStandardizationMiddleware($container))
                        ->add(new GetPlaylistValidationMiddleware($container))
                        ->add(new PersistantMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('video.action.get_playlist');

        $container->slim->post('/videos/actions/search', 'video.action.ajax.search')
                        ->add(new DateRangeStandardizationMiddleware($container))
                        ->add(new SearchTextValidationMiddleware($container))
                        ->add(new PersistantMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('video.action.search');

        $container->slim->post('/videos/actions/get/episode', 'video.action.ajax.get_episode')
                        ->add(new GetEpisodeValidationMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('video.action.get_episode');

        $container->slim->post('/videos/actions/get/movie', 'video.action.ajax.get_movie')
                        ->add(new GetMovieValidationMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('video.action.get_movie');

        $container->slim->post('/videos/actions/get/movie/list', 'video.action.ajax.get_movie_list')
                        ->add(new DateRangeStandardizationMiddleware($container))
                        ->add(new GetMovieListValidationMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('video.action.get_movie_list');

        $container->slim->get('/videos/actions/download/{article_id}', 'video.action.ajax.download_movie')
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('video.action.download_movie');

        // video listing
        $container->slim->get('/videos/listing', 'video.view.listing')
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('video.view.listing');

        $container->slim->post('/videos/actions/get/list', 'video.action.ajax.get_video_list')
                        ->add(new DateRangeStandardizationMiddleware($container))
                        ->add(new GetVideoListValidationMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('video.action.get_list');

        $container->slim->post('/videos/actions/get/text', 'video.action.ajax.get_text')
                        ->add(new GetTextValidationMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('video.action.get_text');

        // text search
        $container->slim->get('/search', 'video.view.search')
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('video.view.search');

        $container->slim->post('/search-save', 'video.view.search_save')
                        ->add(new TextSearchSaveMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('video.view.search_save');

        $container->slim->post('/search/text-preview', 'video.action.ajax.get_text')
                        ->add(new GetTextPreviewValidationMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('video.action.get_text_preview');
    }

    private function register_entities(Container $container)
    {
        $container['entity_playlist'] = function ($container) {
            return new Playlist($container);
        };
        $container['entity_movie'] = function ($container) {
            return new Movie($container);
        };
        $container['entity_remote_file'] = function ($container) {
            return new RemoteFile($container);
        };
        $container['entity_raw_video'] = function ($container) {
            return new RawVideo($container);
        };
        $container['entity_search_text'] = function ($container) {
            return new SearchText($container);
        };
    }
}
