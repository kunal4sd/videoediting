<?php

namespace App\Modules\Publication;

use App\Modules\Publication\Actions\Ajax\RestartFfmpeg;
use App\Modules\Publication\Actions\Ajax\RestartRsync;
use App\Modules\Publication\Entities\Issue;
use App\Modules\Publication\Entities\Country;
use App\Modules\Publication\Entities\Publication;
use App\Modules\Publication\Entities\PublicationDetails;
use App\Modules\Publication\Views\Index;
use App\Modules\Publication\Views\Report;
use App\Modules\Publication\Middleware\Validation\RestartProcess as RestartProcessValidationMiddleware;
use App\Modules\Core\Middleware\Authorization\SameIp as SameIpAuthorizationMiddleware;
use App\Modules\Core\Middleware\Authorization\SameSessionId as SameSessionIdAuthorizationMiddleware;
use App\Modules\Core\Middleware\Authorization\KnownUser as KnownUserAuthorizationMiddleware;
use Pimple\Container;
use Pimple\ServiceProviderInterface;

class PublicationServiceProvider implements ServiceProviderInterface
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
        $container['publication.view.index'] = function ($container) {
            return new Index($container);
        };
        $container['publication.view.report'] = function ($container) {
            return new Report($container);
        };
    }

    private function register_actions(Container $container)
    {
        $container['publication.action.ajax.restart_ffmpeg'] = function ($container) {
            return new RestartFfmpeg($container);
        };
        $container['publication.action.ajax.restart_rsync'] = function ($container) {
            return new RestartRsync($container);
        };
    }

    private function register_routes(Container $container)
    {

        // publications
        $container->slim->get('/publications', 'publication.view.index')
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('publication.view.index');

        // publications report
        $container->slim->get('/publications/report', 'publication.view.report')
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('publication.view.report');

        $container->slim->post(
                            '/publications/actions/restart/ffmpeg',
                            'publication.action.ajax.restart_ffmpeg'
                        )
                        ->add(new RestartProcessValidationMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('publication.action.restart_ffmpeg');

        $container->slim->post(
                            '/publications/actions/restart/rsync',
                            'publication.action.ajax.restart_rsync'
                        )
                        ->add(new RestartProcessValidationMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('publication.action.restart_rsync');
    }

    private function register_entities(Container $container)
    {
        $container['entity_country'] = function ($container) {
            return new Country($container);
        };
        $container['entity_publication'] = function ($container) {
            return new Publication($container);
        };
        $container['entity_issue'] = function ($container) {
            return new Issue($container);
        };
        $container['entity_publication_details'] = function ($container) {
            return new PublicationDetails($container);
        };
    }
}
