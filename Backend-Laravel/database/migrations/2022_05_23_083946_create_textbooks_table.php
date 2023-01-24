<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('textbooks', function (Blueprint $table) {
            $table->increments('id');
            $table->string('content')->nullable();
            $table->string('title')->nullable();
            $table->timestamps();
            $table->unsignedInteger('classes_id');
            $table->foreign('classes_id')->references('class_id')->on('books')->onDelete('cascade');
            $table->unsignedInteger('lessons_id');
            $table->foreign('lessons_id')->references('id')->on('lessons')->nullable()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('textbooks');
    }
};
