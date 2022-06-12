<?php

namespace App\Modules\Test;

use App\Modules\Core\Middleware\Persistant as PersistantMiddleware;
use App\Modules\Core\Middleware\Standardization\DateRange as DateRangeStandardizationMiddleware;
use App\Modules\Test\Views\Transcript;
use App\Modules\Test\Actions\Ajax\GetPlaylist;
use App\Modules\Video\Middleware\Validation\GetPlaylist as GetPlaylistValidationMiddleware;
use Pimple\Container;
use Pimple\ServiceProviderInterface;
use App\Modules\Test\Entities\Playlist;
use App\Modules\Core\Middleware\Authorization\SameIp as SameIpAuthorizationMiddleware;
use App\Modules\Core\Middleware\Authorization\KnownUser as KnownUserAuthorizationMiddleware;
use App\Modules\Core\Middleware\Authorization\SameSessionId as SameSessionIdAuthorizationMiddleware;
use App\Modules\Test\Actions\Ajax\GetVTT;

class TestServiceProvider implements ServiceProviderInterface
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
        $container['test.view.transcript'] = function ($container) {
            return new Transcript($container);
        };
    }

    private function register_actions(Container $container)
    {
        $container['test.action.ajax.get_playlist'] = function ($container) {
            return new GetPlaylist($container);
        };

        $container['test.view.vtt'] = function ($container) {
            return new GetVTT($container);
        };
    }

    private function register_routes(Container $container)
    {
        $container->slim->get('/test/vtt/{publication}/{segment_id}', 'test.view.vtt')
            ->add(new SameIpAuthorizationMiddleware($container))
            ->add(new SameSessionIdAuthorizationMiddleware($container))
            ->add(new KnownUserAuthorizationMiddleware($container))
            ->setName('test.view.vtt');

        // transcript
        $container->slim->get('/test/transcript', 'test.view.transcript')
            ->add(new SameIpAuthorizationMiddleware($container))
            ->add(new SameSessionIdAuthorizationMiddleware($container))
            ->add(new KnownUserAuthorizationMiddleware($container))
            ->setName('test.view.transcript');

        $container->slim->post('/test/actions/get/playlist', 'test.action.ajax.get_playlist')
            ->add(new DateRangeStandardizationMiddleware($container))
            ->add(new PersistantMiddleware($container))
            ->add(new SameIpAuthorizationMiddleware($container))
            ->add(new SameSessionIdAuthorizationMiddleware($container))
            ->add(new KnownUserAuthorizationMiddleware($container))
            ->setName('test.action.get_playlist');
    }

    private function register_entities(Container $container)
    {
        $container['test_entity_playlist'] = function ($container) {
            return new Playlist($container);
        };
    }
}
