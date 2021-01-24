<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Lorisleiva\LaravelSearchString\Concerns\SearchString;

class Category extends Model
{
    use HasFactory, SearchString;

    protected $guarded = [];

    protected $searchStringColumns = [
        'name' => ['searchable' => true]
    ];

    public function tickets(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }

    public function faq_articles(): HasMany
    {
        return $this->hasMany(Ticket::class);
    }
}
