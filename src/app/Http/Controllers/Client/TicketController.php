<?php

namespace App\Http\Controllers\Client;

use App\Http\Requests\UpdateTicketRequest;
use App\Http\Requests\StoreTicketRequest;
use App\Http\Resources\TicketResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\Ticket;
use Illuminate\Support\Arr;

class TicketController extends Controller
{
    private $relations = [
        'user',
        'category'
    ];

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
        return response()->json(new TicketResource($ticket));
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

    /**
     * Remove the specified resource from storage.
     *
     * @param Ticket $ticket
     * @return JsonResponse
     */
    public function destroy(Ticket $ticket): JsonResponse
    {
        return response()->json([
            'status' => Ticket::destroy($ticket->id)
        ]);
    }
}
