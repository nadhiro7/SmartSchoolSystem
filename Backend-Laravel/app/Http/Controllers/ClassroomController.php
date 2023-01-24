<?php

namespace App\Http\Controllers;

use App\Models\classroom;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ClassroomController extends Controller
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
        $classroom = new classroom();
        $classroom->nameClassroom = $request->nameClassroom;
        $classroom->type = $request->type;
        $classroom1 = DB::table('classrooms')->where("nameClassroom", $request->nameClassroom)->first();
        if ($classroom1) {
            return "Your name is invalid";
        }
        $classroom->save();
        return $classroom;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function show(classroom $classroom)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function edit(classroom $classroom)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
        $classroom = classroom::find($request->id);
        if ($classroom) {
            $classroom->nameClassroom = $request->nameClassroom;
            $classroom->type = $request->type;
            $classroom->update();
            return 'exist';
        } else {
            return 'doesnt exist';
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\classroom  $classroom
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $classroom = classroom::find($id);
        if ($classroom) {
            $classroom->delete();
            return "success";
        } else {
            return "failed";
        }
    }
    public function getAllClassrooms()
    {
        $classroom = DB::table('classrooms')->get();
        return $classroom;
    }
}
