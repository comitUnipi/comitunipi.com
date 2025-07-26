<?php

use App\Http\Controllers\CreateQRCodeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KasController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PemasukanController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:Super Admin,Admin,Finance'])->group(function () {
    Route::get('/kas', [KasController::class, 'index'])->name('kas.index');
    Route::get('/pemasukan', [PemasukanController::class, 'index'])->name('pemasukan.index');
    Route::get('/pengeluaran', [PengeluaranController::class, 'index'])->name('pengeluaran.index');
    Route::get('/laporan', [LaporanController::class, 'index'])->name('laporan.index');
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
    Route::get('/kegiatan', [KegiatanController::class, 'index'])->name('kegiatan.index');
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
    Route::resource('kegiatan', KegiatanController::class)->except(['index', 'show']);
    Route::get('/kegiatan/export/csv', [KegiatanController::class, 'exportCsv'])->name('kegiatan.export.csv');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/kegiatan/terbaru', [KegiatanController::class, 'terbaru'])->name('kegiatan.terbaru');
    Route::get('/api/kegiatan/notification', [KegiatanController::class, 'notifications'])->name('kegiatan.notifications');
    Route::match(['get', 'post'], '/absensi/generate/qr-code', [CreateQRCodeController::class, 'generate'])->name('qr.generate');
    Route::post('/qr-code/{id}/deactivate', [CreateQRCodeController::class, 'deactivate'])->name('qr.deactivate');
});

require __DIR__ . '/public.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
