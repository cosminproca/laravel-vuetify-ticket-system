<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FaqArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return array_merge(parent::toArray($request), [
            'category' => new CategoryResource($this->whenLoaded('category')),
            'created_at' => $this->created_at->toDateString(),
            'updated_at' => $this->updated_at->toDateString()
        ]);
    }
}
