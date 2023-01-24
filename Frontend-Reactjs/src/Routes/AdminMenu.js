import {
  DashboardOutlined,
  PersonOutline,
  RoomOutlined,
  ClassOutlined,
  BookOutlined,
  AnnouncementSharp,
  ScheduleOutlined,
  NotificationsOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import Dashboard from "../Pages/Admin/Dashboard";
import Announces from "../Pages/Admin/ManageAnnounces";
import Classes from "../Pages/Admin/ManageClass";
import Classroom from "../Pages/Admin/ManageClassroom";
import Subjects from "../Pages/Admin/ManageSubject";
import Schedule from "../Pages/Admin/ManageSchedule";
import ManageParent from "../Pages/Admin/ManageUser/ManageParent";
import ManageTeacher from "../Pages/Admin/ManageUser/ManageTeacher";
import ManageSecretary from "../Pages/Admin/ManageUser/ManageSecretary";
export const appMenu = [
  {
    text: "Dashboard",
    url: "",
    isCollapse: false,
    icon: <DashboardOutlined fontSize="small" />,
    component: <Dashboard />,
  },
  {
    text: "Users",
    url: "/users",
    isCollapse: true,
    sousItem: [
      {
        text: "Parent",
        url: "users/parents",
        isCollapse: false,
        component: <ManageParent />,
      },
      {
        text: "Teacher",
        url: "users/teachers",
        isCollapse: false,
        component: <ManageTeacher />,
      },
      {
        text: "Secretary",
        url: "users/secretaries",
        isCollapse: false,
        component: <ManageSecretary />,
      },
    ],
    icon: <PersonOutline fontSize="small" />,
  },
  {
    text: "Classrooms",
    url: "classrooms",
    isCollapse: false,
    icon: <RoomOutlined fontSize="small" />,
    component: <Classroom />,
  },
  {
    text: "Classes",
    url: "classes",
    isCollapse: false,
    icon: <ClassOutlined fontSize="small" />,
    component: <Classes />,
  },
  {
    text: "Subjects",
    url: "subjects",
    isCollapse: false,
    icon: <BookOutlined fontSize="small" />,
    component: <Subjects />,
  },
  {
    text: "Announces",
    url: "announces",
    isCollapse: false,
    icon: <AnnouncementSharp fontSize="small" />,
    component: <Announces />,
  },
  {
    text: "Schedules",
    url: "schedules",
    isCollapse: false,
    icon: <ScheduleOutlined fontSize="small" />,
    component: <Schedule />,
  },
];
export const otherMenu = [
  {
    text: "Notification",
    url: "./mailBox",
    isCollapse: false,
    icon: <NotificationsOutlined fontSize="small" />,
  },
  {
    text: "Account setting",
    url: "editProfil",
    isCollapse: false,
    icon: <SettingsOutlined fontSize="small" />,
  },
  {
    text: "Logout",
    url: "/logout",
    isCollapse: false,
    isLogout: true,
    icon: <LogoutOutlined fontSize="small" />,
  },
];
