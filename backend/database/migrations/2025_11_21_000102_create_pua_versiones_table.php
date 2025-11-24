<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pua_versiones', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pua_documento_id');
            $table->unsignedInteger('version');
            $table->integer('generado_por')->nullable();
            $table->string('status_revision', 50)->default('emitido');
            $table->string('pdf_path');
            $table->string('checksum', 128)->nullable();
            $table->json('metadatos')->nullable();
            $table->timestamps();

            $table->unique(['pua_documento_id', 'version']);
            $table->foreign('pua_documento_id')->references('id')->on('pua_documentos')->cascadeOnDelete();
            $table->foreign('generado_por')->references('docente_id')->on('docente')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pua_versiones');
    }
};
