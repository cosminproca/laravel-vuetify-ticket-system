<?php

namespace App\Policies;

use App\Models\FaqArticle;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Auth\Access\HandlesAuthorization;

class FaqArticlePolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->hasRole(UserRole::Client) || $user->hasRole(UserRole::Admin) || $user->hasRole(UserRole::Support);
    }

    public function view(User $user, FaqArticle $faqArticle): bool
    {
        return $user->hasRole(UserRole::Client) || $user->hasRole(UserRole::Admin) || $user->hasRole(UserRole::Support);
    }

    public function create(User $user): bool
    {
        return $user->hasRole(UserRole::Admin);
    }

    public function update(User $user): bool
    {
        return $user->hasRole(UserRole::Admin);
    }

    public function delete(User $user): bool
    {
        return $user->hasRole(UserRole::Admin);
    }
}
