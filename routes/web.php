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

Route::get('/visi-dan-misi', function () {
    return Inertia::render('VisiMisi');
});

Route::get('/mentor-kami', function () {
    return Inertia::render('MentorKami');
});

Route::get('/galeri-kami', function () {
    return Inertia::render('Galeri');
});

Route::middleware(['auth', 'verified', 'role:Super Admin,Admin,Finance'])->group(function () {
    Route::get('/kas', [KasController::class, 'index'])->name('kas.index');
    Route::get('/pemasukan', [PemasukanController::class, 'index'])->name('pemasukan.index');
    Route::get('/pengeluaran', [PengeluaranController::class, 'index'])->name('pengeluaran.index');
    Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
});

Route::middleware(['auth', 'verified', 'role:Finance,Super Admin'])->group(function () {
    Route::resource('kas', KasController::class)->except(['index']);
    Route::get('/kas/export/csv', [KasController::class, 'exportCsv'])->name('kas.export.csv');
    Route::resource('pemasukan', PemasukanController::class)->except(['index']);
    Route::get('/pemasukan/export/csv', [PemasukanController::class, 'exportCsv'])->name('pemasukan.export.csv');
    Route::resource('pengeluaran', PengeluaranController::class)->except(['index']);
    Route::get('/pengeluaran/export/csv', [PengeluaranController::class, 'exportCsv'])->name('pengeluaran.export.csv');
    Route::get('/laporan/export/csv', [LaporanController::class, 'exportCsv'])->name('laporan.export.csv');
});

Route::middleware(['auth', 'verified', 'role:Super Admin'])->group(function () {
    Route::resource('users', UserController::class)->except(['index']);
    Route::get('/users/export/csv', [UserController::class, 'exportCsv'])->name('users.export.csv');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
