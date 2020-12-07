<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SetLocale
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
        if ($locale = $this->parseLocale($request)) {
            app()->setLocale($locale);
        }

        return $next($request);
    }

    /**
     * @param Request $request
     * @return string|null
     */
    protected function parseLocale(Request $request): ?string
    {
        $locales = config('app.locales');

        $locale = $request->server('HTTP_ACCEPT_LANGUAGE');
        $locale = substr($locale, 0, strpos($locale, ',') ?: strlen($locale));

        if (array_key_exists($locale, $locales)) {
            return $locale;
        }

        $locale = substr($locale, 0, 2);
        if (array_key_exists($locale, $locales)) {
            return $locale;
        }

        return null;
    }
}
