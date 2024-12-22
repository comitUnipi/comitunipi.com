<?php

namespace App\Filament\Widgets;

use App\Models\Activity;
use App\Models\Event;
use Carbon\Carbon;
use Filament\Widgets\Widget;

class LatestActivityWidget extends Widget
{
    protected static string $view = 'filament.widgets.latest-activity-widget';
    
    public $activityInfo;
    public $activity_date;
    public $activity_location;

    public $event_info;
    public $event_date;
    public $event_location;

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

        $latestEvent = Event::whereDate('event_date', '>=', now())
            ->orderBy('event_date', 'asc')
            ->first();

        if ($latestEvent) {
            $this->event_info = $latestEvent->work_program->name;
            $this->event_date = Carbon::parse($latestEvent->event_date)->translatedFormat('d F Y');
            $this->event_location = $latestEvent->location;
        } else {
            $this->event_info = "Belum ada event.";
            $this->event_date = null;
            $this->event_location = null;
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
