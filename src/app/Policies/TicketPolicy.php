<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\FaqArticle;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TicketPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->hasRole(UserRole::Client) || $user->hasRole(UserRole::Admin) || $user->hasRole(UserRole::Support);
    }

    public function view(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id || $user->hasRole(UserRole::Admin) || $user->hasRole(UserRole::Support);
    }

    public function create(User $user): bool
    {
        return $user->hasRole(UserRole::Client);
    }

    public function update(User $user, Ticket $ticket): bool
    {
        return $user->id === $ticket->user_id || $user->hasRole(UserRole::Admin) || $user->hasRole(UserRole::Support);
    }

    public function delete(User $user): bool
    {
        return $user->hasRole(UserRole::Admin);
    }
}
