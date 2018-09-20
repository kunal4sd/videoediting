<?php

namespace App\Controller;

/**
 * ContentControllerClass
 *
 * @author Andchir <andycoderw@gmail.com>
 */
class gridControllerClass extends BaseControllerClass
{

    /**
     * ContentControllerClass constructor.
     * @param array $config
     */
    public function __construct($config = array())
    {

        parent::__construct( $config );

    }


	public function getGridView( )
    {
		return true;
	}
 
	
	

}