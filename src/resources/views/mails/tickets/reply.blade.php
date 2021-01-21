<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>New Ticket Reply</title>
</head>
<body>
    <h1>A new ticket reply has been added to ticket <a href="{{ url("/client/tickets/$ticket->id") }}">{{ $ticket->title }}</a> from <strong>{{ $ticketReply->user->email }}</strong></h1>
    <h2>Ticket Reply Text</h2>
    <div>{!! html_entity_decode($ticketReply->text) !!}</div>
</body>
</html>
