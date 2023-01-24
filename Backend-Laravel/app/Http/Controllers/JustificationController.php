<?php

namespace App\Http\Controllers;

use App\Models\justification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class JustificationController extends Controller
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
     * @param  \App\Models\justification  $justification
     * @return \Illuminate\Http\Response
     */
    public function show($id,$state)
    {
        $lesson = DB::table("justifications")->where('lesson_id', "=", $id)
            ->where('state', "=", $state)
            ->join("students", "students.id", "=", "justifications.student_id")
            ->join("users", "users.id", "=", "students.user_id")
            ->get(["justifications.*","students.firstname as sfn", "students.lastname as sln", "users.firstname as pfn", "users.lastname as pln"]);
        return $lesson;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\justification  $justification
     * @return \Illuminate\Http\Response
     */
    public function edit(justification $justification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\justification  $justification
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, justification $justification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\justification  $justification
     * @return \Illuminate\Http\Response
     */
    public function destroy(justification $justification)
    {
        //
    }
}
