<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\StoreTicketReplyRequest;
use App\Http\Requests\Client\UpdateTicketReplyRequest;
use App\Http\Resources\TicketReplyResource;
use App\Models\TicketReply;
use Illuminate\Http\JsonResponse;

class TicketReplyController extends Controller
{
    private $relations = [
        'user',
        'category'
    ];

    public function __construct()
    {
        $this->authorizeResource(TicketReply::class);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreTicketReplyRequest $request
     * @return JsonResponse
     */
    public function store(StoreTicketReplyRequest $request): JsonResponse
    {
        $validated_data = $request->validated();
        $ticketReply = TicketReply::create($validated_data);

        $status = $ticketReply->save();

        return response()->json([
            'status' => $status,
            'data' => new TicketReplyResource($ticketReply->load($this->relations))
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param TicketReply $ticketReply
     * @return JsonResponse
     */
    public function show(TicketReply $ticketReply): JsonResponse
    {
        return response()->json(new TicketReplyResource($ticketReply->load($this->relations)));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateTicketReplyRequest $request
     * @param TicketReply $ticketReply
     * @return JsonResponse
     */
    public function update(UpdateTicketReplyRequest $request, TicketReply $ticketReply): JsonResponse
    {
        $validated_data = $request->validated();

        $status = $ticketReply->update($validated_data);

        return response()->json([
            'status' => $status,
            'data' => new TicketReplyResource($ticketReply->load($this->relations))
        ]);
    }
}
