<?php

namespace App\Lib;

use \Exception;
use \ReflectionClass;
use App\Lib\Enum\MandatoryConfigFields;

class Config
{

    /**
     * @var array
     */
    private $config;

    /**
     * @var MandatoryConfigFields
     */
    private $mandatory_fields;

    public function __construct()
    {
        try {
            $this->mandatory_fields = new MandatoryConfigFields();
            $this->load_config_file();
            $this->check_mandatory_fields();
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

    private function check_mandatory_fields()
    {

        $constants = get_all_constants($this->mandatory_fields);

        foreach($constants as $const => $value) {
            if (get_from_array($value, $this->config) === null) {
                throw new Exception("Mandatory field `{$value}` not found in provided config.");
            }
        }
    }
}