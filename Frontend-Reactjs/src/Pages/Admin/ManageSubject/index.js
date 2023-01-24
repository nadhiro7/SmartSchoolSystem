import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  TableContainer,
  Autocomplete,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Divider,
  Typography,
  ButtonBase,
  Stack,
  TextField,
  styled,
  Button,
  useTheme,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
  AlertTitle,
  DialogContentText,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { Home as HomeIcon, Edit, Delete, Add } from "@mui/icons-material";
import MainCard from "./../../../Components/MainCard";
import { shouldForwardProp } from "@mui/system";
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

function Subjects() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [popType, setPopType] = React.useState({ action: "Add", item: null });
  const handleOpenAdd = () => {
    setOpen(true);
    setPopType({ action: "Add", item: null });
  };
  const handleOpenEdit = (item, teacher, level) => {
    setOpen(true);
    setPopType({ action: "Edit", item: { ...item, teacher, level } });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getAllSubjects = useQuery("getAllSubjects", async () => {
    return axios.get("http://localhost:8000/api/getAllSubjects");
  });
  const deleteSubject = (id) => {
    axios
      .delete("http://localhost:8000/api/deleteSubject/" + id)
      .then((res) => {
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
          }, 4000);
        } else {
          if (res.data === "success") {
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
            }, 4000);
          }
        }
        getAllSubjects.refetch();
      });
  };
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const getLevelsById = useQuery("getLevelById", async () => {
    return axios.get("http://localhost:8000/api/getLevels");
  });
  const getTeacherById = useQuery("getTeacherById", async () => {
    return axios.get("http://localhost:8000/api/getAllTeachers");
  });
  React.useEffect(() => {
    getAllSubjects.refetch();
  }, [open]);
  const getLevel = (idLevel) => {
    if (getLevelsById.data) {
      const l = getLevelsById.data.data.filter((level) => {
        return level.id == idLevel;
      });
      return l[0].nameLevel;
    } else {
      return "";
    }
  };
  const getTeacher = (idTeacher) => {
    if (getTeacherById.data) {
      const l = getTeacherById.data.data.filter((techer) => {
        return techer.id == idTeacher;
      });
      return l[0] ? `${l[0].firstname} ${l[0].lastname}` : "";
    } else {
      return "";
    }
  };
  const view = !getAllSubjects.isLoading ? (
    getAllSubjects.data.data.length != 0 ? (
      getAllSubjects.data.data.map((item, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.nameSubject}</TableCell>
            <TableCell>{getLevel(item.level_id)}</TableCell>
            <TableCell>{item.coefficient}</TableCell>
            <TableCell>{getTeacher(item.user_id)}</TableCell>
            <TableCell>
              <Actions
                deleteSubject={deleteSubject}
                theme={theme}
                item={item}
                levelWit={getLevel(item.level_id)}
                teacherWit={getTeacher(item.user_id)}
                handleOpen={handleOpenEdit}
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
                    <Typography variant="subtitle1">Subjects</Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent={"end"}>
                    <ButtonBase
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleOpenAdd}
                      sx={{
                        borderRadius: "50% !important",
                        width: "30px !important",
                        height: "30px",
                        color: "white",
                        transition: "0.3s",
                        backgroundColor: theme.palette.secondary.dark,
                      }}
                    >
                      <Add fontSize="small" />
                    </ButtonBase>
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
                        <TableCell>Subject name</TableCell>
                        <TableCell>Level</TableCell>
                        <TableCell>Coefficient</TableCell>
                        <TableCell>Teachers</TableCell>
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
      <PopUp
        open={open}
        action={popType.action}
        item={popType.item}
        handleClose={handleClose}
      />
      {succes}
    </Box>
  );
}
function Actions(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (idd, lesson) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Stack spacing={1} direction="row">
      <ButtonBase
        aria-label="open drawer"
        edge="start"
        onClick={() => {
          props.handleOpen(props.item, props.teacherWit, props.levelWit);
        }}
        sx={{
          borderRadius: "50% !important",
          width: "30px !important",
          height: "30px",
          color: "white",
          transition: "0.3s",
          backgroundColor: props.theme.palette.warning.dark,
        }}
      >
        <Edit fontSize="small" />
      </ButtonBase>
      <ButtonBase
        aria-label="open drawer"
        edge="start"
        onClick={handleClickOpen}
        sx={{
          borderRadius: "50% !important",
          width: "30px !important",
          height: "30px",
          color: "white",
          transition: "0.3s",
          backgroundColor: props.theme.palette.error.main,
        }}
      >
        <Delete fontSize="small" />
      </ButtonBase>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5">Delete subject</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" variant="subtitle1">
            Are you sure to delete this subject?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button
            onClick={() => {
              props.deleteSubject(props.item.id);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
function PopUp(props) {
  const theme = useTheme();
  const [name, setName] = React.useState({
    value: props.action === "Add" ? "" : props.item.nameSubject,
    valid: props.action === "Add" ? false : props.item.nameSubject.length > 0,
  });
  const [level, setLevel] = React.useState({
    value: props.action === "Add" ? "" : props.item.level,
    valid: props.action === "Add" ? false : true,
  });
  const [teachers, setTeachers] = React.useState({
    value: props.action === "Add" ? "" : props.item.teacher,
    valid: props.action === "Add" ? false : true,
  });
  const [coefficient, setCoefficient] = React.useState({
    value: props.action === "Add" ? "" : props.item.coefficient,
    valid: props.action === "Add" ? false : true,
  });

  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const handleChange = (event) => {
    const { names, value } = event.target;
    setName({ value, valid: value.length > 0 });
  };
  const handleChangeCoefficient = (event) => {
    const { names, value } = event.target;
    setCoefficient({ value, valid: value.length > 0 });
  };
  const handleLevelChange = (event, newValue) => {
    setLevel({ value: newValue, valid: true });
  };
  const handleTeacherChange = (event, newValue) => {
    setTeachers({ value: newValue, valid: true });
  };
  const handleSubmitDisabled = () => {
    if (name.valid && level.valid) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };
  React.useEffect(() => {
    function doSomething() {
      handleCancel();
    }
    doSomething();
  }, [props]);
  React.useEffect(() => {
    handleSubmitDisabled();
  }, [name, level]);
  const handleCancel = () => {
    setName({
      value: props.action === "Add" ? "" : props.item.nameSubject,
      valid: props.action === "Add" ? false : props.item.nameSubject.length > 0,
    });
    setLevel({
      value: props.action === "Add" ? "" : props.item.level,
      valid: props.action === "Add" ? false : true,
    });
    setTeachers({
      value: props.action === "Add" ? "" : props.item.teacher,
      valid: props.action === "Add" ? false : true,
    });
    setCoefficient({
      value: props.action === "Add" ? "" : props.item.coefficient,
      valid: props.action === "Add" ? false : true,
    });
  };
  const getLevels = useQuery("getLevels", async () => {
    return axios.get("http://localhost:8000/api/getLevels");
  });
  const getTeachers = useQuery("getTeachers", async () => {
    return axios.get("http://localhost:8000/api/getAllTeachers");
  });
  const [levels, setLevels] = React.useState([]);
  React.useEffect(() => {
    setLevels(
      getLevels.data
        ? getLevels.data.data.map((item) => {
            return { id: item.id, label: item.nameLevel };
          })
        : []
    );
  }, [getLevels.data]);
  const [teachersOption, setTeachersOption] = React.useState([]);
  React.useEffect(() => {
    setTeachersOption(
      getTeachers.data
        ? getTeachers.data.data.map((item) => {
            return { id: item.id, label: `${item.firstname} ${item.lastname}` };
          })
        : []
    );
  }, [getTeachers.data]);
  const addClass = useQuery(
    "createSubject",
    async () => {
      return axios.post("http://localhost:8000/api/storeSubject", {
        name: name.value,
        level_id: level.value.id,
        user_id: teachers.value.id,
        coefficient: coefficient.value,
      });
    },
    {
      enabled: false,
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
    }
  );
  const editSubject = useQuery(
    "updateSubject",
    async () => {
      return axios.post("http://localhost:8000/api/updateSubject", {
        name: name.value,
        level_id: level.value.id ? level.value.id : props.item.level_id,
        user_id: teachers.value.id ? teachers.value.id : props.item.user_id,
        coefficient: coefficient.value,
        id: props.item.id,
      });
    },
    {
      enabled: false,
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
    }
  );
  const handleSubmit = () => {
    if (props.action == "Add") {
      addClass.refetch().then((res) => {
        if (res.data.data === "Your info is invalid") {
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
                info is invalid --
                <strong>please try again!</strong>
              </Alert>
            </Snackbar>
          );
          setTimeout(() => {
            setSuccess("");
            handleCancel();
            props.handleClose();
          }, 4000);
        } else {
          if (res.data.data) {
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
                  Successfully Add --<strong>check it out!</strong>
                </Alert>
              </Snackbar>
            );
            setTimeout(() => {
              setSuccess("");
              handleCancel();
              props.handleClose();
            }, 4000);
          }
        }
      });
    } else {
      editSubject.refetch().then((res) => {
        if (res.data.data === "doesnt exist") {
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
                Failed edit --
                <strong>Please try again!</strong>
              </Alert>
            </Snackbar>
          );
          setTimeout(() => {
            setSuccess("");
            handleCancel();
            props.handleClose();
          }, 4000);
        } else {
          if (res.data.data) {
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
                  Successfully edit --<strong>check it out!</strong>
                </Alert>
              </Snackbar>
            );
            setTimeout(() => {
              setSuccess("");
              handleCancel();
              props.handleClose();
            }, 4000);
          }
        }
      });
    }
  };
  const [success, setSuccess] = React.useState("");
  const succes = <Typography variant="h4">{success}</Typography>;
  return (
    <Dialog fullWidth open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        <Typography variant="h4">{props.action} Subject</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <Divider />
          </Grid>
          <Grid item xs={12} mb={2}>
            <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
              <TextFieldStyled
                value={name.value}
                onChange={handleChange}
                label="Subject Name"
                fullWidth
              />
              <Autocomplete
                id="combo-box-demo"
                options={levels}
                onChange={handleLevelChange}
                fullWidth
                sx={{
                  borderRadius: `7px`,
                  bgcolor: theme.palette.primary.light,
                  "& input": {
                    bgcolor: theme.palette.primary.light,
                  },
                }}
                value={level.value}
                renderInput={(params) => (
                  <TextFieldStyled {...params} label="Subject level" />
                )}
              />
              <TextFieldStyled
                value={coefficient.value}
                type="number"
                onChange={handleChangeCoefficient}
                label="Coefficient"
                fullWidth
              />
              <Autocomplete
                id="combo-box-demo"
                options={teachersOption}
                onChange={handleTeacherChange}
                fullWidth
                sx={{
                  borderRadius: `7px`,
                  bgcolor: theme.palette.primary.light,
                  "& input": {
                    bgcolor: theme.palette.primary.light,
                  },
                }}
                value={teachers.value}
                renderInput={(params) => (
                  <TextFieldStyled {...params} label="Teacher" />
                )}
              />
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Stack spacing={2} direction="row" sx={{}}>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitDisabled}
          >
            {props.action}
          </Button>
          <Button variant="contained" onClick={handleCancel}>
            Reset
          </Button>
        </Stack>
      </DialogActions>
      {succes}
    </Dialog>
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
        to="/admin"
      >
        <HomeIcon sx={{ mr: 0.5 }} color="primary" fontSize="medium" />
        Admin
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
        to="/admin/subjects"
      >
        Subjects
      </Link>
    </Breadcrumbs>
  );
}

export default Subjects;
