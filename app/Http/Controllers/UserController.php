<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
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

        return Inertia::render('DataMaster/Anggota', [
            'users'   => $users,
            'filters' => [
                'search'    => request('search', ''),
                'filter'    => request('filter', ''),
                'is_active' => request('is_active', 'all'),
                'jurusan'   => request('jurusan', ''),
            ],
            'flash' => [
                'success' => session('success'),
                'error'   => session('error'),
            ],
        ]);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('DataMaster/AnggotaDetail', [
            'user' => $user,
        ]);
    }

    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);

        User::create($validated);

        return redirect()->route('users.index')->with('success', 'Anggota berhasil dibuat!');
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $validated = $request->validated();

        $user->update($validated);
        $redirectRoute = $request->input('redirect_to', 'users.index');

        return redirect()->route($redirectRoute)->with('success', 'Data berhasil di update!');
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