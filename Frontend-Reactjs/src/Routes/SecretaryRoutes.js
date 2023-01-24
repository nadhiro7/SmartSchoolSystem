import Dashboard from "../Pages/Secretary/Dashboard";
import Announces from "../Pages/Secretary/ManageAnnounces";
import RegisterAL from "../Pages/Secretary/ManageRegisterAL";
import Absence from "../Pages/Secretary/ManageRegisterAL/Absence";
import Lateness from "../Pages/Secretary/ManageRegisterAL/Lateness";
import LatenessList from "../Pages/Secretary/ManageRegisterAL/LatenessList";
import AbsenceList from "../Pages/Secretary/ManageRegisterAL/AbsenceList";
import Students from "../Pages/Secretary/ManageStudentFile";
import AddStudent from "../Pages/Secretary/ManageStudentFile/AddStudent";
import EditStudent from "../Pages/Secretary/ManageStudentFile/EditStudent";
import TextBook from "../Pages/Secretary/ManageTextBook";
import TextbookPages from "../Pages/Secretary/ManageTextBook/TextbookPages";
import MarkSheets from "../Pages/Secretary/MarkSheets/index";
import AllNote from "../Pages/Secretary/MarkSheets/AllNote";
import StudentMarks from "../Pages/Secretary/MarkSheets/StudentMarks";
import NotFound from "../Pages/NotFound";
import { useRoutes } from "react-router-dom";
import Loadable from "../Components/Loadable";
import { lazy } from "react";
import Profil from "../Pages/Profil";
import NotificationsBox from "../Pages/NotificationsBox";
export const secretaryRoute = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "students",
    element: <Students />,
  },
  {
    path: "students/addStudent",
    element: <AddStudent />,
  },
  {
    path: "students/editStudent/:studentId",
    element: <EditStudent />,
  },
  {
    path: "/register",
    element: <RegisterAL />,
  },
  {
    path: "register/absence/:classId",
    element: <Absence />,
  },
  {
    path: "register/lateness/:classId",
    element: <Lateness />,
  },
  {
    path: "register/lateness/:classId/latenessList/:lessonId",
    element: <LatenessList />,
  },
  {
    path: "register/absence/:classId/absenceList/:lessonId",
    element: <AbsenceList />,
  },
  {
    path: "textbooks",
    element: <TextBook />,
  },
  {
    path: "textbooks/textbookPages/:teacherId",
    element: <TextbookPages />,
  },
  {
    path: "announces",
    element: <Announces />,
  },
  {
    path: "markSheets",
    element: <MarkSheets />,
  },
  {
    path: "markSheets/studentMarks/:idStudent",
    element: <StudentMarks />,
  },
  {
    path: "markSheets/studentMarks/:idStudent/allNotes/:season",
    element: <AllNote />,
  },
  {
    path: "editProfil",
    element: <Profil />,
  },
  {
    path: "mailBox",
    element: <NotificationsBox />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];
export default function ThemeRoutes() {
  return useRoutes(secretaryRoute);
}
