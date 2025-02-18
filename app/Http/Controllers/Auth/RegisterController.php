<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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
        'role' => $request->rolei ?? 'guest',
        'position' => $request->position ?? 'calon anggota',
        'is_active' => false,
    ]);
    return response()->json(['message' => 'Pendaftaran telah berhasil!', 'user' => $user], 201);
    }
}
