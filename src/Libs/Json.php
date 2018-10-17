<?php

namespace App\Libs;

use Slim\Http\Response;

class Json
{

    const JSON_RESPONSE_OUTPUT_FIELDS_SUCCESS = [
        'success',
        'result'
    ];

    const JSON_RESPONSE_OUTPUT_FIELDS_FAIL = [
        'success',
        'message'
    ];

    public static function build(
        Response &$response,
        $data = 'Unknown error',
        $code = 500
    )
    {

        if ($code < 400) {
            $response_array = self::response_success(true, $data);
        }
        else {
            $response_array = self::response_fail(false, $data);
        }

        return $response
            ->withHeader('Content-type', 'application/json')
            ->withStatus($code)
            ->write(json_encode($response_array))
            ;
    }

    private static function response_success($success, $data)
    {

        return array_combine(
            self::JSON_RESPONSE_OUTPUT_FIELDS_SUCCESS,
            [
                $success,
                $data
            ]
        );
    }

    private static function response_fail($success, $data)
    {

        return array_combine(
            self::JSON_RESPONSE_OUTPUT_FIELDS_FAIL,
            [
                $success,
                $data
            ]
        );
    }
}
