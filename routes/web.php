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
use App\Filament\Resources\KasPengurusResource\Pages\ViewTotalKasPengurus;

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

Route::get('/kegiatan-kami', function () {
  return Inertia::render('Kegiatan', [
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

Route::get('/galeri-kami', function () {
  return Inertia::render('Galeri', [
    'user' => auth()->user(),
  ]);
});

Route::prefix('kepengurusan')->group(function () {

  Route::get('/ketua-dan-wakil-ketua-umum', function () {
    return Inertia::render('Kepengurusan/KetuaDanWakilKetua', [
      'user' => auth()->user(),
    ]);
  });

  Route::get('/sekretaris', function () {
    return Inertia::render('Kepengurusan/Sekretaris', [
      'user' => auth()->user(),
    ]);
  });

  Route::get('/bendahara', function () {
    return Inertia::render('Kepengurusan/Bendahara', [
      'user' => auth()->user(),
    ]);
  });

  Route::get('/sdm', function () {
    return Inertia::render('Kepengurusan/Sdm', [
      'user' => auth()->user(),
    ]);
  });

  Route::get('/humas-internal', function () {
    return Inertia::render('Kepengurusan/HumasInternal', [
      'user' => auth()->user(),
    ]);
  });

  Route::get('/humas-eksternal', function () {
    return Inertia::render('Kepengurusan/HumasEksternal', [
      'user' => auth()->user(),
    ]);
  });

  Route::get('/koordinator', function () {
    return Inertia::render('Kepengurusan/Koordinator', [
      'user' => auth()->user(),
    ]);
  });

  Route::get('/prasarana', function () {
    return Inertia::render('Kepengurusan/Prasarana', [
      'user' => auth()->user(),
    ]);
  });

  Route::get('/kominfo', function () {
    return Inertia::render('Kepengurusan/Kominfo', [
      'user' => auth()->user(),
    ]);
  });

  Route::get('/staff-design-grafis', function () {
    return Inertia::render('Kepengurusan/StaffDesignGrafis', [
      'user' => auth()->user(),
    ]);
  });

  Route::get('/staff-programming', function () {
    return Inertia::render('Kepengurusan/StaffProgramming', [
      'user' => auth()->user(),
    ]);
  });

  Route::get('/staff-comp-and-network', function () {
    return Inertia::render('Kepengurusan/StaffCompAndNetwork', [
      'user' => auth()->user(),
    ]);
  });

  Route::get('/staff-microsoft-office', function () {
    return Inertia::render('Kepengurusan/StaffMicrosoftOffice', [
      'user' => auth()->user(),
    ]);
  });
});

Route::get('/scan', ScanQrCode::class)->name('filament.resources.attendance-resource.pages.scan-qr-code');
Route::get('/attendance-success', AttendanceSuccess::class)->name('filament.resources.attendance-resource.pages.attendance-success');
Route::get('/already-attendance', AlreadyAttendance::class)->name('filament.resources.attendance-resource.pages.already-attendance');
Route::get('/generate-qr-code/{activityId}', [QrCodeController::class, 'generateQrCode'])->name('generate.qrcode');
Route::get('/scan-qr/{activityId}', [AttendanceController::class, 'scanQrCode'])->name('scan.qrcode');
Route::get('/total-kas-user', ViewTotalKasUser::class)->name('filament.kas.pages.view-total-kas-user');
Route::get('/total-kas-pengurus', ViewTotalKasPengurus::class)->name('filament.kas-pengurus.pages.view-total-kas-pengurus');
Route::post('/pendaftaran', [RegisterController::class, 'register']);
