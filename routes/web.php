<?php

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

Route::get('/generate-qr-code/{activityId}', [QrCodeController::class, 'generateQrCode'])->name('generate.qrcode');
Route::get('/scan-qr/{activityId}', [AttendanceController::class, 'scanQrCode'])->name('scan.qrcode');
Route::get('/scan', function () {
    return view('scan');
})->name('scan.page');
