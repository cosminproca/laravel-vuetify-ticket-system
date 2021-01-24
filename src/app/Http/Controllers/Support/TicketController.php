<?php

namespace App\Http\Controllers\Support;

use App\Http\Requests\Support\UpdateTicketRequest;
use App\Http\Resources\TicketResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\Ticket;

class TicketController extends Controller
{
    private $relations = [
        'user',
        'category',
        'ticket_replies',
        'ticket_replies.user',
        'ticket_replies.ticket',
        'ticket_replies.user.roles'
    ];

    public function __construct()
    {
        $this->authorizeResource(Ticket::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json(TicketResource::collection(Ticket::all()->load($this->relations)));
    }

    /**
     * Display the specified resource.
     *
     * @param Ticket $ticket
     * @return JsonResponse
     */
    public function show(Ticket $ticket): JsonResponse
    {
        return response()->json(new TicketResource($ticket->load($this->relations)));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateTicketRequest $request
     * @param Ticket $ticket
     * @return JsonResponse
     */
    public function update(UpdateTicketRequest $request, Ticket $ticket): JsonResponse
    {
        $validated_data = $request->validated();

        $status = $ticket->update($validated_data);

        return response()->json([
            'status' => $status,
            'data' => new TicketResource($ticket->load($this->relations))
        ]);
    }
}
