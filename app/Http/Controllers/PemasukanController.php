<?php

namespace App\Http\Controllers;

use App\Models\Pemasukan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PemasukanController extends Controller
{
    public function index(Request $request)
    {
        $query = Pemasukan::query();

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }

        $pemasukan = $query->orderByDesc('date')->paginate(10)->withQueryString();

        return Inertia::render('Pemasukan/Index', [
            'pemasukan' => $pemasukan,
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

        Pemasukan::create($validated);

        return redirect()->route('pemasukan.index')->with('success', 'Data berhasil dibuat!');
    }

    public function update(Request $request, $id)
    {
        $pemasukan = Pemasukan::findOrFail($id);

        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:0'],
            'date' => ['required', 'date'],
            'description' => ['nullable', 'string', 'max:255'],
        ]);

        $pemasukan->update($validated);

        return redirect()->route('pemasukan.index')->with('success', 'Data berhasil di update!');
    }

    public function destroy($id)
    {
        $pemasukan = Pemasukan::findOrFail($id);
        $pemasukan->delete();
        return redirect()->route('pemasukan.index')->with('success', 'Data berhasil dihapus!');
    }
}
