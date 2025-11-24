<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pua_modulos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pua_documento_id');
            $table->string('slug');
            $table->string('titulo')->nullable();
            $table->string('status_revision', 50)->default('borrador');
            $table->json('payload')->nullable();
            $table->integer('locked_by')->nullable();
            $table->timestamp('locked_at')->nullable();
            $table->integer('updated_by')->nullable();
            $table->timestamps();

            $table->unique(['pua_documento_id', 'slug'], 'pua_modulos_documento_slug_unique');
            $table->index(['slug']);
            $table->index(['status_revision']);

            $table->foreign('pua_documento_id')->references('id')->on('pua_documentos')->cascadeOnDelete();
            $table->foreign('locked_by')->references('docente_id')->on('docente')->nullOnDelete();
            $table->foreign('updated_by')->references('docente_id')->on('docente')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pua_modulos');
    }
};
