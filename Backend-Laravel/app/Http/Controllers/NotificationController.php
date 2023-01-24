<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
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
        $not = new Notification;
        $not->type_notification = $request->type;
        $not->time = $request->time;
        $not->date = $request->date;
        $not->isRead = 0;
        $not->content = $request->content;
        $not->user_id = $request->user_id;
        $not->save();
        return $not->id;
    }
    public function storeAll(Request $request)
    {
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $nots = DB::table("notifications")->where("user_id", '=', $id)->get()->toArray();

        return array_reverse($nots);
    }
    public function MarksRead($id)
    {
        $nots = DB::table("notifications")->where("user_id", '=', $id)->get();
        $length = count($nots);
        for ($i = 0; $i < $length; $i++) {
            $not = Notification::find($nots[$i]->id);
            if ($not && $not->isRead == 0) {
                $not->isRead = 1;
                $not->update();
            }
        }
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function edit(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notification $notification)
    {
        //
    }
}
