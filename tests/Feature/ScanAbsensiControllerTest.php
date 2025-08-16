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
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        config(['app.timezone' => 'Asia/Jakarta']);
        Carbon::setTestNow(Carbon::parse('2024-01-15 10:00:00', 'Asia/Jakarta'));

        $this->SuperAdmin = User::factory()->create([
            'role' => 'Super Admin',
            'is_active' => true,
        ]);

        $this->Admin = User::factory()->create([
            'role' => 'Admin',
            'is_active' => true,
        ]);

        $this->Finance = User::factory()->create([
            'role' => 'Finance',
            'is_active' => true,
        ]);

        $this->Anggota = User::factory()->create([
            'role' => 'User',
            'is_active' => true,
        ]);

        $this->Guest = User::factory()->create([
            'role' => 'Guest',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function it_can_display_scan_absensi_page()
    {
        // Act
        $response = $this->actingAs($this->Anggota)
            ->get(route('qr.scan.form'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('FiturUtama/ScanAbsensi')
            ->has('flash')
        );
    }

    #[Test]
    public function it_can_scan_qr_code_successfully_for_umum_kegiatan()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00:00',
            'end_time' => '17:00:00',
            'is_active' => true,
            'token' => 'valid-token-123',
        ]);

        $scanData = [
            'token' => 'valid-token-123',
            'status' => 'hadir',
        ];

        // Act
        $response = $this->actingAs($this->Guest)
            ->post(route('qr.scan.store'), $scanData);

        // Assert
        $response->assertRedirect();
        $response->assertSessionHas('success', 'Absensi kehadiran berhasil dicatat pada 10:00:00');

        $this->assertDatabaseHas('qr_code_scans', [
            'qr_code_id' => $qrCode->id,
            'user_id' => $this->Guest->id,
            'status' => 'hadir',
            'scan_date' => Carbon::today(),
        ]);
    }

    #[Test]
    public function it_can_scan_with_default_status_hadir_when_status_not_provided()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00:00',
            'end_time' => '17:00:00',
            'is_active' => true,
            'token' => 'valid-token-123',
        ]);

        $scanData = [
            'token' => 'valid-token-123',
            // status not provided - should default to 'hadir'
        ];

        // Act
        $response = $this->actingAs($this->Anggota)
            ->post(route('qr.scan.store'), $scanData);

        // Assert
        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('qr_code_scans', [
            'qr_code_id' => $qrCode->id,
            'user_id' => $this->Anggota->id,
            'status' => 'hadir',
        ]);
    }

    #[Test]
    public function it_can_scan_with_different_status_values()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00:00',
            'end_time' => '17:00:00',
            'is_active' => true,
            'token' => 'valid-token-123',
        ]);

        $statusValues = ['hadir', 'izin', 'sakit'];

        foreach ($statusValues as $status) {
            $user = User::factory()->create(['role' => 'User']);

            $scanData = [
                'token' => 'valid-token-123',
                'status' => $status,
            ];

            // Act
            $response = $this->actingAs($user)
                ->post(route('qr.scan.store'), $scanData);

            // Assert
            $response->assertRedirect();
            $response->assertSessionHas('success');

            $this->assertDatabaseHas('qr_code_scans', [
                'qr_code_id' => $qrCode->id,
                'user_id' => $user->id,
                'status' => $status,
            ]);
        }
    }

    #[Test]
    public function admin_can_access_pengurus_kegiatan()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'pengurus',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00:00',
            'end_time' => '17:00:00',
            'is_active' => true,
            'token' => 'pengurus-token-123',
        ]);

        $scanData = [
            'token' => 'pengurus-token-123',
            'status' => 'hadir',
        ];

        // Act
        $response = $this->actingAs($this->Admin)
            ->post(route('qr.scan.store'), $scanData);

        // Assert
        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('qr_code_scans', [
            'qr_code_id' => $qrCode->id,
            'user_id' => $this->Admin->id,
            'status' => 'hadir',
        ]);
    }

    #[Test]
    public function finance_can_access_pengurus_kegiatan()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'pengurus',
            'date' => Carbon::today(),
        ]);

        QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00:00',
            'end_time' => '17:00:00',
            'is_active' => true,
            'token' => 'pengurus-token-123',
        ]);

        $scanData = [
            'token' => 'pengurus-token-123',
            'status' => 'hadir',
        ];

        // Act
        $response = $this->actingAs($this->Finance)
            ->post(route('qr.scan.store'), $scanData);

        // Assert
        $response->assertRedirect();
        $response->assertSessionHas('success');
    }

    #[Test]
    public function anggota_can_access_anggota_kegiatan()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'anggota',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00:00',
            'end_time' => '17:00:00',
            'is_active' => true,
            'token' => 'anggota-token-123',
        ]);

        $scanData = [
            'token' => 'anggota-token-123',
            'status' => 'hadir',
        ];

        // Act
        $response = $this->actingAs($this->Anggota)
            ->post(route('qr.scan.store'), $scanData);

        // Assert
        $response->assertRedirect();
        $response->assertSessionHas('success');
    }

    #[Test]
    public function guest_cannot_access_pengurus_kegiatan()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'pengurus',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00:00',
            'end_time' => '17:00:00',
            'is_active' => true,
            'token' => 'pengurus-token-123',
        ]);

        $scanData = [
            'token' => 'pengurus-token-123',
            'status' => 'hadir',
        ];

        // Act
        $response = $this->actingAs($this->Guest)
            ->post(route('qr.scan.store'), $scanData);

        // Assert
        $response->assertRedirect();
        $response->assertSessionHas('error', 'Anda tidak diizinkan mengikuti kegiatan ini.');

        $this->assertDatabaseMissing('qr_code_scans', [
            'qr_code_id' => $qrCode->id,
            'user_id' => $this->Guest->id,
        ]);
    }

    #[Test]
    public function guest_cannot_access_anggota_kegiatan()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'anggota',
            'date' => Carbon::today(),
        ]);

        QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00:00',
            'end_time' => '17:00:00',
            'is_active' => true,
            'token' => 'anggota-token-123',
        ]);

        $scanData = [
            'token' => 'anggota-token-123',
            'status' => 'hadir',
        ];

        // Act
        $response = $this->actingAs($this->Guest)
            ->post(route('qr.scan.store'), $scanData);

        // Assert
        $response->assertRedirect();
        $response->assertSessionHas('error', 'Anda tidak diizinkan mengikuti kegiatan ini.');
    }

    #[Test]
    public function it_returns_error_for_invalid_qr_token()
    {
        // Arrange
        $scanData = [
            'token' => 'invalid-token-123',
            'status' => 'hadir',
        ];

        // Act
        $response = $this->actingAs($this->Anggota)
            ->post(route('qr.scan.store'), $scanData);

        // Assert
        $response->assertRedirect();
        $response->assertSessionHas('error', 'QR Code tidak valid atau tidak memiliki kegiatan.');
    }

    #[Test]
    public function it_returns_error_for_inactive_qr_code()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::today(),
        ]);

        QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00:00',
            'end_time' => '17:00:00',
            'is_active' => false, // Inactive QR
            'token' => 'inactive-token-123',
        ]);

        $scanData = [
            'token' => 'inactive-token-123',
            'status' => 'hadir',
        ];

        // Act
        $response = $this->actingAs($this->Anggota)
            ->post(route('qr.scan.store'), $scanData);

        // Assert
        $response->assertRedirect();
        $response->assertSessionHas('error', 'QR Code tidak valid atau tidak memiliki kegiatan.');
    }

    #[Test]
    public function it_returns_error_when_scanning_outside_time_range()
    {
        // Arrange - Set current time to 07:00 (before start time)
        Carbon::setTestNow(Carbon::parse('2024-01-15 07:00:00', 'Asia/Jakarta'));

        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00',
            'end_time' => '17:00',
            'is_active' => true,
            'token' => 'time-restricted-token',
        ]);

        $scanData = [
            'token' => 'time-restricted-token',
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
            'user_id' => $this->Anggota->id,
        ]);
    }

    #[Test]
    public function it_returns_error_when_scanning_after_end_time()
    {
        Carbon::setTestNow(Carbon::parse('2024-01-15 18:00:00', 'Asia/Jakarta'));

        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00',
            'end_time' => '17:00',
            'is_active' => true,
            'token' => 'time-restricted-token',
        ]);

        $scanData = [
            'token' => 'time-restricted-token',
            'status' => 'hadir',
        ];

        // Act
        $response = $this->actingAs($this->Anggota)
            ->post(route('qr.scan.store'), $scanData);

        // Assert
        $response->assertRedirect();
        $response->assertSessionHas('error', 'Scan hanya dapat dilakukan antara 08:00 - 17:00.');
    }

    #[Test]
    public function it_returns_error_when_user_already_scanned()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00:00',
            'end_time' => '17:00:00',
            'is_active' => true,
            'token' => 'already-scanned-token',
        ]);

        // Create existing scan
        QrCodeScan::factory()->create([
            'qr_code_id' => $qrCode->id,
            'user_id' => $this->Anggota->id,
            'status' => 'hadir',
        ]);

        $scanData = [
            'token' => 'already-scanned-token',
            'status' => 'hadir',
        ];

        // Act
        $response = $this->actingAs($this->Anggota)
            ->post(route('qr.scan.store'), $scanData);

        // Assert
        $response->assertRedirect();
        $response->assertSessionHas('error', 'Kamu sudah melakukan absen pada kegiatan ini dengan status hadir.');

        // Should still only have one scan record
        $scanCount = QrCodeScan::where('qr_code_id', $qrCode->id)
            ->where('user_id', $this->Anggota->id)
            ->count();
        $this->assertEquals(1, $scanCount);
    }

    #[Test]
    public function it_validates_required_fields()
    {
        // Act - Missing token
        $response = $this->actingAs($this->Anggota)
            ->post(route('qr.scan.store'), []);

        // Assert
        $response->assertSessionHasErrors(['token']);
    }

    #[Test]
    public function it_validates_status_field()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::today(),
        ]);

        QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00:00',
            'end_time' => '17:00:00',
            'is_active' => true,
            'token' => 'valid-token-123',
        ]);

        $scanData = [
            'token' => 'valid-token-123',
            'status' => 'invalid-status', // Invalid status
        ];

        // Act
        $response = $this->actingAs($this->Anggota)
            ->post(route('qr.scan.store'), $scanData);

        // Assert
        $response->assertSessionHasErrors(['status']);
    }
}
