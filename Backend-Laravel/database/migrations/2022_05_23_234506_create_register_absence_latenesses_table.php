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
        Schema::create('register_absence_latenesses', function (Blueprint $table) {
            $table->string('state')->nullable();
            $table->boolean('isJustify')->nullable()->default(0);
            $table->timestamps();
            $table->unsignedInteger('student_id');
            $table->foreign('student_id')->references('id')->on('students')->onDelete('cascade');
            $table->unsignedInteger('lessons_id');
            $table->foreign('lessons_id')->references('id')->on('lessons')->nullable()->onDelete('cascade');
            $table->primary(['student_id','lessons_id']);
            $table->string('file')->nullable()->default(null);
            $table->string('justContent')->nullable()->default(null);
            $table->boolean('haveJust')->nullable()->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('register_absence_latenesses');
    }
};
