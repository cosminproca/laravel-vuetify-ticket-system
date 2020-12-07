<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CachePolicy
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        return $next($request)->header('Cache-Control', 'max-age=31536000, public');
    }
}
