<?php

namespace App\Http\Controllers\Support;

use App\Http\Resources\FaqArticleResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\FaqArticle;

class FaqArticleController extends Controller
{
    private $relations = [
        'category'
    ];

    public function __construct()
    {
        $this->authorizeResource(FaqArticle::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json(FaqArticleResource::collection(FaqArticle::all()->load($this->relations)));
    }

    /**
     * Display the specified resource.
     *
     * @param FaqArticle $faq_article
     * @return JsonResponse
     */
    public function show(FaqArticle $faq_article): JsonResponse
    {
        return response()->json(new FaqArticleResource($faq_article->load($this->relations)));
    }
}
