<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KasController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PemasukanController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $userCount = User::count();

    return Inertia::render('Index', [
        'userCount' => $userCount,
    ]);
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

Route::get('/kegiatan-kami', function () {
    return Inertia::render('Kegiatan');
});

Route::prefix('kepengurusan')->group(function () {
    Route::get('/ketua-dan-wakil-ketua-umum', function () {
        return Inertia::render('Kepengurusan/KetuaDanWakilKetua');
    });
    Route::get('/sekretaris', function () {
        return Inertia::render('Kepengurusan/Sekretaris');
    });
    Route::get('/bendahara', function () {
        return Inertia::render('Kepengurusan/Bendahara');
    });
    Route::get('/sdm', function () {
        return Inertia::render('Kepengurusan/Sdm');
    });
    Route::get('/humas-internal', function () {
        return Inertia::render('Kepengurusan/HumasInternal');
    });
    Route::get('/humas-eksternal', function () {
        return Inertia::render('Kepengurusan/HumasEksternal');
    });
    Route::get('/koordinator', function () {
        return Inertia::render('Kepengurusan/Koordinator');
    });
    Route::get('/prasarana', function () {
        return Inertia::render('Kepengurusan/Prasarana');
    });
    Route::get('/kominfo', function () {
        return Inertia::render('Kepengurusan/Kominfo');
    });
    Route::get('/staff-design-grafis', function () {
        return Inertia::render('Kepengurusan/StaffDesignGrafis');
    });
    Route::get('/staff-programming', function () {
        return Inertia::render('Kepengurusan/StaffProgramming');
    });
    Route::get('/staff-comp-and-network', function () {
        return Inertia::render('Kepengurusan/StaffCompAndNetwork');
    });
    Route::get('/staff-microsoft-office', function () {
        return Inertia::render('Kepengurusan/StaffMicrosoftOffice');
    });
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
