import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  Popover,
  TableContainer,
  TableFooter,
  Autocomplete,
  Table,
  TableRow,
  TableBody,
  TableHead,
  IconButton,
  TableCell,
  Divider,
  Typography,
  ButtonBase,
  Stack,
  TextField,
  styled,
  Button,
  useTheme,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Person,
  Edit,
  Delete,
  Add,
  Close,
} from "@mui/icons-material";
import MainCard from "./../../../Components/MainCard";
import { DataGrid } from "@mui/x-data-grid";
import { shouldForwardProp } from "@mui/system";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../../../Components/Loadable";
const TextFieldStyled = styled(TextField, { shouldForwardProp })(
  ({ theme }) => ({
    background: theme.palette.primary.light,
    borderRadius: `7px`,
    "& .MuiInputBase-input": {
      background: theme.palette.primary.light,
    },
  })
);

function AllNote() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [brightness, setBrightness] = React.useState(1);
  const [popType, setPopType] = React.useState({ action: "Add", item: null });
  const params = useParams();
  const studentId = params.idStudent;
  const season = params.season;
  const getStudentNotes = useQuery(
    "getStudentNotes",
    async () => {
      return axios.post("http://127.0.0.1:8000/api/getMarkSheetStudent", {
        id: studentId,
        season: +season,
      });
    },
    {
      refetchOnMount: true,
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
    }
  );

  const view = !getStudentNotes.isLoading ? (
    getStudentNotes.data.data != [] ? (
      getStudentNotes.data.data.map((item, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.nameSubject}</TableCell>
            <TableCell>{item.coefficient}</TableCell>
            <TableCell>{item.firstname + " " + item.lastname}</TableCell>
            <TableCell>{item.Ev}</TableCell>
            <TableCell>{item.test}</TableCell>
            <TableCell>{item.exam}</TableCell>
            <TableCell>{item.grade}</TableCell>
            <TableCell>{item.noteTotal}</TableCell>
            <TableCell>{item.comment}</TableCell>
          </TableRow>
        );
      })
    ) : (
      <TableRow>
        <TableCell colSpan={2}></TableCell>
        <TableCell>No data to show</TableCell>
        <TableCell colSpan={1}></TableCell>
      </TableRow>
    )
  ) : (
    <h1>isLoading</h1>
  );

  return (
    <Box
      sx={{
        filter: `brightness(${brightness})`,
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
                <Grid container display="flex" alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      All Student Season Notes
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
                        <TableCell></TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Coefficient</TableCell>
                        <TableCell>Teachers</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Test</TableCell>
                        <TableCell>Exam</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Total Note</TableCell>
                        <TableCell>Comment</TableCell>
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
          fontSize: "0.9rem",
        }}
        component={RouterLink}
        to="/parent/childrenFiles"
      >
        Children Files
      </Link>
    </Breadcrumbs>
  );
}
export default AllNote;
