<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('qr_code_scans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('qr_code_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('scan_date');
            $table->timestamp('scanned_at')->nullable()->useCurrent();
            $table->enum('status', ['hadir', 'sakit', 'izin']);
            $table->text('description')->nullable();
            $table->timestamps();
            $table->unique(['qr_code_id', 'user_id', 'scan_date'], 'unique_user_scan_per_day');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qr_code_scans');
    }
};
