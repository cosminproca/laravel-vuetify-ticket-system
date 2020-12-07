<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\Category;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CategoryPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->hasRole(UserRole::Client) || $user->hasRole(UserRole::Admin) || $user->hasRole(UserRole::Support);
    }

    public function view(User $user, Category $category): bool
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
