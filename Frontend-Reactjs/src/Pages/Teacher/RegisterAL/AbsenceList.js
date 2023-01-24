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
  ClickAwayListener,
  Typography,
  Button,
  IconButton,
  ButtonGroup,
  Stack,
  useTheme,
  Snackbar,
  Alert,
  AlertTitle
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink,useParams } from "react-router-dom";
import {
  Home as HomeIcon,
  Person,
  Edit,
  NotificationAdd,
  PersonAdd,
  VisibilityOutlined, 
  Close,
} from "@mui/icons-material";
import { useQuery } from "react-query";
import axios from "axios";
import MainCard from "../../../Components/MainCard";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
function AbsenceList() {
  const params = useParams();
  const classId = params.classId;
  const lessonId = params.lessonId;
  const fillLessonRegister = useQuery("fillLessonRegister", async () => {
    return axios.get(
      "http://localhost:8000/api/fillLessonRegister/" + classId + "/" + lessonId
    );
  });
  const showLessonRegister = useQuery("showLessonRegister", async () => {
    return axios.get(
      "http://localhost:8000/api/showLessonRegister/" + lessonId
    );
  },{
    enabled: false,
  });
  const editLessonRegister = useQuery(
    "editLessonRegister",
    async () => {
      return axios.post(
        "http://localhost:8000/api/editLessonRegister/",{
          lessonId: lessonId,
          data: data1
        }
      );
    },
    {
      enabled: false,
    }
  );
  const [data, setData] = React.useState([]);
  const [data1, setData1] = React.useState([]);
  React.useEffect(() => {
    showLessonRegister.refetch().then(res=>{
      if (res.data) {
        if (res.data.data) {
          setData(res.data.data);
        }
      }
    })
  }, []);
   const [selected, setSelected] = React.useState([]);
   const [selectedIds, setSelectedIds] = React.useState([]);
  React.useEffect(() => {
    function doSomething() {
      setData1(data);
    }
    doSomething();
  }, [data, selectedIds]);
 
  const marksAbsence= ()=>{
    data.map((row)=>{
      if (selectedIds.has(row.id)) {
        row.state = "absent";
      }
      return row;
    })
    setSelectedIds([]);
    setSelected([]);
  }
  const marksLatness = () => {
    data.map((row) => {
      if (selectedIds.has(row.id)) {
        row.state = "late";
      }
      return row;
    });
    setSelectedIds([]);
    setSelected([]);
  };
  const reset = () => {
    data.map((row) => {
      if (selectedIds.has(row.id)) {
        row.state = "present";
      }
      return row;
    });
    setSelectedIds([]);
    setSelected([]);
  };
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const saveData = ()=>{
    editLessonRegister.refetch().then(res=>{
      if (res.data.data === "success") {
        setSuccess(
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={true}
            autoHideDuration={5000}
          >
            <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
              <AlertTitle>Successfully</AlertTitle>
              Successfully Save --<strong>check it out!</strong>
            </Alert>
          </Snackbar>
        );
        setTimeout(() => {
          setSuccess("");
        }, 4000);
      } else {
        setSuccess(
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={true}
            autoHideDuration={5000}
          >
            <Alert variant="filled" severity="error">
              <AlertTitle>failed</AlertTitle>
              Failed Save --
              <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        );
        setTimeout(() => {
          setSuccess("");
        }, 4000);
      }
      showLessonRegister.refetch();
    });
  }
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
      <Grid container mt={2}>
        <Grid item xs={12}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} sx={{ backgroundColor: "#9e9e9e5c", p: 1 }}>
                <Grid container display="flex" alignItems="center">
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Students</Typography>
                  </Grid>
                  <Grid item xs={9} display={"flex"} justifyContent="end">
                    <Stack spacing={1} direction="row">
                      <Button
                        color="primary"
                        variant="contained"
                        sx={{
                          transition: "0.3s",
                        }}
                        onClick={marksAbsence}
                      >
                        Marks are Absence
                      </Button>
                      <Button
                        color="primary"
                        variant="contained"
                        sx={{
                          transition: "0.3s",
                        }}
                        onClick={marksLatness}
                      >
                        Marks are Lateness
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <GridData
                  data={data1}
                  setSelectedIds={setSelectedIds}
                  selected={selected}
                  setSelected={setSelected}
                  height={500}
                />
              </Grid>
              <Grid item xs={12} mt={1} display="flex" justifyContent="end">
                <Stack spacing={1} direction="row">
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{
                      transition: "0.3s",
                    }}
                    onClick={reset}
                  >
                    Reset
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    sx={{
                      transition: "0.3s",
                    }}
                    onClick={saveData}
                  >
                    Save
                  </Button>
                </Stack>
              </Grid>
            </Grid>
            {succes}
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
        to="/teacher/Register"
      >
        Register
      </Link>
    </Breadcrumbs>
  );
}
function GridData(props) {
  const theme = useTheme();
  const notifyParent = React.useCallback(() => () => {});
  const columns = React.useMemo(() => [
    {
      field: "avatar",
      headerName: "#",
      width: 50,
      renderCell: (data) => {
        return data.value ? (
          <Avatar
            variant="rounded"
            src={"http://127.0.0.1:8000/public/" + data.value}
            sx={{ width: "40px", height: "40px" }}
          />
        ) : (
          <Avatar variant="rounded" sx={{ width: "40px", height: "40px" }}>
            {data.row.firstname.slice(0, 1).toLocaleUpperCase()}
          </Avatar>
        );
      },
      sortable: false,
      headerClassName: "header-background",
    },
    {
      field: "firstname",
      headerName: "First name",
      width: 100,
      headerClassName: "header-background",
    },
    {
      field: "lastname",
      headerName: "Last name",
      width: 100,
      headerClassName: "header-background",
    },
    {
      field: "state",
      headerName: "State",
      width: 100,
      headerClassName: "header-background",
    },
    {
      field: "isJustify",
      headerName: "Is Justify",
      width: 100,
      headerClassName: "header-background",
      renderCell: (data) => {
        return (
          <Typography variant="body1">
            {data.value == 0 ? "No" : "yes"}
          </Typography>
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
        rows={props.data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          props.setSelectedIds(selectedIDs);
          props.setSelected(ids);
        }}
        selectionModel={props.selected}
      />
    </Box>
  );
}
export default AbsenceList;
