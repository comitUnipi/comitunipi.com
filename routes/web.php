<?php

use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\BuatAbsensiController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FormIzinController;
use App\Http\Controllers\KasController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\LaporanAbsensiController;
use App\Http\Controllers\LaporanKeuanganController;
use App\Http\Controllers\LinkGrupWAController;
use App\Http\Controllers\PemasukanController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\ScanAbsensiController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:Super Admin,Admin,Finance'])->group(function () {
    Route::get('/laporan/keuangan', [LaporanKeuanganController::class, 'index'])->name('laporan.index');
    Route::get('/laporan/absensi', [LaporanAbsensiController::class, 'index'])->name('laporan.absensi.index');

    Route::get('/data-master/data-anggota', [UserController::class, 'index'])->name('users.index');
    Route::get('/data-master/data-absensi', [AbsensiController::class, 'index'])->name('absensi.index');
    Route::get('/data-master/data-anggota/{id}', [UserController::class, 'show'])->name('users.show');
    Route::get('/data-master/data-kas', [KasController::class, 'index'])->name('kas.index');
    Route::get('/data-master/data-kegiatan', [KegiatanController::class, 'index'])->name('kegiatan.index');
    Route::get('/data-master/data-pemasukan', [PemasukanController::class, 'index'])->name('pemasukan.index');
    Route::get('/data-master/data-pengeluaran', [PengeluaranController::class, 'index'])->name('pengeluaran.index');
});

Route::middleware(['auth', 'verified', 'role:Finance,Super Admin'])->group(function () {
    Route::get('/kas/export/csv', [KasController::class, 'exportCsv'])->name('kas.export.csv');
    Route::get('/pengeluaran/export/csv', [PengeluaranController::class, 'exportCsv'])->name('pengeluaran.export.csv');
    Route::get('/pemasukan/export/csv', [PemasukanController::class, 'exportCsv'])->name('pemasukan.export.csv');
    Route::get('/laporan/export/csv', [LaporanKeuanganController::class, 'exportCsv'])->name('laporan.export.csv');

    Route::resource('kas', KasController::class)->except(['index']);
    Route::resource('pemasukan', PemasukanController::class)->except(['index']);
    Route::resource('pengeluaran', PengeluaranController::class)->except(['index']);
});

Route::middleware(['auth', 'verified', 'role:Super Admin'])->group(function () {
    Route::resource('users', UserController::class)->except(['index', 'show']);
    Route::resource('kegiatan', KegiatanController::class)->except(['index', 'show']);

    Route::get('/users/export/csv', [UserController::class, 'exportCsv'])->name('users.export.csv');
    Route::get('/kegiatan/export/csv', [KegiatanController::class, 'exportCsv'])->name('kegiatan.export.csv');
    Route::get('/laporan/absensi/export/csv', [LaporanAbsensiController::class, 'exportCsv'])->name('laporan.absensi.export.csv');

    Route::get('/fitur-khusus/buat-absensi', [BuatAbsensiController::class, 'generate'])->name('qr.create');
    Route::get('/fitur-khusus/group-whatsapp', [LinkGrupWAController::class, 'index'])->name('link.group-whatsapp.index');
    Route::post('/fitur-khusus/buat-absensi', [BuatAbsensiController::class, 'store'])->name('qr.store');
    Route::post('/fitur-khusus/buat-absensi/{id}/deactivate', [BuatAbsensiController::class, 'deactivate'])->name('qr.deactivate');
    Route::post('/fitur-khusus/group-whatsapp', [LinkGrupWAController::class, 'update'])->name('link.group-whatsapp.update');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/api/kegiatan/notification', [KegiatanController::class, 'notifications'])->name('kegiatan.notifications');

    Route::get('/fitur-utama/jadwal-kegiatan', [KegiatanController::class, 'terbaru'])->name('kegiatan.terbaru');
    Route::get('/fitur-utama/scan-absensi', [ScanAbsensiController::class, 'index'])->name('qr.scan.form');
    Route::post('/fitur-utama/scan-absensi', [ScanAbsensiController::class, 'store'])->name('qr.scan.store');
    Route::get('/fitur-utama/form-izin', [FormIzinController::class, 'create'])->name('absensi.create');
    Route::post('/fitur-utama/form-izin', [FormIzinController::class, 'store'])->name('absensi.store');
});

require __DIR__.'/public.php';
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
