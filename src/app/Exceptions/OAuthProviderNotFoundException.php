<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class OAuthProviderNotFoundException extends Exception
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
                'OAuth Provider not Found'
            ]
        ], 400);
    }
}

