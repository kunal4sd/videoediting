<?php

namespace App\Libs\Log;

use \Exception;
use App\Libs\Enums\Config\MandatoryLogFields;

class Config
{

    /**
     * @var boolean
     */
    public $enabled;

    /**
     * @var int
     */
    public $min_level;

    /**
     * @var string
     */
    public $path;

    /**
     * @var string
     */
    public $filename;

    public function __construct(array $config = [])
    {
        try {
            check_mandatory_fields(new MandatoryLogFields(), $config);
            $this->assign_values($config);
        }
        catch(Exception $e) {
            throw $e;
        }
    }

    private function assign_values(array $config)
    {
        $this->enabled = $config[MandatoryLogFields::ENABLED];
        $this->min_level = $config[MandatoryLogFields::LEVEL];
        $this->path = $config[MandatoryLogFields::PATH];
        $this->filename = $config[MandatoryLogFields::FILENAME];
    }

}
