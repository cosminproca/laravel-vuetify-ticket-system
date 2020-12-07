<?php

namespace App\Models;

use App\Enums\TicketStatus;
use BenSampo\Enum\Traits\CastsEnums;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ticket extends Model
{
    use HasFactory, CastsEnums;

    protected $guarded = [];

    protected $casts = [
      'status' => TicketStatus::class
    ];

    protected $attributes = [
        'status' => TicketStatus::Pending
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function ticket_replies(): HasMany
    {
        return $this->hasMany(TicketReply::class);
    }

    public function scopeOwnTickets($query)
    {
        return $query->where('user_id', auth()->user()->id);
    }
}
