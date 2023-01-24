<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class userSingUp extends Controller
{
    public function register(Request $request)
    {
        $user = new User;
        $user1 = DB::table('users')->where("username", $request->username)->first();
        if ($user1) {
            return "Your informations is invalid";
        }
        $user2 = DB::table('users')->where("email", $request->email)->first();
        if ($user2) {
            return "Your informations is invalid";
        }
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->username = $request->username;
        $user->phone = $request->phone;
        $user->image = $request->image;
        $user->gender = $request->gender;
        $user->email = $request->email;
        $user->type = $request->type;
        $user->password = Hash::make($request->password);
        $user->birthday = $request->birthday;
        $user->address = $request->address;
        $user->isValidate = $request->isValidate;
        $user->save();
        if ($user->id) {
            if ($user->isValidate == 0) {
                $users = DB::table('users')->where("type", "=", 'admin')->get();
                $c = count($users);
                for ($i = 0; $i < $c; $i++) {
                    $not = new Notification;
                    $not->type_notification = 'New parent';
                    $not->time = $request->time;
                    $not->date = $request->date;
                    $not->isRead = 0;
                    $not->content = "New parent is registred check parent page and validate it";
                    $not->user_id = $users[$i]->id;
                    $not->save();
                }
            }
        }
        return "Successfully Add";
    }
    public function ForgotPassword(Request $request)
    {
        $users = DB::table('users')->where("type", "=", 'admin')->get();
        $c = count($users);
        for ($i = 0; $i < $c; $i++) {
            $not = new Notification;
            $not->type_notification = 'Change Password';
            $not->time = $request->time;
            $not->date = $request->date;
            $not->isRead = 0;
            $not->content = "a request from parent for changing password | parent email: " . $request->email . " && prent new Password: " . $request->password;
            $not->user_id = $users[$i]->id;
            $not->save();
        }
        return 'success';
    }
    public function login(Request $request)
    {
        $user = User::where("email", $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return  'fail';
        }
        return $user;
    }
    public function ChangePassword(Request $request)
    {
        $user = User::where("email", $request->email)->first();
        if (!$user || !Hash::check($request->password, $user->password)) {
            return  'fail';
        } else {
            $user1 = User::find($request->id);
            $user1->password = Hash::make($request->np);
            $user1->update();
            return "success";
        }
    }
    public function getAllParent()
    {
        $users = DB::table('users')->where("type", "parent")->where("isValidate", "1")->get();
        return $users;
    }
    public function getAllParentNotValid()
    {
        $users = DB::table('users')->where("type", "parent")->where("isValidate", "0")->get();
        return $users;
    }
    public function getAllSecretary()
    {
        $users = DB::table('users')->where("type", "secretary")->get();
        return $users;
    }
    public function getAllTeachers()
    {
        $users = DB::table('users')->where("type", "teacher")->get();
        return $users;
    }
    public function getUser($id)
    {
        $user = User::find($id);
        if ($user) {
            return $user;
        } else {
            return "fail";
        }
    }
    public function editUser(Request $request)
    {
        $user1 = DB::table('users')->where("username", $request->username)->first();
        if ($user1 && $user1->id != $request->id) {
            return "Your informations is invalid";
        }
        $user2 = DB::table('users')->where("email", $request->email)->first();
        if ($user2 && $user2->id != $request->id) {
            return "Your informations is invalid";
        }
        User::where('id', $request->id)->update(array("firstname" => $request->firstname, "lastname" => $request->lastname, "username" => $request->username, "email" => $request->email, "phone" => $request->phone, "gender" => $request->gender, "birthday" => $request->birthday, "address" => $request->address));
        if (!$request->password == "") {
            return User::where('id', $request->id)->update(array("password" => Hash::make($request->password)));
        }
        return "Successfuly edit";
    }
    public function editProfil(Request $request)
    {
        $user = DB::table('users')->where("username", $request->username)->first();
        if ($user && $user->id != $request->id) {
            return "Your informations is invalid";
        }
        $user1 = User::find($request->id);
        $user1->firstname = $request->firstname;
        $user1->lastname = $request->lastname;
        $user1->address = $request->address;
        $user1->gender = $request->gender;
        $user1->username = $request->username;
        $user1->phone = $request->phone;
        $user1->birthday   = $request->birthday;
        $photo = null;
        if ($request->hasFile("image")) {
            $file = $request->file("image");
            $filename = time() . '.' . $file->getClientOriginalName();
            $request->file('image')->move("public", $filename);
            $photo = $filename;
        }
        if ($photo) {
            $user1->image = $photo;
        }
        $user1->update();
        return 'Successfuly edit';
    }
    public function deleteUser($id)
    {
        $user = User::find($id);
        if ($user) {
            $user->delete();
            return 'success';
        } else {
            return "failed";
        }
    }
    public function accept($id)
    {

        User::where('id', $id)->update(array("isValidate" => 1));
        return "success";
    }
    public function getNumberofUsers()
    {
        $teacher = DB::table('users')->where("type", "teacher")->count();
        $student =  DB::table('Students')->count();
        $parent = DB::table('users')->where("type", "Parent")->count();
        $secretary = DB::table('users')->where("type", "Secretary")->count();
        return array(["teacher" => $teacher, "student" => $student, "parent" => $parent, "secretary" => $secretary]);
    }
    public function getDatabyGender()
    {
        $mens = DB::table("users")->where("gender", "Male")->count();
        $womans = DB::table("users")->where("gender", "Female")->count();
        return [$mens, $womans];
    }
    public function getSubject()
    {
        $subject = DB::table('subjects')->get();
        $len = count($subject);
        $arr = array();
        for ($i = 0; $i < $len; $i++) {
            $c = userSingUp::class::countUser($subject[$i]->nameSubject);
            $arr = array(...$arr, ["id" => $subject[$i]->id, "nameSubject" => $subject[$i]->nameSubject, "teachers" => $c]);
        }
        return $arr;
    }
    public function countUser($sub)
    {
        $s = DB::table('subjects')->where("nameSubject", '=', $sub)->get();
        return count($s);
    }
    public function get5Records()
    {
        $users = DB::table('users')->where("type", "teacher")->take(5)->get();
        return $users;
    }
    public function get7Records()
    {
        $users = DB::table('users')->where("type", "parent")->take(7)->get();
        return $users;
    }
    public function getStudentNotValidate()
    {
        $student = DB::table('Students')->where("isValidate", 0)->count();
        return $student;
    }
    public function getStudentValidate()
    {
        $student = DB::table('Students')->where("isValidate", 1)->count();
        return $student;
    }
    public function getValidateParent()
    {
        $parent = DB::table('users')->where("type", "parent")->where("isValidate", 1)->count();
        return $parent;
    }
}
