<?php

namespace App\Filament\Resources\AttendanceResource\Pages;

use App\Filament\Resources\AttendanceResource;
use App\Models\Attendance;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Illuminate\Database\Eloquent\Builder;

class ListAttendances extends ListRecords
{
    protected static string $resource = AttendanceResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\Action::make('scan')
                ->label('Scan Absensi')
                ->url('/scan')
        ];
    }

    protected function getTableQuery(): Builder
    {
        $user = auth()->user();
        $query = Attendance::query();
        
        if ($user->role === 'anggota') {
            $query->where('user_id', $user->id);
        }

        return $query;
    }
}
