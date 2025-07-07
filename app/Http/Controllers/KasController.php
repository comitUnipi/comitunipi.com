<?php

namespace App\Http\Controllers;

use App\Models\Kas;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KasController extends Controller
{
    public function index(Request $request)
    {
        $query = Kas::with('user');

        if ($search = $request->input('search')) {
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%');
            });
        }

        if (request()->filled('type') && request('type') !== 'all') {
            $query->where('type', filter_var(request('type')));
        }

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }

        $kas = $query->orderByDesc('date')->paginate(10)->withQueryString();

        $users = User::select('id', 'name')->get();

        return Inertia::render('Kas/Index', [
            'kas' => $kas,
            'users' => $users,
            'filters' => [
                'search' => $search,
                'type' => request('type', ''),
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
            'user_id' => ['required', 'exists:users,id'],
            'amount' => ['required', 'numeric', 'min:0'],
            'date' => ['required', 'date'],
            'type' => ['nullable', 'string', 'max:255'],
        ]);

        Kas::create($validated);

        return redirect()->route('kas.index')->with('success', 'Data berhasil dibuat!');
    }

    public function update(Request $request, $id)
    {
        $kas = Kas::findOrFail($id);
        
        $validated = $request->validate([
            'amount' => ['required', 'numeric', 'min:0'],
            'date' => ['required', 'date'],
            'type' => ['nullable', 'string', 'max:255'],
        ]);

        $kas->update($validated);

        return redirect()->route('kas.index')->with('success', 'Data berhasil di update!');
    }

    public function destroy($id)
    {
        $kas = Kas::findOrFail($id);
        $kas->delete();
        return redirect()->route('kas.index')->with('success', 'Data berhasil dihapus!');
    }
}
