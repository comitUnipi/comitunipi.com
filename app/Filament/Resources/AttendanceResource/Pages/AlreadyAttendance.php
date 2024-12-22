<?php

namespace App\Filament\Resources\AttendanceResource\Pages;

use App\Filament\Resources\AttendanceResource;
use Filament\Resources\Pages\Page;

class AlreadyAttendance extends Page
{
    protected static string $resource = AttendanceResource::class;
    protected ?string $heading = 'Kamu telah melakukan absensi';

    protected static string $view = 'filament.resources.attendance-resource.pages.already-attendance';
}
