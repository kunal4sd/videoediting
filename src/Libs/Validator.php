<?php

namespace App\Libs;

use Respect\Validation\Validator as Respect;
use Respect\Validation\Exceptions\NestedValidationException;
use Slim\Http\Request;

class Validator
{

    private $errors;

    public function validate(Request $request, array $rules)
    {
        foreach($rules as $field => $rule) {
            try {
                $rule->setName(ucwords($field))->assert($request->getParam($field));
            }
            catch(NestedValidationException $e) {
                $this->errors[$field] = $e->getMessages();
            }
        }

        return $this;
    }

    public function failed()
    {
        return !empty($this->errors);
    }

    public function get_errors()
    {
        return $this->errors;
    }

}
