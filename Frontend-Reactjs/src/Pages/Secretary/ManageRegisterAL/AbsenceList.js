import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
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
} from "@mui/icons-material";

import MainCard from "../../../Components/MainCard";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import axios from "axios";
import { typography } from "@mui/system";
import { Document, Page } from "react-pdf";
function AbsenceList() {
  const theme = useTheme();
  const params = useParams();
  const lessonId = params.lessonId;
  const getLessonRegister = useQuery(
    "getLessonRegister",
    async () => {
      return axios.get(
        "http://localhost:8000/api/getLessonRegister/" + lessonId + "/absent"
      );
    },
    {
      keepPreviousData: false,
    }
  );
  const getJust = useQuery(
    "getJust",
    async () => {
      return axios.get(
        "http://localhost:8000/api/showJust/" + lessonId + "/absent"
      );
    },
    {
      keepPreviousData: false,
    }
  );
  const view = !getJust.isLoading ? (
    getJust.data.data != [] ? (
      getJust.data.data.map((item, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{item.firstname + " " + item.lastname}</TableCell>
            <TableCell>{item.fn + " " + item.ln}</TableCell>
            <TableCell>{item.isJustify == 0 ? "No" : "Yes"}</TableCell>
            <TableCell>
              <ViewOpen
                getJust={getJust}
                getLessonRegister={getLessonRegister}
                item={item}
              />
            </TableCell>
          </TableRow>
        );
      })
    ) : (
      <TableRow>
        <TableCell colSpan={2}></TableCell>
        <TableCell>No data to show</TableCell>
        <TableCell colSpan={1}></TableCell>
      </TableRow>
    )
  ) : (
    <h1>isLoading</h1>
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
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Students</Typography>
                  </Grid>
                  {/* <Grid item xs={2}>
                    <Button variant="contained">
                      Notify all parent <NotificationAdd />
                    </Button>
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <GridData getLessonRegister={getLessonRegister} height={500} />
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
                    <Typography variant="subtitle1">Justification</Typography>
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
                        <TableCell>Student Name</TableCell>
                        <TableCell>Parent Name</TableCell>
                        <TableCell>Is Validate</TableCell>
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
        to="/secretary/Register"
      >
        Register
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
          getJust={props.getJust}
          getLessonRegister={props.getLessonRegister}
          open={open}
          item={props.item}
          handleClose={handleClose}
        />
      </ClickAwayListener>
    </>
  );
}
function PopUp(props) {
  const refuseJust = useQuery(
    "refuseJust",
    async () => {
      return axios.post("http://localhost:8000/api/refuseJust/", {
        type: "Refuse justification",
        time: new Date().toLocaleTimeString().slice(0, 8),
        date: new Date().toISOString().split("T")[0],
        content: `your child  ${props.item.firstname} ${props.item.lastname} justification is refused please check register absence `,
        user_id: props.item.user_id,
        lessonId: props.item.lessons_id,
        id: props.item.student_id,
      });
    },
    {
      enabled: false,
      keepPreviousData: false,
    }
  );
  const acceptJust = useQuery(
    "acceptJust",
    async () => {
      return axios.post("http://localhost:8000/api/acceptJust/", {
        type: "accept justification",
        time: new Date().toLocaleTimeString().slice(0, 8),
        date: new Date().toISOString().split("T")[0],
        content: `your child  ${props.item.firstname} ${props.item.lastname} justification is accepted please check register absence `,
        user_id: props.item.user_id,
        lessonId: props.item.lessons_id,
        id: props.item.student_id,
      });
    },
    {
      enabled: false,
      keepPreviousData: false,
    }
  );
  const refuse = () => {
    refuseJust.refetch().then((res) => {
      if (res.data.data == "success") {
        setSuccess(
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            autoHideDuration={3000}
          >
            <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
              <AlertTitle>Successfully</AlertTitle>
              Justification is refused— <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        );
        setTimeout(() => {
          setSuccess("");
          props.getLessonRegister.refetch();
          props.getJust.refetch();
          props.handleClose();
        }, 3000);
      } else {
        setSuccess(
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            autoHideDuration={3000}
          >
            <Alert variant="filled" severity="error">
              <AlertTitle>failed</AlertTitle>
              Failed please try again— <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        );
        setTimeout(() => {
          setSuccess("");
          props.getLessonRegister.refetch();
          props.getJust.refetch();
          props.handleClose();
        }, 3000);
      }
    });
  };
  const accept = () => {
    acceptJust.refetch().then((res) => {
      if (res.data.data == "success") {
        setSuccess(
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            autoHideDuration={3000}
          >
            <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
              <AlertTitle>Successfully</AlertTitle>
              Justification is validate— <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        );
        setTimeout(() => {
          setSuccess("");
          props.getLessonRegister.refetch();
          props.getJust.refetch();
          props.handleClose();
        }, 3000);
      } else {
        setSuccess(
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            autoHideDuration={3000}
          >
            <Alert variant="filled" severity="error">
              <AlertTitle>failed</AlertTitle>
              Failed please try again— <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        );
        setTimeout(() => {
          setSuccess("");
          props.getLessonRegister.refetch();
          props.getJust.refetch();
          props.handleClose();
        }, 3000);
      }
    });
  };
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const theme = useTheme();
  console.log(props.item);
  return (
    <Dialog open={props.open} fullWidth onClose={props.handleClose}>
      <DialogTitle>
        <Typography variant="h4">Validate justification</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <Divider />
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Justification text :</Typography>
            <Typography variant="subtitle">
              {props.item ? props.item.justContent : ""}
            </Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Justification file :</Typography>
            <a
              href={`http://127.0.0.1:8000/public/${props.item.file}`}
              target="_blank"
              download
            >
              Download
            </a>
            {/* <iframe
              src={`http://127.0.0.1:8000/public/${props.item.file}`}
              onLoadSuccess={onDocumentLoadSuccess}
            ></iframe> */}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            sx={{ color: "white !important" }}
            color="success"
            onClick={accept}
          >
            Accept
          </Button>
          <Button onClick={refuse} variant="contained" color="error">
            Refuse
          </Button>
        </Stack>
      </DialogActions>
      {succes}
    </Dialog>
  );
}
function GridData(props) {
  const theme = useTheme();
  const notifyParent = React.useCallback((params) => () => {
    if (params.row.isJustify == 0) {
      addNotificationstore(params);
    } else {
      setSuccess(
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          autoHideDuration={5000}
        >
          <Alert variant="filled" severity="warning" sx={{ width: "100%" }}>
            <AlertTitle>warning</AlertTitle>
            The absence is Justify you can't notify the parent—{" "}
            <strong>check it out!</strong>
          </Alert>
        </Snackbar>
      );
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    }
  });
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (props.getLessonRegister.data) {
      setData(
        props.getLessonRegister.data.data
          ? props.getLessonRegister.data.data
          : []
      );
      console.log(data);
    }
  }, [props.getLessonRegister.data]);
  const addNotificationstore = (params) => {
    axios
      .post("http://localhost:8000/api/addNotificationstore", {
        type: "absence Notification",
        time: new Date().toLocaleTimeString().slice(0, 8),
        date: new Date().toISOString().split("T")[0],
        content: `your child ${params.row.firstname} ${params.row.lastname} is absence in the lesson of ${params.row.nameSubject} in ${params.row.date} at ${params.row.startTime} please check register absence and add justification`,
        user_id: params.row.user_id,
      })
      .then((res) => {
        if (res.data != "") {
          setSuccess(
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={true}
              autoHideDuration={5000}
            >
              <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
                <AlertTitle>Successfully</AlertTitle>
                Parent is notifyed— <strong>check it out!</strong>
              </Alert>
            </Snackbar>
          );
          setTimeout(() => {
            setSuccess("");
          }, 10000);
        } else {
          setSuccess(
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={true}
              autoHideDuration={5000}
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
          }, 4000);
        }
      });
  };

  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
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
    {
      field: "actions",
      type: "actions",
      headerName: "Notify Parent",
      width: 180,
      headerClassName: "header-background",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<NotificationAdd size="large" color="primary" />}
          label="Notify"
          onClick={notifyParent(params)}
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
