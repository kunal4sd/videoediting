<?php

namespace App\Modules\Article;

use App\Modules\Article\Entities\Article;
use App\Modules\Article\Entities\Keyword;
use App\Modules\Article\Entities\ArticleOne;
use App\Modules\Article\Entities\ArticleKeyword;
use App\Modules\Article\Actions\Ajax\GetKeyword;
use App\Modules\Article\Actions\Ajax\EditArticle;
use App\Modules\Article\Actions\Ajax\DeleteArticle;
use App\Modules\Article\Actions\Ajax\SearchKeyword;
use App\Modules\Article\Middleware\Validation\GetKeyword as GetKeywordValidationMiddleware;
use App\Modules\Article\Middleware\Validation\EditArticle as EditArticleValidationMiddleware;
use App\Modules\Article\Middleware\Validation\DeleteArticle as DeleteArticleValidationMiddleware;
use App\Modules\Article\Middleware\Validation\SearchKeyword as SearchKeywordValidationMiddleware;
use App\Modules\Core\Middleware\Authorization\SameIp as SameIpAuthorizationMiddleware;
use App\Modules\Core\Middleware\Authorization\SameSessionId as SameSessionIdAuthorizationMiddleware;
use App\Modules\Core\Middleware\Authorization\KnownUser as KnownUserAuthorizationMiddleware;
use Pimple\Container;
use Pimple\ServiceProviderInterface;

class ArticleServiceProvider implements ServiceProviderInterface
{
    public function register(Container $container)
    {
        $this->register_actions($container);
        $this->register_routes($container);
        $this->register_entities($container);
    }

    private function register_actions(Container $container)
    {
        $container['article.action.ajax.delete_article'] = function ($container) {
            return new DeleteArticle($container);
        };
        $container['article.action.ajax.edit_article'] = function ($container) {
            return new EditArticle($container);
        };
        $container['article.action.ajax.search_keyword'] = function ($container) {
            return new SearchKeyword($container);
        };
        $container['article.action.ajax.get_keyword_by_article_id'] = function ($container) {
            return new GetKeyword($container);
        };
    }

    private function register_routes(Container $container)
    {
        $container->slim->post('/articles/actions/delete/article', 'article.action.ajax.delete_article')
                        ->add(new DeleteArticleValidationMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('article.action.delete_article');
        $container->slim->post('/articles/actions/edit/article', 'article.action.ajax.edit_article')
                        ->add(new EditArticleValidationMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('article.action.edit_article');
        $container->slim->post('/articles/actions/search/keyword', 'article.action.ajax.search_keyword')
                        ->add(new SearchKeywordValidationMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        // ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('article.action.search_keyword');
        $container->slim->post('/articles/actions/get/keyword', 'article.action.ajax.get_keyword_by_article_id')
                        ->add(new GetKeywordValidationMiddleware($container))
                        ->add(new SameIpAuthorizationMiddleware($container))
                        ->add(new SameSessionIdAuthorizationMiddleware($container))
                        ->add(new KnownUserAuthorizationMiddleware($container))
                        ->setName('article.action.get_keyword');
    }

    private function register_entities(Container $container)
    {
        $container['entity_article'] = function ($container) {
            return new Article($container);
        };
        $container['entity_keyword'] = function ($container) {
            return new Keyword($container);
        };
        $container['entity_article_keyword'] = function ($container) {
            return new ArticleKeyword($container);
        };
        $container['entity_article_one'] = function ($container) {
            return new ArticleOne($container);
        };
    }
}
