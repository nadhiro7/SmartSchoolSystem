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
        Schema::create('schedules', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamp('endTime')->nullable();
            $table->timestamp('startTime')->nullable();
            $table->string('rRule');
            $table->string('title');
            $table->timestamps();
            $table->unsignedInteger('subjects_id');
            $table->foreign('subjects_id')->references('id')->on('subjects');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unsignedInteger('classrooms_id');
            $table->foreign('classrooms_id')->references('id')->on('classrooms');
            $table->unsignedInteger('classes_id');
            $table->foreign('classes_id')->references('id')->on('classes');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedules');
    }
};
