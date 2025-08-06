<?php

use App\Http\Controllers\CalonAnggotaController;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/pendaftaran-anggota', [CalonAnggotaController::class, 'create'])->name('anggota.create');
Route::post('/pendaftaran-anggota', [CalonAnggotaController::class, 'store'])->name('anggota.store');

Route::get('/join-whatsapp', function () {
    $whatsappLink = DB::table('settings')
        ->where('key', 'whatsapp_group_link')
        ->value('value');

    return Inertia::render('CalonAnggota/JoinWhatsApp', [
        'whatsappLink' => $whatsappLink,
    ]);
})->middleware('sudah.daftar')->name('anggota.whatsapp');

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
        return Inertia::render('Kepengurusan/SDM');
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
