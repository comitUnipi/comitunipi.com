<?php

namespace App\Policies;

use App\Models\Income;
use App\Models\User;

class IncomePolicy
{
  /**
   * Determine whether the user can view any models.
   */
  public function viewAny(User $user): bool
  {
    return $user->role != 'User' && $user->role != 'Guest';
  }

  /**
   * Determine whether the user can view the model.
   */
  public function view(User $user, Income $income): bool
  {
    return $user->role != 'User' && $user->role != 'Guest';
  }

  /**
   * Determine whether the user can create models.
   */
  public function create(User $user): bool
  {
    return $user->role === 'Super Admin' || $user->role === 'Finance' && $user->is_active != false;
  }

  /**
   * Determine whether the user can update the model.
   */
  public function update(User $user, Income $income): bool
  {
    return $user->role === 'Super Admin' || $user->role === 'Finance' && $user->is_active != false;
  }

  /**
   * Determine whether the user can delete the model.
   */
  public function delete(User $user, Income $income): bool
  {
    return $user->role === 'Super Admin' && $user->is_active != false;
  }

  public function deleteAny(User $user): bool
  {
    return $user->role === 'Super Admin' && $user->is_active != false;
  }

  /**
   * Determine whether the user can restore the model.
   */
  public function restore(User $user, Income $income): bool
  {
    return $user->role === 'Super Admin' && $user->is_active != false;
  }

  /**
   * Determine whether the user can permanently delete the model.
   */
  public function forceDelete(User $user, Income $income): bool
  {
    return $user->role === 'Super Admin' && $user->is_active != false;
  }
}
