<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('marksheets', function (Blueprint $table) {
            $table->string('noteTotal')->nullable();
            $table->string('Ev')->nullable();
            $table->string('grade')->nullable();
            $table->string('exam')->nullable();
            $table->string('test')->nullable();
            $table->string('comment')->nullable();
            $table->integer('season');
            $table->timestamps();
            $table->unsignedInteger('students_id');
            $table->foreign('students_id')->references('id')->on('students')->onDelete('cascade');
            $table->unsignedInteger('subjects_id');
            $table->foreign('subjects_id')->references('id')->on('subjects')->onDelete('cascade');
            $table->id();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('marksheets');
    }
};
