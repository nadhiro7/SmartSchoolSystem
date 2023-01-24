<?php

namespace App\Http\Controllers;

use App\Models\book;
use App\Models\lesson;
use App\Models\textbook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TextbookController extends Controller
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
    public function storeLesson(Request $request)
    {
        $lesson = DB::table('lessons')->where("date", "=", $request->date)->where("startTime", "=", $request->startTime)->where("endTime", "=", $request->endTime)->first();
        if (!$lesson) {
            $lesson = new lesson;
            $lesson->date = $request->date;
            $lesson->startTime = $request->startTime;
            $lesson->endTime = $request->endTime;
            $lesson->classes_id = $request->classes_id;
            $lesson->subjects_id = $request->subjects_id;
            $lesson->save();
            if ($lesson->id) {
                $textbook = new textbook;
                $textbook->content = "";
                $textbook->title = "";
                $textbook->classes_id = $request->classes_id;
                $textbook->lessons_id = $lesson->id;
                $textbook->save();
                return $textbook->id;
            } else {
                return "failed";
            }
        }
        return "failed";
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\textbook  $textbook
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $books = DB::table("textbooks")->where("textbooks.classes_id", '=', $id)
            ->join('lessons', "lessons.id", "=", "textbooks.lessons_id")
            ->join("subjects", 'subjects.id', "=", "lessons.subjects_id")
            ->join('users', "users.id", "=", "subjects.user_id")
            ->get(["textbooks.id", "textbooks.content", "textbooks.title", "subjects.nameSubject", "lessons.date", "lessons.startTime", "lessons.endTime", "users.firstname", "users.lastname"]);
        return $books;
    }
    public function showTeacherContent($id, $teacher)
    {
        $books = DB::table("textbooks")->where("textbooks.classes_id", '=', $id)
            ->join('lessons', "lessons.id", "=", "textbooks.lessons_id")
            ->join("subjects", 'subjects.id', "=", "lessons.subjects_id")
            ->join('users', "users.id", "=", "subjects.user_id")
            ->where("subjects.user_id", '=', $teacher)
            ->get(["textbooks.id", "textbooks.content", "lessons.subjects_id", "textbooks.lessons_id", "textbooks.title", "subjects.nameSubject", "lessons.date", "lessons.startTime", "lessons.endTime", "users.firstname", "users.lastname"]);
        return $books;
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\textbook  $textbook
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        if ($request->lessons_id) {
            $textbook = textbook::find($request->id);
            $textbook->content = $request->content;
            $textbook->title = $request->title;
            $textbook->update();
            return "success";
        } else {
            return "failed";
        }
        return "failed";
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\textbook  $textbook
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, textbook $textbook)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\textbook  $textbook
     * @return \Illuminate\Http\Response
     */
    public function showBooks()
    {

        $books = DB::table("books")->join("classes", 'classes.id', "=", "books.class_id")->join('levels', "levels.id", "=", "classes.level_id")->get();
        return $books;
    }
    public function addBook(Request $request)
    {
        $book1 = DB::table('books')->where('class_id', '=', $request->id)->first();

        if ($book1) {
            return "exist";
        }
        $book = new book;
        $book->class_id = $request->id;
        $book->save();
        return $book->id;
    }
    public function destroyBook($id)
    {
        //
        $class_id = $id;
        $book =
            DB::table('books')->where('class_id', '=', $id)->first();
        if ($book) {
            DB::delete('delete from books where class_id = ?', [$id]);
        } else {
            return "no class found";
        }
    }
    public function destroy($id, $lessonId)
    {
        $lesson = lesson::find($lessonId);
        $textbook = textbook::find($id);
        if ($lesson) {
            $lesson->delete();
            if ($textbook) {
                $textbook->delete();
                return "success";
            } else {
                return "failed";
            }
        } else {
            return "failed";
        }
        return "failed";
    }
}
