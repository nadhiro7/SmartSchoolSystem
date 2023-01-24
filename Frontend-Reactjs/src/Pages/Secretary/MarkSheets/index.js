import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  Avatar,
  ButtonBase,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Popover,
  Divider,
  TextField,
  Typography,
  Button,
  IconButton,
  ButtonGroup,
  Stack,
  useTheme,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import {
  Home as HomeIcon,
  Delete,
  Edit,
  VisibilityOutlined,
  Add,
  Close,
} from "@mui/icons-material";
import { useQuery } from "react-query";
import axios from "axios";
import MainCard from "../../../Components/MainCard";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
function MarkSheets() {
  const getSchoolRecordsNote = useQuery(
    "getStudentRecords",
    async () => {
      return axios.get("http://localhost:8000/api/getSchoolRecordsNote");
    },
    {
      refetchOnMount: true,
    }
  );
  const getAllStudentFiles = useQuery(
    "getAllStudentFiles",
    async () => {
      return axios.get("http://localhost:8000/api/getAllStudentFiles");
    },
    {
      refetchOnMount: true,
    }
  );
  React.useEffect(() => {
    if (getAllStudentFiles.data) {
      setStudentData(getAllStudentFiles.data.data);
    }
  }, [getAllStudentFiles.data]);
  React.useEffect(() => {
    if (getSchoolRecordsNote.data) {
      setStudentNotes(getSchoolRecordsNote.data.data);
    }
  }, [getSchoolRecordsNote.data]);
  const [studentData, setStudentData] = React.useState([]);
  const [studentNotes, setStudentNotes] = React.useState([]);
  const theme = useTheme();
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
                    <Grid item xs={10}>
                      <Typography variant="subtitle1">Students note</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <GridData
                    studentData={studentData}
                    studentNotes={studentNotes}
                    height={500}
                    isLoading={
                      getAllStudentFiles.isLoading &&
                      getSchoolRecordsNote.isLoading
                    }
                  />
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
        to="/secretary"
      >
        <HomeIcon sx={{ mr: 0.5 }} color="primary" fontSize="medium" />
        Secretary
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
        to="/secretary/markSheets"
      >
        MarkSheets
      </Link>
    </Breadcrumbs>
  );
}

function GridData(props) {
  const theme = useTheme();
  const getSession = (iduser) => {
    if (props.studentNotes) {
      const l = props.studentNotes.filter((note) => {
        return note.student_id == iduser;
      });
      return l[0] ? l[0].session : "/";
    } else {
      return "";
    }
  };
  const getSeason = (season, studentid) => {
    if (props.studentNotes) {
      const l = props.studentNotes.filter((note) => {
        return note.season == season && note.student_id == studentid;
      });
      return l[0] ? (l[0].season_note ? l[0].season_note : "/") : "/";
    } else {
      return "";
    }
  };
  const calculNoteFinal = (note1, note2, note3) => {
    if (note1 == "/" || note2 == "/" || note3 == "/") {
      return "/";
    } else {
      return Math.fround((note1 + note2 + note3) / 3);
    }
  };
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (props.studentData) {
      setData(
        props.studentData.map((student) => {
          return {
            id: student.id,
            student: student.firstname + " " + student.lastname,
            level: student.nameLevel,
            school: getSession(student.id),
            season1: getSeason("1", student.id),
            season2: getSeason("2", student.id),
            season3: getSeason("3", student.id),
            note: calculNoteFinal(
              getSeason("1", student.id),
              getSeason("2", student.id),
              getSeason("3", student.id)
            ),
          };
        })
      );
    }
    console.log(data);
  }, [props.studentData, props.studentNotes]);
  const columns = React.useMemo(() => [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      headerClassName: "header-background",
    },
    {
      field: "student",
      headerName: "Student name",
      width: 180,
      headerClassName: "header-background",
    },
    {
      field: "level",
      headerName: "level",
      width: 160,
      headerClassName: "header-background",
    },
    {
      field: "school",
      headerName: "Years schoolers",
      width: 150,
      headerClassName: "header-background",
    },
    {
      field: "season1",
      headerName: "Season 1 Note",
      width: 100,
      headerClassName: "header-background",
    },
    {
      field: "season2",
      headerName: "Season 2 Note",
      width: 100,
      headerClassName: "header-background",
    },
    {
      field: "season3",
      headerName: "Season 3 Note",
      width: 100,
      headerClassName: "header-background",
    },
    {
      field: "note",
      headerName: "Final Note",
      width: 100,
      headerClassName: "header-background",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      headerClassName: "header-background",
      renderCell: (data) => {
        return (
          <Button
            variant="contained"
            component={RouterLink}
            to={"./studentMarks/" + data.row.id}
            color="primary"
          >
            View Content
          </Button>
        );
      },
    },
  ]);
  return (
    <Box
      sx={{
        mt: 2,
        height: props.height,
        width: "100%",
        "& .header-background": {
          backgroundColor: theme.palette.primary.light,
        },
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        loading={props.isLoading}
      />
    </Box>
  );
}
export default MarkSheets;
