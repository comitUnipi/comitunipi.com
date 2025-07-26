<?php

namespace App\Http\Controllers;

use App\Models\QrCodeScan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AbsensiController extends Controller
{
    public function index(Request $request)
    {
        $query = QrCodeScan::with(['user', 'qrCode.kegiatan']);

        if ($search = $request->input('search')) {
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%');
            });
        }

        $scans = $query->orderByDesc('scan_date')->paginate(10)->withQueryString();

        $users = User::select('id', 'name')->get();

        return Inertia::render('Absensi/Index', [
            'scans' => $scans,
            'users' => $users,
            'filters' => [
                'search' => $search,
                'status' => $request->input('status', ''),
            ],
        ]);
    }
}
