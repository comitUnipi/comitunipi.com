<?php

namespace App\Http\Controllers;

use App\Models\Kas;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'totalUsers' => User::all()->count(),
            'totalUsersAktif' => User::where('is_active', true)->count(),
            'totalUsersNonaktif' => User::where('is_active', false)->count(),
            'totalPengurus' => User::where('is_active', true)
                ->whereNotIn('role', ['User', 'Guest'])
                ->count(),
            'totalKAS' => Kas::sum('amount'),
        ];

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }
}
