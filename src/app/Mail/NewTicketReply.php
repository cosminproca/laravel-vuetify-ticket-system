<?php

namespace App\Mail;

use App\Models\Ticket;
use App\Models\TicketReply;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NewTicketReply extends Mailable
{
    use Queueable, SerializesModels;

    public $ticketReply;
    public $ticket;

    /**
     * Create a new message instance.
     *
     * @param Ticket $ticket
     * @param TicketReply $ticketReply
     */
    public function __construct(Ticket $ticket, TicketReply $ticketReply)
    {
        $this->ticket = $ticket;
        $this->ticketReply = $ticketReply;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.tickets.reply');
    }
}
