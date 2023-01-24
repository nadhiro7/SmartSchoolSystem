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
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
  AlertTitle,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Person,
  Edit,
  Delete,
  PersonAdd,
  VisibilityOutlined,
  Close,
} from "@mui/icons-material";
import { useQuery } from "react-query";
import axios from "axios";
import MainCard from "../../../Components/MainCard";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
function Students() {
  const theme = useTheme();
  const getLevels = useQuery("getLevels", async () => {
    return axios.get("http://localhost:8000/api/getLevels");
  });
  const getAllParents = useQuery("getParent", async () => {
    return axios.get("http://localhost:8000/api/getAllParent");
  });
  const getAllClasses = useQuery("getAllClasses", async () => {
    return axios.get("http://localhost:8000/api/getAllClasses");
  });
  const getAllStudentsIsNotValidate = useQuery(
    "getAllStudentsIsNotValidate",
    async () => {
      return axios.get("http://localhost:8000/api/getAllStudentsIsNotValidate");
    },
    {
      refetchOnMount: true,
    }
  );
  const getAllStudentsValid = useQuery(
    "getAllStudentsValid",
    async () => {
      return axios.get("http://localhost:8000/api/getAllStudents");
    },
    {
      refetchOnMount: true,
    }
  );
  const getLevel = (idLevel) => {
    if (getLevels.data) {
      const l = getLevels.data.data.filter((level) => {
        return level.id == idLevel;
      });
      return l[0].nameLevel;
    } else {
      return "";
    }
  }; 

  const view = !getAllStudentsIsNotValidate.isLoading ? (
    getAllStudentsIsNotValidate.data.data.length > 0 ? (
      getAllStudentsIsNotValidate.data.data.map((item, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{item.firstname}</TableCell>
            <TableCell>{item.lastname}</TableCell>
            <TableCell>{item.gender}</TableCell>
            <TableCell>
              {item.parentFirstname + " " + item.parentLastname}
            </TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              <ViewOpen
                item={item}
                parent={item.parentFirstname + " " + item.parentLastname}
                level={getLevel(item.level_id)}
                getAllStudentsValid={getAllStudentsValid}
                getAllStudentsIsNotValidate={getAllStudentsIsNotValidate}
              />
            </TableCell>
          </TableRow>
        );
      })
    ) : (
      <TableRow>
        <TableCell colSpan={6}>
          <Stack display={"flex"} alignItems="center" justifyContent={"center"}>
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
  );
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
                  <Grid item xs={11}>
                    <Typography variant="subtitle1">Students</Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent={"end"}>
                    <ButtonBase
                      aria-label="open drawer"
                      edge="start"
                      component={RouterLink}
                      to="./addStudent"
                      sx={{
                        borderRadius: "50% !important",
                        width: "30px !important",
                        height: "30px",
                        color: "white",
                        transition: "0.3s",
                        backgroundColor: theme.palette.secondary.dark,
                      }}
                    >
                      <PersonAdd fontSize="small" />
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <GridData
                  getLevels={getLevels}
                  getAllParents={getAllParents}
                  getAllClasses={getAllClasses}
                  getAllStudentsValid={getAllStudentsValid}
                  height={500}
                />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={12}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} sx={{ backgroundColor: "#9e9e9e5c", p: 1 }}>
                <Grid container display="flex" alignItems="center">
                  <Grid item xs={11}>
                    <Typography variant="subtitle1">
                      Students added by parent{" "}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <TableContainer sx={{ maxHeight: "370px" }}>
                  <Table stickyHeader>
                    <TableHead sx={{ bgColor: theme.palette.primary.light }}>
                      <TableRow>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Parent name</TableCell>
                        <TableCell>Email</TableCell>
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
        to="/secretary/students"
      >
        <Person color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        Students
      </Link>
    </Breadcrumbs>
  );
}

