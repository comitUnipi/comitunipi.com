<x-filament-panels::page>
    @if(session('avatarUrl'))
        <div>
            <img src="{{ asset('storage/' . session('avatarUrl')) }}" alt="Avatar" class="w-40 h-40 rounded-full">
        </div>
    @else
        <div>
            <img src="{{ asset('images/default_avatar.jpg') }}" alt="Default Avatar" class="w-40 h-40 rounded-full">
        </div>
    @endif
    <div class="mb-2 space-y-2">
        <h1 class="text-xl font-semibold">Nama Anggota :</h1>
        <p class="border border-gray-300 rounded-md p-2 max-w-md">{{ session('userName') }}</p>
    </div>
    <div class="mb-2 space-y-2">
        <h1 class="text-xl font-semibold">Absen Pada Kegiatan :</h1>
        <p class="border border-gray-300 rounded-md p-2 max-w-md">{{ session('activityName') }}</p>
    </div>
    <div>
        <a class="bg-blue-600 py-2 px-6 text-white text-sm rounded-md" href="/dashboard/attendances">Kembali</a>
    </div>
</x-filament-panels::page>