<?php

namespace App\Http\Controllers;

use App\Models\announce;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Psy\Readline\Hoa\Console;

class AnnounceController extends Controller
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
        $photo = null;
        if ($request->hasFile("image")) {
            $file = $request->file("image");
            $filename = time() . '.' . $file->getClientOriginalName();
            $request->file('image')->move("public", $filename);
            $photo = $filename;
        }

        $announce = new announce;
        $announce->title = $request->title;
        $announce->content = $request->content;
        if ($request->link) {
            $announce->link = $request->link;
        } else {
            $announce->link = "";
        }
        $announce->image = $photo;
        $announce->save();
        return "success";
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\announce  $announce
     * @return \Illuminate\Http\Response
     */
    public function show(announce $announce)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\announce  $announce
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\announce  $announce
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        //
        $announce = announce::find($request->id);
        if ($announce) {
            $announce->title = $request->title;
            $announce->content = $request->content;

            if ($request->link) {
                $announce->link = $request->link;
            } else {
                $announce->link = "";
            }
            $photo = null;
            if ($request->hasFile("image")) {
                $file = $request->file("image");
                $filename = time() . '.' . $file->getClientOriginalName();
                $request->file('image')->move("public", $filename);
                $photo = $filename;
            }
            if ($photo) {
                $announce->image = $photo;
            }
            $announce->update();
            return 'exist';
        } else {
            return 'doesnt exist';
        }

        /**
         * Remove the specified resource from storage.
         *
         * @param  \App\Models\announce  $announce
         * @return \Illuminate\Http\Response
         */
    }
    public function destroy($id)
    {
        $announce = announce::find($id);
        if ($announce) {
            $announce->delete();
            return "success";
        } else {
            return "failed";
        }
    }
    public function getAllAnnounces()
    {
        $announce = DB::table('announces')->get();
        return $announce;
    }
}
