<?php

namespace App\Libs;

use \Exception;
use \ReflectionClass;
use App\Libs\Enums\Config\MandatoryFields;

class Config
{

    /**
     * @var array
     */
    private $config;

    public function __construct()
    {
        try {
            $this->load_config_file();
            check_mandatory_fields(new MandatoryFields(), $this->config);
        }
        catch(Exception $e) {
            die($e->getMessage());
        }
    }

    public function __get($field)
    {
        return get_from_array($field, $this->config);
    }

    private function load_config_file()
    {
        if (!file_exists(CONFIG_FILE_PATH)) {
            throw new Exception("Undefined global constant `CONFIG_FILE_PATH` or path is wrong");
        }

        $this->config = require CONFIG_FILE_PATH;
    }

}
