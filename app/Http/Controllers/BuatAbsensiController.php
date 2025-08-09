<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use App\Models\QrCode;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Writer\SvgWriter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BuatAbsensiController extends Controller
{
    public function generate()
    {
        $kegiatan = Kegiatan::whereDate('date', '>=', now()->toDateString())->get();
        $qrData = QrCode::with('kegiatan')->where('is_active', true)->latest()->first();

        $qrCodeSvg = null;

        if ($qrData) {
            $result = Builder::create()
                ->writer(new SvgWriter)
                ->data($qrData->token)
                ->size(250)
                ->margin(10)
                ->build();

            $qrCodeSvg = $result->getString();
        }

        return Inertia::render('FiturKhusus/BuatAbsensi', [
            'kegiatan' => $kegiatan,
            'qrData' => $qrData,
            'qrCodeSvg' => $qrCodeSvg,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kegiatan_id' => 'required|exists:kegiatan,id',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        DB::transaction(function () use ($validated) {
            QrCode::where('is_active', true)->update(['is_active' => false]);

            QrCode::create([
                'kegiatan_id' => $validated['kegiatan_id'],
                'start_time' => $validated['start_time'],
                'end_time' => $validated['end_time'],
                'token' => Str::random(32),
                'is_active' => true,
            ]);
        });

        return redirect()->route('qr.create')->with('success', 'QR Code berhasil dibuat.');
    }

    public function deactivate($id)
    {
        $qr = QrCode::findOrFail($id);

        if (! $qr->is_active) {
            return redirect()->back()->with('error', 'QR Code sudah tidak aktif.');
        }

        $qr->is_active = false;
        $qr->save();

        return redirect()->back()->with('success', 'QR Code berhasil dinonaktifkan.');
    }
}
