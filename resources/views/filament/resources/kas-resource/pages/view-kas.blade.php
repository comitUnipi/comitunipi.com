<x-filament-panels::page>
  <div class="space-y-4">
    @if ($kas->user->avatar_url)
                <img src="{{ asset('storage/' . $kas->user->avatar_url) }}" alt="Avatar" class="w-40 h-40 rounded-full">
            @else
                <img src="{{ asset('images/default_avatar.jpg') }}" alt="default avatar" class="w-45 h-40 rounded-full">
            @endif
    <div>
      <h2  class="font-semibold">Nama Anggota</h2>
      <p class="mt-2 p-2 border border-gray-300 max-w-md rounded-md">{{ $kas->user->name }}</p>
    </div>
    <div>
      <h2 class="font-semibold">Bayar KAS Pada Kegiatan</h2>
      <p class="mt-2 p-2 border border-gray-300 max-w-md rounded-md">{{ $kas->activity->name }}</p>
    </div>
    <div>
      <h2 class="font-semibold">Biaya Uang KAS</h2>
      <p class="mt-2 p-2 border border-gray-300 max-w-md rounded-md">Rp {{ number_format($kas->amount, 0, ',', '.') }}</p>
    </div>
    <div>
      <h2 class="font-semibold">Tanggal Pembayaran</h2>
      <p class="mt-2 p-2 border border-gray-300 max-w-md rounded-md">{{ \Carbon\Carbon::parse($kas->date)->format('d F Y') }}</p>
    </div>
  </div>
</x-filament-panels::page>
