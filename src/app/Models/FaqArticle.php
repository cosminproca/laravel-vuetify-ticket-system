<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Lorisleiva\LaravelSearchString\Concerns\SearchString;

class FaqArticle extends Model
{
    use HasFactory, SearchString;

    protected $guarded = [];

    protected $searchStringColumns = [
      'title' => ['searchable' => true],
      'description' => ['searchable' => true],
      'category' => ['key' => 'category', 'relationship' => true],
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
