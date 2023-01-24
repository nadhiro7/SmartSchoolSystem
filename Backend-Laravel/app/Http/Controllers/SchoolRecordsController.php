<?php

namespace App\Http\Controllers;

use App\Models\SchoolRecords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SchoolRecordsController extends Controller
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
        $student = new SchoolRecords;
        $student->session = $request->session;
        $student->season = $request->season;

        $student->isAdmitted = $request->isAdmitted;

        $student->save();
        return "Successfully Add";
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SchoolRecords  $schoolRecords
     * @return \Illuminate\Http\Response
     */
    public function show(SchoolRecords $schoolRecords)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SchoolRecords  $schoolRecords
     * @return \Illuminate\Http\Response
     */
    public function edit(SchoolRecords $schoolRecords)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SchoolRecords  $schoolRecords
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $student = new SchoolRecords;
        if ($student) {
            $student->session = $request->session;
            $student->season = $request->season;

            $student->isAdmitted = $request->isAdmitted;
            $student->update();
            return 'exist';
        } else {
            return 'doesnt exist';
        }
    }
    public function updateSeasonNote(Request $request)
    {
        $student = DB::table('school_records')->where("student_id", "=", $request->id)->where("season", "=", $request->season)->get();
        if ($student[0]) {
            $sc = SchoolRecords::find($student[0]->id);
            if ($sc) {
                $sc->season_note = $request->season_note;
                $sc->update();
                return 'exist';
            } else {
                return 'doesnt exist';
            }
        } else {
            return 'doesnt exist';
        }
    }
    public function getSchoolRecordsNote()
    {
        $sc = DB::table('school_records')->get(["id", "session", 'season', 'season_note', "student_id"]);
        return $sc;
    }
    public function getStudentReacords($id)
    {
        $sc = DB::table('school_records')->where("student_id", "=", $id)->get(["id", "session", 'season', 'season_note', 'student_id']);
        return $sc;
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SchoolRecords  $schoolRecords
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $student = SchoolRecords::find($id);
        if ($student) {
            $student->delete();
            return 'success';
        } else {
            return $student;
        }
    }
}
