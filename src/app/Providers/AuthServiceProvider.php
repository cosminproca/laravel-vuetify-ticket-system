<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\FaqArticle;
use App\Models\Ticket;
use App\Policies\CategoryPolicy;
use App\Policies\FaqArticlePolicy;
use App\Policies\TicketPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Ticket::class => TicketPolicy::class,
        Category::class => CategoryPolicy::class,
        FaqArticle::class => FaqArticlePolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
