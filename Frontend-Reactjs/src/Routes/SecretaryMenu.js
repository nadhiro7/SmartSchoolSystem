import {
  DashboardOutlined,
  PersonOutline,
  RoomOutlined,
  RateReview,
  BookOutlined,
  AnnouncementSharp,
  List,
  NotificationsOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import Dashboard from "../Pages/Secretary/Dashboard";
import MarkSheets from "../Pages/Secretary/MarkSheets/index";
import Announces from "../Pages/Secretary/ManageAnnounces";
import RegisterAL from "../Pages/Secretary/ManageRegisterAL";
import Absence from "../Pages/Secretary/ManageRegisterAL/Absence";
import Lateness from "../Pages/Secretary/ManageRegisterAL/Lateness";
import Students from "../Pages/Secretary/ManageStudentFile";
import TextBook from "../Pages/Secretary/ManageTextBook";
export const appMenu = [
  {
    text: "Dashboard",
    url: "",
    isCollapse: false,
    icon: <DashboardOutlined fontSize="small" />,
    component: <Dashboard />,
  },
  {
    text: "Students",
    url: "students",
    isCollapse: false,
    icon: <PersonOutline fontSize="small" />,
    component: <Students />,
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
  {
    text: "Announces",
    url: "announces",
    isCollapse: false,
    icon: <AnnouncementSharp fontSize="small" />,
    component: <Announces />,
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
