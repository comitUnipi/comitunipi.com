<?php

namespace App\Filament\Resources\AttendanceResource\Pages;

use App\Filament\Resources\AttendanceResource;
use Filament\Resources\Pages\Page;

class ScanQrCode extends Page
{
    protected static string $resource = AttendanceResource::class;
    protected ?string $heading = 'Scan Absensi';

    protected static string $view = 'filament.resources.attendance-resource.pages.scan-qr-code';


}
