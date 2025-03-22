<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
      $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->npm),
        'avatar_url' => $request->avatar_url,
        'npm' => $request->npm,
        'role' => $request->rolei ?? 'Guest',
        'position' => $request->position ?? 'Calon Anggota',
        'is_active' => false,
        'jenis_kelamin' => $request->jenis_kelamin,
        'no_wa' => $request->no_wa,
        'jurusan' => $request->jurusan,
        'minat_keahlian' => $request->minat_keahlian,
        'alasan' => $request->alasan,
    ]);
    return response()->json(['message' => 'Pendaftaran telah berhasil!', 'user' => $user], 201);
    }
}
