import React from "react";
import {
  Box,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Breadcrumbs,
  Autocomplete,
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
  styled,
  useTheme,
  Snackbar,
  Alert,
  AlertTitle,
  DialogContentText,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Home as HomeIcon,
  Delete,
  Edit,
  VisibilityOutlined,
  Add,
  Close,
} from "@mui/icons-material";
import { shouldForwardProp } from "@mui/system";
import frLocale from "date-fns/locale/fr";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import MainCard from "../../../Components/MainCard";
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
function TextbookPages() {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [item, setItem] = React.useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const params = useParams();
  const classId = params.classId;
  const showTeacherContent = useQuery("showTeacherContent", async () => {
    return axios.get(
      "http://localhost:8000/api/showTeacherContent/" + classId + "/" + user.id
    );
  });
  const getTeacherModule = useQuery("getTeacherModule", async () => {
    return axios.get("http://localhost:8000/api/getTeacherModule/" + user.id);
  });
  const [subjectOption, setSubjectOption] = React.useState([]);
  React.useEffect(() => {
    if (getTeacherModule.data) {
      if (getTeacherModule.data.data) {
        setSubjectOption(getTeacherModule.data.data);
      }
    }
  }, [getTeacherModule.data]);
  React.useEffect(() => {
    function doSomething() {
      showTeacherContent.refetch();
    }
    doSomething();
  }, [openEdit]);
  const handleOpen = (item) => {
    setOpen(true);
    setItem(item);
  };
  const handleEditOpen = (item) => {
    setOpenEdit(true);
    setItem(item);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
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
                    <Grid item xs={12}>
                      <Typography variant="subtitle1">
                        Your Textbook Pages
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <GridData
                    showTeacherContent={showTeacherContent}
                    handleEditOpen={handleEditOpen}
                    handleOpen={handleOpen}
                    height={500}
                  />
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Box>
      <PopUp open={open} item={item} handleClose={handleClose} />
      <PopUpEdit
        subjectOption={subjectOption}
        open={openEdit}
        item={item ? item : {}}
        classId={classId}
        handleEditClose={handleEditClose}
      />
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
        to="/teacher/textbooks"
      >
        Textbooks
      </Link>
    </Breadcrumbs>
  );
}
function PopUp(props) {
  const theme = useTheme();
  const [item, setItem] = React.useState({
    id: "",
    lesson: "",
    teacher: "",
    date: "",
    title: "",
    content: "",
  });
  React.useEffect(() => {
    if (!props.item) {
      props.handleClose();
    } else {
      setItem({
        id: props.item.id,
        lesson: props.item.nameSubject,
        teacher: props.item.firstname + props.item.lastname,
        date: props.item.date,
        title: props.item.title,
        content: props.item.content,
      });
    }
  }, [props]);
  return (
    <Dialog open={props.open} fullWidth onClose={props.handleClose}>
      <DialogTitle>
        <Typography variant="h4">Textbook page content</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <Divider />
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">lesson :</Typography>
            <Typography variant="subtitle">{item.lesson}</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">teacher :</Typography>
            <Typography variant="subtitle">{item.teacher}</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">date :</Typography>
            <Typography variant="subtitle">{item.date}</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">title :</Typography>
            <Typography variant="subtitle">{item.title}</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">content :</Typography>
            <Typography variant="subtitle">{item.content}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
function GridData(props) {
  const theme = useTheme();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (props.showTeacherContent.data) {
      if (props.showTeacherContent.data) {
        setData(props.showTeacherContent.data.data);
      }
    }
  }, [props.showTeacherContent.data]);
  const [id, setId] = React.useState();
  const [lesson, setLesson] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (idd, lesson) => {
    setId(idd);
    setLesson(lesson.row.lessons_id);
    setOpen(true);
  };
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const removeTextbook = () => {
    axios
      .delete("http://localhost:8000/api/destroyTextbook/" + id + "/" + lesson)
      .then((res) => {
        props.showTeacherContent.refetch();
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
            }, 4000);
          }
        }
        handleClose();
      });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const viewPageInfo = React.useCallback((params) => () => {
    props.handleOpen(params);
  });
  const editPage = React.useCallback((params) => () => {
    props.handleEditOpen(params);
  });
  const columns = React.useMemo(() => [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      headerClassName: "header-background",
    },
    {
      field: "nameSubject",
      headerName: "Lesson",
      width: 100,
      headerClassName: "header-background",
    },
    {
      field: "teacher",
      headerName: "Teacher",
      width: 100,
      headerClassName: "header-background",
      renderCell: (data) => {
        return (
          <Typography variant="body1">
            {data.row.firstname + " " + data.row.lastname}
          </Typography>
        );
      },
    },
    {
      field: "date",
      headerName: "Lesson Date",
      width: 120,
      headerClassName: "header-background",
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 100,
      headerClassName: "header-background",
    },
    {
      field: "endTime",
      headerName: "End Time",
      width: 100,
      headerClassName: "header-background",
    },
    {
      field: "title",
      headerName: "Title",
      width: 100,
      headerClassName: "header-background",
    },
    {
      field: "content",
      headerName: "Content",
      width: 280,
      headerClassName: "header-background",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      headerClassName: "header-background",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Delete size="large" color="primary" />}
          label="Delete"
          onClick={() => handleClickOpen(params.id, params)}
        />,
        <GridActionsCellItem
          icon={<Edit size="large" color="primary" />}
          label="Delete"
          onClick={editPage(params.row)}
        />,
        <GridActionsCellItem
          icon={<VisibilityOutlined size="large" color="primary" />}
          label="View"
          showInMenu
          onClick={viewPageInfo(params.row)}
        />,
      ],
    },
  ]);
  return (
    <>
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
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5">Delete textbook page</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" variant="subtitle1">
            Are you sure to delete textbook page? if delete the textbook page
            also the lesson will be deleted
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={removeTextbook} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {succes}
    </>
  );
}
function PopUpEdit(props) {
  const theme = useTheme();
  const [lesson, setLesson] = React.useState({
    value: props.item.nameSubject,
    valid: true,
  });
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const [title, setTitle] = React.useState({
    value: props.item.title,
    valid: true,
  });
  const [content, setContent] = React.useState({
    value: props.item.content,
    valid: true,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "title":
        setTitle({ value, valid: value.length > 0 });
        break;
      case "content":
        setContent({ value, valid: value.length > 0 });
        break;
      default:
        break;
    }
  };
  const handleLessonChange = (event, newValue) => {
    setLesson({ value: newValue, valid: true });
  };
  React.useEffect(() => {
    function doSomething() {
      handleCancel();
    }
    doSomething();
  }, [props]);
  const handleCancel = () => {
    const dt = new Date();
    if (props.item.date) {
      dt.setFullYear(props.item.date.slice(0, 4));
      dt.setMonth(props.item.date.slice(5, 7) - 1);
      dt.setDate(props.item.date.slice(8));
    }
    setLesson({ value: props.item.nameSubject, valid: true });
    setTitle({ value: props.item.title, valid: true });
    setContent({ value: props.item.content, valid: true });
  };
  const editTextbookPage = useQuery(
    "editTextbookPage",
    async () => {
      return axios.post("http://localhost:8000/api/editTextbookPage", {
        content: content.value,
        title: title.value,
        id: props.item.id,
        lessons_id: props.item.lessons_id,
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
    editTextbookPage.refetch().then((res) => {
      if (res.data.data === "failed") {
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
              Failed Edit --
              <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        );
        setTimeout(() => {
          setSuccess("");
          handleCancel();
          props.handleClose();
        }, 5000);
      } else {
        if (res.data.data == "success") {
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
                Successfully Edit --<strong>check it out!</strong>
              </Alert>
            </Snackbar>
          );
          setTimeout(() => {
            setSuccess("");
            handleCancel();
            props.handleClose();
          }, 5000);
        }
      }
    });
  };
  return (
    <Dialog open={props.open} fullWidth onClose={props.handleEditClose}>
      <DialogTitle>
        <Typography variant="h4">Edit textbook page</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <Divider />
          </Grid>
          <Grid item xs={12} mb={2}>
            <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
              <TextFieldStyled
                onChange={handleChange}
                value={title.value}
                name="title"
                label="Title"
              />
              <TextFieldStyled
                onChange={handleChange}
                value={content.value}
                name="content"
                label="Content"
                multiline={true}
              />
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCancel}>
          Reset
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          Edit
        </Button>
      </DialogActions>
      {succes}
    </Dialog>
  );
}
export default TextbookPages;
