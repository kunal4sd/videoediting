<?php

namespace App\Modules\QueryBuilder;
use App\Modules\QueryBuilder\Actions\Ajax\GetSearchQuery;
use App\Modules\QueryBuilder\Actions\Ajax\GetSearchQueryList;
use App\Modules\QueryBuilder\Actions\Ajax\SaveQuery;
use App\Modules\QueryBuilder\Actions\Ajax\SearchKeyword;
use App\Modules\QueryBuilder\Entities\SearchQuery;
use App\Modules\QueryBuilder\Views\QueryBuilder;
use Pimple\Container;
use App\Modules\QueryBuilder\Views\Index;
use Pimple\ServiceProviderInterface;
use App\Modules\QueryBuilder\Actions\Ajax\Search;
use App\Modules\QueryBuilder\Entities\SearchText;
use App\Modules\Core\Middleware\Persistant as PersistantMiddleware;
use App\Modules\Core\Middleware\Authorization\SameIp as SameIpAuthorizationMiddleware;
use App\Modules\Video\Middleware\Validation\SearchText as SearchTextValidationMiddleware;
use App\Modules\Core\Middleware\Authorization\KnownUser as KnownUserAuthorizationMiddleware;
use App\Modules\Core\Middleware\Standardization\DateRange as DateRangeStandardizationMiddleware;
use App\Modules\Core\Middleware\Authorization\SameSessionId as SameSessionIdAuthorizationMiddleware;

class QueryBuilderServiceProvider implements ServiceProviderInterface
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
        $container['video.view.search.query_builder'] = function ($container) {
            return new QueryBuilder($container);
        };
    }

    private function register_actions(Container $container)
    {       
        $container['video.action.ajax.search'] = function ($container) {
            return new Search($container);
        };     
        $container['video.action.ajax.save_query_builder'] = function ($container) {
            return new SaveQuery($container);
        };
        $container['video.action.ajax.search_keyword'] = function ($container) {
            return new SearchKeyword($container);
        };
        $container['video.action.ajax.get_query_list'] = function ($container) {
            return new GetSearchQueryList($container);
        };
        $container['video.action.ajax.get_query'] = function ($container) {
            return new GetSearchQuery($container);
        };
    }

    private function register_routes(Container $container)
    {
        //Search query builder
        // text search
        $container->slim->get('/search/query-builder', 'video.view.search.query_builder')
            ->add(new SameIpAuthorizationMiddleware($container))
            ->add(new SameSessionIdAuthorizationMiddleware($container))
            ->add(new KnownUserAuthorizationMiddleware($container))
            ->setName('video.view.search.query_builder');

        $container->slim->post('/videos/actions/save-query-builder', 'video.action.ajax.save_query_builder')
            ->add(new DateRangeStandardizationMiddleware($container))
            ->add(new PersistantMiddleware($container))
            ->add(new SameIpAuthorizationMiddleware($container))
            ->add(new SameSessionIdAuthorizationMiddleware($container))
            ->add(new KnownUserAuthorizationMiddleware($container))
            ->setName('video.action.save_query_builder');

        $container->slim->post('/videos/actions/search/keyword', 'video.action.ajax.search_keyword')
            ->add(new SameIpAuthorizationMiddleware($container))
            ->add(new KnownUserAuthorizationMiddleware($container))
            ->setName('video.action.search_keyword');
            
        $container->slim->post('/videos/actions/get/search-query/list', 'video.action.ajax.get_query_list')
            ->add(new DateRangeStandardizationMiddleware($container))
            ->add(new SameIpAuthorizationMiddleware($container))
            ->add(new SameSessionIdAuthorizationMiddleware($container))
            ->add(new KnownUserAuthorizationMiddleware($container))
            ->setName('video.action.get_query_list');

        $container->slim->post('/videos/actions/get/search-query', 'video.action.ajax.get_query')
            ->add(new DateRangeStandardizationMiddleware($container))
            ->add(new SameIpAuthorizationMiddleware($container))
            ->add(new SameSessionIdAuthorizationMiddleware($container))
            ->add(new KnownUserAuthorizationMiddleware($container))
            ->setName('video.action.get_query');

        $container->slim->post('/videos/actions/search', 'video.action.ajax.search')
            ->add(new DateRangeStandardizationMiddleware($container))
            ->add(new SearchTextValidationMiddleware($container))
            ->add(new PersistantMiddleware($container))
            ->add(new SameIpAuthorizationMiddleware($container))
            ->add(new SameSessionIdAuthorizationMiddleware($container))
            ->add(new KnownUserAuthorizationMiddleware($container))
            ->setName('video.action.search');

    }

    private function register_entities(Container $container)
    {
        $container['entity_search_text'] = function ($container) {
            return new SearchText($container);
        };
        $container['entity_search_query'] = function ($container) {
            return new SearchQuery($container);
        };
    }
}