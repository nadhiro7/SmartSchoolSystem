import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  Autocomplete,
  styled,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableFooter,
  Divider,
  ClickAwayListener,
  Typography,
  Button,
  IconButton,
  TextField,
  Stack,
  useTheme,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Add,
  Edit,
  Delete,
  Close,
  VisibilityOutlined,
  Book,
} from "@mui/icons-material";
import { shouldForwardProp } from "@mui/system";
import MainCard from "../../../Components/MainCard";
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
function StudentMarks() {
  const params = useParams();
  const studentId = params.idStudent;
  const navigate = useNavigate();
  if (!studentId) {
    navigate(-1);
  }
  const getStudentFiles = useQuery(
    "getStudentFiles",
    async () => {
      return axios.get(
        "http://127.0.0.1:8000/api/getStudentReacords/" + studentId
      );
    },
    {
      refetchOnMount: true,
    }
  );
  const [noteFinal, setNoteFinal] = React.useState("/");

  React.useEffect(() => {
    if (getStudentFiles.data) {
      const s1 = getStudentFiles.data.data.filter((item) => {
        console.log(item);
        return item.season == "1";
      });
      const s2 = getStudentFiles.data.data.filter((item) => {
        return item.season == "2";
      });
      const s3 = getStudentFiles.data.data.filter((item) => {
        return item.season == "3";
      });
      if (s1[0] && s3[0] && s2[0]) {
        if (!s1[0].season_note || !s3[0].season_note || !s2[0].season_note) {
          setNoteFinal("/");
        } else {
          setNoteFinal(
            Math.fround(
              (s2[0].season_note + s1[0].season_note + s3[0].season_note) / 3
            )
          );
        }
      }
    }
  }, [getStudentFiles.data]);
  const notesVeiw = getStudentFiles.data
    ? getStudentFiles.data.data.map((item, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.season}</TableCell>
            <TableCell>{item.season_note}</TableCell>
            <TableCell>
              {" "}
              <Actions id={studentId} item={item} />{" "}
            </TableCell>
          </TableRow>
        );
      })
    : null;

  return (
    <>
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
                  <Grid container display="flex" alignItems="center">
                    <Grid item xs={11}>
                      <Typography variant="subtitle1">
                        Season Student Marks
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
                          <TableCell>Season</TableCell>
                          <TableCell>Note </TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>{notesVeiw}</TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell colSpan={1}></TableCell>
                          <TableCell>Total Note</TableCell>
                          <TableCell>{noteFinal}</TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Box>
    </>
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
        to="/parent/childrenFiles"
      >
        Children File
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
        to={"./allNotes/" + props.item.season}
      >
        View All Notes
      </Button>
    </Stack>
  );
}
export default StudentMarks;