function ViewOpen(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button
        aria-label="view"
        color="secondary"
        variant="contained"
        onClick={handleOpen}
      >
        <VisibilityOutlined /> View Information
      </Button>
      <ClickAwayListener onClickAway={handleClose}>
        <PopUp
          open={open}
          getAllStudentsIsNotValidate={props.getAllStudentsIsNotValidate}
          student={props.item}
          parent={props.parent}
          level={props.level}
          getAllStudentsValid={props.getAllStudentsValid}
          handleClose={handleClose}
        />
      </ClickAwayListener>
    </>
  );
}

function PopUp(props) {
  const theme = useTheme();
  const validateStudent = useQuery(
    "validateStudent",
    async () => {
      console.log(props.student.id);
      return axios.post("http://localhost:8000/api/validateStudent", {
        id: props.student.id,
      });
    },
    {
      enabled: false,
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
    }
  );
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const validate = () => {
    validateStudent.refetch().then((res) => {
      props.getAllStudentsValid.refetch();
      props.getAllStudentsIsNotValidate.refetch();
      if (res.data.data == "success") {
        setSuccess(
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            autoHideDuration={3000}
          >
            <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
              <AlertTitle>Successfully</AlertTitle>
              parent is validate— <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        );
        setTimeout(() => {
          setSuccess("");
          props.handleClose();
        }, 500);
      } else {
        setSuccess(
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            autoHideDuration={500}
          >
            <Alert variant="filled" severity="error">
              <AlertTitle>failed</AlertTitle>
              Failed please try again— <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        );
        setTimeout(() => {
          setSuccess("");
          props.handleClose();
        }, 500);
      }
    });
  };
  const refuse = () => {
    axios
      .delete("http://localhost:8000/api/deleteStudent/" + props.student.id)
      .then((res) => {
        props.getAllStudentsValid.refetch();
        props.getAllStudentsIsNotValidate.refetch();
        if (res.data === "failed") {
          setSuccess(
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={true}
              autoHideDuration={5000}
            >
              <Alert variant="filled" severity="error">
                <AlertTitle>failed</AlertTitle>
                Failed refused
                <strong>check it out!</strong>
              </Alert>
            </Snackbar>
          );
          setTimeout(() => {
            setSuccess("");
            props.handleClose();
          }, 500);
        } else {
          if (res.data == "success") {
            setSuccess(
              <Snackbar
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={true}
                autoHideDuration={5000}
              >
                <Alert
                  variant="filled"
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  <AlertTitle>Successfully</AlertTitle>
                  Successfully refused<strong>check it out!</strong>
                </Alert>
              </Snackbar>
            );
            setTimeout(() => {
              setSuccess("");
              props.handleClose();
            }, 500);
          }
        }
      });
  };
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        <Typography variant="h4">Validate Student</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <Divider />
          </Grid>
          <Grid item xs={12} mb={2}>
            {props.student.image ? (
              <Avatar
                variant="rounded"
                src={"http://127.0.0.1:8000/public/" + props.student.image}
                sx={{ width: "80px", height: "80px" }}
              />
            ) : (
              <Avatar variant="rounded" sx={{ width: "80px", height: "80px" }}>
                {props.student.firstname.slice(0, 1).toLocaleUpperCase()}
              </Avatar>
            )}
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">First Name :</Typography>
            <Typography variant="subtitle">
              {props.student.firstname}
            </Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Last Name :</Typography>
            <Typography variant="subtitle">{props.student.lastname}</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Gender :</Typography>
            <Typography variant="subtitle">{props.student.gender}</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Parent Name :</Typography>
            <Typography variant="subtitle">{props.parent}</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Birthday :</Typography>
            <Typography variant="subtitle">{props.student.birthday}</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Email :</Typography>
            <Typography variant="subtitle">{props.student.email}</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Class :</Typography>
            <Typography variant="subtitle">none</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Level :</Typography>
            <Typography variant="subtitle">{props.level}</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Address :</Typography>
            <Typography variant="subtitle">{props.student.address}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Stack spacing={2} direction="row" sx={{}}>
          <Button
            variant="contained"
            sx={{ color: "white !important" }}
            color="success"
            onClick={validate}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={refuse}
          >
            Refuse
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to={`/secretary/students/editStudent/${props.student.id}`}
          >
            Edit
          </Button>
        </Stack>
      </DialogActions>
      {succes}
    </Dialog>
  );
} 

