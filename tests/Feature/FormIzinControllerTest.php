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

class FormIzinControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        Carbon::setTestNow(Carbon::parse('2024-01-15 10:00:00'));

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
    public function it_can_display_form_izin_page_with_accessible_kegiatan()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => true,
        ]);

        // Act
        $response = $this->actingAs($this->Anggota)
            ->get(route('absensi.create'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('FiturUtama/FormIzin')
            ->has('kegiatan')
            ->has('flash')
            ->where('kegiatan.id', $kegiatan->id)
        );
    }

    #[Test]
    public function it_displays_null_kegiatan_when_no_accessible_kegiatan_exists()
    {
        // Arrange - Create kegiatan that guest cannot access
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'pengurus',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => true,
        ]);

        // Act
        $response = $this->actingAs($this->Guest)
            ->get(route('absensi.create'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('FiturUtama/FormIzin')
            ->where('kegiatan', null)
        );
    }

    #[Test]
    public function it_displays_null_kegiatan_when_no_active_qr_code_exists()
    {
        // Arrange - Create kegiatan but with inactive QR code
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => false, // Inactive
        ]);

        // Act
        $response = $this->actingAs($this->Anggota)
            ->get(route('absensi.create'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('FiturUtama/FormIzin')
            ->where('kegiatan', null)
        );
    }

    #[Test]
    public function super_admin_can_see_pengurus_kegiatan()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'pengurus',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => true,
        ]);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('absensi.create'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('kegiatan')
            ->where('kegiatan.id', $kegiatan->id)
        );
    }

    #[Test]
    public function admin_can_see_pengurus_kegiatan()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'pengurus',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => true,
        ]);

        // Act
        $response = $this->actingAs($this->Admin)
            ->get(route('absensi.create'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('kegiatan')
            ->where('kegiatan.id', $kegiatan->id)
        );
    }

    #[Test]
    public function finance_can_see_pengurus_kegiatan()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'pengurus',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => true,
        ]);

        // Act
        $response = $this->actingAs($this->Finance)
            ->get(route('absensi.create'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('kegiatan')
            ->where('kegiatan.id', $kegiatan->id)
        );
    }

    #[Test]
    public function anggota_can_see_anggota_kegiatan()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'anggota',
            'date' => Carbon::today(),
        ]);

        QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => true,
        ]);

        // Act
        $response = $this->actingAs($this->Anggota)
            ->get(route('absensi.create'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('kegiatan')
            ->where('kegiatan.id', $kegiatan->id)
        );
    }

    #[Test]
    public function guest_cannot_see_pengurus_kegiatan()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'pengurus',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => true,
        ]);

        // Act
        $response = $this->actingAs($this->Guest)
            ->get(route('absensi.create'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('kegiatan', null)
        );
    }

    #[Test]
    public function guest_cannot_see_anggota_kegiatan()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'anggota',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => true,
        ]);

        // Act
        $response = $this->actingAs($this->Guest)
            ->get(route('absensi.create'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('kegiatan', null)
        );
    }

    #[Test]
    public function it_can_submit_izin_form_successfully()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => true,
        ]);

        $izinData = [
            'alasan' => 'Saya tidak bisa mengikuti kegiatan ini',
            'status' => 'sakit',
        ];

        // Act
        $response = $this->actingAs($this->Anggota)
            ->post(route('absensi.store'), $izinData);

        // Assert
        $response->assertRedirect(route('absensi.create'));
        $response->assertSessionHas('success', 'Permohonan izin berhasil dikirim.');

        $this->assertDatabaseHas('qr_code_scans', [
            'qr_code_id' => $qrCode->id,
            'user_id' => $this->Anggota->id,
            'scan_date' => Carbon::today(),
            'scanned_at' => null,
            'status' => 'sakit',
            'description' => 'Saya tidak bisa mengikuti kegiatan ini',
        ]);
    }

    #[Test]
    public function it_can_submit_izin_with_status_izin()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => true,
        ]);

        $izinData = [
            'alasan' => 'Saya tidak bisa mengikuti kegiatan ini dikarenakan kerjaan',
            'status' => 'izin',
        ];

        // Act
        $response = $this->actingAs($this->Anggota)
            ->post(route('absensi.store'), $izinData);

        // Assert
        $response->assertRedirect(route('absensi.create'));
        $response->assertSessionHas('success', 'Permohonan izin berhasil dikirim.');

        $this->assertDatabaseHas('qr_code_scans', [
            'qr_code_id' => $qrCode->id,
            'user_id' => $this->Anggota->id,
            'status' => 'izin',
            'description' => 'Saya tidak bisa mengikuti kegiatan ini dikarenakan kerjaan',
        ]);
    }

    #[Test]
    public function it_returns_error_when_no_accessible_kegiatan_exists_on_submit()
    {
        // Arrange - Create kegiatan that guest cannot access
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'pengurus',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => true,
        ]);

        $izinData = [
            'alasan' => 'Saya tidak bisa mengikuti kegiatan ini',
            'status' => 'sakit',
        ];

        // Act
        $response = $this->actingAs($this->Guest)
            ->post(route('absensi.store'), $izinData);

        // Assert
        $response->assertRedirect();
        $response->assertSessionHas('error', 'Tidak ada kegiatan yang sesuai untuk Anda.');

        $this->assertDatabaseMissing('qr_code_scans', [
            'user_id' => $this->Guest->id,
            'status' => 'sakit',
        ]);
    }

    #[Test]
    public function it_validates_required_fields()
    {
        // Act - Missing required fields
        $response = $this->actingAs($this->Anggota)
            ->post(route('absensi.store'), []);

        // Assert
        $response->assertSessionHasErrors(['alasan', 'status']);
    }

    #[Test]
    public function it_validates_alasan_max_length()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'audiens' => 'umum',
            'date' => Carbon::today(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => true,
        ]);

        $izinData = [
            'alasan' => str_repeat('a', 1001), // Exceeds 1000 character limit
            'status' => 'sakit',
        ];

        // Act
        $response = $this->actingAs($this->Anggota)
            ->post(route('absensi.store'), $izinData);

        // Assert
        $response->assertSessionHasErrors(['alasan']);
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
            'is_active' => true,
        ]);

        $izinData = [
            'alasan' => 'Valid reason',
            'status' => 'invalid_status', // Invalid status
        ];

        // Act
        $response = $this->actingAs($this->Anggota)
            ->post(route('absensi.store'), $izinData);

        // Assert
        $response->assertSessionHasErrors(['status']);

        // Test valid status values
        $validStatuses = ['izin', 'sakit'];
        foreach ($validStatuses as $status) {
            $izinData['status'] = $status;
            $response = $this->actingAs($this->Anggota)
                ->post(route('absensi.store'), $izinData);

            $response->assertRedirect(route('absensi.create'));
            $response->assertSessionHasNoErrors();

            // Clean up for next iteration
            QrCodeScan::where('user_id', $this->Anggota->id)
                ->where('status', $status)
                ->delete();
        }
    }
}
