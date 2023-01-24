<?php

namespace App\Http\Controllers;

use App\Models\subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubjectController extends Controller
{
    public function store(Request $req)
    {
        $subject1 = DB::table('subjects')->where("user_id", $req->user_id)
            ->where("level_id", $req->level_id)
            ->where("nameSubject", $req->name)
            ->first();
        if ($subject1) {
            return "Your info is invalid";
        }
        $subject = new subject;
        $subject->nameSubject = $req->name;
        $subject->coefficient = $req->coefficient;
        $subject->user_id = $req->user_id;
        $subject->level_id = $req->level_id;
        $subject->save();
        return "success";
    }

    public function update(Request $req)
    {
        $subject = subject::find($req->id);
        if ($subject) {
            $subject1 = DB::table('subjects')->where("user_id", $req->user_id)
                ->where("level_id", $req->level_id)
                ->where("nameSubject", $req->name)
                ->first();
            if ($subject1) {
                if ($subject1->id != $req->id) {
                    return "doesnt exist";
                }
            }
            $subject->nameSubject = $req->name;
            $subject->coefficient = $req->coefficient;
            $subject->user_id = $req->user_id;
            $subject->level_id = $req->level_id;
            $subject->update();
            return 'exist';
        } else {
            return 'doesnt exist';
        }
    }
    public function getAllSubjects()
    {
        $subjects = DB::table('subjects')->get();
        return $subjects;
    }
    public function getAllLevelSubjects($id)
    {
        $subjects = DB::table('subjects')
            ->where("level_id", "=", $id)
            ->join('users', "users.id", "=", "subjects.user_id")
            ->get(["subjects.nameSubject", "subjects.id", "subjects.user_id", 'users.firstname', 'users.lastname']);
        return $subjects;
    }
    public function destroy($id)
    {
        //
        $subject = subject::find($id);
        if ($subject) {
            $subject->delete();
            return "success";
        } else {
            return "failed";
        }
    }
    public function getLevelSubjects()
    {
        $subject = DB::table('levels')
            ->get();
        $len = count($subject);
        $arr = array();
        for ($i = 0; $i < $len; $i++) {
            $c = SubjectController::class::countSub($subject[$i]->id);
            $c1 = SubjectController::class::countClass($subject[$i]->id);
            $arr = array(...$arr, ["id" => $subject[$i]->id, "nameLevel" => $subject[$i]->nameLevel, "subjects" => $c, "classes" => $c1]);
        }
        return $arr;
    }
    public function countSub($id)
    {
        $s = DB::table('subjects')->where("level_id", '=', $id)->get();
        return count($s);
    }
    public function countClass($id)
    {
        $s = DB::table('classes')->where("level_id", '=', $id)->get();
        return count($s);
    }
}
