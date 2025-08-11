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
            'totalUsers' => User::count(),
            'totalUsersAktif' => User::where('is_active', true)->count(),
            'totalUsersNonaktif' => User::where('is_active', false)->count(),
            'totalPengurus' => User::where('is_active', true)
                ->whereNotIn('role', ['User', 'Guest'])
                ->count(),
            'totalKAS' => number_format(Kas::sum('amount'), 2, '.', ''),
            'totalPemasukan' => number_format(Pemasukan::sum('amount'), 2, '.', ''),
            'totalPengeluaran' => number_format(Pengeluaran::sum('amount'), 2, '.', ''),
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
