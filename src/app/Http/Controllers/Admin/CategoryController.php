<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\UpdateCategoryRequest;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use App\Models\Category;

class CategoryController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Category::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        return response()->json(CategoryResource::collection(Category::all()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreCategoryRequest $request
     * @return JsonResponse
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $validated_data = $request->validated();
        $category = Category::create($validated_data);

        $status = $category->save();

        return response()->json([
            'status' => $status,
            'data' => new CategoryResource($category)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param Category $category
     * @return JsonResponse
     */
    public function show(Category $category): JsonResponse
    {
        return response()->json(new CategoryResource($category));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateCategoryRequest $request
     * @param Category $category
     * @return JsonResponse
     */
    public function update(UpdateCategoryRequest $request, Category $category): JsonResponse
    {
        $validated_data = $request->validated();

        $status = $category->update($validated_data);

        return response()->json([
            'status' => $status,
            'data' => new CategoryResource($category)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
     * @return JsonResponse
     */
    public function destroy(Category $category): JsonResponse
    {
        return response()->json([
            'status' => Category::destroy($category->id)
        ]);
    }
}
