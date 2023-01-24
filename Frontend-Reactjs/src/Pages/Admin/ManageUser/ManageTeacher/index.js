import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  Avatar,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Divider,
  Typography,
  ButtonBase,
  Button,
  useTheme,
  Snackbar,
  Alert,
  AlertTitle,
  DialogContentText,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Person,
  Edit,
  Delete,
  PersonAdd,
} from "@mui/icons-material";
import MainCard from "./../../../../Components/MainCard";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import axios from "axios";
function ManageTeacher() {
  const theme = useTheme();
  const getAllTeachers = useQuery("getAllTeachers", async () => {
    return axios.get("http://localhost:8000/api/getAllTeachers");
  });
  // const getAllTeachers1 = useQuery(
  //   "getAllTeachers1",
  //   async () => {
  //     return axios.get("http://localhost:8000/api/getAllTeachers");
  //   },
  //   {
  //     enabled: false,
  //   }
  // );
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
                    <Typography variant="subtitle1">Teacher</Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent={"end"}>
                    <ButtonBase
                      aria-label="open drawer"
                      edge="start"
                      component={RouterLink}
                      to="./addTeacher"
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
                <GridData getAllTeachers={getAllTeachers} height={500} />
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
        to="/admin"
      >
        <HomeIcon sx={{ mr: 0.5 }} color="primary" fontSize="medium" />
        Admin
      </Link>
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "0.9rem",
        }}
        color="text.primary"
      >
        <Person sx={{ mr: 0.5 }} color="primary" fontSize="medium" />
        Users
      </Typography>
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
        to="/admin/users/teachers"
      >
        Teachers
      </Link>
    </Breadcrumbs>
  );
}
function GridData(props) {
  const navigate = useNavigate();
  const [id, setId] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (idd, lesson) => {
    setId(idd);
    setOpen(true);
  };

  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const handleClose = () => {
    setOpen(false);
  };
  const deleteTeacher = () => {
    axios.delete("http://localhost:8000/api/deleteUser/" + id).then((res) => {
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
              <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
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
      props.getAllTeachers.refetch();
      handleClose();
    });
  };
  const editParent = React.useCallback((params) => () => {
    navigate("./editTeacher/" + params.id);
  });
  const columns = React.useMemo(() => {
    return [
      {
        field: "image",
        headerName: "#",
        width: 50,
        renderCell: (data) => {
          return data.value ? (
            <Avatar
              variant="rounded"
              src={data.value}
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
        field: "username",
        headerName: "User Name",
        width: 100,
        headerClassName: "header-background",
      },
      {
        field: "email",
        headerName: "Email",
        width: 140,
        headerClassName: "header-background",
      },
      {
        field: "gender",
        headerName: "Gender",
        width: 100,
        headerClassName: "header-background",
      },
      {
        field: "address",
        headerName: "Address",
        width: 140,
        headerClassName: "header-background",
      },
      {
        field: "phone",
        headerName: "Phone",
        width: 120,
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
            label="edit"
            onClick={editParent(params)}
          />,
        ],
      },
    ];
  });
  React.useEffect(() => {});
  const theme = useTheme();
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
          rows={props.getAllTeachers.data ? props.getAllTeachers.data.data : {}}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          loading={props.getAllTeachers.isLoading}
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5">Delete teacher</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" variant="subtitle1">
            Are you sure to delete teacher?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={deleteTeacher} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {succes}
    </>
  );
}
export default ManageTeacher;
