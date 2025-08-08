<?php

namespace App\Http\Controllers;

use App\Models\QrCode;
use App\Models\QrCodeScan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FormIzinController extends Controller
{
    public function create()
    {
        $user = Auth::user();
        $qrCode = QrCode::with('kegiatan')
            ->where('is_active', true)
            ->get()
            ->filter(function ($qr) use ($user) {
                $kegiatan = $qr->kegiatan;
                if (! $kegiatan) {
                    return false;
                }

                switch ($kegiatan->audiens) {
                    case 'umum':
                        return true;
                    case 'pengurus':
                        return in_array($user->role, ['Super Admin', 'Admin', 'Finance']);
                    case 'anggota':
                        return $user->role !== 'Guest';
                    default:
                        return false;
                }
            })
            ->first();

        return Inertia::render('FiturUtama/FormIzin', [
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
            'alasan' => 'required|string|max:1000',
            'status' => 'required|in:izin,sakit',
        ]);

        $tanggal_izin = now()->toDateString();
        $user = Auth::user();
        $qrCode = QrCode::with('kegiatan')
            ->where('is_active', true)
            ->get()
            ->filter(function ($qr) use ($user) {
                $kegiatan = $qr->kegiatan;
                if (! $kegiatan) {
                    return false;
                }

                switch ($kegiatan->audiens) {
                    case 'umum':
                        return true;
                    case 'pengurus':
                        return in_array($user->role, ['Super Admin', 'Admin', 'Finance']);
                    case 'anggota':
                        return $user->role !== 'Guest';
                    default:
                        return false;
                }
            })
            ->first();

        if (! $qrCode) {
            return redirect()->back()->with('error', 'Tidak ada kegiatan yang sesuai untuk Anda.');
        }

        $existing = QrCodeScan::where('qr_code_id', $qrCode->id)
            ->where('user_id', Auth::id())
            ->where('scan_date', $tanggal_izin)
            ->first();

        if ($existing) {
            return redirect()->back()->with('error', 'Data absensi untuk tanggal ini sudah ada.');
        }

        QrCodeScan::create([
            'qr_code_id' => $qrCode->id,
            'user_id' => Auth::id(),
            'scan_date' => $tanggal_izin,
            'scanned_at' => null,
            'status' => $request->status,
            'description' => $request->alasan,
        ]);

        return redirect()->route('absensi.create')
            ->with('success', 'Permohonan izin berhasil dikirim.');
    }
}
