import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
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
  CircularProgress,
  ButtonGroup,
  Stack,
  useTheme,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Close,
  Edit,
  Delete,
  PersonAdd,
  VisibilityOutlined,
  List,
} from "@mui/icons-material";
import MainCard from "../../../Components/MainCard";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import axios from "axios";
function ListClass() {
  const params = useParams();
  const classId = params.idClass;
  const getClassList = useQuery("getClassList", async () => {
    return axios.get("http://localhost:8000/api/getClassList/" + classId);
  });
  const theme = useTheme();
  const view = getClassList.data ? (
    !getClassList.isLoading ? (
      getClassList.data.data.length > 0 ? (
        getClassList.data.data.map((item, index) => {
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
                <ViewOpen student={item} />
              </TableCell>
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={6}>
            <Stack
              display={"flex"}
              alignItems="center"
              justifyContent={"center"}
            >
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
    )
  ) : null;
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
                    <Typography variant="subtitle1">Your Classes</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <TableContainer sx={{ maxHeight: "500px" }}>
                  <Table stickyHeader>
                    <TableHead>
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
          student={props.student ? props.student : ""}
          handleClose={handleClose}
        />
      </ClickAwayListener>
    </>
  );
}
function PopUp(props) {
  const theme = useTheme();
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        <Typography variant="h4">Student Informations</Typography>
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
              <Avatar
                variant="rounded"
                sx={{ width: "80px", height: "80px" }}
              ></Avatar>
            )}
          </Grid>
          <Grid item xs={12} sm={6} mb={2}>
            <Typography variant="h5">First Name :</Typography>
            <Typography variant="subtitle">
              {props.student.firstname}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} mb={2}>
            <Typography variant="h5">Last Name :</Typography>
            <Typography variant="subtitle">{props.student.lastname}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} mb={2}>
            <Typography variant="h5">Gender :</Typography>
            <Typography variant="subtitle">{props.student.gender}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} mb={2}>
            <Typography variant="h5">Parent Name :</Typography>
            <Typography variant="subtitle">
              {props.student.parentFirstname +
                " " +
                props.student.parentLastname}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} mb={2}>
            <Typography variant="h5">Age :</Typography>
            <Typography variant="subtitle">
              {new Date().getFullYear() -
                new Date(props.student.birthday).getFullYear()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} mb={2}>
            <Typography variant="h5">Email :</Typography>
            <Typography variant="subtitle">{props.student.email}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} mb={2}>
            <Typography variant="h5">Level :</Typography>
            <Typography variant="subtitle">
              {props.student.nameLevel}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} mb={2}>
            <Typography variant="h5">Address :</Typography>
            <Typography variant="subtitle">{props.student.address}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
function IconBreadcrumbs(props) {
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
        to="/classesList"
      >
        <List color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        Your Classes
      </Link>
    </Breadcrumbs>
  );
}
const data3 = [
  {
    id: 1,
    firstName: "Amer",
    lastName: "Djabali",
    gender: "Male",
    parent: "Nadhir Djabali",
    email: "nadhir@gmail.com",
    state: "in progress",
    actions: 2,
  },
  {
    id: 1,
    firstName: "Mohamed",
    lastName: "Djabali",
    gender: "Male",
    parent: "Nadhir Djabali",
    email: "nadhir@gmail.com",
    state: "in progress",
    actions: 5,
  },
  {
    id: 1,
    firstName: "Mohamed",
    lastName: "Djabali",
    gender: "Male",
    parent: "Nadhir Djabali",
    email: "nadhir@gmail.com",
    state: "in progress",
    actions: 5,
  },
  {
    id: 1,
    firstName: "Mohamed",
    lastName: "Djabali",
    gender: "Male",
    parent: "Nadhir Djabali",
    email: "nadhir@gmail.com",
    state: "in progress",
    actions: 5,
  },
];
export default ListClass;
