<?php

namespace App\Libs\Db;

use App\Libs\Db\Container as ContainerDB;
use App\Libs\Db\Credentials;
use App\Libs\Db\Pdo;
use App\Libs\Db\Abstracts\Runnable;
use App\Libs\Db\Operations\Fetch;
use App\Libs\Db\Operations\FetchAll;
use App\Libs\Db\Operations\FetchColumn;
use App\Libs\Db\Operations\RowCount;
use App\Libs\Db\Operations\InsertId;
use App\Libs\Db\Operations\Now;
use App\Libs\Enums\Config\MandatoryFields;
use Pimple\Container;

class Db
{

    public static function build(Container &$container)
    {

        if (!isset($container['db'])) {
            $container['db'] = [];
        }

        foreach($container->config->{MandatoryFields::DBS} as $host_name => $databases) {
            foreach($databases as $database_name => $db_config) {

                // lazy connection
                $pdo = new Pdo(new Credentials($db_config));
                $container['db'] = array_merge_recursive(
                    $container['db'],
                    [
                        $host_name => [
                            $database_name => self::register_operations($pdo)
                        ]
                    ]
                );
            }
        }
    }

    private static function register_operations(Runnable $pdo)
    {
        return new ContainerDB([
            'fetch' => function ($c) use ($pdo) {
                return new Fetch($pdo);
            },
            'fetch_all' => function ($c) use ($pdo) {
                return new FetchAll($pdo);
            },
            'fetch_column' => function ($c) use ($pdo) {
                return new FetchColumn($pdo);
            },
            'row_count' => function ($c) use ($pdo) {
                return new RowCount($pdo);
            },
            'insert_id' => function ($c) use ($pdo) {
                return new InsertId($pdo);
            },
            'now' => function ($c) use ($pdo) {
                return new Now($pdo);
            }
        ]);
    }

}
