<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class UserController extends Controller
{
    public function index()
    {
        $query = User::query();

        if (request()->has('search')) {
            $search = request('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if (request()->filled('role') && request('role') !== 'all') {
            $query->where('role', filter_var(request('role')));
        }

        if (request()->filled('position') && request('position') !== 'all') {
            $query->where('position', filter_var(request('position')));
        }

        if (request()->filled('is_active') && request('is_active') !== 'all') {
            $query->where('is_active', filter_var(request('is_active'), FILTER_VALIDATE_BOOLEAN));
        }

        if (request()->filled('jurusan') && request('jurusan') !== 'all') {
            $query->where('jurusan', filter_var(request('jurusan')));
        }

        if (request()->filled('minat_keahlian') && request('minat_keahlian') !== 'all') {
            $query->where('minat_keahlian', filter_var(request('minat_keahlian')));
        }

        $users = $query->paginate(10)->withQueryString();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'filters' => [
                'search' => request('search', ''),
                'filter' => request('filter', ''),
                'is_active' => request('is_active', 'all'),
                'jurusan' => request('jurusan', ''),
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
        ]);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Users/Show', [
            'user' => $user,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'npm' => 'required|string|max:20|unique:users,npm',
            'role' => 'required|in:Guest,User,Admin,Super Admin',
            'jenis_kelamin' => 'required|string',
            'no_wa' => 'nullable|string|max:20',
            'jurusan' => 'nullable|string|max:100',
            'position' => 'nullable|string|max:100',
            'minat_keahlian' => 'nullable|string|max:100',
            'alasan' => 'nullable|string|max:500',
            'is_active' => 'required|boolean',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $validated['password'] = Hash::make($request->password);

        User::create($validated);

        return redirect()->route('users.index')->with('success', 'Anggota berhasil dibuat!');
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|string',
            'position' => 'required|string',
            'is_active' => 'required|boolean',
        ]);

        $user->update($validated);

        return redirect()->route('users.index')->with('success', 'Anggota berhasil di update!');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'Anggota berhasil dihapus!');
    }

    public function exportCsv()
    {
        $query = User::query();

        if (request()->has('search')) {
            $search = request('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        if (request()->filled('role') && request('role') !== 'all') {
            $query->where('role', filter_var(request('role')));
        }

        if (request()->filled('position') && request('position') !== 'all') {
            $query->where('position', filter_var(request('position')));
        }

        if (request()->filled('is_active') && request('is_active') !== 'all') {
            $query->where('is_active', filter_var(request('is_active'), FILTER_VALIDATE_BOOLEAN));
        }

        if (request()->filled('jurusan') && request('jurusan') !== 'all') {
            $query->where('jurusan', filter_var(request('jurusan')));
        }

        if (request()->filled('minat_keahlian') && request('minat_keahlian') !== 'all') {
            $query->where('minat_keahlian', filter_var(request('minat_keahlian')));
        }

        $users = $query->get();

        $response = new StreamedResponse(function () use ($users) {
            $handle = fopen('php://output', 'w');

            fputcsv($handle, [
                'Nama Lengkap',
                'Email',
                'Role',
                'NPM',
                'Jurusan',
                'Minat Keahlian',
                'Jenis Kelamin',
                'No WA',
                'Status',
                'Position',
            ]);

            foreach ($users as $user) {
                fputcsv($handle, [
                    $user->name,
                    $user->email,
                    $user->role,
                    $user->npm,
                    $user->jurusan,
                    $user->minat_keahlian,
                    $user->jenis_kelamin,
                    $user->no_wa,
                    $user->is_active ? 'AKtif' : 'Nonaktif',
                    $user->position,
                ]);
            }

            fclose($handle);
        });

        $filename = 'users_export_' . now()->format('Ymd_His') . '.csv';

        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', "attachment; filename=\"$filename\"");

        return $response;
    }
}
