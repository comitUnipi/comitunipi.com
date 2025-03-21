<?php

namespace App\Filament\Widgets;

use App\Models\Activity;
use Carbon\Carbon;
use Filament\Widgets\Widget;

class LatestActivityWidget extends Widget
{
    protected static string $view = 'filament.widgets.latest-activity-widget';

    public $activityInfo;
    public $activity_date;
    public $activity_location;

    public function mount()
    {
        $latestActivity = Activity::whereDate('activity_date', '>=', now())
            ->orderBy('activity_date', 'asc')
            ->first();

        if ($latestActivity) {
            $this->activityInfo = $latestActivity->name;
            $this->activity_date = Carbon::parse($latestActivity->activity_date)->translatedFormat('d F Y');
            $this->activity_location = $latestActivity->location;
        } else {
            $this->activityInfo = "Belum ada kegiatan.";
            $this->activity_date = null;
            $this->activity_location = null;
        }
    }

    public static function getTitle(): string
    {
        return 'Aktivitas Terbaru';
    }

    public static function canView(): bool
    {
        return true;
    }
}
