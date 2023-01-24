import React from "react";
import {
  ButtonBase,
  useTheme,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Link,
  Box,
  Chip,
  Popper,
  Paper,
  Stack,
  Grid,
  Button,
  IconButton,
  Typography,
  Divider,
  Badge,
} from "@mui/material";
import { NotificationsOutlined } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  styled,
} from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
function Notifications() {
  const theme = useTheme();
  const parent = JSON.parse(localStorage.getItem("user"));
  const getNotifications = useQuery(
    "getNotifications",
    async () => {
      return axios.get(
        "http://localhost:8000/api/getNotifications/" + parent.id
      );
    },
    {
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
      refetchOnMount: "always",
      refetchInterval: 15000,
    }
  );
  const MarksRead = useQuery(
    "MarksRead",
    async () => {
      return axios.put("http://localhost:8000/api/MarksRead/" + parent.id);
    },
    {
      enabled: false,
    }
  );
  const marksRead = () => {
    MarksRead.refetch().then(() => {
      getNotifications.refetch();
    });
  };
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (getNotifications.data) {
      if (getNotifications.data.data) setData(getNotifications.data.data);
    }
  }, [getNotifications.data]);
  React.useEffect(() => {
    if (data) {
      const l = data.filter((item) => {
        return !item.isRead;
      });
      setUnRead(l.length);
    }
  }, [data]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };
  const [unRead, setUnRead] = new React.useState(0);
  return (
    <>
      <ButtonBase
        aria-label="open drawer"
        edge="start"
        onClick={handleMenu}
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
        <Badge color="error" badgeContent={unRead} max={9}>
          <NotificationsOutlined fontSize="small" />
        </Badge>
      </ButtonBase>
      <Popper
        placement="bottom-end"
        disablePortal={true}
        open={open}
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
        anchorEl={anchorEl}
      >
        <Paper
          sx={{
            p: "10px",
            height: "70vh ",
            width: "350px",
            transform: "translateY(15px)",
            minWidth: "200px",
          }}
          elevation={5}
        >
          <Box
            sx={{ height: "40px", position: "static" }}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
          >
            <Typography variant="body1">All Notification</Typography>
            <Chip
              size="small"
              label={`${unRead} unread`}
              sx={{
                color: theme.palette.background.default,
                bgcolor: theme.palette.warning.dark,
              }}
            />
            <Button
              variant="text"
              sx={{ fontSize: "12px" }}
              underline="hover"
              color="primary"
              onClick={marksRead}
            >
              Mark as all read
            </Button>
          </Box>
          <Divider />
          <Box
            sx={{ height: "calc(100% - 80px)", overflow: "auto" }}
            spacing={2}
          >
            <NotificationList data={data} />
          </Box>
          <Divider />
          <Box sx={{ height: "fit-content", position: "fixed" }} spacing={2}>
            <Button variant="text" fullWidth color="primary">
              View All
            </Button>
          </Box>
        </Paper>
      </Popper>
    </>
  );
}
const ListItemWrapper = styled("div")(({ theme }) => ({
  cursor: "pointer",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  padding: 16,
  "& .MuiListItem-root": {
    padding: 0,
  },
}));
function NotificationList(props) {
  const theme = useTheme();
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 330,
        py: 0,
        borderRadius: "10px",
        [theme.breakpoints.down("md")]: {
          maxWidth: 300,
        },
        "& .MuiListItemSecondaryAction-root": {
          top: 22,
        },
        "& .MuiDivider-root": {
          my: 0,
        },
        "& .list-container": {
          pl: 7,
        },
      }}
    >
      {props.data.map((item, index) => {
        return (
          <NotificationItem
            key={index}
            content={item.content}
            time={item.time}
            date={item.date}
            name={item.name}
            isRead={item.isRead}
            isNew={new Date().toISOString() == item.date}
          />
        );
      })}
    </List>
  );
}
function NotificationItem(props) {
  const theme = useTheme();
  const chipSX = {
    height: 24,
    padding: "0 6px",
  };
  const chipErrorSX = {
    ...chipSX,
    color: theme.palette.orange.dark,
    backgroundColor: theme.palette.orange.light,
    marginRight: "5px",
  };

  const chipWarningSX = {
    ...chipSX,
    color: theme.palette.warning.dark,
    backgroundColor: theme.palette.warning.light,
  };

  const chipSuccessSX = {
    ...chipSX,
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
    height: 28,
  };
  return (
    <ListItemWrapper
      sx={{
        background: !props.isRead && theme.palette.primary.light,
      }}
    >
      <ListItem alignItems="center">
        <ListItemSecondaryAction sx={{ top: "0 !important" }}>
          <Stack
            spacing={1}
            display={"flex"}
            justifyContent="end"
            direction={"row"}
          >
            <Typography variant="caption" display="block">
              {props.date}
            </Typography>
            <Typography variant="caption" display="block">
              {props.time.slice(0, 5)}
            </Typography>
          </Stack>
        </ListItemSecondaryAction>
      </ListItem>
      <Grid container direction="column" mt={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle2">{props.content}..</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {!props.isRead && (
              <Grid item>
                <Chip label="Unread" sx={chipErrorSX} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </ListItemWrapper>
  );
}

export default Notifications;
