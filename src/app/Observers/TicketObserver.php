<?php

namespace App\Observers;

use App\Enums\UserRole;
use App\Mail\NewTicket;
use App\Mail\TicketUpdated;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class TicketObserver
{
    /**
     * Handle the ticket "created" event.
     *
     * @param Ticket $ticket
     * @return void
     */
    public function created(Ticket $ticket): void
    {
        Mail::to($ticket->user)->send(new NewTicket($ticket, $ticket->user));

        $supports = User::role(UserRole::Support)->get();
        $admins = User::role(UserRole::Admin)->get();

        foreach ($supports as $support) {
            Mail::to($support)->send(new NewTicket($ticket, $support));
        }

        foreach ($admins as $admin) {
            Mail::to($admin)->send(new NewTicket($ticket, $admin));
        }
    }

    /**
     * Handle the ticket "updated" event.
     *
     * @param Ticket $ticket
     * @return void
     */
    public function updated(Ticket $ticket): void
    {
        Mail::to($ticket->user)->send(new TicketUpdated($ticket));
    }

    /**
     * Handle the ticket "deleted" event.
     *
     * @param Ticket $ticket
     * @return void
     */
    public function deleted(Ticket $ticket)
    {
        //
    }

    /**
     * Handle the ticket "restored" event.
     *
     * @param Ticket $ticket
     * @return void
     */
    public function restored(Ticket $ticket)
    {
        //
    }

    /**
     * Handle the ticket "force deleted" event.
     *
     * @param Ticket $ticket
     * @return void
     */
    public function forceDeleted(Ticket $ticket)
    {
        //
    }
}
