<x-filament-widgets::widget>
        <div class="w-full h-full">
                <div>
                        <h3 class="text-base mb-1">Kegiatan Terbaru</h3>
                        <p class="text-2xl font-semibold mb-1">{{ $activityInfo }}</p>
                        <p class="text-sm text-blue-600">{{ $activity_date }} {{ $activity_location }}</p>
                </div>
                <div class="mt-10">
                        <h3 class="text-base mb-1">Event Terbaru</h3>
                        <p class="text-2xl font-semibold mb-1">Belum ada event</p>
                        <!-- <p class="text-sm text-blue-600">{{ $activity_date }} {{ $activity_location }}</p> -->
                </div>
        </div>
</x-filament-widgets::widget>
