<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KasController;

Route::get('/', function () {
    return Inertia::render('Index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('users', UserController::class);
    Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
    Route::resource('kas', KasController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
