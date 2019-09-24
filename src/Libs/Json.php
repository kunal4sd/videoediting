<?php

namespace App\Libs;

use Slim\Http\Response;

class Json
{

    const JSON_RESPONSE_OUTPUT_FIELDS_SUCCESS = [
        'success',
        'result',
        'message',
        'code'
    ];

    const JSON_RESPONSE_OUTPUT_FIELDS_FAIL = [
        'success',
        'message',
        'code'
    ];

    public static function build(
        Response &$response,
        $data = 'Unknown error',
        $code = 500
    )
    {

        if ($code < 400) {
            $message = false;
            if (isset($data['message'])) {
                $message = $data['message'];
                unset($data['message']);
            }
            $response_array = self::response_success(true, $data, $message, $code);
        }
        else {
            $response_array = self::response_fail(false, $data, $code);
        }

        return $response->withJson($response_array, $code);
    }

    private static function response_success($success, $data, $message, $code)
    {

        return array_combine(
            self::JSON_RESPONSE_OUTPUT_FIELDS_SUCCESS,
            [
                $success,
                $data,
                $message,
                $code
            ]
        );
    }

    private static function response_fail($success, $data, $code)
    {

        return array_combine(
            self::JSON_RESPONSE_OUTPUT_FIELDS_FAIL,
            [
                $success,
                $data,
                $code
            ]
        );
    }
}
