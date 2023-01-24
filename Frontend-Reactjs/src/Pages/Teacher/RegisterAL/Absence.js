import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  styled,
  Autocomplete,
  TextField,
  ButtonBase,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Popover,
  Divider,
  ClickAwayListener,
  Typography,
  Button,
  CircularProgress,
  ButtonGroup,
  Stack,
  useTheme,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Add,
  Close,
  Delete,
  PersonAdd,
  VisibilityOutlined,
  List,
} from "@mui/icons-material";
import MainCard from "../../../Components/MainCard";
import { shouldForwardProp } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker, TimePicker, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import axios from "axios";
const TextFieldStyled = styled(TextField, { shouldForwardProp })(
  ({ theme }) => ({
    background: theme.palette.primary.light,
    borderRadius: `7px`,
    "& .MuiInputBase-input": {
      background: theme.palette.primary.light,
    },
  })
);
function Absence() {
  const theme = useTheme();
  const classId = useParams().classId;
  const user = JSON.parse(localStorage.getItem("user"));
  const showTeacherLessons = useQuery("showTeacherLessons", async () => {
    return axios.get(
      "http://localhost:8000/api/showTeacherLessons/" + classId + "/" + user.id
    );
  });
  const view = showTeacherLessons.data ? (
    !showTeacherLessons.isLoading ? (
      showTeacherLessons.data.data.length > 0 ? (
        showTeacherLessons.data.data.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.nameSubject}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell>{item.startTime}</TableCell>
              <TableCell>{item.endTime}</TableCell>
              <TableCell>
                <Actions id={item.id} classId={classId}></Actions>
              </TableCell>
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={6}>
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
        <TableCell colSpan={6}>
          <Stack display={"flex"} alignItems="center" justifyContent={"center"}>
            <CircularProgress color="secondary" />
          </Stack>
        </TableCell>
      </TableRow>
    )
  ) : null;

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
        <IconBreadcrumbs id={classId} />
      </Box>
      <Grid container mt={2}>
        <Grid item xs={12}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} sx={{ backgroundColor: "#9e9e9e5c", p: 1 }}>
                <Grid container display="flex" alignItems="center">
                  <Grid item xs={11}>
                    <Typography variant="subtitle1">
                      Register absence class 1
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <TableContainer sx={{ minHeight: "370px" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Lesson</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Lesson Start Time</TableCell>
                        <TableCell>Lesson End Time</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{view}</TableBody>
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
function IconBreadcrumbs(props) {
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
        to="/teacher/register"
      >
        <List color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        Register
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
        to={`/teacher/register/absence/${props.id}`}
      >
        <List color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        Absence and lateness
      </Link>
    </Breadcrumbs>
  );
}
function Actions(props) {
  return (
    <Stack spacing={1} direction="row">
      <Button
        color="primary"
        variant="contained"
        sx={{
          transition: "0.3s",
        }}
        component={RouterLink}
        to={`/teacher/register/absenceAndLateness/${props.classId}/absenceAndLatenessList/${props.id}`}
      >
        Fill Lesson Register
      </Button>
    </Stack>
  );
}
export default Absence;
