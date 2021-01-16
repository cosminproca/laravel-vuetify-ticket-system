<?php

namespace App\Http\Controllers\Client;

use App\Http\Requests\Client\UpdateTicketRequest;
use App\Http\Requests\Client\StoreTicketRequest;
use App\Http\Resources\TicketResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\Ticket;

class TicketController extends Controller
{
    private $relations = [
        'user',
        'ticket_replies',
        'category'
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
        return response()->json(TicketResource::collection(Ticket::ownTickets()->get()->load($this->relations)));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreTicketRequest $request
     * @return JsonResponse
     */
    public function store(StoreTicketRequest $request): JsonResponse
    {
        $validated_data = $request->validated();
        $ticket = Ticket::create($validated_data);

        $status = $ticket->save();

        return response()->json([
            'status' => $status,
            'data' => new TicketResource($ticket->load($this->relations))
        ]);
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
