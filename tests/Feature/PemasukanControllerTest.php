<?php

namespace Tests\Feature;

use App\Models\Pemasukan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

class PemasukanControllerTest extends TestCase
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
    public function it_can_display_pemasukan_index_page()
    {
        // Arrange
        Pemasukan::factory()->count(3)->create();

        // Act
        $response = $this->actingAs($this->Finance)->get(route('pemasukan.index'));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DataMaster/Pemasukan')
            ->has('pemasukan')
            ->has('filters')
            ->has('flash')
        );
    }

    #[Test]
    public function it_can_filter_pemasukan_by_date_range()
    {
        // Arrange
        Pemasukan::factory()->create(['date' => '2024-01-15']);
        Pemasukan::factory()->create(['date' => '2024-02-15']);
        Pemasukan::factory()->create(['date' => '2024-03-15']);

        // Act
        $response = $this->actingAs($this->Finance)
            ->get(route('pemasukan.index', [
                'start_date' => '2024-01-01',
                'end_date' => '2024-02-28',
            ]));

        // Assert
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('DataMaster/Pemasukan')
            ->where('filters.start_date', '2024-01-01')
            ->where('filters.end_date', '2024-02-28')
            ->has('pemasukan.data', 2) // Should only show 2 records within date range
        );
    }

    #[Test]
    public function it_can_create_new_pemasukan_record()
    {
        // Arrange
        $pemasukanData = [
            'amount' => 150000,
            'date' => '2024-01-15',
            'description' => 'Data Anggaran tahunan',
        ];

        // Act
        $response = $this->actingAs($this->Finance)
            ->post(route('pemasukan.store'), $pemasukanData);

        // Assert
        $response->assertRedirect(route('pemasukan.index'));
        $response->assertSessionHas('success', 'Data berhasil dibuat!');

        $this->assertDatabaseHas('pemasukan', [
            'amount' => 150000,
            'date' => '2024-01-15',
            'description' => 'Data Anggaran tahunan',
        ]);
    }

    #[Test]
    public function it_can_update_pemasukan_record()
    {
        // Arrange
        $pemasukan = Pemasukan::factory()->create([
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
            ->put(route('pemasukan.update', $pemasukan->id), $updateData);

        // Assert
        $response->assertRedirect(route('pemasukan.index'));
        $response->assertSessionHas('success', 'Data berhasil di update!');

        $this->assertDatabaseHas('pemasukan', [
            'id' => $pemasukan->id,
            'amount' => 150000,
            'date' => '2024-01-20',
            'description' => 'Updated description',
        ]);
    }

    #[Test]
    public function it_can_delete_pemasukan_record()
    {
        // Arrange
        $pemasukan = Pemasukan::factory()->create();

        // Act
        $response = $this->actingAs($this->Finance)
            ->delete(route('pemasukan.destroy', $pemasukan->id));

        // Assert
        $response->assertRedirect(route('pemasukan.index'));
        $response->assertSessionHas('success', 'Data berhasil dihapus!');
        $this->assertDatabaseMissing('pemasukan', ['id' => $pemasukan->id]);
    }

    #[Test]
    public function it_can_export_pemasukan_to_csv()
    {
        // Arrange
        Pemasukan::factory()->count(3)->create([
            'amount' => 100000,
            'description' => 'Test pemasukan',
        ]);

        // Act
        $response = $this->actingAs($this->Finance)
            ->get(route('pemasukan.export.csv'));

        // Assert
        $response->assertStatus(200);
        $response->assertHeader('Content-Type', 'text/csv; charset=UTF-8');
        $response->assertHeader('Content-Disposition');

        $response->getContent();
    }

    #[Test]
    public function it_validates_required_fields_when_updating_pemasukan()
    {
        // Arrange
        $pemasukan = Pemasukan::factory()->create();

        // Act
        $response = $this->actingAs($this->Finance)
            ->put(route('pemasukan.update', $pemasukan->id), []);

        // Assert
        $response->assertSessionHasErrors(['amount', 'date']);
    }

    #[Test]
    public function it_validates_required_fields_when_creating_pemasukan()
    {
        // Act
        $response = $this->actingAs($this->Finance)
            ->post(route('pemasukan.store'), []);

        // Assert
        $response->assertSessionHasErrors(['amount', 'date']);
    }

    #[Test]
    public function it_validates_amount_is_numeric_and_positive()
    {
        // Test negative amount
        $response = $this->actingAs($this->Finance)
            ->post(route('pemasukan.store'), [
                'amount' => -1000,
                'date' => '2024-01-15',
            ]);

        $response->assertSessionHasErrors(['amount']);

        // Test non-numeric amount
        $response = $this->actingAs($this->Finance)
            ->post(route('pemasukan.store'), [
                'amount' => 'invalid',
                'date' => '2024-01-15',
            ]);

        $response->assertSessionHasErrors(['amount']);

        // Test zero amount (should be valid)
        $response = $this->actingAs($this->Finance)
            ->post(route('pemasukan.store'), [
                'amount' => 0,
                'date' => '2024-01-15',
            ]);

        $response->assertRedirect(route('pemasukan.index'));
        $response->assertSessionHasNoErrors();
    }

    #[Test]
    public function it_validates_date_format()
    {
        // Arrange
        $pemasukanData = [
            'amount' => 50000,
            'date' => 'invalid-date',
            'description' => 'Test description',
        ];

        // Act
        $response = $this->actingAs($this->Finance)
            ->post(route('pemasukan.store'), $pemasukanData);

        // Assert
        $response->assertSessionHasErrors(['date']);
    }

    #[Test]
    public function it_validates_description_max_length()
    {
        // Arrange
        $pemasukanData = [
            'amount' => 50000,
            'date' => '2024-01-15',
            'description' => str_repeat('a', 256), // Exceeds 255 character limit
        ];

        // Act
        $response = $this->actingAs($this->Finance)
            ->post(route('pemasukan.store'), $pemasukanData);

        // Assert
        $response->assertSessionHasErrors(['description']);
    }
}
