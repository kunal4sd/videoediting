<?php

namespace App\Lib;

class Json
{

    const JSON_RESPONSE_OUTPUT_FIELDS = [
        'success',
        'result'
    ];

    public function build(array $data = [])
    {

        $public_data = [];

        if (isset($data['result'])) {
            $public_data = $data['result'];
        }

        if (
            !is_array($public_data)
            && ($public_data = json_decode($public_data, true)) === false
        ) {
            return self::jsonResponse();
        }

        return json_encode(self::jsonResponse(true, $public_data));
    }

    private static function jsonResponse($success = false, array $result = [])
    {

        return array_combine(
            self::JSON_RESPONSE_OUTPUT_FIELDS,
            [
                $success,
                $result
            ]
        );
    }
}
