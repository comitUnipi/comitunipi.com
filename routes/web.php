<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QrCodeController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\Auth\RegisterController;
use App\Filament\Resources\KasResource\Pages\ViewTotalKasUser;
use App\Filament\Resources\AttendanceResource\Pages\ScanQrCode;
use App\Filament\Resources\AttendanceResource\Pages\AlreadyAttendance;
use App\Filament\Resources\AttendanceResource\Pages\AttendanceSuccess;

Route::get('/', function () {
  return Inertia::render('Welcome', [
    'user' => auth()->user(),
  ]);
});

Route::get('/visi-dan-misi', function () {
  return Inertia::render('VisiDanMisi', [
    'user' => auth()->user(),
  ]);
});

Route::get('/mentor-kami', function () {
  return Inertia::render('MentorKami', [
    'user' => auth()->user(),
  ]);
});

Route::get('/pendaftaran-anggota', function () {
  return Inertia::render('Pendaftaran');
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

  Route::get('/staf-desain', function () {
    return Inertia::render('Kepengurusan/StafDesain');
  });

  Route::get('/staf-programming', function () {
    return Inertia::render('Kepengurusan/StafProgramming');
  });

  Route::get('/staf-comp-and-network', function () {
    return Inertia::render('Kepengurusan/StafCompAndNetwork');
  });

  Route::get('/staf-microsoft-office', function () {
    return Inertia::render('Kepengurusan/StafMicrosoftOffice');
  });
});

Route::get('/scan', ScanQrCode::class)->name('filament.resources.attendance-resource.pages.scan-qr-code');
Route::get('/attendance-success', AttendanceSuccess::class)->name('filament.resources.attendance-resource.pages.attendance-success');
Route::get('/already-attendance', AlreadyAttendance::class)->name('filament.resources.attendance-resource.pages.already-attendance');
Route::get('/generate-qr-code/{activityId}', [QrCodeController::class, 'generateQrCode'])->name('generate.qrcode');
Route::get('/scan-qr/{activityId}', [AttendanceController::class, 'scanQrCode'])->name('scan.qrcode');
Route::get('/total-kas-user', ViewTotalKasUser::class)->name('filament.kas.pages.view-total-kas-user');
Route::post('/pendaftaran', [RegisterController::class, 'register']);
