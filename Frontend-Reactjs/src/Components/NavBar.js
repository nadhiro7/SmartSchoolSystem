import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Stack,
  ButtonBase,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { School, Search, DarkMode, LightMode } from "@mui/icons-material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Notifications from "./Notifications";
import ProfileSection from "./ProfileSection";
import { ThemeContext, themes } from "./../Themes/ThemeContext";
import { shouldForwardProp } from "@mui/system";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  height: "58px",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(
  ({ theme }) => ({
    width: 400,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 16,
    background: theme.palette.primary.light,
    borderColor: theme.palette.primary.dark,
    "& input": {
      background: theme.palette.primary.light,
      paddingLeft: "4px !important",
    },
    [theme.breakpoints.down("lg")]: {
      width: 250,
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: 4,
      background: "#fff",
    },
  })
);
export default function NavBar(props) {
  const theme = useTheme();
  const mode = React.useContext(ThemeContext);
  return (
    <>
      <AppBar color="inherit" position="fixed" open={props.open} elevation={0}>
        <Toolbar sx={{ height: "58px" }} alignItems="center">
          <Stack spacing={2} direction="row" alignItems="center">
            <Stack
              direction="row"
              alignItems="center"
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <ButtonBase
                aria-label="open drawer"
                edge="start"
                sx={{
                  width: "fit-content",
                  pl: "0px !important",
                  transform: "translateX(-10px)",
                }}
              >
                <School color="secondary" fontSize="large" sx={{ mr: "5px" }} />
                <Typography variant="h4" noWrap component="div">
                  My Smart School
                </Typography>
              </ButtonBase>
            </Stack>

            <ButtonBase
              aria-label="open drawer"
              onClick={props.handleOpen}
              edge="start"
              sx={{
                borderRadius: "7px !important",
                width: "30px !important",
                height: "30px",
                color: theme.palette.secondary.main,
                transition: "0.3s",
                backgroundColor: theme.palette.secondary.light,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                  color: "white",
                },
              }}
            >
              <MenuIcon fontSize="small" />
            </ButtonBase>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            sx={{ ml: "auto" }}
          >
            <Stack spacing={2} direction="row" alignItems="center">
              <ButtonBase
                aria-label="change Theme"
                edge="start"
                onClick={() => mode.changeTheme()}
                sx={{
                  borderRadius: "7px !important",
                  width: "30px !important",
                  height: "30px",
                  color: theme.palette.primary.main,
                  transition: "0.3s",
                  backgroundColor: theme.palette.primary.light,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                    color: "white",
                  },
                }}
              >
                {mode.theme === "dark" ? (
                  <LightMode fontSize="small" />
                ) : (
                  <DarkMode fontSize="small" />
                )}
              </ButtonBase>
              <Notifications />
            </Stack>
            <ProfileSection />
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}
