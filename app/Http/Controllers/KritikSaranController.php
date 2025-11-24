<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKritikSaranRequest;
use App\Models\KritikSaran;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KritikSaranController extends Controller
{
    public function index(Request $request)
    {
        $query = KritikSaran::query();

        $query->when($request->filled('kategori'), function ($q) use ($request) {
            return $q->where('kategori', $request->kategori);
        });

        $kritik_saran = $query->paginate(10)->withQueryString();

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
}
