<?php

namespace App\Libs\ShellCommands\Commands\Abstracts;

abstract class CommandAbstract implements Executable, Pipeable
{

    protected $binary;
    protected $options = [];
    private $command;

    public function exec()
    {
        return shell_exec($this->command);
    }

    private function build_command()
    {

        $options = '';
        foreach($this->options as $option => $value)
        {
            if ($value === false) continue;
            if ($value === null) continue;

            if ($value === true) {
                $options .= sprintf('-%s ', $option);
            }
            else {
                $options .= sprintf('-%s %s ', $option, $value);
            }
        }
        $this->command = sprintf('%s %s', $this->binary, $options);

        return $this;
    }

    public function pipe(Pipeable $command)
    {
        $this->command = sprintf('%s | %s', $this->command, $command);

        return $this;
    }
}