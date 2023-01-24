<?php

namespace App\Http\Controllers;

use App\Models\classes;
use App\Models\Notification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClassesController extends Controller
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
        //level_id
        $classes = new classes;
        $classes->nameClass = $request->nameClass;
        $classes->level_id = $request->level_id;
        $classes1 = DB::table('classes')->where("nameClass", $request->nameClass)
            ->where("level_id", $request->level_id)
            ->first();
        if ($classes1) {
            return "Your name is invalid";
        }
        $classes->save();
        return $classes;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\classes  $classes
     * @return \Illuminate\Http\Response
     */
    public function show(classes $classes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\classes  $classes
     * @return \Illuminate\Http\Response
     */
    public function edit(classes $classes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\classes  $classes
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $class = classes::find($request->id);
        if ($class) {
            $class->nameClass = $request->nameClass;
            $class->level_id = $request->level_id;
            $classes1 = DB::table('classes')->where("nameClass", $request->nameClass)
                ->where("level_id", $request->level_id)
                ->first();
            if ($classes1) {
                return "doesnt exist";
            }
            $class->update();
            return 'exist';
        } else {
            return 'doesnt exist';
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\classes  $classes
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $class = classes::find($id);
        if ($class) {
            $class->delete();
            $users = DB::table('users')->where("type", "=", 'secretary')->get();
            $c = count($users);
            for ($i = 0; $i < $c; $i++) {
                $not = new Notification();
                $not->type_notification = 'Class Deleted';
                $time = Carbon::now()->toTimeString();
                $date = Carbon::now()->toDateString();
                $not->time = $time;
                $not->date = $date;
                $not->isRead = 0;
                $not->content = "admin is deleted a class";
                $not->user_id = $users[$i]->id;
                $not->save();
            }
            return "success";
        } else {
            return "failed";
        }
    }
    public function getAllClasses()
    {
        $classes = DB::table('classes')->join("levels", "levels.id", "=", "classes.level_id")
            ->get(["classes.id", "nameClass", "level_id", "nameLevel"]);
        return $classes;
    }
}
