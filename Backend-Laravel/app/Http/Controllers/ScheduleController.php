<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ScheduleController extends Controller
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
        $sch = new Schedule;
        $sch->startTime = $request->startTime;
        $sch->endTime = $request->endTime;
        $sch->title = $request->title;
        $sch->rRule = $request->rRule;
        $sch->subjects_id = $request->subjects_id;
        $sch->classrooms_id = $request->classrooms_id;
        $sch->user_id = $request->users_id;
        $sch->classes_id = $request->classId;
        $sch->save();
        return $sch;
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function show(Schedule $schedule)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function edit(Schedule $schedule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $sch = Schedule::find($request->id);
        if ($sch) {
            $sch->startTime = $request->startTime;
            $sch->endTime = $request->endTime;
            $sch->title = $request->title;
            $sch->rRule = $request->rRule;
            $sch->subjects_id = $request->subjects_id;
            $sch->classrooms_id = $request->classrooms_id;
            $sch->user_id = $request->users_id;
            $sch->classes_id = $request->classId;
            $sch->update();
            return "exist";
        } else {
            return "not exist";
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $sch = Schedule::find($id);
        if ($sch) {
            $sch->delete();
            return "deleted";
        } else {
            return "no schedule found";
        }
    }
    public function getTeacherSubjects($id)
    {
        $subjects = DB::table('schedules')
            ->join("subjects", "schedules.subjects_id", "=", "subjects.id")
            ->join("users", "users.id", "=", "subjects.user_id")
            ->where('subjects.user_id', "=", $id)
            ->join("classes", "classes.id", "=", "schedules.classes_id")
            ->join("levels", "levels.id", "=", "classes.level_id")
            ->distinct()
            ->get(["schedules.classes_id", "subjects.nameSubject", "schedules.subjects_id", "classes.nameClass", "levels.nameLevel"]);
        return $subjects;
    }
    public function getTeacherSubjectsD($id)
    {
        $subjects = DB::table('schedules')
            ->join("subjects", "schedules.subjects_id", "=", "subjects.id")
            ->join("users", "users.id", "=", "subjects.user_id")
            ->where('subjects.user_id', "=", $id)
            ->distinct()
            ->get(["subjects.nameSubject", "schedules.subjects_id"]);
        return $subjects;
    }
    public function getTeacherModule($id)
    {
        $subjects = DB::table('schedules')
            ->join("subjects", "schedules.subjects_id", "=", "subjects.id")
            ->join("users", "users.id", "=", "subjects.user_id")
            ->where('subjects.user_id', "=", $id)
            ->join("classes", "classes.id", "=", "schedules.classes_id")
            ->join("levels", "levels.id", "=", "classes.level_id")
            ->distinct()
            ->get(["subjects.nameSubject as label", "schedules.subjects_id as id"]);
        return $subjects;
    }
    public function getScheduler($id)
    {
        $subjects = DB::table('schedules')
            ->where('schedules.classes_id', "=", $id)
            ->join("subjects", "schedules.subjects_id", "=", "subjects.id")
            ->join("users", "users.id", "=", "schedules.user_id")
            ->join("classrooms", "classrooms.id", "=", "schedules.classrooms_id")
            ->get(["schedules.*", "subjects.nameSubject", "classrooms.nameClassroom", "classrooms.type", "users.firstname", "users.lastname"]);
        return $subjects;
    }
    public function getSchedulerTeacher($id)
    {
        $subjects = DB::table('schedules')
            ->where('schedules.user_id', "=", $id)
            ->join("subjects", "schedules.subjects_id", "=", "subjects.id")
            ->join("classrooms", "classrooms.id", "=", "schedules.classrooms_id")
            ->join("classes", "classes.id", "=", "schedules.classes_id")
            ->get(["schedules.*", "subjects.nameSubject", "classrooms.nameClassroom", "classes.nameClass", "classrooms.type"]);
        return $subjects;
    }
    public function getSchedulerClass($id)
    {
        $subjects = DB::table('schedules')
            ->where('schedules.classes_id', "=", $id)
            ->join("subjects", "schedules.subjects_id", "=", "subjects.id")
            ->join("classrooms", "classrooms.id", "=", "schedules.classrooms_id")
            ->join("classes", "classes.id", "=", "schedules.classes_id")
            ->get(["schedules.*", "subjects.nameSubject", "classrooms.nameClassroom", "classes.nameClass", "classrooms.type"]);
        return $subjects;
    }
    public function getTeacherClasses($id)
    {
        $subjects = DB::table('schedules')
            ->where('schedules.user_id', "=", $id)
            ->join("books", "books.class_id", "=", "schedules.classes_id")
            ->join("classes", "classes.id", "=", "books.class_id")
            ->join("levels", "levels.id", "=", "classes.level_id")->distinct()
            ->get(["schedules.classes_id",   "classes.nameClass", "levels.nameLevel"]);
        return $subjects;
    }
    // public function getClassesWNP($id)
    // {
    //     $subjects = DB::table('schedules')
    //         ->where('schedules.user_id', "=", $id)
    //         ->join("books", "books.class_id", "=", "schedules.classes_id")
    //         ->join("classes", "classes.id", "=", "books.class_id")
    //         ->join("levels", "levels.id", "=", "classes.level_id")
    //         ->join("textbooks", "textbooks.classes_id", "=", "classes.id")
    //         ->distinct()
    //         ->get(["schedules.classes_id",   "classes.nameClass", "levels.nameLevel"]);
    //     return $subjects;
    // }
}
