<?php

use App\Http\Controllers\AnnounceController;
use App\Http\Controllers\userSingUp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClassroomController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\JustificationController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\SchoolRecordsController;
use App\Http\Controllers\MarksheetController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RegisterAbsenceLatenessController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\TextbookController;
use Illuminate\Console\Scheduling\Schedule;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|

*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('register', [userSingUp::class, 'register']);
Route::post('ForgotPassword', [userSingUp::class, 'ForgotPassword']);
Route::post('login', [userSingUp::class, 'login']);
Route::get('getAllParentNotValid', [userSingUp::class, 'getAllParentNotValid']);
Route::get('getSubject', [userSingUp::class, 'getSubject']);
Route::get('getNumberofUsers', [userSingUp::class, 'getNumberofUsers']);
Route::get('get5Records', [userSingUp::class, 'get5Records']);
Route::get('get7Records', [userSingUp::class, 'get7Records']);
Route::get('getStudentNotValidate', [userSingUp::class, 'getStudentNotValidate']);
Route::get('getStudentValidate', [userSingUp::class, 'getStudentValidate']);
Route::get('getValidateParent', [userSingUp::class, 'getValidateParent']);
Route::get('getLevelSubjects', [SubjectController::class, 'getLevelSubjects']);
Route::get('getDatabyGender', [userSingUp::class, 'getDatabyGender']);
Route::get('getAllParent', [userSingUp::class, 'getAllParent']);
Route::put('acceptParent/{id}', [userSingUp::class, 'accept']);
Route::get('getAllSecretary', [userSingUp::class, 'getAllSecretary']);
Route::get('getAllTeachers', [userSingUp::class, 'getAllTeachers']);
Route::delete('deleteUser/{id}', [userSingUp::class, 'deleteUser']);
Route::get('getUser/{id}', [userSingUp::class, 'getUser']);
Route::post("ChangePassword", [userSingUp::class, 'ChangePassword']);
Route::post("editProfil", [userSingUp::class, 'editProfil']);
Route::post("editUser", [userSingUp::class, 'editUser']);
Route::get('getAllAnnounces', [AnnounceController::class, 'getAllAnnounces']);
Route::post("storeAnnounce", [AnnounceController::class, 'store']);
Route::post("updateAnnounce", [AnnounceController::class, 'update']);
Route::delete("deleteAnnounce/{id}", [AnnounceController::class, 'destroy']);
Route::post("storeClass", [ClassesController::class, 'store']);
Route::post("updateClass", [ClassesController::class, 'update']);
Route::delete("deleteClasses/{id}", [ClassesController::class, 'destroy']);
Route::post("storeClassroom", [ClassroomController::class, 'store']);
Route::post("updateClassroom", [ClassroomController::class, 'update']);
Route::delete("deleteClassroom/{id}", [ClassroomController::class, 'destroy']);
Route::post("storeSubject", [SubjectController::class, 'store']);
Route::post("updateSubject", [SubjectController::class, 'update']);
Route::delete("deleteSubject/{id}", [SubjectController::class, 'destroy']);
Route::get('getAllClassrooms', [ClassroomController::class, 'getAllClassrooms']);
Route::get('getLevels', [LevelController::class, 'getLevels']);
Route::get('getAllClasses', [ClassesController::class, 'getAllClasses']);
Route::get('getLessons/{id}', [LessonController::class, 'show']);
Route::get('showTeacherLessons/{id}/{user_id}', [LessonController::class, 'showTeacherLessons']);
Route::get('getLessonRegister/{id}/{type}', [RegisterAbsenceLatenessController::class, 'show']);
Route::post('refuseJust', [RegisterAbsenceLatenessController::class, 'refuse']);
Route::post('acceptJust', [RegisterAbsenceLatenessController::class, 'accept']);
Route::get('showJust/{id}/{type}', [RegisterAbsenceLatenessController::class, 'showJust']);
Route::get('showNumberOfAbsence', [RegisterAbsenceLatenessController::class, 'showNumberOfAbsence']);
Route::get('showNumberOfLate', [RegisterAbsenceLatenessController::class, 'showNumberOfLate']);
Route::get('showNumberOfAbsentIn7Days', [RegisterAbsenceLatenessController::class, 'showNumberOfAbsentIn7Days']);
Route::get('getAllSubjects', [SubjectController::class, 'getAllSubjects']);
Route::get('getAllLevelSubjects/{id}', [SubjectController::class, 'getAllLevelSubjects']);
Route::get('getStudentValidNumber/{id}', [StudentController::class, 'getStudentValidNumber']);
Route::get('getStudentInvalidNumber/{id}', [StudentController::class, 'getStudentInvalidNumber']);
Route::post("storeStudent", [StudentController::class, 'store']);
Route::post("updateStudent", [StudentController::class, 'update']);
Route::get('getStudent/{id}', [StudentController::class, 'getStudent']);
Route::delete("deleteStudent/{id}", [StudentController::class, 'destroy']);
Route::get("getAllStudents", [StudentController::class, 'getAllStudents']);
Route::get("getClassStudent/{id}", [StudentController::class, 'getClassStudent']);
Route::get("getChildrens/{id}", [StudentController::class, 'getChildrens']);
Route::get("getAllStudentFiles", [StudentController::class, 'getAllStudentFiles']);
Route::get("get10Students", [StudentController::class, 'get10Students']);
Route::get("getAllStudentsIsNotValidate", [StudentController::class, 'getAllStudentsIsNotValidate']);
Route::get("getStudentReacords/{id}", [SchoolRecordsController::class, 'getStudentReacords']);
Route::post('validateStudent', [StudentController::class, 'validateStudent']);
Route::get("getSchoolRecordsNote", [SchoolRecordsController::class, 'getSchoolRecordsNote']);
Route::post("updateSeasonNote", [SchoolRecordsController::class, 'updateSeasonNote']);
Route::post("storeSchoolRecords", [SchoolRecordsController::class, 'store']);
Route::post("updateSchoolRecords", [SchoolRecordsController::class, 'update']);
Route::delete("deleteSchoolRecords/{id}", [SchoolRecordsController::class, 'destroy']);
Route::post("storeMarksheet", [MarksheetController::class, 'store']);
Route::post("updateMarksheet", [MarksheetController::class, 'update']);
Route::delete("deleteMarksheet/{id}", [MarksheetController::class, 'destroy']);
Route::post("getMarkSheetStudent", [MarksheetController::class, 'getMarkSheetStudent']);
Route::post("getMarkSheetStudentAllSeason", [MarksheetController::class, 'getMarkSheetStudentAllSeason']);
Route::post("addNotificationstore", [NotificationController::class, 'store']);
Route::delete("destroyBook/{id}", [TextbookController::class, 'destroyBook']);
Route::post("addBook", [TextbookController::class, 'addBook']);
Route::get("showBooks", [TextbookController::class, 'showBooks']);
Route::get("showTextbooks/{id}", [TextbookController::class, 'show']);
Route::post("storeLesson", [TextbookController::class, 'storeLesson']);
Route::post("editTextbookPage", [TextbookController::class, 'edit']);
Route::get("showTeacherContent/{id}/{teacher}", [TextbookController::class, 'showTeacherContent']);
Route::get("showJustification/{id}/{state}", [JustificationController::class, 'show']);
Route::get("getTeacherSubjectsD/{id}", [ScheduleController::class, 'getTeacherSubjectsD']);
Route::get("getTeacherSubjects/{id}", [ScheduleController::class, 'getTeacherSubjects']);
Route::get("getStudentSubjects/{id}", [StudentController::class, 'getStudentSubjects']);
Route::post("addSchedule", [ScheduleController::class, 'store']);
Route::delete("deleteSchedule/{id}", [ScheduleController::class, 'destroy']);
Route::post("editSchedule", [ScheduleController::class, 'update']);
Route::get("getSchedulerClass/{id}", [ScheduleController::class, 'getSchedulerClass']);
Route::get("getTeacherClasses/{id}", [ScheduleController::class, 'getTeacherClasses']);
Route::get("getSchedulerTeacher/{id}", [ScheduleController::class, 'getSchedulerTeacher']);
Route::get("getScheduler/{id}", [ScheduleController::class, 'getScheduler']);
Route::get("getTeacherModule/{id}", [ScheduleController::class, 'getTeacherModule']);
Route::post("createStudentMarks", [MarksheetController::class, 'createStudentMarks']);
Route::delete("destroyTextbook/{id}/{lessonId}", [TextbookController::class, 'destroy']);
Route::get("fillLessonRegister/{classId}/{lessonID}", [RegisterAbsenceLatenessController::class, 'fillLessonRegister']);
Route::get("showLessonRegister/{lessonID}", [RegisterAbsenceLatenessController::class, 'showLessonRegister']);
Route::post("editLessonRegister", [RegisterAbsenceLatenessController::class, 'editLessonRegister']);
Route::post("AddJust", [RegisterAbsenceLatenessController::class, 'AddJust']);
Route::get("showNumberOfLateParent/{id}", [RegisterAbsenceLatenessController::class, 'showNumberOfLateParent']);
Route::get("showNumberOfAbsenceParent/{id}", [RegisterAbsenceLatenessController::class, 'showNumberOfAbsenceParent']);
Route::get("getClassList/{id}", [StudentController::class, 'getClassList']);
Route::get("showStudentRegister/{id}", [RegisterAbsenceLatenessController::class, 'showStudentRegister']);
Route::get("getNotifications/{id}", [NotificationController::class, 'show']);
Route::put("MarksRead/{id}", [NotificationController::class, 'MarksRead']);
