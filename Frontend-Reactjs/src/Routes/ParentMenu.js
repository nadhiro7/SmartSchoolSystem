import {
  DashboardOutlined,
  PersonAddAlt1Outlined,
  Schedule as Sch,
  RateReview,
  BookOutlined,
  AnnouncementSharp,
  FileCopy,
  NotificationsOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import Dashboard from "../Pages/Parent/Dashboard";
import Announces from "../Pages/Parent/Announces";
import ChildrenFiles from "../Pages/Parent/ChildrenFiles";
import Schedule from "../Pages/Parent/Schedule";
import AddChildren from "../Pages/Parent/AddChildren";
import AddJustification from "../Pages/Parent/AddJustification";
export const appMenu = [
  {
    text: "Dashboard",
    url: "",
    isCollapse: false,
    icon: <DashboardOutlined fontSize="small" />,
    component: <Dashboard />,
  },
  {
    text: "Add Children",
    url: "addChildren",
    isCollapse: false,
    icon: <PersonAddAlt1Outlined fontSize="small" />,
    component: <AddChildren />,
  },
  {
    text: "Add Justification",
    url: "addJustification",
    isCollapse: false,
    component: <AddJustification />,
    icon: <FileCopy fontSize="small" />,
  },
  {
    text: "Children Files",
    url: "childrenFiles",
    isCollapse: false,
    icon: <BookOutlined fontSize="small" />,
    component: <ChildrenFiles />,
  },
  {
    text: "Schedule",
    url: "schedule",
    isCollapse: false,
    icon: <Sch fontSize="small" />,
    component: <Schedule />,
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
