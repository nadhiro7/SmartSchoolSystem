import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Divider,
  ClickAwayListener,
  Typography,
  Button,
  TextField,
  styled,
  Stack,
  useTheme,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Home as HomeIcon,
  Person,
  Edit,
  NotificationAdd,
  PersonAdd,
  VisibilityOutlined,
  Close,
  Add,
  AddCircleOutline,
  AddCircle,
} from "@mui/icons-material";
import { shouldForwardProp } from "@mui/system";
import MainCard from "../../../Components/MainCard";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import axios from "axios";
import { Document, Page } from "react-pdf";
import { typography } from "@mui/system";
import tp from "../../../assets/TPDAC2021-2022.pdf"
const TextFieldStyled = styled(TextField, { shouldForwardProp })(
  ({ theme }) => ({
    background: theme.palette.primary.light,
    borderRadius: `7px`,
    "& .MuiInputBase-input": {
      background: theme.palette.primary.light,
    },
  })
);
function AbsenceList() {
  const theme = useTheme();
  const params = useParams();
  const studentID = params.id;
  const getLessonRegister = useQuery(
    "getLessonRegister",
    async () => {
      return axios.get(
        "http://localhost:8000/api/showStudentRegister/" + studentID
      );
    },
    {
      keepPreviousData: false,
    }
  );
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState({});
  const handleOpen = (item) => {
    setOpen(true);
    setItem(item);
  };
      const handleClose = () => {
        setOpen(false);
      };
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
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">
                      Student Register
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <GridData
                  handleOpen={handleOpen}
                  getLessonRegister={getLessonRegister}
                  height={500}
                />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
      <ClickAwayListener onClickAway={handleClose}>
        <PopUpAdd open={open} item={item} handleClose={handleClose} />
      </ClickAwayListener>
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
        to="/secretary/Register"
      >
        Register
      </Link>
    </Breadcrumbs>
  );
}
console.log(tp);
const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};
function PopUpAdd(props) {
  const theme = useTheme();
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const [content, setContent] = React.useState({ value: "", valid: false });
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "content":
        setContent({ value, valid: value.length > 0 });
        break;
      default:
        break;
    }
  };
  const handleSubmitDisabled = () => {
    if (content.valid) {
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
  }, [content]);
  const handleCancel = () => {
    setContent({ value: "", valid: false });
  };
  const pdfRef = React.useRef();
  const AddJust = useQuery(
    "AddJust",
    async () => {
      const fdata = new FormData();
      fdata.append("file", pdfRef.current.files[0]);
      fdata.append("id", props.item.student_id);
      fdata.append("lessonId", props.item.lessons_id);
      fdata.append("content", content.value);
      return axios.post("http://localhost:8000/api/AddJust", fdata);
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
  const handleSubmit = (event) => {
    AddJust.refetch().then((res) => {
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
              <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
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
  };
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [srcPhoto, setSrcPhoto] = React.useState("");
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  
  const [file, setFile] = React.useState("./sample.pdf");
  function onFileChange(event) {
    setFile(event.target.files[0]);
  }
  return (
    <Dialog open={props.open} fullWidth onClose={props.handleClose}>
      <DialogTitle>
        <Typography variant="h4">Add Justification</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid item xs={12} mb={2}>
          <Divider />
        </Grid>
        <Grid item xs={12} mb={2}>
          <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
            <TextFieldStyled
              onChange={handleChange}
              value={content.value}
              name="content"
              label="Content"
              multiline
            />
          </Stack>
        </Grid>
        <Grid item xs={12} mb={2}>
          <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
            <Typography variant="body2">
              Add justification file (.pdf)
            </Typography>
            <input
              ref={pdfRef}
              type="file"
              onChange={onFileChange}
              accept="application/pdf"
            />
          </Stack>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={submitDisabled}
        >
          Add
        </Button>
      </DialogActions>
      {succes}
    </Dialog>
  );
}
function GridData(props) {
  const theme = useTheme();
  const addJust = React.useCallback((params) => () => {
    props.handleOpen(params.row);
  });
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (props.getLessonRegister.data) {
      setData(
        props.getLessonRegister.data.data
          ? props.getLessonRegister.data.data
          : []
      );
    }
  }, [props.getLessonRegister.data]);
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const columns = React.useMemo(() => [
    {
      field: "nameSubject",
      headerName: "Lesson",
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
      field: "date",
      headerName: "Date",
      width: 130,
      headerClassName: "header-background",
    },
    {
      field: "startTime",
      headerName: "Start time",
      width: 90,
      headerClassName: "header-background",
    },
    {
      field: "endTime",
      headerName: "End time",
      width: 80,
      headerClassName: "header-background",
    },
    {
      field: "justContent",
      headerName: "Justification",
      width: 300,
      headerClassName: "header-background",
    },
    {
      field: "isJustify",
      headerName: "Is Justify",
      width: 80,
      headerClassName: "header-background",
      renderCell: (data) => {
        return (
          <Typography variant="body1">
            {data.value == 0 ? "No" : "yes"}
          </Typography>
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Add Justification",
      width: 150,
      headerClassName: "header-background",
      getActions: (params) =>
        params.row.isJustify || params.row.haveJust
          ? []
          : [
              <GridActionsCellItem
                icon={<AddCircle size="large" color="primary" />}
                label="Notify"
                title="Add Justification"
                onClick={addJust(params)}
              />,
            ],
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
        loading={props.getLessonRegister.loading}
      />
      {succes}
    </Box>
  );
}
export default AbsenceList;
