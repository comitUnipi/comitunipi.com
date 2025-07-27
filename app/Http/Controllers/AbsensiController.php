<?php

namespace App\Http\Controllers;

use App\Models\QrCode;
use App\Models\QrCodeScan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AbsensiController extends Controller
{
    public function create()
    {
        $qrCode = QrCode::with('kegiatan')
            ->where('is_active', true)
            ->first();

        return Inertia::render('Absensi/Form', [
            'kegiatan' => $qrCode && $qrCode->kegiatan
                ? $qrCode->kegiatan
                : null,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
                'errors' => session('errors'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tanggal_izin' => 'required|date',
            'alasan' => 'required|string|max:1000',
            'status' => 'required|in:izin,sakit',
        ]);

        $qrCode = QrCode::where('is_active', true)->first();

        if (!$qrCode) {
            return redirect()->back()->with('error', 'Tidak ada QR Code aktif saat ini.');
        }

        $existing = QrCodeScan::where('qr_code_id', $qrCode->id)
            ->where('user_id', Auth::id())
            ->where('scan_date', $request->tanggal_izin)
            ->first();

        if ($existing) {
            return redirect()->back()->with('error', 'Data absensi untuk tanggal ini sudah ada.');
        }

        QrCodeScan::create([
            'qr_code_id' => $qrCode->id,
            'user_id' => Auth::id(),
            'scan_date' => $request->tanggal_izin,
            'scanned_at' => null,
            'status' => $request->status,
            'description' => $request->alasan,
        ]);

        return redirect()->route('absensi.create')
            ->with('success', ucfirst($request->status) . ' berhasil dikirim.');
    }

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
