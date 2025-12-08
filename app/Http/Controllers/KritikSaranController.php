<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKritikSaranRequest;
use App\Models\KritikSaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class KritikSaranController extends Controller
{
    public function index(Request $request)
    {
        $query = KritikSaran::query();

        $query->when($request->filled('kategori'), function ($q) use ($request) {
            return $q->where('kategori', $request->kategori);
        });

        $kritik_saran = $query->orderByDesc('created_at')->paginate(10)->withQueryString();

        return Inertia::render('DataMaster/KritikSaran', [
            'kritik_saran'   => $kritik_saran,
        ]);
    }

    public function store(StoreKritikSaranRequest $request)
    {
        KritikSaran::create($request->validated());

        return redirect()->back()->with('success', 'Kritik dan saran berhasil dikirim!');
    }

    public function show(KritikSaran $kritik_saran)
    {
        return Inertia::render('DataMaster/ShowKritikSaran', [
            'kritik_saran' => $kritik_saran,
        ]);
    }

    public function exportCsv(Request $request)
    {
        $query = KritikSaran::query();

        $query->when($request->filled('kategori') && $request->kategori !== 'semua', function ($q) use ($request) {
            return $q->where('kategori', $request->kategori);
        });

        $kritikSaranData = $query->orderByDesc('created_at')->get();

        $response = new StreamedResponse(function () use ($kritikSaranData) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Tanggal', 'Kategori', 'Pesan']);

            foreach ($kritikSaranData as $item) {
                fputcsv($handle, [
                    $item->created_at->format('Y-m-d H:i:s'),
                    $item->kategori,
                    $item->pesan,
                ]);
            }

            fclose($handle);
        });

        $filename = 'kritik_saran_export_'.now()->format('Ymd_His').'.csv';
        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', "attachment; filename=\"$filename\"");

        return $response;
    }
}
