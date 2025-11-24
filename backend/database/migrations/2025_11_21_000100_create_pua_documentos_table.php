<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('pua_documentos')) {
            return;
        }

        Schema::create('pua_documentos', function (Blueprint $table) {
            $table->id();
            $table->integer('carrera_id');
            $table->integer('materia_id');
            $table->string('status_revision', 50)->default('borrador');
            $table->integer('locked_by')->nullable();
            $table->timestamp('locked_at')->nullable();
            $table->integer('created_by')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();

            $table->unique(['carrera_id', 'materia_id'], 'pua_documentos_carrera_materia_unique');
            $table->index(['status_revision']);

            $table->foreign('carrera_id')->references('carrera_id')->on('carrera')->cascadeOnDelete();
            $table->foreign('materia_id')->references('materia_id')->on('materia')->cascadeOnDelete();
            $table->foreign('locked_by')->references('docente_id')->on('docente')->nullOnDelete();
            $table->foreign('created_by')->references('docente_id')->on('docente')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pua_documentos');
    }
};
