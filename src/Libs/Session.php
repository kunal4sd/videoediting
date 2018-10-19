<?php

namespace App\Libs;

class Session
{

    public function __construct()
    {
        $this->start();
    }

    private function start()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    /**
     * @param string $field : field name
     * @param mixed $data
     * @return Session
     */
    public function set_data($field, $data)
    {
        $_SESSION[$field] = $data;

        return $this;
    }

    /**
     * @param string $field : field name
     * @return mixed|false : data found in the `$field` field of $_SESSION, or null otherwise
     */
    public function get_data($field)
    {
        if (!$this->is_set($field)) {
            return null;
        }

        return $_SESSION[$field];
    }

    public function is_set($field)
    {
        return isset($_SESSION[$field]);
    }

    /**
     * @param string $field : field name
     * @return Session
     */
    public function stop($field)
    {
        unset($_SESSION[$field]);

        return $this;
    }
}
