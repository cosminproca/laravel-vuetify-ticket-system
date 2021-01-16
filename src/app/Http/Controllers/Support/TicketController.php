<?php

namespace App\Http\Controllers\Support;

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
}
