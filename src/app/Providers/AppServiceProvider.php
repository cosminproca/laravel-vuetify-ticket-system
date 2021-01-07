<?php

namespace App\Providers;

use App\Mail\TestEmail;
use App\Models\Ticket;
use App\Models\User;
use BeyondCode\Mailbox\Facades\Mailbox;
use BeyondCode\Mailbox\InboundEmail;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void
    {
        Mailbox::from('test.admin@example.com', function (InboundEmail $email) {
            $user = User::where('email', $email->from())->firstOrFail();

            Ticket::create([
                'user_id' => $user->id,
                'category_id' => 1,
                'title' => $email->subject(),
                'description' => $email->text()
            ]);
        });
    }
}
