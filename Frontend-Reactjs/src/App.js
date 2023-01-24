import React from "react";
import {
  useTheme,
  Stack,
  ThemeProvider,
  Box,
  IconButton,
  createTheme,
  Button,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IndexVistor from "./Pages/Visitor/indexVistor";
import Admin from "./Pages/Admin/index";
import Secretary from "./Pages/Secretary/index";
import Teacher from "./Pages/Teacher/index";
import Parent from "./Pages/Parent/index";
import { themes, ThemeContext } from "./Themes/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Visitor/Home";
import Login from "./Pages/Visitor/Login/Login";
import SignUp from "./Pages/Visitor/Register/SignUp";
import NotFound from "./Pages/NotFound";
import { themeLogin, themeSignup, theme } from "./Themes/index";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Visitor from "./Pages/Visitor/index";
import axios from "axios";
// const ColorModeContext = React.createContext( { toggleColorMode: () => { } } );
const queryConfig = {
  queries: {
    getUser: async () => {
      const response = await axios.get("http://localhost:8000/api/login");
      return response.data;
    },
  },
};
const queryClient = new QueryClient(queryConfig);
function MyApp() {
  const [mode, setMode] = React.useState(themes.light);
  function changeTheme() {
    setMode(mode === themes.dark ? themes.light : themes.dark);
  }

  return (
    // <IndexVistor />

    <BrowserRouter>
      <ThemeContext.Provider value={{ theme: mode, changeTheme: changeTheme }}>
        <ThemeProvider theme={theme(mode)}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route
                path="/*"
                element={
                  <ThemeProvider theme={theme("light")}>
                    <Visitor />{" "}
                  </ThemeProvider>
                }
              />
              <Route path="admin/*" element={<Admin />} />
              <Route path="secretary/*" element={<Secretary />} />
              <Route path="teacher/*" element={<Teacher />} />
              <Route path="parent/*" element={<Parent />} />
            </Routes>
            {/* <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
          </QueryClientProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default MyApp;
