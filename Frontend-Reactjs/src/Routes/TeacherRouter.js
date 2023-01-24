import Dashboard from "../Pages/Teacher/Dashboard";
import Schedule from "../Pages/Teacher/Schedule";
import MarkSheets from "../Pages/Teacher/MarkSheets/index";
import ClassList from "../Pages/Teacher/MarkSheets/List";
import StudentNotes from "../Pages/Teacher/MarkSheets/StudentNotes";
import ClassesList from "../Pages/Teacher/ClassesList";
import ListClass from "../Pages/Teacher/ClassesList/List";
import RegisterAL from "../Pages/Teacher/RegisterAL";
import Absence from "../Pages/Teacher/RegisterAL/Absence";
import AbsenceList from "../Pages/Teacher/RegisterAL/AbsenceList";
import TextBook from "../Pages/Teacher/Textbooks";
import TextbookPages from "../Pages/Teacher/Textbooks/TextbookPages";
import NotFound from "../Pages/NotFound";
import { useRoutes } from "react-router-dom";
import Loadable from "../Components/Loadable";
import { lazy } from "react";
import Profil from "../Pages/Profil";
import NotificationsBox from "../Pages/NotificationsBox";
export const TeacherRoute = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "schedule",
    element: <Schedule />,
  },
  {
    path: "classesList",
    element: <ClassesList />,
  },
  {
    path: "classesList/list/:idClass",
    element: <ListClass />,
  },
  {
    path: "/register",
    element: <RegisterAL />,
  },
  {
    path: "register/absenceAndLateness/:classId",
    element: <Absence />,
  },
  {
    path: "register/absenceAndLateness/:classId/absenceAndLatenessList/:lessonId",
    element: <AbsenceList />,
  },
  {
    path: "textbooks",
    element: <TextBook />,
  },
  {
    path: "textbooks/textbookPages/:classId",
    element: <TextbookPages />,
  },
  {
    path: "markSheets",
    element: <MarkSheets />,
  },
  {
    path: "markSheets/list/:idClass/:subject",
    element: <ClassList />,
  },
  {
    path: "markSheets/list/:idClass/:subject/:idStudent",
    element: <StudentNotes />,
  },
  // {
  //     path: 'markSheets/studentMarks/:idStudent/allNotes/:idSeason',
  //     element: <AllNote />
  // },
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
  return useRoutes(TeacherRoute);
}
