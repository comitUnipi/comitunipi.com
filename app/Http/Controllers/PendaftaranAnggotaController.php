<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePendaftaranAnggotaRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class PendaftaranAnggotaController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Core/PendaftaranAnggota');
    }

    public function store(StorePendaftaranAnggotaRequest $request)
    {
        User::create([
            'name'           => $request->name,
            'npm'            => $request->npm,
            'email'          => $request->email,
            'password'       => Hash::make($request->npm),
            'jenis_kelamin'  => $request->jenis_kelamin,
            'no_wa'          => $request->no_wa,
            'jurusan'        => $request->jurusan,
            'minat_keahlian' => $request->minat_keahlian,
            'alasan'         => $request->alasan,
        ]);

        session(['sudah_daftar_anggota' => true]);

        return redirect()->route('anggota.whatsapp')->with('success', 'Pendaftaran berhasil! silahkan gabung grup whatsapp.');
    }
}
