import React from "react";
import {
  Box,
  Grid,
  Dialog,
  CircularProgress,
  DialogTitle,
  DialogContent,
  Breadcrumbs,
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
  IconButton,
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
function ChildrenFiles() {
  const parent = JSON.parse(localStorage.getItem("user"));
  const getChildrens = useQuery("getChildrens", async () => {
    return axios.get("http://localhost:8000/api/getChildrens/" + parent.id);
  });
  const view = getChildrens.data ? (
    !getChildrens.isLoading ? (
      getChildrens.data.data.length > 0 ? (
        getChildrens.data.data.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{item.firstname}</TableCell>
              <TableCell>{item.lastname}</TableCell>
              <TableCell>
                <TableCell>
                  <ViewOpen items={item} />
                </TableCell>
              </TableCell>
            </TableRow>
          );
        })
      ) : (
        <TableRow>
          <TableCell colSpan={3}>
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
        <TableCell colSpan={3}>
          <Stack display={"flex"} alignItems="center" justifyContent={"center"}>
            <CircularProgress color="secondary" />
          </Stack>
        </TableCell>
      </TableRow>
    )
  ) : null;
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
                    <Typography variant="subtitle1">Your Childrens</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <TableContainer sx={{ maxHeight: "500px" }}>
                  <Table stickyHeader>
                    <TableHead sx={{ bgColor: theme.palette.primary.light }}>
                      <TableRow>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
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
      <Stack spacing={1} direction="row">
        <Button
          aria-label="view"
          color="primary"
          variant="contained"
          onClick={handleOpen}
        >
          <VisibilityOutlined />
          View Student informations
        </Button>
        <Button
          aria-label="view"
          color="primary"
          variant="contained"
          component={RouterLink}
          to={"./studentMarks/" + props.items.id}
        >
          <VisibilityOutlined /> View Student Notes
        </Button>
        <Button
          aria-label="view"
          color="primary"
          variant="contained"
          component={RouterLink}
          to={"./textbook/" + props.items.classes_id}
        >
          <VisibilityOutlined /> View Textbook
        </Button>
        <ClickAwayListener onClickAway={handleClose}>
          <PopUp
            open={open}
            student={props.items ? props.items : ""}
            handleClose={handleClose}
          />
        </ClickAwayListener>
      </Stack>
    </>
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
        to="/parent"
      >
        <HomeIcon sx={{ mr: 0.5 }} color="primary" fontSize="medium" />
        Parent
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
        to="/markSheets"
      >
        <List color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        Children Files
      </Link>
    </Breadcrumbs>
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

export default ChildrenFiles;
