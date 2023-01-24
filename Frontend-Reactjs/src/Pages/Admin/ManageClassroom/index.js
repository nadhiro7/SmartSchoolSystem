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
import {
  Home as HomeIcon,
  Edit,
  Delete,
  Add,
} from "@mui/icons-material";
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
function Classroom() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [popType, setPopType] = React.useState({ action: "Add", item: null });
  const handleOpenAdd = () => {
    setOpen(true);
    setPopType({ action: "Add", item: null });
  };
  const handleOpenEdit = (item) => {
    setOpen(true);
    setPopType({ action: "Edit", item: item });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getAllClassrooms = useQuery("getAllClassrooms", async () => {
    return axios.get("http://localhost:8000/api/getAllClassrooms");
  });
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const deleteClassroom = (id) => {
    axios
      .delete("http://localhost:8000/api/deleteClassroom/" + id)
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
        getAllClassrooms.refetch();
      });
  }
  React.useEffect(() => {
    getAllClassrooms.refetch();
  }, [open]);
  const view = !getAllClassrooms.isLoading ? (
    getAllClassrooms.data.data.length !== 0 ? (
      getAllClassrooms.data.data.map((item, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.nameClassroom}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>
              <Actions
                deleteClassroom={deleteClassroom}
                theme={theme}
                item={item}
                handleOpen={handleOpenEdit}
              />
            </TableCell>
          </TableRow>
        );
      })
    ) : (
      <TableRow>
        <TableCell colSpan={4}>
          <Stack display={"flex"} alignItems="center" justifyContent={"center"}>
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
                    <Typography variant="subtitle1">Classrooms</Typography>
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
                        <TableCell>Classroom name</TableCell>
                        <TableCell>Classroom Type</TableCell>
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

     const handleClickOpen = (idd,lesson) => {
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
          props.handleOpen(props.item);
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
        sx={{
          borderRadius: "50% !important",
          width: "30px !important",
          height: "30px",
          color: "white",
          transition: "0.3s",
          backgroundColor: props.theme.palette.error.main,
        }} 
        onClick={handleClickOpen}
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
          <Typography variant="h5">Delete classroom</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" variant="subtitle1">
            Are you sure to delete this classroom?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={()=>{ props.deleteClassroom(props.item.id); }} autoFocus>
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
    value: props.action === "Add" ? "" : props.item.nameClassroom,
    valid: props.action === "Add" ? false : props.item.nameClassroom.length > 0,
  });
  const [type, setType] = React.useState({
    value: props.action === "Add" ? "" : props.item.type,
    valid: props.action === "Add" ? false : true,
  });
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const handleChange = (event) => {
    const { names, value } = event.target;
    setName({ value, valid: value.length > 0 });
  };
  const handleTypeChange = (event, newValue) => {
    setType({ value: newValue, valid: true });
  };
  const handleSubmitDisabled = () => {
    if (name.valid && type.valid) {
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
  }, [name, type]);
  const addClassroom = useQuery(
    "createClassroom",
    async () => {
      return axios.post("http://localhost:8000/api/storeClassroom", {
        nameClassroom: name.value,
        type: type.value,
      });
    },
    {
      enabled: false,
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
    }
  );
  const editClassroom = useQuery(
    "editClassroom",
    async () => {
      return axios.post("http://localhost:8000/api/updateClassroom", {
        nameClassroom: name.value,
        type: type.value,
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
    if (props.action === "Add") {
      addClassroom.refetch().then((res) => {
        if (res.data.data === "Your name is invalid") {
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
                Failed Add --
                <strong>check it out!</strong>
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
      editClassroom.refetch().then((res) => {
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
  const succes = <>{success}</>;
  React.useEffect(() => {});
  const handleCancel = () => {
    setName({
      value: props.action === "Add" ? "" : props.item.nameClassroom,
      valid:
        props.action === "Add" ? false : props.item.nameClassroom.length > 0,
    });
    setType({
      value: props.action === "Add" ? "" : props.item.type,
      valid: props.action === "Add" ? false : true,
    });
  };
  return (
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>
          <Typography variant="h4">{props.action} Classroom</Typography>
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
                  label="Classroom Name"
                  fullWidth
                />
                <Autocomplete
                  id="combo-box-demo"
                  options={typeOption}
                  onChange={handleTypeChange}
                  fullWidth
                  sx={{
                    borderRadius: `7px`,
                    bgcolor: theme.palette.primary.light,
                    "& input": {
                      bgcolor: theme.palette.primary.light,
                    },
                  }}
                  value={type.value}
                  renderInput={(params) => (
                    <TextFieldStyled {...params} label="Classroom Type" />
                  )}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} mb={2} display="flex" justifyContent="center">
              {succes}
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
const typeOption = ["Td", "Tp"];
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
        to="/admin/classrooms"
      >
        Classrooms
      </Link>
    </Breadcrumbs>
  );
}
export default Classroom;
