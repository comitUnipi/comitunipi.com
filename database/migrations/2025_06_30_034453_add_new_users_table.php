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
        Schema::table('users', function (Blueprint $table) {
            $table->string('npm')->unique();
            $table->enum('role', ['Guest', 'User', 'Finance', 'Admin', 'Super Admin'])->default('Guest');
            $table->boolean('is_active')->default(false);
            $table->string('position')->default('Calon Anggota');
            $table->string('jenis_kelamin')->nullable();
            $table->string('no_wa')->nullable();
            $table->string('jurusan')->nullable();
            $table->string('minat_keahlian')->nullable();
            $table->string('alasan')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('npm');
            $table->dropColumn('role');
            $table->dropColumn('is_active');
            $table->dropColumn('position');
            $table->dropColumn('jenis_kelamin');
            $table->dropColumn('no_wa');
            $table->dropColumn('jurusan');
            $table->dropColumn('minat_keahlian');
            $table->dropColumn('alasan');
        });
    }
};
