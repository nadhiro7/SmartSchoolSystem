import Dashboard from "./../Pages/Admin/Dashboard";
import Announces from "./../Pages/Admin/ManageAnnounces";
import Classes from "./../Pages/Admin/ManageClass";
import Classroom from "./../Pages/Admin/ManageClassroom";
import Subjects from "./../Pages/Admin/ManageSubject";
import ManageSchedules from "./../Pages/Admin/ManageSchedule/index";
import Schedule from "./../Pages/Admin/ManageSchedule/ScheduleClass";
import ManageParent from "./../Pages/Admin/ManageUser/ManageParent";
import ManageTeacher from "./../Pages/Admin/ManageUser/ManageTeacher/index";
import ManageSecretary from "./../Pages/Admin/ManageUser/ManageSecretary";
import AddParent from "../Pages/Admin/ManageUser/ManageParent/AddParent";
import EditParent from "../Pages/Admin/ManageUser/ManageParent/EditParent";
import AddTeacher from "../Pages/Admin/ManageUser/ManageTeacher/AddTeacher";
import EditTeacher from "../Pages/Admin/ManageUser/ManageTeacher/EditTeacher";
import AddSecretary from "../Pages/Admin/ManageUser/ManageSecretary/AddSecretary";
import EditSecretary from "../Pages/Admin/ManageUser/ManageSecretary/EditSecretary";
import NotFound from "../Pages/NotFound";
import { useRoutes } from "react-router-dom";
import Loadable from "../Components/Loadable";
import { lazy } from "react";
import Profil from "../Pages/Profil";
import NotificationsBox from "../Pages/NotificationsBox";
const adminRoute = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/announces",
    element: <Announces />,
  },
  {
    path: "/classes",
    element: <Classes />,
  },
  {
    path: "/classrooms",
    element: <Classroom />,
  },
  {
    path: "/subjects",
    element: <Subjects />,
  },
  {
    path: "/schedules",
    element: <ManageSchedules />,
  },
  {
    path: "/schedules/edit/:classId/:level",
    element: <Schedule />,
  },

  {
    path: "/users/parents",
    element: <ManageParent />,
  },
  {
    path: "/users/parents/addParent",
    element: <AddParent />,
  },
  {
    path: "/users/parents/editParent/:parentId",
    element: <EditParent />,
  },
  {
    path: "/users/teachers",
    element: <ManageTeacher />,
  },
  {
    path: "/users/teachers/addTeacher",
    element: <AddTeacher />,
  },
  {
    path: "/users/teachers/editTeacher/:teacherId",
    element: <EditTeacher />,
  },
  {
    path: "/users/secretaries",
    element: <ManageSecretary />,
  },
  {
    path: "/users/secretaries/addSecretary",
    element: <AddSecretary />,
  },
  {
    path: "/users/secretaries/editSecretary/:secretaryId",
    element: <EditSecretary />,
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
  return useRoutes(adminRoute);
}
