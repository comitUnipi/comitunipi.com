<?php

use App\Http\Controllers\PendaftaranAnggotaController;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/pendaftaran-anggota', [PendaftaranAnggotaController::class, 'create'])->name('anggota.create');
Route::post('/pendaftaran-anggota', [PendaftaranAnggotaController::class, 'store'])->name('anggota.store');

Route::get('/join-whatsapp', function () {
    $whatsappLink = DB::table('settings')
        ->where('key', 'whatsapp_group_link')
        ->value('value');

    return Inertia::render('Core/JoinWhatsApp', [
        'whatsappLink' => $whatsappLink,
    ]);
})->middleware('sudah.daftar')->name('anggota.whatsapp');

Route::get('/', function () {
    $userCount = User::count();

    return Inertia::render('Core/Index', [
        'userCount' => $userCount,
    ]);
});

Route::get('/visi-dan-misi', function () {
    return Inertia::render('Core/VisiMisi');
});

Route::get('/mentor-kami', function () {
    return Inertia::render('Core/MentorKami');
});

Route::get('/galeri-kami', function () {
    return Inertia::render('Core/GaleriKami');
});

Route::get('/kegiatan-kami', function () {
    return Inertia::render('Core/KegiatanKami');
});

Route::prefix('kepengurusan')->group(function () {
    Route::get('/ketua-dan-wakil-ketua-umum', function () {
        return Inertia::render('Core/Kepengurusan/KetuaDanWakilKetua');
    });
    Route::get('/sekretaris', function () {
        return Inertia::render('Core/Kepengurusan/Sekretaris');
    });
    Route::get('/bendahara', function () {
        return Inertia::render('Core/Kepengurusan/Bendahara');
    });
    Route::get('/sdm', function () {
        return Inertia::render('Core/Kepengurusan/SDM');
    });
    Route::get('/humas-internal', function () {
        return Inertia::render('Core/Kepengurusan/HumasInternal');
    });
    Route::get('/humas-eksternal', function () {
        return Inertia::render('Core/Kepengurusan/HumasEksternal');
    });
    Route::get('/koordinator', function () {
        return Inertia::render('Core/Kepengurusan/Koordinator');
    });
    Route::get('/prasarana', function () {
        return Inertia::render('Core/Kepengurusan/Prasarana');
    });
    Route::get('/kominfo', function () {
        return Inertia::render('Core/Kepengurusan/Kominfo');
    });
    Route::get('/staff-design-grafis', function () {
        return Inertia::render('Core/Kepengurusan/StaffDesignGrafis');
    });
    Route::get('/staff-programming', function () {
        return Inertia::render('Core/Kepengurusan/StaffProgramming');
    });
    Route::get('/staff-comp-and-network', function () {
        return Inertia::render('Core/Kepengurusan/StaffCompAndNetwork');
    });
    Route::get('/staff-microsoft-office', function () {
        return Inertia::render('Core/Kepengurusan/StaffMicrosoftOffice');
    });
});
