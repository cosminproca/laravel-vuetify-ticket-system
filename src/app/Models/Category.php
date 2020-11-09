<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Kirschbaum\PowerJoins\PowerJoins;

class Category extends Model
{
    use HasFactory, PowerJoins;

    protected $guarded = [];

    public function ticket(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }
}
