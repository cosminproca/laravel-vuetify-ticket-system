<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'middleware' => 'guest:api',
    'namespace' => 'App\\Http\\Controllers\\Auth',
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');

    Route::post('oauth/{driver}', 'OAuthController@redirectToProvider');
    Route::get('oauth/{driver}/callback', 'OAuthController@handleProviderCallback')->name('oauth.callback');
});

Route::group([
    'middleware' => 'auth:api',
], function () {
    Route::group([
        'prefix' => 'auth',
        'namespace' => 'App\\Http\\Controllers\\Auth',
    ], function() {
        Route::get('user', 'AuthController@user');
        Route::post('logout', 'AuthController@logout');
        Route::post('refresh', 'AuthController@refresh');
    });

    Route::name('client.')->group(function() {
        Route::group([
            'middleware' => 'role:client',
            'namespace' => 'App\Http\Controllers\Client',
            'prefix' => 'client'
        ], function () {
            Route::apiResources([
                'tickets' => 'TicketController',
                'categories' => 'CategoryController',
                'ticket_replies' => 'TicketReplyController',
                'faq_articles' => 'FaqArticleController'
            ]);
        });
    });

    Route::name('support.')->group(function() {
        Route::group([
            'middleware' => 'role:support',
            'namespace' => 'App\Http\Controllers\Support',
            'prefix' => 'support'
        ], function () {
/*            Route::apiResources([
                'tickets' => 'TicketController',
                'categories' => 'CategoryController',
                'ticket_replies' => 'TicketReplyController',
                'faq_articles' => 'FaqArticleController'
            ]);*/
        });
    });

    Route::name('admin.')->group(function() {
        Route::group([
            'middleware' => 'role:admin',
            'namespace' => 'App\Http\Controllers\Admin',
            'prefix' => 'admin'
        ], function () {
            Route::apiResources([
                'categories' => 'CategoryController',
                'ticket_replies' => 'TicketReplyController',
                'faq_articles' => 'FaqArticleController'
            ]);
        });
    });
});
