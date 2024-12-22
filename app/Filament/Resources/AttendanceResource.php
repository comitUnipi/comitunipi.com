<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AttendanceResource\Pages;
use App\Filament\Resources\AttendanceResource\RelationManagers;
use App\Models\Activity;
use App\Models\Attendance;
use Filament\Forms;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class AttendanceResource extends Resource
{
    protected static ?string $model = Attendance::class;

    protected static ?string $navigationIcon = 'heroicon-o-clipboard-document-check';
    protected static ?string $label = 'Absensi';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                FileUpload::make('img_url')
                    ->label('Bukti Izin (jika ada)')
                    ->disk('public')
                    ->image()
                    ->directory('attendance'),
                Hidden::make('user_id')
                    ->default(auth()->id())
                    ->required(),
                TextInput::make('name')
                    ->label('Nama Anggota')
                    ->default(auth()->user()->name)
                    ->disabled(),
                Select::make('activity_id')
                    ->label('Pada Kegiatan')
                    ->placeholder(function () {
                        $activities = Activity::whereDate('activity_date', '>=', now())
                                        ->orderBy('activity_date', 'asc')
                                        ->get();
                        if ($activities->isEmpty()) {
                            return 'Tidak ada kegiatan';
                        }

                        return 'Pilih Kegiatan';
                    })
                    ->searchable()
                    ->options(function () {
                        return Activity::whereDate('activity_date', '>=', now())
                                    ->orderBy('activity_date', 'asc')
                                    ->pluck('name', 'id');
                    })
                    ->required()
                    ->disabled(function () {
                        return Activity::whereDate('activity_date', '>=', now())->doesntExist();
                    })
                    ->afterStateUpdated(function ($state, $set) {
                        $existingAttendance = Attendance::where('user_id', auth()->id())
                                                ->where('activity_id', $state)
                                                ->exists();

                        if ($existingAttendance) {
                            Notification::make()
                                ->title('Absensi Gagal')
                                ->body('Anda sudah absen pada kegiatan ini.')
                                ->danger()
                                ->send();
                            $set('activity_id', null);
                        }
                    }),
                TextInput::make('status')
                    ->label('Status Absensi')
                    ->default('izin')
                    ->readOnly(),
                DatePicker::make('date')
                    ->required()
                    ->native(false)
                    ->default(now())
                    ->disabled()
                    ->displayFormat('d F Y')
                    ->label('Tanggal Dibuat'),
                Textarea::make('decription')
                    ->label('Keterangan')
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user.name')
                    ->searchable()
                    ->label('Nama'),
                TextColumn::make('activity.name')
                    ->searchable()
                    ->label('Kegiatan'),
                TextColumn::make('status')
                    ->searchable()
                    ->alignCenter()
                    ->label('Status Absensi')
                    ->formatStateUsing(fn ($state) => 
                        match ($state) {
                            'hadir' => '<span class="bg-green-600 text-white px-2 py-1 rounded-md">' . $state . '</span>',
                            'tidak hadir' => '<span class="bg-red-600 text-white px-2 py-1 rounded-md">' . $state . '</span>',
                            'izin' => '<span class="bg-yellow-600 text-white px-2 py-1 rounded-md">' . $state . '</span>',
                            default => '<span class="bg-gray-600 text-white px-2 py-1 rounded-md">' . $state . '</span>',
                        }
                    )
                    ->html(),
            ])
            ->filters([
                //
            ])
            ->actions([
            ])
            ->bulkActions([
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAttendances::route('/'),
            'create' => Pages\FormIzin::route('/create'),
        ];
    }
}
