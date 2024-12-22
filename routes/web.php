<?php

use App\Filament\Resources\AttendanceResource\Pages\AlreadyAttendance;
use App\Filament\Resources\AttendanceResource\Pages\AttendanceSuccess;
use App\Filament\Resources\AttendanceResource\Pages\ScanQrCode;
use App\Filament\Resources\KasResource\Pages\ViewTotalKasUser;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QrCodeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome',[
        'user' => auth()->user(),
    ]);
});

Route::get('/scan', ScanQrCode::class)->name('filament.resources.attendance-resource.pages.scan-qr-code');
Route::get('/attendance-success', AttendanceSuccess::class)->name('filament.resources.attendance-resource.pages.attendance-success');
Route::get('/already-attendance', AlreadyAttendance::class)->name('filament.resources.attendance-resource.pages.already-attendance');
Route::get('/generate-qr-code/{activityId}', [QrCodeController::class, 'generateQrCode'])->name('generate.qrcode');
Route::get('/scan-qr/{activityId}', [AttendanceController::class, 'scanQrCode'])->name('scan.qrcode');
Route::get('/total-kas-user', ViewTotalKasUser::class)->name('filament.kas.pages.view-total-kas-user');
