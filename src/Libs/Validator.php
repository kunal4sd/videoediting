<?php

namespace App\Libs;

use Respect\Validation\Exceptions\NestedValidationException;
use Slim\Http\Request;

class Validator
{

    private $errors;

    public function validate(Request $request, array $rules, bool $use_placeholders = false)
    {
        if ($use_placeholders) {
            $route = $request->getAttribute('route');
            $params = $route->getArguments();
        }
        else {
            $params = $request->getParams();
        }

        foreach($rules as $field => $rule) {
            try {
                $rule->setName(ucwords($field))->assert($params[$field] ?? '');
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
