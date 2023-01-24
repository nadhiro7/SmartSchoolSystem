import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  Avatar,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableHead,
  Button,
  TableCell,
  Divider,
  Typography,
  ButtonBase,
  Stack,
  useTheme,
  ClickAwayListener,
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
} from "@mui/icons-material";
import MainCard from "./../../../../Components/MainCard";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import axios from "axios";

function ManageParent() {
  const getAllParentNotValid = useQuery(
    "getAllParentNotValid",
    async () => {
      return axios.get("http://localhost:8000/api/getAllParentNotValid");
    },
    {
      refetchOnMount: true,
    }
  );
  const getAllParent = useQuery(
    "getAllParent",
    async () => {
      return axios.get("http://localhost:8000/api/getAllParent");
    },
    {
      refetchOnMount: true,
    }
  );
  const view = !getAllParentNotValid.isLoading ? (
    getAllParentNotValid.data.data.length != 0 ? (
      getAllParentNotValid.data.data.map((item, index) => {
        return (
          <TableRow>
            <TableCell>{item.firstname}</TableCell>
            <TableCell>{item.lastname}</TableCell>
            <TableCell>{item.gender}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>
              <ViewOpen
                getAllParentNotValid={getAllParentNotValid}
                item={item}
                getAllParent={getAllParent}
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
                  <Grid item xs={11}>
                    <Typography variant="subtitle1">Parents</Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent={"end"}>
                    <ButtonBase
                      aria-label="open drawer"
                      edge="start"
                      component={RouterLink}
                      to="./addParent"
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
                <GridData getAllParent={getAllParent} height={500} />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid container mt={2}>
          <Grid item xs={12}>
            <MainCard sx={{ width: "100%", height: "100%" }}>
              <Grid container>
                <Grid item xs={12} sx={{ backgroundColor: "#9e9e9e5c", p: 1 }}>
                  <Grid container display="flex" alignItems="center">
                    <Grid item xs={11}>
                      <Typography variant="subtitle1">
                        Parent invalid
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <TableContainer
                    sx={{ minHeight: "200px", maxHeight: "400px" }}
                  >
                    <Table stickyHeader>
                      <TableHead sx={{ bgColor: theme.palette.primary.light }}>
                        <TableRow>
                          <TableCell>First name</TableCell>
                          <TableCell>Last name</TableCell>
                          <TableCell>Gender</TableCell>
                          <TableCell>username</TableCell>
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
      </Grid>
    </Box>
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
          parent={props.item}
          getAllParent={props.getAllParent}
          getAllParentNotValid={props.getAllParentNotValid}
          handleClose={handleClose}
        />
      </ClickAwayListener>
    </>
  );
}

function PopUp(props) {
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const acceptParent = useQuery(
    "acceptParent",
    async () => {
      return axios.put(
        "http://localhost:8000/api/acceptParent/" + props.parent.id
      );
    },
    {
      enabled: false,
      keepPreviousData: false,
    }
  );
  const accept = () => {
    acceptParent.refetch().then((res) => {
      if (res.data.data == "success") {
        props.getAllParent.refetch();
        props.getAllParentNotValid.refetch();
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
  const deleteParent = () => {
    axios
      .delete("http://localhost:8000/api/deleteUser/" + props.parent.id)
      .then((res) => {
        props.getAllParent.refetch();
        props.getAllParentNotValid.refetch();
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
        <Typography variant="h4">Validate Parent</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <Divider />
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">First Name :</Typography>
            <Typography variant="subtitle">
              {" "}
              {props.parent && props.parent.firstname}{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Last Name :</Typography>
            <Typography variant="subtitle">
              {" "}
              {props.parent && props.parent.lastname}{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Gender :</Typography>
            <Typography variant="subtitle">
              {" "}
              {props.parent && props.parent.gender}{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Username :</Typography>
            <Typography variant="subtitle">
              {" "}
              {props.parent && props.parent.username}{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Birthday :</Typography>
            <Typography variant="subtitle">
              {" "}
              {props.parent && props.parent.birthday}{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Email :</Typography>
            <Typography variant="subtitle">
              {" "}
              {props.parent && props.parent.email}{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Address :</Typography>
            <Typography variant="subtitle">
              {" "}
              {props.parent && props.parent.address}{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography variant="h5">Phone :</Typography>
            <Typography variant="subtitle">
              {" "}
              {props.parent && props.parent.phone}{" "}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Stack spacing={2} direction="row" sx={{}}>
          <Button
            variant="contained"
            sx={{ color: "white !important" }}
            color="success"
            onClick={accept}
          >
            Accept
          </Button>
          <Button onClick={deleteParent} variant="contained" color="error">
            Refuse
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
        to="/admin/users/parents"
      >
        Parents
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
  const handleClose = () => {
    setOpen(false);
  };
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const deleteParent = () => {
    axios.delete("http://localhost:8000/api/deleteUser/" + id).then((res) => {
      props.getAllParent.refetch();
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
    });
  };
  const editParent = React.useCallback((params) => () => {
    navigate("./editParent/" + params.id);
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
      // { field: 'children', headerName: 'Children', width: 100, sortable: false, type: 'number', headerClassName: 'header-background' },
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
          rows={props.getAllParent.data ? props.getAllParent.data.data : {}}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          disableSelectionOnClick
          loading={props.getAllParent.isLoading}
        />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5">Delete parent</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" variant="subtitle1">
            Are you sure to delete parent?
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
    </>
  );
}
export default ManageParent;
