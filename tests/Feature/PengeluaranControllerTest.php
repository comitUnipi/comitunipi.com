<?php

namespace Tests\Feature;

use App\Models\Pengeluaran;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PengeluaranControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();

        $this->Finance = User::factory()->create([
            'role' => 'Finance',
            'is_active' => true,
        ]);
    }

    #[Test]
    public function it_can_display_pengeluaran_index_page()
    {
        // Arrange
        Pengeluaran::factory()->count(3)->create();

        // Act
        $response = $this->actingAs($this->Finance)->get(route('pengeluaran.index'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DataMaster/Pengeluaran')
            ->has('pengeluaran')
            ->has('filters')
            ->has('flash')
        );
    }

    #[Test]
    public function it_can_filter_pengeluaran_by_date_range()
    {
        // Arrange
        Pengeluaran::factory()->create(['date' => '2024-01-15']);
        Pengeluaran::factory()->create(['date' => '2024-02-15']);
        Pengeluaran::factory()->create(['date' => '2024-03-15']);

        // Act
        $response = $this->actingAs($this->Finance)
            ->get(route('pengeluaran.index', [
                'start_date' => '2024-01-01',
                'end_date' => '2024-02-28',
            ]));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DataMaster/Pengeluaran')
            ->where('filters.start_date', '2024-01-01')
            ->where('filters.end_date', '2024-02-28')
            ->has('pengeluaran.data', 2) // Should only show 2 records within date range
        );
    }

    #[Test]
    public function it_can_create_new_pengeluaran_record()
    {
        // Arrange
        $pengeluaranData = [
            'amount' => 150000,
            'date' => '2024-01-15',
            'description' => 'Data pengeluaran acara workshop',
        ];

        // Act
        $response = $this->actingAs($this->Finance)
            ->post(route('pengeluaran.store'), $pengeluaranData);

        // Assert
        $response->assertRedirect(route('pengeluaran.index'));
        $response->assertSessionHas('success', 'Data berhasil dibuat!');

        $this->assertDatabaseHas('pengeluaran', [
            'amount' => 150000,
            'date' => '2024-01-15',
            'description' => 'Data pengeluaran acara workshop',
        ]);
    }

    #[Test]
    public function it_can_update_pengeluaran_record()
    {
        // Arrange
        $pengeluaran = Pengeluaran::factory()->create([
            'amount' => 100000,
            'date' => '2024-01-15',
            'description' => 'Original description',
        ]);

        $updateData = [
            'amount' => 150000,
            'date' => '2024-01-20',
            'description' => 'Updated description',
        ];

        // Act
        $response = $this->actingAs($this->Finance)
            ->put(route('pengeluaran.update', $pengeluaran->id), $updateData);

        // Assert
        $response->assertRedirect(route('pengeluaran.index'));
        $response->assertSessionHas('success', 'Data berhasil di update!');

        $this->assertDatabaseHas('pengeluaran', [
            'id' => $pengeluaran->id,
            'amount' => 150000,
            'date' => '2024-01-20',
            'description' => 'Updated description',
        ]);
    }

    #[Test]
    public function it_can_delete_pengeluaran_record()
    {
        // Arrange
        $pengeluaran = Pengeluaran::factory()->create();

        // Act
        $response = $this->actingAs($this->Finance)
            ->delete(route('pengeluaran.destroy', $pengeluaran->id));

        // Assert
        $response->assertRedirect(route('pengeluaran.index'));
        $response->assertSessionHas('success', 'Data berhasil dihapus!');
        $this->assertDatabaseMissing('pengeluaran', ['id' => $pengeluaran->id]);
    }

    #[Test]
    public function it_can_export_pengeluaran_to_csv()
    {
        // Arrange
        Pengeluaran::factory()->count(3)->create([
            'amount' => 100000,
            'description' => 'Test pengeluaran',
        ]);

        // Act
        $response = $this->actingAs($this->Finance)
            ->get(route('pengeluaran.export.csv'));

        // Assert
        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
        $response->assertHeader('Content-Disposition');

        $response->getContent();
    }

    #[Test]
    public function it_validates_required_fields_when_updating_pengeluaran()
    {
        // Arrange
        $pengeluaran = Pengeluaran::factory()->create();

        // Act
        $response = $this->actingAs($this->Finance)
            ->put(route('pengeluaran.update', $pengeluaran->id), []);

        // Assert
        $response->assertSessionHasErrors(['amount', 'date']);
    }

    #[Test]
    public function it_validates_required_fields_when_creating_pengeluaran()
    {
        // Act
        $response = $this->actingAs($this->Finance)
            ->post(route('pengeluaran.store'), []);

        // Assert
        $response->assertSessionHasErrors(['amount', 'date']);
    }

    #[Test]
    public function it_validates_amount_is_numeric_and_positive()
    {
        // Test negative amount
        $response = $this->actingAs($this->Finance)
            ->post(route('pengeluaran.store'), [
                'amount' => -1000,
                'date' => '2024-01-15',
            ]);

        $response->assertSessionHasErrors(['amount']);

        // Test non-numeric amount
        $response = $this->actingAs($this->Finance)
            ->post(route('pengeluaran.store'), [
                'amount' => 'invalid',
                'date' => '2024-01-15',
            ]);

        $response->assertSessionHasErrors(['amount']);

        // Test zero amount (should be valid)
        $response = $this->actingAs($this->Finance)
            ->post(route('pengeluaran.store'), [
                'amount' => 0,
                'date' => '2024-01-15',
            ]);

        $response->assertRedirect(route('pengeluaran.index'));
        $response->assertSessionHasNoErrors();
    }

    #[Test]
    public function it_validates_date_format()
    {
        // Arrange
        $pengeluaranData = [
            'amount' => 50000,
            'date' => 'invalid-date',
            'description' => 'Test description',
        ];

        // Act
        $response = $this->actingAs($this->Finance)
            ->post(route('pengeluaran.store'), $pengeluaranData);

        // Assert
        $response->assertSessionHasErrors(['date']);
    }

    #[Test]
    public function it_validates_description_max_length()
    {
        // Arrange
        $pengeluaranData = [
            'amount' => 50000,
            'date' => '2024-01-15',
            'description' => str_repeat('a', 256), // Exceeds 255 character limit
        ];

        // Act
        $response = $this->actingAs($this->Finance)
            ->post(route('pengeluaran.store'), $pengeluaranData);

        // Assert
        $response->assertSessionHasErrors(['description']);
    }
}
