<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class EmailTakenException extends Exception
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
                'email' => [
                    'A user has already been registered under this email.'
                ]
            ]
        ], 400);
    }
}
