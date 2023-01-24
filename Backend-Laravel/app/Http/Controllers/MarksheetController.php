<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Marksheet;
use Illuminate\Http\Request;

class MarksheetController extends Controller
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
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $marksheet = new Marksheet;
        $marksheet->noteTotal = $request->noteTotal;
        $marksheet->Ev = $request->Ev;
        $marksheet->students_id = $request->student_id;
        $marksheet->subjects_id = $request->subjects_id;
        $marksheet->grade = $request->grade;
        $marksheet->exam = $request->exam;
        $marksheet->test = $request->test;
        $marksheet->comment = $request->comment;
        $marksheet->season = $request->season;
        $marksheet->save();
        return "Successfully Add";
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Marksheet  $marksheet
     * @return \Illuminate\Http\Response
     */
    public function show(Marksheet $marksheet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Marksheet  $marksheet
     * @return \Illuminate\Http\Response
     */
    public function edit(Marksheet $marksheet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Marksheet  $marksheet
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $marksheet =  Marksheet::find($request->id);
        if ($marksheet) {
            $marksheet->noteTotal = $request->noteTotal;
            $marksheet->Ev = $request->Ev;
            $marksheet->students_id = $request->student_id;
            $marksheet->subjects_id = $request->subjects_id;
            $marksheet->grade = $request->grade;
            $marksheet->exam = $request->exam;
            $marksheet->test = $request->test;
            $marksheet->comment = $request->comment;
            $marksheet->season = $request->season;
            $marksheet->update();
            return 'exist';
        } else {
            return 'doesnt exist';
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Marksheet  $marksheet
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $marksheet =  Marksheet::find($id);
        if ($marksheet) {
            $marksheet->delete();
            return 'success';
        } else {
            return $marksheet;
        }
    }
    public function getMarkSheetStudent(Request $req)
    {
        $notesStudent = DB::table('marksheets')->where("students_id", "=", $req->id)
            ->join("subjects", "marksheets.subjects_id", "=", "subjects.id")->join("users", "subjects.user_id", "=", "users.id")
            ->where("season", "=", $req->season)
            ->get(["marksheets.id", "marksheets.noteTotal", "marksheets.Ev", "marksheets.grade", "marksheets.exam", "marksheets.test", 'marksheets.comment', "marksheets.subjects_id", "subjects.nameSubject", "subjects.coefficient", "users.firstname", "users.lastname"]);
        return $notesStudent;
    }
    public function getMarkSheetStudentAllSeason(Request $req)
    {
        $notesStudent = DB::table('marksheets')->where("students_id", "=", $req->id)->where("subjects_id", "=", $req->sub)->get();
        return $notesStudent;
    }
    public function createStudentMarks(Request $req){
        $season1 = DB::table('marksheets')->where("students_id","=",$req->std)
        ->where("subjects_id", "=", $req->sub)
        ->where("season", "=", 1)->first();
        if(!$season1){
            $marksheet = new Marksheet;
            $marksheet->students_id = $req->std;
            $marksheet->subjects_id = $req->sub;
            $marksheet->season = 1;
            $marksheet->save();
        }
        $season2 = DB::table('marksheets')->where("students_id", "=", $req->std)
        ->where("subjects_id", "=", $req->sub)
        ->where("season", "=", 2)->first();
        if (!$season2) {
            $marksheet = new Marksheet;
            $marksheet->students_id = $req->std;
            $marksheet->subjects_id = $req->sub;
            $marksheet->season = 2;
            $marksheet->save();
        }
        $season3 = DB::table('marksheets')->where("students_id", "=", $req->std)
        ->where("subjects_id", "=", $req->sub)
        ->where("season", "=", 3)->first();
        if (!$season3) {
            $marksheet = new Marksheet;
            $marksheet->students_id = $req->std;
            $marksheet->subjects_id = $req->sub;
            $marksheet->season = 3;
            $marksheet->save();
        }
        return "success";
    }
}
