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

class CreateQRCodeController extends Controller
{
    public function generate(Request $request)
    {
        $kegiatan = Kegiatan::all();
        $qrData = null;
        $qrCodeSvg = null;

        if ($request->isMethod('post')) {
            $validated = $request->validate([
                'kegiatan_id' => 'required|exists:kegiatan,id',
                'start_time' => 'required|date_format:H:i',
                'end_time' => 'required|date_format:H:i|after:start_time',
            ]);

            DB::transaction(function () use ($validated, &$qrData) {
                $token = Str::random(32);
                $qrData = QrCode::create([
                    'kegiatan_id' => $validated['kegiatan_id'],
                    'start_time' => $validated['start_time'],
                    'end_time' => $validated['end_time'],
                    'token' => $token,
                    'is_active' => true,
                ]);
            });

            $result = Builder::create()
                ->writer(new SvgWriter)
                ->data($qrData->token)
                ->size(250)
                ->margin(10)
                ->build();

            $qrCodeSvg = $result->getString();

            return Inertia::render('Absensi/GenerateQrCode', [
                'kegiatan' => $kegiatan,
                'qrData' => $qrData,
                'qrCodeSvg' => $qrCodeSvg,
            ]);
        }

        $qrData = QrCode::where('is_active', true)->latest()->first();
        if ($qrData) {
            $result = Builder::create()
                ->writer(new SvgWriter)
                ->data($qrData->token)
                ->size(250)
                ->margin(10)
                ->build();

            $qrCodeSvg = $result->getString();
        }

        return Inertia::render('Absensi/CreateQrCode', [
            'kegiatan' => $kegiatan,
            'qrData' => $qrData,
            'qrCodeSvg' => $qrCodeSvg,
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
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
