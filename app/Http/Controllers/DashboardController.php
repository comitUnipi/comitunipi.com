<?php

namespace App\Http\Controllers;

use App\Models\Kas;
use App\Models\Pemasukan;
use App\Models\Pengeluaran;
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
            'totalPemasukan' => Pemasukan::sum('amount'),
            'totalPengeluaran' => Pengeluaran::sum('amount'),
        ];

        return Inertia::render('FiturUtama/Dashboard', [
            'stats' => $stats,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }
}
