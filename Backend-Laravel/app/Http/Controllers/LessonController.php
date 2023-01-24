<?php

namespace App\Http\Controllers;

use App\Models\lesson;
use App\Models\lesson\lessons;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $lesson = DB::table("lessons")->where('classes_id', "=", $id)
            ->join("classes", "classes.id", "=", "lessons.classes_id")
            ->join("subjects", "subjects.id", "=", "classes.level_id")
            ->join("users", "users.id", "=", "subjects.user_id")
            ->get(["lessons.id", "lessons.startTime", "lessons.date", "lessons.endTime", "classes.nameClass", "users.firstname", "users.lastname"]);
        return $lesson;
    }
    public function showTeacherLessons($id, $user_id)
    {
        $lesson = DB::table("lessons")->where('classes_id', "=", $id)
            ->join("classes", "classes.id", "=", "lessons.classes_id")
            ->join("subjects", "subjects.id", "=", "lessons.subjects_id")
            ->join("users", "users.id", "=", "subjects.user_id")
            ->where('subjects.user_id', "=", $user_id)
            ->get(["lessons.id", "lessons.startTime", "lessons.date", "subjects.nameSubject", "lessons.endTime", "classes.nameClass", "users.firstname", "users.lastname"]);
        return $lesson;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function edit(lesson $lesson)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, lesson $lesson)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\lesson  $lesson
     * @return \Illuminate\Http\Response
     */
    public function destroy(lesson $lesson)
    {
        //
    }
    // public function getLessonsByClassId($id)
    // {
    //     $lessons = DB::table('lessons')->where("classes_id", "=", $id)->join("c);
    //     return $lessons;
    // }
}
