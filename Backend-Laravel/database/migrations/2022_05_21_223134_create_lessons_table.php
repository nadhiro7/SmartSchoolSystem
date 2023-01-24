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
        Schema::create('lessons', function (Blueprint $table) {
            $table->increments('id');
            $table->date('date');
            $table->time('startTime');
            $table->time('endTime');
            $table->timestamps();
            $table->unsignedInteger('classes_id');
            $table->foreign('classes_id')->references('id')->on('classes')->nullable()->onDelete('cascade');
            $table->unsignedInteger('subjects_id');
            $table->foreign('subjects_id')->references('id')->on('subjects')->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lessons');
    }
};
