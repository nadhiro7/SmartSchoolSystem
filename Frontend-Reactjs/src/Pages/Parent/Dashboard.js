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
import AdminCard1 from "../../Components/AdminComponents/AdminCard1";
import AdminCard2 from "../../Components/AdminComponents/AdminCard2";
function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const showNumberOfAbsenceParent = useQuery(
    "showNumberOfAbsenceParent",
    async () => {
      return axios.get(
        "http://localhost:8000/api/showNumberOfAbsenceParent/" + user.id
      );
    }
  );
  const view = showNumberOfAbsenceParent.data ? (
    !showNumberOfAbsenceParent.isLoading ? (
      showNumberOfAbsenceParent.data.data.length > 0 ? (
        showNumberOfAbsenceParent.data.data.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.numberofabsent}</TableCell>
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
  const getStudentValidNumber = useQuery("getStudentValidNumber", async () => {
    return axios.get(
      "http://localhost:8000/api/getStudentValidNumber/" + user.id
    );
  });
  const getStudentInvalidNumber = useQuery(
    "getStudentInvalidNumber",
    async () => {
      return axios.get(
        "http://localhost:8000/api/getStudentInvalidNumber/" + user.id
      );
    }
  );
  const showNumberOfLateParent = useQuery(
    "showNumberOfLateParent",
    async () => {
      return axios.get(
        "http://localhost:8000/api/showNumberOfLateParent/" + user.id
      );
    }
  );
  const getStudentSubjects = useQuery("getStudentSubjects", async () => {
    return axios.get("http://localhost:8000/api/getStudentSubjects/" + user.id);
  });
  const view2 = getStudentSubjects.data ? (
    !getStudentSubjects.isLoading ? (
      getStudentSubjects.data.data.length > 0 ? (
        getStudentSubjects.data.data.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.classes}</TableCell>
              <TableCell>{item.nameLevel}</TableCell>
              <TableCell>{item.subjects}</TableCell>
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={4}>
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
        <TableCell colSpan={4}>
          <Stack display={"flex"} alignItems="center" justifyContent={"center"}>
            <CircularProgress color="secondary" />
          </Stack>
        </TableCell>
      </TableRow>
    )
  ) : null;
  const view1 = showNumberOfLateParent.data ? (
    !showNumberOfLateParent.isLoading ? (
      showNumberOfLateParent.data.data.length > 0 ? (
        showNumberOfLateParent.data.data.map((item, index) => {
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
        <Grid item xs={12} md={6}>
          <AdminCard1
            title="Valid Children"
            newTitle="This number represnts your children valid"
            number={
              getStudentValidNumber.data && getStudentValidNumber.data.data
            }
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AdminCard2
            title="Invalid Children"
            newTitle="This number represnts your invalid children"
            number={
              getStudentInvalidNumber.data && getStudentInvalidNumber.data.data
            }
          />
        </Grid>
      </Grid>
      <Grid container mt={1} spacing={2}>
        <Grid item xs={12} md={6}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="subtitle1">
                  Your children absent
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer sx={{ maxHeight: "370px" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Number of absence</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{view}</TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={6}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="subtitle1">
                  Your children lateness
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer sx={{ maxHeight: "370px" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Number of lateness</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{view1}</TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
      <Grid container mt={1} spacing={2}>
        <Grid item xs={12}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="subtitle1">
                  Your Children classes
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer sx={{ maxHeight: "370px" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Class name</TableCell>
                        <TableCell>Level</TableCell>
                        <TableCell>Nimber of subjects</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{view2}</TableBody>
                  </Table>
                </TableContainer>
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
        to="/parent"
      >
        <HomeIcon sx={{ mr: 0.5 }} color="primary" fontSize="medium" />
        Parent
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
        to="/parent"
      >
        <DashboardOutlined color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        Dashboard
      </Link>
    </Breadcrumbs>
  );
}
export default Dashboard;
