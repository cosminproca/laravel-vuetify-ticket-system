<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\UpdateFaqArticleRequest;
use App\Http\Requests\Admin\StoreFaqArticleRequest;
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
     * Store a newly created resource in storage.
     *
     * @param StoreFaqArticleRequest $request
     * @return JsonResponse
     */
    public function store(StoreFaqArticleRequest $request): JsonResponse
    {
        $validated_data = $request->validated();
        $faq_article = FaqArticle::create($validated_data);

        $status = $faq_article->save();

        return response()->json([
            'status' => $status,
            'data' => new FaqArticleResource($faq_article->load($this->relations))
        ]);
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

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateFaqArticleRequest $request
     * @param FaqArticle $faq_article
     * @return JsonResponse
     */
    public function update(UpdateFaqArticleRequest $request, FaqArticle $faq_article): JsonResponse
    {
        $validated_data = $request->validated();

        $status = $faq_article->update($validated_data);

        return response()->json([
            'status' => $status,
            'data' => new FaqArticleResource($faq_article->load($this->relations))
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param FaqArticle $faq_article
     * @return JsonResponse
     */
    public function destroy(FaqArticle $faq_article): JsonResponse
    {
        return response()->json([
            'status' => FaqArticle::destroy($faq_article->id)
        ]);
    }
}
