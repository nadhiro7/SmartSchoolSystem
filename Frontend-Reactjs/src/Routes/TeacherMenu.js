import {
  DashboardOutlined,
  PersonOutline,
  Schedule as Sch,
  RateReview,
  BookOutlined,
  AnnouncementSharp,
  List,
  NotificationsOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import Dashboard from "../Pages/Teacher/Dashboard";
import MarkSheets from "../Pages/Teacher/MarkSheets/index";
import ClassesList from "../Pages/Teacher/ClassesList";
import RegisterAL from "../Pages/Teacher/RegisterAL";
import TextBook from "../Pages/Teacher/Textbooks";
import Schedule from "../Pages/Teacher/Schedule";
export const appMenu = [
  {
    text: "Dashboard",
    url: "",
    isCollapse: false,
    icon: <DashboardOutlined fontSize="small" />,
    component: <Dashboard />,
  },
  {
    text: "Schedule",
    url: "schedule",
    isCollapse: false,
    icon: <Sch fontSize="small" />,
    component: <Schedule />,
  },
  {
    text: "Classes List",
    url: "classesList",
    isCollapse: false,
    icon: <List fontSize="small" />,
    component: <ClassesList />,
  },
  {
    text: "Register",
    url: "register",
    isCollapse: false,
    component: <RegisterAL />,
    icon: <List fontSize="small" />,
  },
  {
    text: "Manage Textbooks",
    url: "textbooks",
    isCollapse: false,
    icon: <BookOutlined fontSize="small" />,
    component: <TextBook />,
  },
  {
    text: "MarkSheets",
    url: "markSheets",
    isCollapse: false,
    icon: <RateReview fontSize="small" />,
    component: <MarkSheets />,
  },
];
export const otherMenu = [
  {
    text: "Notification",
    url: "mailBox",
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
