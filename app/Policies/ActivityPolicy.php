<?php

namespace App\Policies;

use App\Models\Activity;
use App\Models\User;

class ActivityPolicy
{
  /**
   * Determine whether the user can view any models.
   */
  public function viewAny(User $user): bool
  {
    return !in_array($user->role, ['User', 'Guest']);
  }

  /**
   * Determine whether the user can view the model.
   */
  public function view(User $user, Activity $activity): bool
  {
    return !in_array($user->role, ['User', 'Guest']);
  }

  /**
   * Determine whether the user can create models.
   */
  public function create(User $user): bool
  {
    return in_array($user->role, ['Admin', 'Super Admin']);
  }

  /**
   * Determine whether the user can update the model.
   */
  public function update(User $user, Activity $activity): bool
  {
    return in_array($user->role, ['Admin', 'Super Admin']);
  }

  /**
   * Determine whether the user can delete the model.
   */
  public function delete(User $user, Activity $activity): bool
  {
    return in_array($user->role, ['Admin', 'Super Admin']);
  }

  public function deleteAny(User $user): bool
  {
    return in_array($user->role, ['Admin', 'Super Admin']);
  }

  /**
   * Determine whether the user can restore the model.
   */
  public function restore(User $user, Activity $activity): bool
  {
    return in_array($user->role, ['Admin', 'Super Admin']);
  }

  /**
   * Determine whether the user can permanently delete the model.
   */
  public function forceDelete(User $user, Activity $activity): bool
  {
    return in_array($user->role, ['Admin', 'Super Admin']);
  }
}
