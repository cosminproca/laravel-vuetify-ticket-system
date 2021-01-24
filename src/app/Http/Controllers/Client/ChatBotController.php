<?php


namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\FaqArticleResource;
use App\Models\FaqArticle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class ChatBotController extends Controller
{
    public function generateReply(Request $request): JsonResponse
    {
        $text = $request->input('text');

        $faq_articles = FaqArticle::usingSearchString($text)->get();

        return response()->json(FaqArticleResource::collection($faq_articles));
    }
}
