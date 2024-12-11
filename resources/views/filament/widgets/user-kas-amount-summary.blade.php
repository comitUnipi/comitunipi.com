<x-filament-widgets::widget>
        <div class="overflow-hidden bg-white shadow rounded-lg">
            <table class="min-w-full table-auto text-sm text-left text-black">
                <thead class="bg-blue-600">
                    <tr>
                        <th class="px-4 py-3 text-xs font-medium text-white uppercase tracking-wider border-b">Nama Anggota</th>
                        <th class="px-4 py-3 text-xs font-medium text-white uppercase tracking-wider border-b">Total Bayar KAS</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($data as $item)
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-4 py-2">{{ $item->user->name }}</td>
                            <td class="px-4 py-2">Rp {{ number_format($item->total_amount, 2, ',', '.') }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
</x-filament-widgets::widget>
