import Dashboard from "../Pages/Parent/Dashboard";
import Announces from "../Pages/Parent/Announces";
import ChildrenFiles from "../Pages/Parent/ChildrenFiles";
import Schedule from "../Pages/Parent/Schedule";
import StudentSchedule from "../Pages/Parent/Schedule/StudentSchedule";
import AddChildren from "../Pages/Parent/AddChildren";
import AddJustification from "../Pages/Parent/AddJustification";
import AllNote from "../Pages/Parent/ChildrenFiles/AllNote";
import StudentMarks from "../Pages/Parent/ChildrenFiles/StudentMarks";
import TextbookPages from "../Pages/Parent/ChildrenFiles/TextbookPages";
import AbsenceList from "../Pages/Parent/AddJustification/AbsenceList";
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
    path: "schedule/studentSchedule/:classId",
    element: <StudentSchedule />,
  },
  {
    path: "addJustification",
    element: <AddJustification />,
  },
  {
    path: "addJustification/register/:id",
    element: <AbsenceList />,
  },
  {
    path: "addChildren",
    element: <AddChildren />,
  },
  {
    path: "/announces",
    element: <Announces />,
  },
  {
    path: "childrenFiles",
    element: <ChildrenFiles />,
  },
  {
    path: "childrenFiles/studentMarks/:idStudent",
    element: <StudentMarks />,
  },
  {
    path: "childrenFiles/studentMarks/:idStudent/allNotes/:season",
    element: <AllNote />,
  },
  {
    path: "childrenFiles/textbook/:teacherId",
    element: <TextbookPages />,
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
  return useRoutes(TeacherRoute);
}
