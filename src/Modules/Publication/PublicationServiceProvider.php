<?php

namespace App\Modules\Publication;

use App\Modules\Publication\Entities\Issue;
use App\Modules\Publication\Entities\Publication;
use App\Modules\Publication\Entities\PublicationDetails;
use App\Modules\Publication\Views\Index;
use App\Modules\Publication\Views\Report;
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
    }

    private function register_routes(Container $container)
    {
        // $container->slim->post('/articles/actions/delete/article', 'article.action.ajax.delete_article')
        //                 ->add(new DeleteArticleValidationMiddleware($container))
        //                 ->add(new SameIpAuthorizationMiddleware($container))
        //                 ->add(new SameSessionIdAuthorizationMiddleware($container))
        //                 ->add(new KnownUserAuthorizationMiddleware($container))
        //                 ->setName('article.action.delete_article');
    }

    private function register_entities(Container $container)
    {
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
