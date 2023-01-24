<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\Student;
use Illuminate\Http\Request;
use App\Models\SchoolRecords;

class StudentController extends Controller
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
        $student = new Student;
        $student->firstname = $request->firstname;
        $student->lastname = $request->lastname;
        $student->address = $request->address;
        $student->gender = $request->gender;
        $student->email = $request->email;
        $student->isValidate = $request->isValidate;
        $student->user_id = $request->id_parent;
        $student->level_id = $request->id_level;
        $student->classes_id = $request->id_class;
        $student->birthday   = $request->birthday;
        $photo = null;
        if ($request->hasFile("image")) {
            $file = $request->file("image");
            $filename = time() . '.' . $file->getClientOriginalName();
            $request->file('image')->move("public", $filename);
            $photo = $filename;
        }
        if ($photo) {
            $student->image = $photo;
        }

        $student->save();
        for ($i = 0; $i < 3; $i++) {
            if ($student->id) {
                $sc = new SchoolRecords;
                $sc->student_id = $student->id;
                $sc->season = $i + 1;
                $sc->session = 2022;
                $sc->save();
            }
        }
        return "Successfully Add";
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function edit(Student $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $student = Student::find($request->id);
        if ($student) {
            $student->firstname = $request->firstname;
            $student->lastname = $request->lastname;
            $student->address = $request->address;
            $student->gender = $request->gender;
            $student->email = $request->email;
            $student->isValidate = $request->isValidate;
            $student->user_id = $request->id_parent;
            $student->level_id = $request->id_level;
            $student->classes_id = $request->id_class;
            $student->birthday   = $request->birthday;
            $photo = null;
            if ($request->hasFile("image")) {
                $file = $request->file("image");
                $filename = time() . '.' . $file->getClientOriginalName();
                $request->file('image')->move("public", $filename);
                $photo = $filename;
            }
            if ($photo) {
                $student->image = $photo;
            }
            $student->update();
            return 'Successfuly edit';
        } else {
            return 'doesnt exist';
        }
    }
    public function validateStudent(Request $req)
    {
        //
        $student = Student::find($req->id);
        if ($student) {
            $student->isValidate = 1;
            $student->update();
            return 'success';
        } else {
            return 'failed';
        }
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $student = Student::find($id);
        if ($student) {
            $student->delete();
            return 'success';
        } else {
            return "failed";
        }
    }
    public function getAllStudents()
    {
        $students = DB::table('students')->where('students.isValidate', 1)
            ->join("users", 'users.id', '=', "students.user_id")->get(["students.*", "users.firstname as parentFirstname", "users.lastname as parentLastname"]);
        return $students;
    }
    public function getAllStudentsIsNotValidate()
    {
        $students = DB::table('students')->where('students.isValidate', 0)
            ->join("users", 'users.id', '=', "students.user_id")->get(["students.*", "users.firstname as parentFirstname", "users.lastname as parentLastname"]);
        return $students;
    }
    public function getAllStudentFiles()
    {
        $students = DB::table('students')->where('isValidate', "=", 1)->join("levels", "students.level_id", "=", "levels.id")->get(["students.id", "students.firstname", "students.lastname", "levels.nameLevel"]);
        return $students;
    }
    public function getClassStudent($id)
    {
        $students = DB::table('students')->where('isValidate', "=", 1)->where("classes_id", '=', $id)->get(["students.id", "students.firstname", "students.lastname"]);
        return $students;
    }
    public function getChildrens($id)
    {
        $students = DB::table('students')->where('isValidate', "=", 1)->where('user_id', '=', $id)->join("levels", "students.level_id", "=", "levels.id")->get(["students.*", "levels.nameLevel"]);
        return $students;
    }
    public function getStudent($id)
    {
        $student =
            DB::table('students')->where('students.id', "=", $id)
            ->join("users", 'users.id', '=', "students.user_id")->get(["students.*", "users.firstname as parentFirstname", "users.lastname as parentLastname"])->first();
        if ($student) {
            return $student;
        } else {
            return "fail";
        }
    }
    public function getClassList($id)
    {
        $students = DB::table('students')->where('students.isValidate', "=", 1)->where("classes_id", '=', $id)->join("levels", "students.level_id", "=", "levels.id")->join("users", 'users.id', '=', "students.user_id")->get(["students.*", "levels.nameLevel", "users.firstname as parentFirstname", "users.lastname as parentLastname"]);
        return $students;
    }
    public function get10Students()
    {
        $students = DB::table('students')->where('students.isValidate', 1)
            ->join("users", 'users.id', '=', "students.user_id")
            ->join("classes", 'classes.id', '=', "students.classes_id")
            ->join("levels", 'levels.id', '=', "students.level_id")
            ->take(10)->get(["students.*", 'classes.nameClass', 'levels.nameLevel', "users.firstname as parentFirstname", "users.lastname as parentLastname"]);
        return $students;
    }
    public function getStudentValidNumber($id)
    {
        $students = DB::table('students')->where('students.isValidate', "=", 1)->where("user_id", '=', $id)->get()->count();
        return $students;
    }
    public function getStudentInvalidNumber($id)
    {
        $students = DB::table('students')->where('students.isValidate', "=", 0)->where("user_id", '=', $id)->get()->count();
        return $students;
    }
    public function getStudentSubjects($id)
    {
        $subject = DB::table('levels')
            ->join("classes", "classes.level_id", "=", "levels.id")
            ->join("students", "classes.id", "=", "students.classes_id")
            ->where('students.isValidate', "=", 1)
            ->where('students.user_id', "=", $id)
            ->get();
        $len = count($subject);
        $arr = array();
        for ($i = 0; $i < $len; $i++) {
            $c = StudentController::class::countSub($subject[$i]->level_id);

            $arr = array(...$arr, ["level_id" => $subject[$i]->level_id, "name" => $subject[$i]->firstname . " " . $subject[$i]->lastname, "id" => $subject[$i]->id, "nameLevel" => $subject[$i]->nameLevel, "subjects" => $c, "classes" => $subject[$i]->nameClass]);
        }
        return $arr;
    }
    public function countSub($id)
    {
        $s = DB::table('subjects')->where("level_id", '=', $id)->get();
        return count($s);
    }
}
