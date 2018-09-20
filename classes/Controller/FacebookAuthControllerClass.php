<?php

namespace App\Controller;

/**
 * FacebookAuthControllerClass
 *
 * @author Andchir <andycoderw@gmail.com>
 */
class FacebookAuthControllerClass extends BaseControllerClass
{

    /**
     * FacebookAuthControllerClass constructor.
     * @param array $config
     */
    public function __construct($config = array())
    {

        parent::__construct( $config );

    }

    /**
     * Facebook auth
     * @return bool
     */
    public function auth()
    {
        if( empty( $_GET['code'] ) ) {
            return false;
        }

        $code = trim( $_GET['code'] );
        $returnUrl = self::getReturnUrl();

        $tokenUrl = 'https://graph.facebook.com/oauth/access_token';
        $tokenUrl .= '?client_id=' . $this->config['facebook_app_id'];
        $tokenUrl .= '&redirect_uri=' . urlencode( $returnUrl );
        $tokenUrl .= '&client_secret=' . $this->config['facebook_secret_key'];
        $tokenUrl .= '&code=' . $code;
        $tokenUrl .= '&scope=public_profile,email';

        $response = @file_get_contents( $tokenUrl );
        $params = !empty( $response ) ? json_decode($response, true) : array();

        if( !empty( $params['access_token'] ) ){

            $graphUrl = 'https://graph.facebook.com/me?fields=id,name,email&access_token=' . $params['access_token'];
            $response = @file_get_contents( $graphUrl );
            $data = !empty( $response ) ? json_decode( $response, true ) : array();

            if( empty( $data ) || empty( $data['email'] ) ){
                return false;
            }

            $userId = 'fb' . $data['id'];
            $user = $this->dbGetBy('users', 'facebook_id', $data['id'], true);
            if( empty( $user ) ){
                $user = array(
                    'facebook_id' => $data['id'],
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'role' => !empty( $this->config['admin_facebook_email'] )
                        && $this->config['admin_facebook_email'] == $data['email']
                            ? 'admin'
                            : 'user'
                );
                $this->dbInsert('users', $userId, $user);
                $user['id'] = $userId;
            } else {

                $this->cleanTempUserDir( $userId );

            }

            if( empty( $user['blocked'] ) ){
                self::sessionSet('user', array(
                    'id' => $user['id'],
                    'role' => $user['role']
                ));
            }
            else {
                self::setFlash('errors', 'User is blocked.');
            }

            self::redirectTo( $this->config['base_url'] );
        }

        return false;
    }

    /**
     * @param $facebookAppId
     * @return string
     */
    static function getAuthUrl( $facebookAppId = '' )
    {
        $returnUrl = self::getReturnUrl();

        $authUrl = 'https://www.facebook.com/dialog/oauth';
        $authUrl .= '?client_id=' . $facebookAppId;
        $authUrl .= '&redirect_uri=' . urlencode( $returnUrl );
        $authUrl .= '&scope=public_profile,email';

        return $authUrl;
    }

    /**
     * @return string
     */
    static function getReturnUrl()
    {
        $baseUrl = self::getCurrentBaseUrl();
        return $baseUrl . 'index.php?action=auth';
    }

}