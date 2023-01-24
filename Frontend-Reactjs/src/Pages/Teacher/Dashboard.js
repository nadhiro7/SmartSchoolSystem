import {
  Box,
  Grid,
  Breadcrumbs,
  Avatar,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableFooter,
  TableCell,
  Divider,
  Typography,
  Button,
  CircularProgress,
  Stack,
  Paper,
  useTheme,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import {
  Home as HomeIcon,
  DashboardOutlined,
  Edit,
  Delete,
} from "@mui/icons-material";
import MainCard from "../../Components/MainCard";
import ScheduleDay from "../../Components/ScheduleDay";
import TimelineDay from "../../Components/TimelineDay";
import { useQuery } from "react-query";
import axios from "axios";
import React from "react";
function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const getSchedulerTeacher = useQuery("getSchedulerTeacher", async () => {
    return axios.get(
      "http://localhost:8000/api/getSchedulerTeacher/" + user.id
    );
  });
  const getTeacherClasses = useQuery("getTeacherClassesT", async () => {
    return axios.get("http://localhost:8000/api/getTeacherClasses/" + user.id);
  });
  const view = getTeacherClasses.data ? (
    !getTeacherClasses.isLoading ? (
      getTeacherClasses.data.data.length > 0 ? (
        getTeacherClasses.data.data.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{item.nameClass}</TableCell>
              <TableCell>{item.nameLevel}</TableCell>
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={2}>
            <Stack
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
            >
              No data to show
            </Stack>
          </TableCell>
        </TableRow>
      )
    ) : (
      <TableRow>
        <TableCell colSpan={2}>
          <Stack display={"flex"} alignItems="center" justifyContent={"center"}>
            <CircularProgress color="secondary" />
          </Stack>
        </TableCell>
      </TableRow>
    )
  ) : null;
  const getAllClasses = useQuery("getTeacherSubjectsD", async () => {
    return axios.get(
      "http://localhost:8000/api/getTeacherSubjectsD/" + user.id
    );
  });
  const view1 = getAllClasses.data ? (
    !getAllClasses.isLoading ? (
      getAllClasses.data.data.length > 0 ? (
        getAllClasses.data.data.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.nameSubject}</TableCell>
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={2}>
            <Stack
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
            >
              No data to show
            </Stack>
          </TableCell>
        </TableRow>
      )
    ) : (
      <TableRow>
        <TableCell colSpan={2}>
          <Stack display={"flex"} alignItems="center" justifyContent={"center"}>
            <CircularProgress color="secondary" />
          </Stack>
        </TableCell>
      </TableRow>
    )
  ) : null;
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    setData(
      getSchedulerTeacher.data
        ? getSchedulerTeacher.data.data.map((item) => {
            return {
              id: item.id,
              ids: item.id,
              allDay: false,
              endDate: item.endTime,
              startDate: item.startTime,
              title: item.nameClass,
              rRule: item.rRule,
              subject: {
                id: item.subjects_id,
                label: `${item.nameSubject} | teacher is ${item.firstname} ${item.lastname}`,
                userId: item.user_id,
              },
              classroom: {
                id: item.classrooms_id,
                label: `${item.nameClassroom} | type is ${item.type}`,
              },
              user_id: item.user_id,
              nameSubject: item.nameSubject,
              nameClassroom: item.nameClassroom,
              classes_id: item.classes_id,
            };
          })
        : []
    );
    const l = getSchedulerTeacher.data
      ? getSchedulerTeacher.data.data.filter((item) => {
          return (
            new Date(item.startTime).toString().split(" ")[0] ==
              new Date().toString().split(" ")[0] && {
              id: 1,
              class: item.nameClassroom,
              time: `${item.startTime} to ${item.endTime}`,
              classroom: item.nameClassroom,
            }
          );
        })
      : [];
    if (l) {
      setDayT(
        l.map((item) => {
          return {
            id: 1,
            class: item.nameClass,
            time: `${new Date(item.startTime)
              .toLocaleTimeString()
              .slice(0, 5)} to ${new Date(item.endTime)
              .toLocaleTimeString()
              .slice(0, 5)}`,
            classroom: item.nameClassroom,
          };
        })
      );
    }
  }, [getSchedulerTeacher.data]);
  const [dayT, setDayT] = React.useState([]);
  const theme = useTheme();
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
      <Box sx={{ mt: 2, ml: 2 }}>
        <IconBreadcrumbs />
      </Box>
      <Grid container mt={2} spacing={2}>
        <Grid item xs={12} md={8}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container p={1}>
              <Grid
                item
                xs={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ backgroundColor: "#9e9e9e5c", p: 1 }}
              >
                <Typography
                  variant="h5"
                  mb="3.5px"
                  color="textPrimary"
                  alignSelf="center"
                >
                  Day Schedule
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ScheduleDay data={data} />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Day Timeline</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              {dayT.length > 0 ? (
                <Grid item xs={12}>
                  <TimelineDay day={dayT} />
                </Grid>
              ) : (
                <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height={300}
                >
                  <Typography variant="body1">No lessons today</Typography>
                </Grid>
              )}
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
      <Grid container mt={1} spacing={2}>
        <Grid item xs={12} md={4}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="subtitle1">Your Classes</Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer sx={{ maxHeight: "370px" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Class name</TableCell>
                        <TableCell>Level name</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{view}</TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell>Total Classes</TableCell>
                        <TableCell>
                          {getTeacherClasses.data &&
                            getTeacherClasses.data.data.length}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button variant="text" color="primary">
                  <Link component={RouterLink} to="/secretary/absence">
                    View All
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="subtitle1">Table of subjects</Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer sx={{ maxHeight: "370px" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Subject</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{view1}</TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell>Total subjects</TableCell>
                        <TableCell>
                          {getAllClasses.data && getAllClasses.data.data.length}
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button variant="text" color="primary">
                  <Link component={RouterLink} to="/secretary/lateness">
                    View All
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="subtitle1">Your textbook pages</Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer sx={{ maxHeight: "370px" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>class</TableCell>
                        <TableCell>Number of pages</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody></TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell>Total pages</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button variant="text" color="primary">
                  <Link component={RouterLink} to="/secretary/lateness">
                    View All
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
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
        component={RouterLink}
        to="/teacher"
      >
        <HomeIcon sx={{ mr: 0.5 }} color="primary" fontSize="medium" />
        Teacher
      </Link>
      <Link
        underline="hover"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "text.primary",
          fontWeight: "semi-bold",
        }}
        component={RouterLink}
        to="/admin"
      >
        <DashboardOutlined color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        Dashboard
      </Link>
    </Breadcrumbs>
  );
}

export default Dashboard;
