<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>Ticket Updated</title>
</head>
<body>
    <h1>The ticket <a href="{{ url("/client/tickets/$ticket->id") }}">{{ $ticket->title }}</a> has been been updated to status <strong>{{ $ticket->status }}</strong></h1>
    <h2>Ticket Description</h2>
    <div>{!! html_entity_decode($ticket->description) !!}</div>
</body>
</html>
