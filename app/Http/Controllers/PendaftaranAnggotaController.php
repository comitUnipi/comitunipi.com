<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class PendaftaranAnggotaController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Core/PendaftaranAnggota');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'npm' => 'required|string|max:20|unique:users,npm',
            'email' => 'required|email|unique:users,email',
            'jenis_kelamin' => 'required|in:Laki-Laki,Perempuan',
            'no_wa' => 'required|string|max:20',
            'jurusan' => 'required|string',
            'minat_keahlian' => 'required|string',
            'alasan' => 'required|string|max:1000',
        ]);

        User::create([
            'name' => $request->name,
            'npm' => $request->npm,
            'email' => $request->email,
            'password' => Hash::make($request->npm),
            'jenis_kelamin' => $request->jenis_kelamin,
            'no_wa' => $request->no_wa,
            'jurusan' => $request->jurusan,
            'minat_keahlian' => $request->minat_keahlian,
            'alasan' => $request->alasan,
        ]);

        session(['sudah_daftar_anggota' => true]);

        return redirect()->route('anggota.whatsapp')->with('success', 'Pendaftaran berhasil! silahkan gabung grup whatsapp.');
    }
}
