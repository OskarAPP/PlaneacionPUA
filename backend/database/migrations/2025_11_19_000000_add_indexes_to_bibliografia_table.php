<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('bibliografia')) {
            return;
        }

        Schema::table('bibliografia', function (Blueprint $table) {
            $table->index('ITEM', 'bibliografia_item_idx');
            $table->index('ISBN', 'bibliografia_isbn_idx');
            $table->index('ISBN_EXTRA', 'bibliografia_isbn_extra_idx');
            $table->index('TITULO', 'bibliografia_titulo_idx');
            $table->index('AUTOR', 'bibliografia_autor_idx');
            $table->index('CLASIFICACION', 'bibliografia_clasificacion_idx');
        });
    }

    public function down(): void
    {
        if (!Schema::hasTable('bibliografia')) {
            return;
        }

        Schema::table('bibliografia', function (Blueprint $table) {
            $table->dropIndex('bibliografia_item_idx');
            $table->dropIndex('bibliografia_isbn_idx');
            $table->dropIndex('bibliografia_isbn_extra_idx');
            $table->dropIndex('bibliografia_titulo_idx');
            $table->dropIndex('bibliografia_autor_idx');
            $table->dropIndex('bibliografia_clasificacion_idx');
        });
    }
};
