import { useRoutes } from "react-router-dom";
import Home from "./../Pages/Visitor/Home";
import Login from "./../Pages/Visitor/Login/Login";
import SignUp from "./../Pages/Visitor/Register/SignUp";
import NotFound from "./../Pages/NotFound";
import { ThemeProvider } from "@mui/material";
import { themeLogin, themeSignup, theme } from "./../Themes/index";
import ForgotPass from "../Pages/Visitor/ForgotPass";

export const visitorRoute = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: (
      <ThemeProvider theme={themeLogin()}>
        {" "}
        <Login />{" "}
      </ThemeProvider>
    ),
  },
  {
    path: "signup",
    element: (
      <ThemeProvider theme={themeSignup()}>
        {" "}
        <SignUp />{" "}
      </ThemeProvider>
    ),
  },
  {
    path: "/*",
    element: <NotFound />,
  },
  {
    path: "forgotPassword",
    element: <ForgotPass />,
  },
];
export default function ThemeRoutes() {
  return useRoutes(visitorRoute);
}
