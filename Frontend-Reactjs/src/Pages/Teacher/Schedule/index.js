import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import {
  Home as HomeIcon,
  Person,
  Edit,
  Delete,
  Add,
  Close,
} from "@mui/icons-material";
import MainCard from "./../../../Components/MainCard";
import ScheduleTable from "./../../../Components/ScheduleTable";
import { useQuery } from "react-query";
import axios from "axios";
function Schedule() {
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const getSchedulerTeacher = useQuery("getSchedulerTeacher", async () => {
    return axios.get(
      "http://localhost:8000/api/getSchedulerTeacher/" + user.id
    );
  });
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
            };
          })
        : []
    );
  }, [getSchedulerTeacher.data]);
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
      <Grid container mt={2}>
        <Grid item xs={12}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} sx={{ backgroundColor: "#9e9e9e5c", p: 1 }}>
                <Typography variant="subtitle1">Your Schedule</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <ScheduleTable data={data} />
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
          fontSize: "0.9rem",
        }}
        component={RouterLink}
        to="/teacher/schedule"
      >
        Schedule
      </Link>
    </Breadcrumbs>
  );
}
export default Schedule;
