<?php

namespace App\Policies;

use App\Models\Kas;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class KasPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Kas $kas): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role == 'admin' || $user->role == 'bendahara';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Kas $kas): bool
    {
        return $user->role == 'admin';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Kas $kas): bool
    {
        return $user->role == 'admin';
    }

    public function deleteAny(User $user): bool
    {
        return $user->role == 'admin';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Kas $kas): bool
    {
        return $user->role == 'admin';
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Kas $kas): bool
    {
        return $user->role == 'admin';
    }
}
