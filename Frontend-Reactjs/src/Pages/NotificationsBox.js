import {
  Box,
  Grid,
  Breadcrumbs,
  Tab,
  Typography,
  styled,
  useTheme,
  useMediaQuery,
  ListItemSecondaryAction,
  ListItem,
  Stack,
  Chip,
  List,
} from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import {
  Home as HomeIcon,
  DashboardOutlined,
  Edit,
  Delete,
  Mail,
  MarkEmailRead,
  MarkEmailUnread,
  NotificationsOutlined,
} from "@mui/icons-material";
import MainCard from "./../Components/MainCard";
import { useQuery } from "react-query";
import axios from "axios";
import React from "react";
function NotificationsBox() {
  return (
    <Box
      sx={{
        p: 1,
        minHeight: "100vh",
        maxHeight: "fit-content",
        width: "100% !important",
        borderRadius: "10px",
      }}
      bgcolor="primary.light"
    >
      <Box sx={{ mt: 2, ml: 2, mb: 5 }}>
        <IconBreadcrumbs />
      </Box>
      <MainCard
        sx={{
          width: "100%",
          height: "450px",
          p: 0,
          "& .MuiCardContent-root": {
            p: 0,
          },
          "& .MuiCardContent-root": {
            p: 0,
          },
        }}
      >
        <VerticalTabs></VerticalTabs>
      </MainCard>
    </Box>
  );
}
function IconBreadcrumbs() {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      justifyContent="center"
      alignItems="center"
    >
      <Link
        underline="hover"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "text.primary",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        <NotificationsOutlined
          sx={{ mr: 0.5 }}
          color="primary"
          fontSize="medium"
        />
        Notification
      </Link>
    </Breadcrumbs>
  );
}
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    justifyContent: "start",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.6)",
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    backgroundColor: "#635ee7",
  },
});
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const getNotifications = useQuery(
    "getNotifications",
    async () => {
      return axios.get("http://localhost:8000/api/getNotifications/" + user.id);
    },
    {
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
      refetchOnMount: "always",
      refetchInterval: 15000,
    }
  );
  const [data, setData] = React.useState([]);
  const screen = useMediaQuery(theme.breakpoints.up("sm"));
  React.useEffect(() => {
    if (getNotifications.data) {
      if (getNotifications.data.data) setData(getNotifications.data.data);
    }
  }, [getNotifications.data]);
  return (
    <Box
      sx={{
        flexGrow: { xs: 1 },
        bgcolor: "background.paper",
        display: { sm: "flex", xs: "block" },
        height: "100%",
      }}
    >
      {!screen ? (
        <Box
          sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#2e1534" }}
        >
          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <StyledTab
              icon={<Mail />}
              iconPosition="start"
              label="All Notifications"
              {...a11yProps(0)}
            />
            <StyledTab
              icon={<MarkEmailUnread />}
              iconPosition="start"
              label="Unread"
              {...a11yProps(1)}
            />
            <StyledTab
              icon={<MarkEmailRead />}
              iconPosition="start"
              label="Readed"
              {...a11yProps(2)}
            />
          </StyledTabs>
        </Box>
      ) : (
        <Box sx={{ bgcolor: "#2e1534" }}>
          <StyledTabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: "divider",
              height: "450px",
              width: "max-content",
            }}
          >
            <StyledTab
              icon={<Mail />}
              iconPosition="start"
              label="All Notifications"
              {...a11yProps(0)}
            />
            <StyledTab
              icon={<MarkEmailUnread />}
              iconPosition="start"
              label="Unread"
              {...a11yProps(1)}
            />
            <StyledTab
              icon={<MarkEmailRead />}
              iconPosition="start"
              label="Readed"
              {...a11yProps(2)}
            />
          </StyledTabs>
        </Box>
      )}

      <TabPanel style={{ width: "100%" }} value={value} index={0}>
        <NotificationList data={data} />
      </TabPanel>
      <TabPanel style={{ width: "100%" }} value={value} index={1}>
        <NotificationList
          data={data.filter((item) => {
            return !item.isRead;
          })}
        />
      </TabPanel>
      <TabPanel style={{ width: "100%" }} value={value} index={2}>
        <NotificationList
          data={data.filter((item) => {
            return item.isRead;
          })}
        />
      </TabPanel>
    </Box>
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
        py: 0,
        borderRadius: "10px",
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
      {props.data.length > 0
        ? props.data.map((item, index) => {
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
          })
        : "No data to show"}
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
          <Typography variant="subtitle2">{props.content}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            {!props.isRead ? (
              <Grid item>
                <Chip label="Unread" sx={chipErrorSX} />
              </Grid>
            ) : (
              <Grid item>
                <Chip label="Read" sx={chipSuccessSX} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </ListItemWrapper>
  );
}
export default NotificationsBox;
