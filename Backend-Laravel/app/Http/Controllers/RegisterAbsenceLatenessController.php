<?php

namespace App\Http\Controllers;

use App\Models\lesson;
use App\Models\Notification;
use App\Models\RegisterAbsenceLateness;
use Carbon\Carbon;
use GrahamCampbell\ResultType\Success;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegisterAbsenceLatenessController extends Controller
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
     * @param  \App\Models\RegisterAbsenceLateness  $registerAbsenceLateness
     * @return \Illuminate\Http\Response
     */
    public function show($id, $type)
    {
        $lessonR = DB::table("register_absence_latenesses")->where('lessons_id', "=", $id)
            ->where('state', "=", $type)
            ->join("lessons", "lessons.id", "=", "register_absence_latenesses.lessons_id")
            ->join("subjects", "subjects.id", "=", "lessons.subjects_id")
            ->join("students", "students.id", "=", "register_absence_latenesses.student_id")
            ->get(["register_absence_latenesses.*", "subjects.nameSubject", "students.id", "lessons.startTime", "lessons.date", "lessons.endTime", "students.firstname", "students.image", "students.user_id", "students.lastname"]);
        return $lessonR;
    }
    public function fillLessonRegister($classId, $lessonID)
    {
        $students = DB::table('students')->where("classes_id", '=', $classId)->get(["students.id"]);
        $length = count($students);
        for ($i = 0; $i < $length; $i++) {
            $reg = DB::table('register_absence_latenesses')->where("student_id", "=", $students[$i]->id)
                ->where("lessons_id", "=", $lessonID)->first();
            if (!$reg) {
                $newReg = new RegisterAbsenceLateness;
                $newReg->state = "present";
                $newReg->student_id =  $students[$i]->id;
                $newReg->lessons_id = $lessonID;
                $newReg->save();
            }
        }
        return "Success";
    }
    public function showLessonRegister($id)
    {
        $lessonR = DB::table("register_absence_latenesses")->where('lessons_id', "=", $id)
            ->join("students", "students.id", "=", "register_absence_latenesses.student_id")
            ->get(["register_absence_latenesses.*", "students.firstname", "students.id", "students.image", "students.user_id", "students.lastname"]);
        return $lessonR;
    }
    public function showJust($id, $type)
    {
        $lessonR = DB::table("register_absence_latenesses")->where('lessons_id', "=", $id)
            ->where('state', "=", $type)
            ->where('haveJust', "=", 1)
            ->where('isJustify', "=", 0)
            ->join("students", "students.id", "=", "register_absence_latenesses.student_id")
            ->join("users", "users.id", "=", "students.user_id")
            ->get(["register_absence_latenesses.*", "users.firstname as fn", "users.lastname as ln", "students.id", "students.firstname", "students.user_id", "students.lastname"]);
        return $lessonR;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\RegisterAbsenceLateness  $registerAbsenceLateness
     * @return \Illuminate\Http\Response
     */
    public function editLessonRegister(Request $req)
    {
        $length = count($req->data);
        for ($i = 0; $i < $length; $i++) {
            $reg = DB::table('register_absence_latenesses')
                ->where('lessons_id', '=', $req->lessonId)
                ->where('student_id', '=', $req->data[$i]["id"])
                ->first();
            if ($reg) {
                DB::update('update register_absence_latenesses set state = ? where student_id = ? and lessons_id = ?', [$req->data[$i]["state"], $req->data[$i]["id"], $req->lessonId]);
            }
        }
        return "success";
    }

    public function showStudentRegister($id)
    {
        $lessonR = DB::table("register_absence_latenesses")->where('student_id', "=", $id)
            ->where('state', "!=", "present")
            ->join("lessons", "lessons.id", "=", "register_absence_latenesses.lessons_id")
            ->join("subjects", "subjects.id", "=", "lessons.subjects_id")
            ->get(["register_absence_latenesses.*", "subjects.nameSubject", "lessons.id", "lessons.startTime", "lessons.date", "lessons.endTime"]);
        return $lessonR;
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\RegisterAbsenceLateness  $registerAbsenceLateness
     * @return \Illuminate\Http\Response
     */
    public function refuse(Request $req)
    {
        $reg = DB::table('register_absence_latenesses')
            ->where('lessons_id', '=', $req->lessonId)
            ->where('student_id', '=', $req->id)
            ->first();
        $pdf = null;
        if ($reg) {
            DB::update(
                'update register_absence_latenesses set
                justContent = ?
                where student_id = ?
                and lessons_id = ?',
                [null, $req->id, $req->lessonId]
            );
            DB::update(
                'update register_absence_latenesses set
                file = ?
                where student_id = ?
                and lessons_id = ?',
                [$pdf, $req->id, $req->lessonId]
            );
            DB::update(
                'update register_absence_latenesses set
                haveJust = ?
                where student_id = ?
                and lessons_id = ?',
                [0, $req->id, $req->lessonId]
            );
            $not = new Notification;
            $not->type_notification = $req->type;
            $not->time = $req->time;
            $not->date = $req->date;
            $not->isRead = 0;
            $not->content = $req->content;
            $not->user_id = $req->user_id;
            $not->save();
        }
        return "success";
    }
    public function accept(Request $req)
    {
        $reg = DB::table('register_absence_latenesses')
            ->where('lessons_id', '=', $req->lessonId)
            ->where('student_id', '=', $req->id)
            ->first();
        if ($reg) {
            DB::update(
                'update register_absence_latenesses set
                isJustify = ?
                where student_id = ?
                and lessons_id = ?',
                [1, $req->id, $req->lessonId]
            );
            $not = new Notification;
            $not->type_notification = $req->type;
            $not->time = $req->time;
            $not->date = $req->date;
            $not->isRead = 0;
            $not->content = $req->content;
            $not->user_id = $req->user_id;
            $not->save();
        }
        return "success";
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\RegisterAbsenceLateness  $registerAbsenceLateness
     * @return \Illuminate\Http\Response
     */
    public function destroy(RegisterAbsenceLateness $registerAbsenceLateness)
    {
        //
    }
    public function AddJust(Request $req)
    {
        $reg = DB::table('register_absence_latenesses')
            ->where('lessons_id', '=', $req->lessonId)
            ->where('student_id', '=', $req->id)
            ->first();
        $pdf = null;
        if ($req->hasFile("file")) {
            $file = $req->file("file");
            $filename = time() . '.' . $file->getClientOriginalName();
            $req->file('file')->move("public", $filename);
            $pdf = $filename;
        }
        if ($reg) {
            DB::update(
                'update register_absence_latenesses set
                justContent = ?
                where student_id = ?
                and lessons_id = ?',
                [$req->content, $req->id, $req->lessonId]
            );
            DB::update(
                'update register_absence_latenesses set
                file = ?
                where student_id = ?
                and lessons_id = ?',
                [$pdf, $req->id, $req->lessonId]
            );
            DB::update(
                'update register_absence_latenesses set
                haveJust = ?
                where student_id = ?
                and lessons_id = ?',
                [1, $req->id, $req->lessonId]
            );
            // $sec = DB::table('users')->where("type" , "=","secretary")->get();
            // $l = count($sec);
            // for ($i=0; $i < $l; $i++) {
            //     $not = new Notification;
            //     $not->type_notification = "justification";
            //     $not->time = time();
            //     $not->date = time();
            //     $not->isRead = 0;
            //     $not->content = $request->content;
            //     $not->user_id = $request->user_id;
            //     $not->save();
            // }
        }
        return "success";
    }
    public function showNumberOfAbsence()
    {
        $r1 = DB::table("register_absence_latenesses")->where('isJustify', "=", 0)
            ->where('state', "=", "absent")

            ->count();
        $r2
            = DB::table("register_absence_latenesses")->where('isJustify', "=", 1)
            ->where('state', "=", "absent")

            ->count();
        return [["name" => "Absences not justify", "number" => $r1], ["name" => "Absences justify", "number" => $r2]];
    }
    public function showNumberOfLate()
    {
        $r1 = DB::table("register_absence_latenesses")->where('isJustify', "=", 0)
            ->where('state', "=", "late")

            ->count();
        $r2
            = DB::table("register_absence_latenesses")->where('isJustify', "=", 1)
            ->where('state', "=", "late")

            ->count();
        return [["name" => "Lateness not justify", "number" => $r1], ["name" => "Lateness justify", "number" => $r2]];
    }
    public function showNumberOfAbsenceParent($id)
    {

        $name = DB::table("students")->join("register_absence_latenesses", "register_absence_latenesses.student_id", "=", "students.id")->where("state", "=", "absent")->where("isJustify", "=", 0)->where("user_id", '=', $id)->get(['id', "students.firstname", "students.lastname"]);

        $len = count($name);
        $arr = array();
        for ($i = 0; $i < $len; $i++) {
            # code...
            $c = $name[$i]->id;
            $fn = $name[$i]->firstname;
            $ln = $name[$i]->lastname;
            $v = RegisterAbsenceLatenessController::class::countAbsent($c);
            $arr = array(
                ...$arr, ["name" => $fn . " " . $ln, "id" => $name[$i]->id, "numberofabsent" => $v]
            );
        }
        return $arr;
    }
    public function showNumberOfLateParent($id)
    {

        $name = DB::table("students")->join("register_absence_latenesses", "register_absence_latenesses.student_id", "=", "students.id")->where("state", "=", "late")->where("isJustify", "=", 0)->where("user_id", '=', $id)->get(['id', "students.firstname", "students.lastname"]);

        $len = count($name);
        $arr = array();
        for ($i = 0; $i < $len; $i++) {
            # code...
            $c = $name[$i]->id;
            $fn = $name[$i]->firstname;
            $ln = $name[$i]->lastname;
            $v = RegisterAbsenceLatenessController::class::countAbsent($c);
            $arr = array(
                ...$arr, ["name" => $fn . " " . $ln, "id" => $name[$i]->id, "numberofabsent" => $v]
            );
        }
        return $arr;
    }
    public function countAbsent($c)
    {
        $s
            = DB::table("register_absence_latenesses")->where("register_absence_latenesses.student_id", "=", $c)->count();
        return $s;
    }
    public function showNumberOfAbsentIn7Days()
    {
        $date = Carbon::now()->subDays(7);
        $nadhir = DB::table("register_absence_latenesses")->where("state", "absent")->where("haveJust", 1)->where("created_at", ">=", $date)->count();
        $salah = DB::table("register_absence_latenesses")->where("state", "late")->where("haveJust", 1)->where("created_at", ">=", $date)->count();
        return [["name" => "Absences", "number" => $nadhir], ["name" => "Lateness", "number" => $salah]];
    }
}
