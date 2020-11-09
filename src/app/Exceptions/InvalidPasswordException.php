<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class InvalidPasswordException extends Exception
{
    /**
     * Render the exception as an HTTP response.
     *
     * @return JsonResponse
     */
    public function render(): JsonResponse
    {
        return response()->json([
            'errors' => [
                'password' => [
                    'Invalid password'
                ]
            ]
        ], 400);
    }
}