function GridData(props) {
  const theme = useTheme();
  const [students, setStudents] = React.useState({});
  const navigate = useNavigate();
  const [id, setId] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (idd) => {
    setId(idd);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteParent = () => {
    axios
      .delete("http://localhost:8000/api/deleteStudent/" + id)
      .then((res) => {
        props.getAllStudentsValid.refetch();
        if (res.data === "failed") {
          setSuccess(
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={true}
              autoHideDuration={5000}
            >
              <Alert variant="filled" severity="error">
                <AlertTitle>failed</AlertTitle>
                Failed Delete
                <strong>check it out!</strong>
              </Alert>
            </Snackbar>
          );
          setTimeout(() => {
            setSuccess("");
            handleClose()
          }, 4000);
        } else {
          if (res.data == "success") {
            setSuccess(
              <Snackbar
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={true}
                autoHideDuration={5000}
              >
                <Alert
                  variant="filled"
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  <AlertTitle>Successfully</AlertTitle>
                  Successfully Delete<strong>check it out!</strong>
                </Alert>
              </Snackbar>
            );
            setTimeout(() => {
              setSuccess("");
              handleClose()
            }, 4000);
          }
        }
      });
  }
  const getLevel = (idLevel) => {
    if (props.getLevels.data) {
      const l = props.getLevels.data.data.filter((level) => {
        return level.id == idLevel;
      });
      return l[0].nameLevel;
    } else {
      return "";
    }
  };
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const getClass = (idclass) => {
    if (props.getAllClasses.data) {
      const l = props.getAllClasses.data.data.filter((clas) => {
        return clas.id == idclass;
      });
      return l[0].nameClass;
    } else {
      return "";
    }
  };
  const columns = React.useMemo(() => [
    {
      field: "image",
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
      field: "id",
      headerName: "ID",
      width: 50,
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
      field: "age",
      headerName: "Age",
      type: "number",
      width: 50,
      headerClassName: "header-background",
      renderCell: (data) => {
        return (
          <Typography variant="body1">
            {data.row.birthday
              ? new Date().getFullYear() -
                new Date(data.row.birthday).getFullYear()
              : "null"}
          </Typography>
        );
      },
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 70,
      headerClassName: "header-background",
    },
    {
      field: "parent",
      headerName: "Parent Name",
      width: 130,
      sortable: false,
      headerClassName: "header-background",
      renderCell: (data) => {
        return (
          <Typography variant="body1">{data.row.parentFirstname +" " +data.row.parentLastname}</Typography>
        );
      },
    },
    {
      field: "class",
      headerName: "Class",
      width: 100,
      headerClassName: "header-background",
      renderCell: (data) => {
        return (
          <Typography variant="body1">
            {getClass(data.row.classes_id)}
          </Typography>
        );
      },
    },
    {
      field: "level",
      headerName: "Level",
      width: 100,
      headerClassName: "header-background",
      renderCell: (data) => {
        return (
          <Typography variant="body1">{getLevel(data.row.level_id)}</Typography>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 140,
      headerClassName: "header-background",
    },
    {
      field: "address",
      headerName: "Address",
      width: 140,
      headerClassName: "header-background",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      headerClassName: "header-background",
      sortable: false,
      renderCell: (data) => {
        return (
          <ButtonGroup>
            <IconButton
              aria-label="delete"
              onClick={() => handleClickOpen(data.row.id)}
              color="error"
              variant="contained"
            >
              <Delete />
            </IconButton>
            <IconButton
              aria-label="edit"
              color="orange"
              component={RouterLink}
              to={`/secretary/students/editStudent/${data.row.id}`}
            >
              <Edit />
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ]);
  React.useEffect(() => {});
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
        rows={
          props.getAllStudentsValid.data
            ? props.getAllStudentsValid.data.data
            : {}
        }
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        loading={props.getAllStudentsValid.isLoading}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5">Delete student</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" variant="subtitle1">
            Are you sure to delete student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={deleteParent} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {succes}
    </Box>
  );
}
export default Students;
