<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class CalonAnggotaController extends Controller
{
    public function index()
    {
        $query = User::query();

        $query->where('role', 'Guest')
            ->where('is_active', false);

        if (request()->has('search')) {
            $search = request('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $query->paginate(10)->withQueryString();

        return Inertia::render('FiturKhusus/CalonAnggota', [
            'users' => $users,
            'filters' => [
                'search' => request('search', ''),
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        $routeName = request()->route()->getName();

        return Inertia::render('FiturKhusus/Detail', [
            'user' => $user,
            'module' => explode('.', $routeName)[0],
        ]);
    }
}
