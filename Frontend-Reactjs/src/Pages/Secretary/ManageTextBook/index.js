import React from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
  AlertTitle,
  DialogContentText,
  CircularProgress,
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
  Popover,
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
import { Link as RouterLink } from "react-router-dom";
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
function TextBook() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getAllClasses = useQuery("getAllClasses", async () => {
    return axios.get("http://localhost:8000/api/getAllClasses");
  });
  const showBooks = useQuery("showBooks", async () => {
    return axios.get("http://localhost:8000/api/showBooks");
  });
  const destroyBook = React.useCallback((id) => () => {
    axios.delete("http://localhost:8000/api/destroyBook/" + id).then((res) => {
      console.log(res.data);
      showBooks.refetch();
      setSuccess(
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          autoHideDuration={5000}
        >
          <Alert variant="filled" severity="success">
            <AlertTitle>Delete</AlertTitle>
            Successfully delete— <strong>check it out!</strong>
          </Alert>
        </Snackbar>
      );
      setTimeout(() => {
        setSuccess("");
      }, 4000);
    });
  });
  React.useEffect(() => {
    showBooks.refetch();
  }, [open]);
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const theme = useTheme();
  const view = !showBooks.isLoading ? (
    showBooks.data.data.length > 0 ? (
      showBooks.data.data.map((item, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.nameClass}</TableCell>
            <TableCell>{item.nameLevel}</TableCell>
            <TableCell>
              <Actions destroyBook={destroyBook} theme={theme} item={item} />
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
                        All Classes textbook
                      </Typography>
                    </Grid>
                    <Grid>
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={handleOpen}
                        sx={{
                          transition: "0.3s",
                        }}
                      >
                        <Add />
                        Add
                      </Button>
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
                          <TableCell>Class name</TableCell>
                          <TableCell>Level </TableCell>
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
      <PopUp
        open={open}
        getAllClasses={getAllClasses}
        handleClose={handleClose}
      />
      {succes}
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
        to="/secretary/textbooks"
      >
        <Book color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        Textbooks
      </Link>
    </Breadcrumbs>
  );
}
function PopUp(props) {
  const theme = useTheme();
  console.log(props.item);
  const [classe, setClasse] = React.useState({ value: "", valid: false });

  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const handleLevelChange = (event, newValue) => {
    setClasse({ value: newValue, valid: true });
  };
  const handleSubmitDisabled = () => {
    if (classe.valid) {
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
    setAllClasses(
      props.getAllClasses.data
        ? props.getAllClasses.data.data.map((item) => {
            return {
              id: item.id,
              label: item.nameClass + " " + item.nameLevel,
            };
          })
        : []
    );
  }, [props.getAllClasses.data]);
  const addBook = useQuery(
    "addBook",
    async () => {
      return axios.post("http://localhost:8000/api/addBook", {
        id: classe.value.id,
      });
    },
    {
      enabled: false,
      cacheTime: 0,
      staleTime: 0,
      keepPreviousData: false,
    }
  );
  const [allClasses, setAllClasses] = React.useState([]);
  React.useEffect(() => {
    handleSubmitDisabled();
    // console.log(  );
  }, [classe]);
  const handleCancel = () => {
    setClasse({ value: "", valid: false });
  };
  const handleSubmit = () => {
    addBook.refetch().then((res) => {
      if (res.data.data == 0) {
        setSuccess(
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={true}
            autoHideDuration={5000}
          >
            <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
              <AlertTitle>Successfully</AlertTitle>
              Textbook add Successfully— <strong>check it out!</strong>
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
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={true}
            autoHideDuration={5000}
          >
            <Alert variant="filled" severity="error">
              <AlertTitle>failed</AlertTitle>
              Failed theTextbook already exist—
              <strong>check it out!</strong>
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
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        <Typography variant="h4">Add class textbook</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid minWidth={250} container>
          <Grid item xs={12} mb={2}>
            <Divider />
          </Grid>
          <Grid item xs={12} mb={2}>
            <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
              <Autocomplete
                id="combo-box-demo"
                options={allClasses}
                onChange={handleLevelChange}
                fullWidth
                sx={{
                  borderRadius: `7px`,
                  bgcolor: theme.palette.primary.light,
                  "& input": {
                    bgcolor: theme.palette.primary.light,
                  },
                }}
                value={classe.value}
                renderInput={(params) => (
                  <TextFieldStyled {...params} label="Choose Class" />
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
            Add
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
function Actions(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (idd) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteText = () => {
    props.destroyBook(props.item.class_id);
  };
  return (
    <Stack spacing={1} direction="row">
      <Button
        color="primary"
        variant="contained"
        sx={{
          transition: "0.3s",
        }}
        component={RouterLink}
        to={`/secretary/textbooks/textbookPages/${props.item.class_id}`}
      >
        View TextBook
      </Button>
      <Button
        color="error"
        variant="contained"
        sx={{
          transition: "0.3s",
        }}
        onClick={handleClickOpen}
      >
        <Delete />
        Delete
      </Button>
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
          <Button onClick={props.destroyBook(props.item.class_id)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
export default TextBook;
