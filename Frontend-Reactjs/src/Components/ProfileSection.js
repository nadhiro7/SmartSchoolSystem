import React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Paper,
  Popper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { SettingsOutlined, LogoutOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import useGetUser from "../Hooks/useGetUser";
function ProfileSection() {
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const getUser = useGetUser(user.id);
  const [open, setOpen] = React.useState(false);
  /**
   * anchorRef is used on different componets and specifying one type leads to other components throwing an error
   * */
  const anchorRef = React.useRef(null);
  const navigate = useNavigate();
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <>
      <Chip
        sx={{
          height: "35px",
          alignItems: "center",
          borderRadius: "27px",
          transition: "all .2s ease-in-out",
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: "white",
            "& svg": {
              stroke: theme.palette.primary.light,
            },
          },
          "& .MuiChip-label": {
            lineHeight: 0,
          },
        }}
        icon={
          getUser.data && getUser.data.data.image ? (
            <Avatar
              variant="rounded"
              src={
                getUser.data &&
                "http://127.0.0.1:8000/public/" + getUser.data.data.image
              }
              sx={{
                ...theme.typography.mediumAvatar,
                margin: "8px 0 8px 8px !important",
                cursor: "pointer",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
              bgcolor={theme.palette.warning}
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
            />
          ) : (
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.mediumAvatar,
                margin: "8px 0 8px 8px !important",
                cursor: "pointer",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
              }}
              bgcolor={theme.palette.warning}
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
            >
              {getUser.data &&
                getUser.data.data.firstname.slice(0, 1).toLocaleUpperCase()}
            </Avatar>
          )
        }
        label={<SettingsOutlined color="inherit" />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        disablePortal={true}
        open={open}
        anchorEl={anchorRef.current}
        modifiers={[
          {
            name: "flip",
            enabled: false,
            options: {
              altBoundary: true,
              rootBoundary: "viewport",
              padding: 8,
            },
          },
          {
            name: "preventOverflow",
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: true,
              rootBoundary: "document",
              padding: 8,
            },
          },
          {
            name: "arrow",
            enabled: true,
          },
        ]}
      >
        <Paper
          sx={{
            p: "10px",
            height: "fit-content ",
            width: "300px",
            transform: "translateY(15px)",
            minWidth: "200px",
          }}
          elevation={8}
        >
          <Box sx={{ p: 2 }}>
            <Stack>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="h4">Hello,</Typography>
                <Typography
                  component="span"
                  variant="h4"
                  sx={{ fontWeight: 400 }}
                >
                  {getUser.data
                    ? getUser.data.data.firstname +
                      " " +
                      getUser.data.data.lastname
                    : ""}
                </Typography>
              </Stack>
              <Typography variant="subtitle2">
                {getUser.data ? getUser.data.data.type : ""}
              </Typography>
            </Stack>
          </Box>
          <Divider />
          <List
            component="nav"
            sx={{
              width: "100%",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "10px",
              [theme.breakpoints.down("md")]: {
                minWidth: "100%",
              },
              "& .MuiListItemButton-root": {
                mt: 0.5,
              },
            }}
          >
            <ListItemButton
              sx={{ borderRadius: `10px` }}
              onClick={() => {
                navigate("editProfil");
                handleToggle();
              }}
            >
              <ListItemIcon>
                <SettingsOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText
                sx={{ color: theme.palette.text.primary }}
                primary={
                  <Typography variant="body1">Account Settings</Typography>
                }
              />
            </ListItemButton>
            <ListItemButton
              sx={{ borderRadius: `10px` }}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <ListItemIcon>
                <LogoutOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText
                sx={{ color: theme.palette.text.primary }}
                primary={<Typography variant="body1">Logout</Typography>}
              />
            </ListItemButton>
          </List>
        </Paper>
      </Popper>
    </>
  );
}

export default ProfileSection;
