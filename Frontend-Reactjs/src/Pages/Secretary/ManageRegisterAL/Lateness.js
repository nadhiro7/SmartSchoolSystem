import React from "react";
import {
  Box,
  Grid,
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
  Person,
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
function Lateness() {
  const theme = useTheme();
  const classId = useParams().classId;
  const getLessons = useQuery(
    "getLessons",
    async () => {
      return axios.get("http://localhost:8000/api/getLessons/" + classId);
    },
    {
      keepPreviousData: false,
    }
  );
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (getLessons.data) {
      setData(getLessons.data.data ? getLessons.data.data : []);
    }
  }, [getLessons.data]);
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
        <IconBreadcrumbs id={classId} />
      </Box>
      <Grid container mt={2}>
        <Grid item xs={12}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} sx={{ backgroundColor: "#9e9e9e5c", p: 1 }}>
                <Grid container display="flex" alignItems="center">
                  <Grid item xs={11}>
                    <Typography variant="subtitle1">
                      Register lateness
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <GridData
                  data={data}
                  getLessons={getLessons}
                  classId={classId}
                  height={"500px"}
                />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
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
        <List color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        Register
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
        to={`/secretary/register/lateness/${props.id}`}
      >
        <List color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        Lateness
      </Link>
    </Breadcrumbs>
  );
}
function Actions(props) {
  return (
    <Stack spacing={1} width="90%" direction="row">
      <Button
        color="primary"
        variant="contained"
        sx={{
          transition: "0.3s",
        }}
        component={RouterLink}
        to={`/secretary/register/lateness/${props.classId}/latenessList/${props.id}`}
      >
        View Lesson Lateness
      </Button>
    </Stack>
  );
}
function GridData(props) {
  const theme = useTheme();

  const columns = React.useMemo(() => [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      headerClassName: "header-background",
    },
    {
      field: "teacher",
      headerName: "Teacher",
      width: 150,
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
      headerName: "Date",
      width: 200,
      headerClassName: "header-background",
    },
    {
      field: "startTime",
      headerName: "startTime",
      width: 150,
      headerClassName: "header-background",
    },
    {
      field: "endTime",
      headerName: "endTime",
      width: 150,
      headerClassName: "header-background",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Action",
      width: 200,
      headerClassName: "header-background",
      renderCell: (data) => {
        return <Actions classId={props.classId} id={data.row.id}></Actions>;
      },
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
        rows={props.data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        loading={props.getLessons.isLoading}
      />
    </Box>
  );
}
export default Lateness;
