<?php

use App\Http\Controllers\AppController;
use App\Mail\TestEmail;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/send-email', function() {
    Mail::raw('This is the content of the mail body', function ($message) {
        $message->to('text.admin@example.com');
        $message->subject('Gigel');
    });

    echo "Email sent successfully!";
});

Route::get('{path}', AppController::class)->where('path', '(.*)');
