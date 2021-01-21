<?php

namespace App\Observers;

use App\Mail\NewTicket;
use App\Mail\NewTicketReply;
use App\Models\TicketReply;
use Illuminate\Support\Facades\Mail;

class TicketReplyObserver
{
    /**
     * Handle the ticket reply "created" event.
     *
     * @param TicketReply $ticketReply
     * @return void
     */
    public function created(TicketReply $ticketReply): void
    {
        Mail::to($ticketReply->ticket->user)->send(new NewTicketReply($ticketReply->ticket, $ticketReply));
    }

    /**
     * Handle the ticket reply "updated" event.
     *
     * @param TicketReply $ticketReply
     * @return void
     */
    public function updated(TicketReply $ticketReply)
    {
        //
    }

    /**
     * Handle the ticket reply "deleted" event.
     *
     * @param TicketReply $ticketReply
     * @return void
     */
    public function deleted(TicketReply $ticketReply)
    {
        //
    }

    /**
     * Handle the ticket reply "restored" event.
     *
     * @param TicketReply $ticketReply
     * @return void
     */
    public function restored(TicketReply $ticketReply)
    {
        //
    }

    /**
     * Handle the ticket reply "force deleted" event.
     *
     * @param TicketReply $ticketReply
     * @return void
     */
    public function forceDeleted(TicketReply $ticketReply)
    {
        //
    }
}
