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
        Schema::table('events', function (Blueprint $table) {
            $table->dropColumn('name');
            $table->unsignedBigInteger('work_program_id');
            $table->foreign('work_program_id')
                  ->references('id')
                  ->on('work_programs')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function (Blueprint $table) {
            $table->string('name');
            $table->dropForeign(['work_program_id']);
            $table->dropColumn('work_program_id');
        });
    }
};
