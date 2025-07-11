<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KasController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PemasukanController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Index');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('users', UserController::class);
    Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
    Route::get('/users/export/csv', [UserController::class, 'exportCsv'])->name('users.export.csv');
    Route::resource('kas', KasController::class);
    Route::get('/kas/export/csv', [KasController::class, 'exportCsv'])->name('kas.export.csv');
    Route::resource('pemasukan', PemasukanController::class);
    Route::get('/pemasukan/export/csv', [PemasukanController::class, 'exportCsv'])->name('pemasukan.export.csv');
    Route::resource('pengeluaran', PengeluaranController::class);
    Route::get('/pengeluaran/export/csv', [PengeluaranController::class, 'exportCsv'])->name('pengeluaran.export.csv');
    Route::resource('laporan', LaporanController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
