<?php

namespace App\Policies;

use App\Enums\UserRole;
use App\Models\TicketReply;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TicketReplyPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return false;
    }

    public function view(User $user, TicketReply $ticketReply): bool
    {
        return $user->id === $ticketReply->user_id || $user->hasRole(UserRole::Admin) || $user->hasRole(UserRole::Support);
    }

    public function create(User $user): bool
    {
        return $user->hasRole(UserRole::Client) || $user->hasRole(UserRole::Support) || $user->hasRole(UserRole::Admin);
    }

    public function update(User $user, TicketReply $ticketReply): bool
    {
        return $user->id === $ticketReply->user_id || $user->hasRole(UserRole::Admin) || $user->hasRole(UserRole::Support);
    }

    public function delete(User $user): bool
    {
        return $user->hasRole(UserRole::Admin);
    }
}
