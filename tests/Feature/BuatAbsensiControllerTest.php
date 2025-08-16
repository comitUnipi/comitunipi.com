<?php

namespace Tests\Feature;

use App\Models\Kegiatan;
use App\Models\QrCode;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class BuatAbsensiControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        $this->SuperAdmin = User::factory()->create([
            'role' => 'Super Admin',
            'is_active' => true,
        ]);

        $this->Admin = User::factory()->create([
            'role' => 'Admin',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function it_can_display_buat_absensi_page()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->count(3)->create([
            'date' => Carbon::tomorrow(),
        ]);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('qr.create'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('FiturKhusus/BuatAbsensi')
            ->has('kegiatan')
            ->has('flash')
        );
    }

    #[Test]
    public function it_only_shows_current_and_future_kegiatan()
    {
        // Arrange
        Kegiatan::factory()->create([
            'date' => Carbon::yesterday(),
        ]);

        Kegiatan::factory()->create([
            'date' => Carbon::today(),
        ]);

        Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('qr.create'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('kegiatan', 2) // Should only show today and future kegiatan
        );
    }

    #[Test]
    public function it_displays_active_qr_code_with_svg()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => true,
            'token' => 'test-token-12345',
        ]);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('qr.create'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->has('qrData')
            ->has('qrCodeSvg')
            ->where('qrData.id', $qrCode->id)
            ->where('qrData.is_active', true)
        );
    }

    #[Test]
    public function it_displays_null_qr_data_when_no_active_qr_exists()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => false, // Inactive QR
        ]);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->get(route('qr.create'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->where('qrData', null)
            ->where('qrCodeSvg', null)
        );
    }

    #[Test]
    public function it_can_create_new_qr_code()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        $qrData = [
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00',
            'end_time' => '17:00',
        ];

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), $qrData);

        // Assert
        $response->assertRedirect(route('qr.create'));
        $response->assertSessionHas('success', 'QR Code berhasil dibuat.');

        $this->assertDatabaseHas('qr_codes', [
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00',
            'end_time' => '17:00',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function it_can_deactivate_active_qr_code()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        $qrCode = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan->id,
            'is_active' => true,
        ]);

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.deactivate', $qrCode->id));

        // Assert
        $response->assertRedirect();
        $response->assertSessionHas('success', 'QR Code berhasil dinonaktifkan.');

        $this->assertDatabaseHas('qr_codes', [
            'id' => $qrCode->id,
            'is_active' => false,
        ]);
    }

    #[Test]
    public function it_deactivates_existing_active_qr_codes_when_creating_new_one()
    {
        // Arrange
        $kegiatan1 = Kegiatan::factory()->create(['date' => Carbon::tomorrow()]);
        $kegiatan2 = Kegiatan::factory()->create(['date' => Carbon::tomorrow()]);

        $existingQr = QrCode::factory()->create([
            'kegiatan_id' => $kegiatan1->id,
            'is_active' => true,
        ]);

        $qrData = [
            'kegiatan_id' => $kegiatan2->id,
            'start_time' => '08:00',
            'end_time' => '17:00',
        ];

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), $qrData);

        // Assert
        $response->assertRedirect(route('qr.create'));
        $response->assertSessionHas('success', 'QR Code berhasil dibuat.');

        // Check existing QR is deactivated
        $this->assertDatabaseHas('qr_codes', [
            'id' => $existingQr->id,
            'is_active' => false,
        ]);

        // Check new QR is active
        $this->assertDatabaseHas('qr_codes', [
            'kegiatan_id' => $kegiatan2->id,
            'is_active' => true,
        ]);
    }

    #[Test]
    public function it_generates_unique_token_for_new_qr_code()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        $qrData = [
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00',
            'end_time' => '17:00',
        ];

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), $qrData);

        // Assert
        $response->assertRedirect(route('qr.create'));

        $qrCode = QrCode::where('kegiatan_id', $kegiatan->id)->first();
        $this->assertNotNull($qrCode->token);
        $this->assertEquals(32, strlen($qrCode->token)); // Str::random(32)
    }

    #[Test]
    public function it_validates_required_fields_when_creating_qr_code()
    {
        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), []);

        // Assert
        $response->assertSessionHasErrors(['kegiatan_id', 'start_time', 'end_time']);
    }

    #[Test]
    public function it_validates_kegiatan_exists_when_creating_qr_code()
    {
        // Arrange
        $qrData = [
            'kegiatan_id' => 99999, // Non-existent kegiatan
            'start_time' => '08:00',
            'end_time' => '17:00',
        ];

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), $qrData);

        // Assert
        $response->assertSessionHasErrors(['kegiatan_id']);
    }

    #[Test]
    public function it_validates_time_format_when_creating_qr_code()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        $qrData = [
            'kegiatan_id' => $kegiatan->id,
            'start_time' => 'invalid-time',
            'end_time' => 'invalid-time',
        ];

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), $qrData);

        // Assert
        $response->assertSessionHasErrors(['start_time', 'end_time']);
    }

    #[Test]
    public function it_validates_end_time_is_after_start_time()
    {
        // Arrange
        $kegiatan = Kegiatan::factory()->create([
            'date' => Carbon::tomorrow(),
        ]);

        $qrData = [
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '17:00',
            'end_time' => '08:00', // End time before start time
        ];

        // Act
        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), $qrData);

        // Assert
        $response->assertSessionHasErrors(['end_time']);

        // Test valid time range
        $validQrData = [
            'kegiatan_id' => $kegiatan->id,
            'start_time' => '08:00',
            'end_time' => '17:00',
        ];

        $response = $this->actingAs($this->SuperAdmin)
            ->post(route('qr.store'), $validQrData);

        $response->assertRedirect(route('qr.create'));
        $response->assertSessionHasNoErrors();
    }
}
