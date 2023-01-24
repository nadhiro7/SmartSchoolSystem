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
function ClassList() {
  const params = useParams();
  const classId = params.idClass;
  const getClassStudent = useQuery("getClassStudent", async () => {
    return axios.get("http://localhost:8000/api/getClassStudent/" + classId);
  });
  const view = getClassStudent.data ? (
    !getClassStudent.isLoading ? (
      getClassStudent.data.data.length > 0 ? (
        getClassStudent.data.data.map((item, index) => {
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
          <TableCell colSpan={4}>
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
        <TableCell colSpan={4}>
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
                    <Typography variant="subtitle1">Your Classes</Typography>
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
  console.log(props.items);
  return (
    <>
      <Stack spacing={1} direction="row">
        <Button
          aria-label="view"
          color="primary"
          variant="contained"
          onClick={handleOpen}
        >
          <VisibilityOutlined /> View Student Notes
        </Button>
        <Button
          aria-label="view"
          color="primary"
          variant="contained"
          component={RouterLink}
          to={"./" + props.items.id}
        >
          <Edit /> Edit Student Notes
        </Button>
      </Stack>
      <ClickAwayListener onClickAway={handleClose}>
        <PopUp
          open={open}
          idStudent={props.id ? props.id : ""}
          handleClose={handleClose}
          item={props.items}
        />
      </ClickAwayListener>
    </>
  );
}
function PopUp(props) {
  const params = useParams();
  const subject = params.subject;
  const getMarkSheetStudent = useQuery(
    "getMarkSheetStudentAllSeason",
    async () => {
      return axios.post(
        "http://localhost:8000/api/getMarkSheetStudentAllSeason/",
        {
          id: props.item ? props.item.id : "",
          sub: subject,
        }
      );
    },
    {
      enabled: false,
    }
  );
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    function doSomething() {
      if (props.open) {
        getMarkSheetStudent.refetch();
        if (getMarkSheetStudent.data) {
          if (getMarkSheetStudent.data.data) {
            setData(getMarkSheetStudent.data.data);
          }
        }
      }
    }
    doSomething();
  }, [props.open, getMarkSheetStudent.data]);
  const view = data
    ? data.map((item) => {
        return (
          <>
            <Grid item xs={12} mb={2} display="flex" justifyContent="center">
              <Typography variant="h3">Season {item.season}</Typography>
            </Grid>
            <Grid item sm={6} xs={12} mb={2}>
              <Typography variant="h5">Rate Note :</Typography>
              <Typography variant="subtitle">
                {item.Ev ? item.Ev : "none"}
              </Typography>
            </Grid>
            <Grid item sm={6} xs={12} mb={2}>
              <Typography variant="h5">Test Note :</Typography>
              <Typography variant="subtitle">
                {item.test ? item.test : "none"}
              </Typography>
            </Grid>
            <Grid item sm={6} xs={12} mb={2}>
              <Typography variant="h5">Exam Note :</Typography>
              <Typography variant="subtitle">
                {item.exam ? item.exam : "none"}
              </Typography>
            </Grid>
            <Grid item sm={6} xs={12} mb={2}>
              <Typography variant="h5">Grade :</Typography>
              <Typography variant="subtitle">
                {item.grade ? item.grade : "none"}
              </Typography>
            </Grid>
            <Grid item sm={6} xs={12} mb={2}>
              <Typography variant="h5">comment :</Typography>
              <Typography variant="subtitle">
                {item.comment ? item.comment : "none"}
              </Typography>
            </Grid>
            <Grid item sm={6} xs={12} mb={2}>
              <Typography variant="h5">Final Note :</Typography>
              <Typography variant="subtitle">
                {item.noteTotal ? item.noteTotal : "none"}
              </Typography>
            </Grid>
          </>
        );
      })
    : null;
  const theme = useTheme();
  return (
    <Dialog open={props.open} fullWidth onClose={props.handleClose}>
      <DialogTitle>
        <Typography variant="h4">Student Notes</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <Divider />
          </Grid>
          <Grid item xs={12} mb={2}>
            <Avatar
              variant="rounded"
              src={"A"}
              sx={{ width: "80px", height: "80px" }}
            />
          </Grid>
          <Grid item sm={6} xs={12} mb={2}>
            <Typography variant="h5">First Name :</Typography>
            <Typography variant="subtitle">
              {props.item ? props.item.lastname : ""}
            </Typography>
          </Grid>
          <Grid item sm={6} xs={12} mb={2}>
            <Typography variant="h5">Last Name :</Typography>
            <Typography variant="subtitle">
              {props.item ? props.item.lastname : ""}
            </Typography>
          </Grid>
          {view}
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
        to="/markSheets"
      >
        <List color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        MarkSheets
      </Link>
    </Breadcrumbs>
  );
}
const data3 = [
  {
    id: 1,
    firstName: "Amer",
    lastName: "Djabali",
  },
  {
    id: 1,
    firstName: "Mohamed",
    lastName: "Djabali",
  },
  {
    id: 1,
    firstName: "Mohamed",
    lastName: "Djabali",
  },
  {
    id: 1,
    firstName: "Mohamed",
    lastName: "Djabali",
  },
];
export default ClassList;
