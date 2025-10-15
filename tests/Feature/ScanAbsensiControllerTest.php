<?php

namespace Tests\Feature;

use App\Models\Kegiatan;
use App\Models\QrCode;
use App\Models\QrCodeScan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class ScanAbsensiControllerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected $Anggota;
    protected $Guest;

    protected function setUp(): void
    {
        parent::setUp();

        config(['app.timezone' => 'Asia/Jakarta']);
        Carbon::setTestNow(Carbon::parse('2024-01-15 10:00:00', 'Asia/Jakarta'));

        $this->Anggota = User::factory()->create([
            'role'      => 'User',
            'is_active' => true,
        ]);

        $this->Guest = User::factory()->create([
            'role'      => 'Guest',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function test_dapat_scan_qr_code_dengan_sukses_untuk_kegiatan_umum()
    {
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date'    => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time'  => '08:00:00',
            'end_time'    => '17:00:00',
            'is_active'   => true,
            'token'       => 'valid-token-123',
        ]);

        $scanData = [
            'token'  => 'valid-token-123',
            'status' => 'hadir',
        ];

        $response = $this->actingAs($this->Guest)
            ->post(route('qr.scan.store'), $scanData);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Absensi kehadiran berhasil dicatat pada 10:00:00');

        $this->assertDatabaseHas('qr_code_scans', [
            'qr_code_id' => $qrCode->id,
            'user_id'    => $this->Guest->id,
            'status'     => 'hadir',
            'scan_date'  => Carbon::today(),
        ]);
    }

    #[Test]
    public function test_guest_tidak_dapat_mengakses_kegiatan_pengurus()
    {
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'pengurus',
            'date'    => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time'  => '08:00:00',
            'end_time'    => '17:00:00',
            'is_active'   => true,
            'token'       => 'pengurus-token-123',
        ]);

        $scanData = [
            'token'  => 'pengurus-token-123',
            'status' => 'hadir',
        ];

        $response = $this->actingAs($this->Guest)
            ->post(route('qr.scan.store'), $scanData);

        $response->assertRedirect();
        $response->assertSessionHas('error', 'Anda tidak diizinkan mengikuti kegiatan ini.');

        $this->assertDatabaseMissing('qr_code_scans', [
            'qr_code_id' => $qrCode->id,
            'user_id'    => $this->Guest->id,
        ]);
    }

    #[Test]
    public function test_mengembalikan_error_untuk_token_qr_yang_tidak_valid()
    {
        $scanData = [
            'token'  => 'invalid-token-123',
            'status' => 'hadir',
        ];

        $response = $this->actingAs($this->Anggota)
            ->post(route('qr.scan.store'), $scanData);

        $response->assertRedirect();
        $response->assertSessionHas('error', 'QR Code tidak valid atau tidak memiliki kegiatan.');
    }

    #[Test]
    public function test_mengembalikan_error_ketika_scan_diluar_rentang_waktu()
    {
        // Arrange - Set current time to 07:00 (before start time)
        Carbon::setTestNow(Carbon::parse('2024-01-15 07:00:00', 'Asia/Jakarta'));

        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date'    => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time'  => '08:00',
            'end_time'    => '17:00',
            'is_active'   => true,
            'token'       => 'time-restricted-token',
        ]);

        $scanData = [
            'token'  => 'time-restricted-token',
            'status' => 'hadir',
        ];

        // Act
        $response = $this->actingAs($this->Anggota)
            ->post(route('qr.scan.store'), $scanData);

        // Assert
        $response->assertRedirect();
        $response->assertSessionHas('error', 'Scan hanya dapat dilakukan antara 08:00 - 17:00.');

        $this->assertDatabaseMissing('qr_code_scans', [
            'qr_code_id' => $qrCode->id,
            'user_id'    => $this->Anggota->id,
        ]);
    }

    #[Test]
    public function test_mengembalikan_error_ketika_pengguna_sudah_scan()
    {
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date'    => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time'  => '08:00:00',
            'end_time'    => '17:00:00',
            'is_active'   => true,
            'token'       => 'already-scanned-token',
        ]);

        QrCodeScan::factory()->create([
            'qr_code_id' => $qrCode->id,
            'user_id'    => $this->Anggota->id,
            'status'     => 'hadir',
        ]);

        $scanData = [
            'token'  => 'already-scanned-token',
            'status' => 'hadir',
        ];

        $response = $this->actingAs($this->Anggota)
            ->post(route('qr.scan.store'), $scanData);

        $response->assertRedirect();
        $response->assertSessionHas('error', 'Kamu sudah melakukan absen pada kegiatan ini dengan status hadir.');

        $scanCount = QrCodeScan::where('qr_code_id', $qrCode->id)
            ->where('user_id', $this->Anggota->id)
            ->count();
        $this->assertEquals(1, $scanCount);
    }

    #[Test]
    public function test_memvalidasi_field_yang_wajib_diisi()
    {
        $response = $this->actingAs($this->Anggota)
            ->post(route('qr.scan.store'), []);

        $response->assertSessionHasErrors(['token']);
    }
}
