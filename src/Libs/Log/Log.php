<?php

namespace App\Libs\Log;

use \App\Libs\Log\Config as LogConfig;
use \Monolog\Logger as Logger;
use \Monolog\Handler\StreamHandler;
use \Monolog\Formatter\LineFormatter;
use \Exception;
use Throwable;

class Log
{

    /**
     * @var Config
     */
    private $config;

    /**
     * @var Logger
     */
    private $logger;

    /**
     * @var StreamHandler
     */
    private $stream;

    public function __construct(array $config)
    {

        $this->config = new LogConfig($config);

        $formatter = new LineFormatter(LineFormatter::SIMPLE_FORMAT, LineFormatter::SIMPLE_DATE);
        $formatter->includeStacktraces(true);
        $this->stream = new StreamHandler($this->config->path . '/' . $this->config->filename);
        $this->stream->setFormatter($formatter);

        $this->logger = new Logger('vet');
        $this->logger->pushHandler($this->stream);
    }

    public function write(Throwable $e)
    {
        if ($this->config->enabled && $e->getCode() >= $this->config->min_level) {
            $this->push_to_logger($e->getCode(), $this->build_message($e));
        }
    }

    private function build_message(Throwable $e)
    {
        return str_replace(
            PHP_EOL,
            '',
            sprintf(
                '%d ::: %s ::: %s line %d ::: %s',
                $e->getCode(),
                $e->getMessage(),
                $e->getFile(),
                $e->getLine(),
                $e->getCode() >= 500 ? implode(PHP_EOL, explode('#', $e->getTraceAsString())) : 'no stack'
            )
        );
    }

    private function push_to_logger($code, $msg)
    {
        if ($code < 400) {
            $this->logger->info($msg);
        }
        elseif($code < 500) {
            $this->logger->error($msg);
        }
        else {
            $this->logger->critical($msg);
        }
    }

}
