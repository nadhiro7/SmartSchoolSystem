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
  const [popType, setPopType] = React.useState({ action: "Add", item: null });
  const params = useParams();
  const studentId = params.idStudent;
  const season = params.season;
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
  const getAllSubjects = useQuery(
    "getAllSubjects",
    async () => {
      return axios.get("http://127.0.0.1:8000/api/getAllSubjects");
    },
    {
      refetchOnMount: true,
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
    }
  );
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
  const updateSeasonNote = useQuery(
    "updateSeasonNote",
    async () => {
      return axios.post("http://127.0.0.1:8000/api/updateSeasonNote", {
        id: studentId,
        season: +season,
        season_note: seasonNote / seasonCoef,
      });
    },
    {
      enabled: false,
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
    }
  );
  const savsSeasonNote = () => {
    updateSeasonNote.refetch();
  };
  const deleteMark = React.useCallback((id) => () => {
    axios
      .delete("http://localhost:8000/api/deleteMarksheet/" + id)
      .then((res) => {
        getStudentNotes.refetch();
      });
  });
  const view = !getStudentNotes.isLoading ? (
    getStudentNotes.data.data.length>0 ? (
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
            <TableCell>{item.comment}</TableCell>
            <TableCell>{item.noteTotal}</TableCell>
            <TableCell>
              {" "}
              <Actions
                theme={theme}
                item={item}
                handleOpen={handleOpenEdit}
                deleteMark={deleteMark}
              />{" "}
            </TableCell>
          </TableRow>
        );
      })
    ) : (
      <TableRow>
        <TableCell colSpan={11}>
          <Stack display={"flex"} alignItems="center" justifyContent={"center"}>
            No data to show
          </Stack>
        </TableCell>
      </TableRow>
    )
  ) : (
    <TableRow>
      <TableCell colSpan={11}>
        <Stack display={"flex"} alignItems="center" justifyContent={"center"}>
          <CircularProgress color="secondary" />
        </Stack>
      </TableCell>
    </TableRow>
  );
  const [seasonNote, setSeasonNote] = React.useState(0);
  const [seasonCoef, setSeasonCoef] = React.useState(0);
  React.useEffect(() => {
    if (getStudentNotes.data) {
      let notes = 0;
      let coef = 0;
      console.log(coef);
      console.log(notes);
      getStudentNotes.data.data.forEach((element) => {
        notes = notes + parseFloat(element.noteTotal * element.coefficient);
      });
      setSeasonNote(notes);
      getStudentNotes.data.data.forEach((element) => {
        coef = coef + parseInt(element.coefficient);
      });
      setSeasonCoef(coef);
    }
  }, [getStudentNotes.data]);
  React.useEffect(() => {
    function doSomething() {
      getStudentNotes.refetch();
    }
    doSomething();
  }, [open]);

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
                    <Typography variant="subtitle1">
                      All Student Season Notes
                    </Typography>
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
                        <TableCell></TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Coefficient</TableCell>
                        <TableCell>Teachers</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Test</TableCell>
                        <TableCell>Exam</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Total Note</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{view}</TableBody>
                    <TableFooter>
                      <TableCell colSpan={1}></TableCell>
                      <TableCell>Total Coefficient</TableCell>
                      <TableCell>{seasonCoef}</TableCell>
                      <TableCell colSpan={5}></TableCell>
                      <TableCell>Season Note</TableCell>
                      <TableCell>{seasonNote / seasonCoef}</TableCell>
                      <TableCell colSpan={1}>
                      </TableCell>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent={"end"}>
                <Button onClick={savsSeasonNote} variant="contained">
                  Save Season note
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
      <PopUp
        open={open}
        action={popType.action}
        item={popType.item}
        student_id={studentId}
        season={season}
        handleClose={handleClose}
        getAllSubjects={getAllSubjects}
      />
    </Box>
  );
}
function Actions(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
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
          <Typography variant="h5">Delete Note</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" variant="subtitle1">
            Are you sure to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={props.deleteMark(props.item.id)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
function PopUp(props) {
  const theme = useTheme();
  console.log(props.item);
  const [rate, setRate] = React.useState({
    value: props.action === "Add" ? "" : +props.item.Ev,
    valid: props.action === "Add" ? false : true,
  });
  const [subject, setSubject] = React.useState({
    value: props.action === "Add" ? "" : props.item.nameSubject,
    valid: props.action === "Add" ? false : true,
  });
  const [test, setTest] = React.useState({
    value: props.action === "Add" ? "" : props.item.test,
    valid: props.action === "Add" ? false : true,
  });
  const [exam, setExam] = React.useState({
    value: props.action === "Add" ? "" : props.item.exam,
    valid: props.action === "Add" ? false : true,
  });
  const [grade, setGrade] = React.useState({
    value: props.action === "Add" ? "" : props.item.grade,
    valid: props.action === "Add" ? false : true,
  });
  const [comment, setComment] = React.useState({
    value: props.action === "Add" ? "" : props.item.comment,
    valid: props.action === "Add" ? false : true,
  });
  const [total, setTotal] = React.useState({
    value: props.action === "Add" ? "" : props.item.noteTotal,
    valid: props.action === "Add" ? false : true,
  });
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "rate":
        setRate({ value, valid: value });
        break;
      case "test":
        setTest({ value, valid: value });
        break;
      case "exam":
        setExam({ value, valid: value });
        break;
      case "grade":
        setGrade({ value, valid: value.length > 0 });
        break;
      case "comment":
        setComment({ value, valid: value.length > 0 });
        break;
      case "total":
        setTotal({ value, valid: value });
        break;
      default:
        break;
    }
  };

  const handleSubjectChange = (event, newValue) => {
    setSubject({ value: newValue, valid: true });
  };
  const handleSubmitDisabled = () => {
    if (
      rate.valid &&
      test.valid &&
      exam.valid &&
      total.valid &&
      comment.valid &&
      grade.valid &&
      subject.valid
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };
  const [subjects, setSubjects] = React.useState([]);

  React.useEffect(() => {
    setSubjects(
      props.getAllSubjects.data
        ? props.getAllSubjects.data.data.map((item) => {
            return { id: item.id, label: item.nameSubject };
          })
        : []
    );
  }, [props.getAllSubjects.data]);
  React.useEffect(() => {
    function doSomething() {
      handleCancel();
    }
    doSomething();
  }, [props]);
  React.useEffect(() => {
    handleSubmitDisabled();
    // console.log(  );
  }, [rate, test, total, subject, grade, exam, comment]);
  const handleCancel = () => {
    setRate({
      value: props.action === "Add" ? "" : props.item.Ev,
      valid: props.action === "Add" ? false : true,
    });
    setSubject({
      value: props.action === "Add" ? "" : props.item.nameSubject,
      valid: props.action === "Add" ? false : true,
    });
    setTest({
      value: props.action === "Add" ? "" : props.item.test,
      valid: props.action === "Add" ? false : true,
    });
    setExam({
      value: props.action === "Add" ? "" : props.item.exam,
      valid: props.action === "Add" ? false : true,
    });
    setGrade({
      value: props.action === "Add" ? "" : props.item.grade,
      valid: props.action === "Add" ? false : true,
    });
    setComment({
      value: props.action === "Add" ? "" : props.item.comment,
      valid: props.action === "Add" ? false : true,
    });
    setTotal({
      value: props.action === "Add" ? "" : props.item.noteTotal,
      valid: props.action === "Add" ? false : true,
    });
  };
  const createMarksheet = useQuery(
    "createMarksheet",
    async () => {
      return axios.post("http://localhost:8000/api/storeMarksheet", {
        Ev: rate.value,
        grade: grade.value,
        exam: exam.value,
        comment: comment.value,
        test: test.value,
        noteTotal: total.value,
        subjects_id: subject.value.id,
        student_id: props.student_id,
        season: props.season,
      });
    },
    {
      enabled: false,
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
    }
  );
  const editMarksheet = useQuery(
    "editMarksheet",
    async () => {
      return axios.post("http://localhost:8000/api/updateMarksheet", {
        Ev: rate.value,
        grade: grade.value,
        exam: exam.value,
        comment: comment.value,
        test: test.value,
        noteTotal: total.value,
        subjects_id: subject.value.id
          ? subject.value.id
          : props.item.subjects_id,
        student_id: props.student_id,
        season: props.season,
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
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const handleSubmit = () => {
    if (props.action == "Add") {
      createMarksheet.refetch().then((res) => {
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
                Failed tAdd —
                <strong>check it out!</strong>
              </Alert>
            </Snackbar>
          );
          setTimeout(() => {
            setSuccess("");
                    handleCancel();
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
                        <Alert
                          variant="filled"
                          severity="success"
                          sx={{ width: "100%" }}
                        >
                          <AlertTitle>Successfully</AlertTitle>
                          Successfully Add —
                          <strong>check it out!</strong>
                        </Alert>
                      </Snackbar>
                    );
                    setTimeout(() => {
                      setSuccess("");
                              handleCancel();
                              props.handleClose();
                    }, 500);
        }
      });
    } else {
      editMarksheet.refetch().then((res) => {
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
              <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
                <AlertTitle>Failed</AlertTitle>
                Faile Edit —<strong>check it out!</strong>
              </Alert>
            </Snackbar>
          );
          setTimeout(() => {
            setSuccess("");
            handleCancel();
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
              <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
                <AlertTitle>Successfully</AlertTitle>
                Successfully Edit —<strong>check it out!</strong>
              </Alert>
            </Snackbar>
          );
          setTimeout(() => {
            setSuccess("");
            handleCancel();
            props.handleClose();
          }, 500);
        }
      });
    }
  };
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        <Typography variant="h4">{props.action} Student Note</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <Divider />
          </Grid>
          <Grid item xs={12} mb={2}>
            <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
              <Autocomplete
                id="combo-box-demo"
                options={subjects}
                onChange={handleSubjectChange}
                fullWidth
                sx={{
                  borderRadius: `7px`,
                  bgcolor: theme.palette.primary.light,
                  "& input": {
                    bgcolor: theme.palette.primary.light,
                  },
                }}
                value={subject.value}
                renderInput={(params) => (
                  <TextFieldStyled {...params} label="Subject" />
                )}
              />
              <TextFieldStyled
                value={rate.value}
                onChange={handleChange}
                name="rate"
                type="number"
                label="Rate"
                fullWidth
              />
              <TextFieldStyled
                value={test.value}
                onChange={handleChange}
                name="test"
                type="number"
                label="Test"
                fullWidth
              />
              <TextFieldStyled
                value={exam.value}
                onChange={handleChange}
                name="exam"
                type="number"
                label="Exam"
                fullWidth
              />
              <TextFieldStyled
                value={grade.value}
                onChange={handleChange}
                name="grade"
                label="Grade"
                fullWidth
              />
              <TextFieldStyled
                value={comment.value}
                onChange={handleChange}
                name="comment"
                multiline
                label="Comment"
                fullWidth
              />
              <TextFieldStyled
                value={total.value}
                onChange={handleChange}
                name="total"
                type="number"
                label="Total note"
                fullWidth
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
          fontSize: "0.9rem",
        }}
        component={RouterLink}
        to="/secretary/markSheets"
      >
        MarkSheets
      </Link>
    </Breadcrumbs>
  );
}
export default AllNote;
