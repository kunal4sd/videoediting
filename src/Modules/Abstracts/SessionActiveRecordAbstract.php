<?php

namespace App\Modules\Abstracts;

use App\Libs\Session;
use App\Libs\Log\Log;
use App\Modules\Abstracts\ActiveRecordAbstract;
use \Exception;

abstract class SessionActiveRecordAbstract
{

    /**
     * @var Log
     */
    protected $logger;

    /**
     * @var Session
     */
    protected $session;

    /**
     * @var ActiveRecordAbstract
     */
    protected $entity;

    /**
     * @var string
     */
    protected $entity_field;

    public function __construct(Session $session, Log $logger)
    {
        $this->session = $session;
        $this->logger = $logger;
    }

    /**
     * @return SessionActiveRecordAbstract
     */
    public function init_from_entity(ActiveRecordAbstract $entity)
    {
        $this->entity = $entity;
        $this->session->set_data($this->entity_field, $entity);

        return $this;
    }

    /**
     * @return SessionActiveRecordAbstract
     */
    public function init_from_session()
    {
        $this->entity = $this->session->get_data($this->entity_field);

        if ($this->entity === null) {
            $this->logger->write(new Exception(
                sprintf('Failed retrieving session data for field `%s`', $this->entity_field),
                200
            ));
        }

        return $this;
    }

    public function set_entity_field($field_name)
    {
        $this->entity_field = $field_name;
    }

    public function stop()
    {
        $this->session->stop($this->entity_field);
    }

    /**
     * @return ActiveRecordAbstract|null
     */
    public function get_entity()
    {
        return $this->entity;
    }

    public function __get($field)
    {
        return $this->entity->$field;
    }
}
