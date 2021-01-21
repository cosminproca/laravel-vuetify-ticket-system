<?php

namespace App\Providers;

use App\Models\Ticket;
use App\Models\TicketReply;
use App\Observers\TicketObserver;
use App\Observers\TicketReplyObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot(): void
    {
        Ticket::observe(TicketObserver::class);
        TicketReply::observe(TicketReplyObserver::class);
    }
}
