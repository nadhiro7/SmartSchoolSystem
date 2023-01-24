<?php

namespace App\Http\Controllers;

use App\Models\level;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LevelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getLevels()
    {
        $levels = DB::table('levels')->get();
        return $levels;
    }
    public function getLevel($id)
    {
        $level = level::find($id);
        if ($level) {
            return $level;
        } else {
            return "fail";
        }
    }
}
