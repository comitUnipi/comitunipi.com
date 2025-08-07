<?php

namespace App\Http\Controllers;

use App\Models\Kegiatan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class KegiatanController extends Controller
{
    public function index(Request $request)
    {
        $query = Kegiatan::query();

        if ($search = $request->input('search')) {
            $query->where('name', 'like', '%'.$search.'%');
        }

        if ($request->filled('audiens') && $request->audiens !== 'all') {
            $query->where('audiens', $request->audiens);
        }

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }

        $kegiatan = $query->orderByDesc('date')->paginate(10)->withQueryString();

        return Inertia::render('Kegiatan/Index', [
            'kegiatan' => $kegiatan,
            'filters' => [
                'search' => $search,
                'audiens' => $request->input('audiens', ''),
                'start_date' => $request->input('start_date', ''),
                'end_date' => $request->input('end_date', ''),
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function notifications()
    {
        $user = Auth::user();

        if (! $user) {
            return response()->json([], 403);
        }

        $allowedRoles = ['Super Admin', 'Admin', 'Finance'];
        $isActive = $user->is_active == 1;

        $allKegiatan = Kegiatan::where('date', '>=', now())->orderBy('date')->get();

        $filtered = $allKegiatan->filter(function ($kegiatan) use ($user, $allowedRoles, $isActive) {
            switch ($kegiatan->audiens) {
                case 'umum':
                    return true;
                case 'pengurus':
                    return in_array($user->role, $allowedRoles) && $isActive;
                case 'anggota':
                    return $user->role !== 'Guest' && $isActive;
                default:
                    return false;
            }
        });

        return response()->json($filtered->values());
    }

    public function terbaru()
    {
        $today = Carbon::today();
        $user = Auth::user();

        if (! $user) {
            return response()->json([], 403);
        }

        $allowedRoles = ['Super Admin', 'Admin', 'Finance'];
        $isActive = $user->is_active == 1;

        $allKegiatan = Kegiatan::where('date', '>=', $today)->orderBy('date')->get();

        $filtered = $allKegiatan->filter(function ($kegiatan) use ($user, $allowedRoles, $isActive) {
            switch ($kegiatan->audiens) {
                case 'umum':
                    return true;
                case 'pengurus':
                    return in_array($user->role, $allowedRoles) && $isActive;
                case 'anggota':
                    return $user->role !== 'Guest' && $isActive;
                default:
                    return false;
            }
        });

        return Inertia::render('FiturUtama/JadwalKegiatan', [
            'kegiatan' => $filtered,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'date' => ['required', 'date'],
            'time' => ['required'],
            'location' => ['required', 'string'],
            'audiens' => ['required', 'in:umum,anggota,pengurus'],
        ]);

        Kegiatan::create($validated);

        return redirect()->route('kegiatan.index')->with('success', 'Data berhasil dibuat!');
    }

    public function update(Request $request, $id)
    {
        $kegiatan = Kegiatan::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'date' => ['required', 'date'],
            'time' => ['required'],
            'location' => ['required', 'string'],
            'audiens' => ['required', 'in:umum,anggota,pengurus'],
        ]);

        $kegiatan->update($validated);

        return redirect()->route('kegiatan.index')->with('success', 'Data berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $kegiatan = Kegiatan::findOrFail($id);
        $kegiatan->delete();

        return redirect()->route('kegiatan.index')->with('success', 'Data berhasil dihapus!');
    }

    public function exportCsv(Request $request)
    {
        $query = Kegiatan::query();

        if ($search = $request->input('search')) {
            $query->whereHas('kegiatan', function ($q) use ($search) {
                $q->where('name', 'like', '%'.$search.'%');
            });
        }

        $kegiatanData = $query->orderByDesc('date')->get();

        $response = new StreamedResponse(function () use ($kegiatanData) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Nama Kegiatan', 'Keterangan', 'Tanggal', 'Waktu', 'Lokasi', 'Audiens']);

            foreach ($kegiatanData as $kegiatan) {
                fputcsv($handle, [
                    $kegiatan->name,
                    $kegiatan->description,
                    $kegiatan->date,
                    $kegiatan->time,
                    $kegiatan->location,
                    $kegiatan->audiens,
                ]);
            }

            fclose($handle);
        });

        $filename = 'kegiatan_export_'.now()->format('Ymd_His').'.csv';
        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', "attachment; filename=\"$filename\"");

        return $response;
    }
}
