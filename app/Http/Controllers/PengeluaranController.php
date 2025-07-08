<?php

namespace App\Http\Controllers;

use App\Models\Pengeluaran;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PengeluaranController extends Controller
{
    public function index(Request $request)
    {
        $query = Pengeluaran::query();

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }

        $pengeluaran = $query->orderByDesc('date')->paginate(10)->withQueryString();

        return Inertia::render('Pengeluaran/Index', [
            'pengeluaran' => $pengeluaran,
            'filters' => [
                'start_date' => $request->input('start_date', ''),
                'end_date' => $request->input('end_date', ''),
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:0'],
            'date' => ['required', 'date'],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        Pengeluaran::create($validated);

        return redirect()->route('pengeluaran.index')->with('success', 'Data berhasil dibuat!');
    }

    public function update(Request $request, $id)
    {
        $pengeluaran = Pengeluaran::findOrFail($id);

        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:0'],
            'date' => ['required', 'date'],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        $pengeluaran->update($validated);

        return redirect()->route('pengeluaran.index')->with('success', 'Data berhasil di update!');
    }

    public function destroy($id)
    {
        $pengeluaran = Pengeluaran::findOrFail($id);
        $pengeluaran->delete();
        return redirect()->route('pengeluaran.index')->with('success', 'Data berhasil dihapus!');
    }

    public function exportCsv(Request $request)
    {
        $query = Pengeluaran::query();

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }

        $pengeluaranData = $query->orderByDesc('date')->get();

        $response = new StreamedResponse(function () use ($pengeluaranData) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Tanggal', 'Jumlah', 'Keterangan']);

            foreach ($pengeluaranData as $pengeluaran) {
                fputcsv($handle, [
                    $pengeluaran->date,
                    $pengeluaran->amount,
                    $pengeluaran->description,
                ]);
            }

            fclose($handle);
        });

        $filename = 'pengeluaran_export_' . now()->format('Ymd_His') . '.csv';
        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', "attachment; filename=\"$filename\"");

        return $response;
    }
}
