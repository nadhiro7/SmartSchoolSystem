import React from "react";
import {
  Box,
  Grid,
  CircularProgress,
  Stack,
  Breadcrumbs,
  Avatar,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableFooter,
  TableCell,
  Divider,
  Typography,
  Button,
  IconButton,
  ButtonGroup,
  useTheme,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import {
  Home as HomeIcon,
  DashboardOutlined,
  Edit,
  Delete,
} from "@mui/icons-material";
import StudentImage from "./../../Images/4151543.jpg";
import AdminCard1 from "../../Components/AdminComponents/AdminCard1";
import AdminCard2 from "../../Components/AdminComponents/AdminCard2";
import AdminCard3 from "../../Components/AdminComponents/AdminCard3";
import PeiChart from "../../Components/AdminComponents/PeiChart";
import MainCard from "../../Components/MainCard";
import BarChart from "../../Components/AdminComponents/BarChart";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useQuery } from "react-query";
function Dashboard() {
  const getNumberofUsers = useQuery("getNumberofUsers", async () => {
    return axios.get("http://localhost:8000/api/getNumberofUsers");
  });
  const getDatabyGender = useQuery("getDatabyGender", async () => {
    return axios.get("http://localhost:8000/api/getDatabyGender");
  });
  const getSubject = useQuery("getSubject", async () => {
    return axios.get("http://localhost:8000/api/getSubject");
  });
  const getLevelSubjects = useQuery("getLevelSubjects", async () => {
    return axios.get("http://localhost:8000/api/getLevelSubjects");
  });
  const get5Records = useQuery("get5Records", async () => {
    return axios.get("http://localhost:8000/api/get5Records");
  });
  const get7Records = useQuery("get7Records", async () => {
    return axios.get("http://localhost:8000/api/get7Records");
  });
  const getAllParent = useQuery(
    "getAllParent",
    async () => {
      return axios.get("http://localhost:8000/api/getAllParent");
    },
    {
      refetchOnMount: true,
    }
  );
  const [data, setData] = React.useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  React.useEffect(() => {
    function doSomthing() {
      if (getAllParent.data) {
        if (getAllParent.data.data) {
          getAllParent.data.data.forEach((element) => {
            let month = new Date(element.created_at).getMonth();
            let data1 = data;
            switch (month) {
              case 1:
                data1[0] = data1[0] + 1;
                setData(data1);
                break;
              case 2:
                data1[1] = data1[1] + 1;
                setData(data1);
                break;
              case 3:
                data1[2] = data1[2] + 1;
                setData(data1);
                break;
              case 4:
                data1[3] = data1[3] + 1;
                setData(data1);
                break;
              case 5:
                data1[4] = data1[4] + 1;
                setData(data1);
                break;
              case 6:
                data1[5] = data1[5] + 1;
                setData(data1);
                break;
              case 7:
                data1[6] = data1[6] + 1;
                setData(data1);
                break;
              case 8:
                data1[7] = data1[7] + 1;
                setData(data1);
                break;
              case 9:
                data1[8] = data1[8] + 1;
                setData(data1);
                break;
              case 10:
                data1[9] = data1[9] + 1;
                setData(data1);
                break;
              case 11:
                data1[10] = data1[10] + 1;
                setData(data1);
                break;
              case 12:
                data1[11] = data1[11] + 1;
                setData(data1);
                break;
              default:
                setData(data);
                break;
            }
          });
        }
        console.log(data);
      }
    }
    doSomthing();
  }, [getAllParent.data]);
  const view1 = !getLevelSubjects.isLoading ? (
    getLevelSubjects.data.data.length !== 0 ? (
      getLevelSubjects.data.data.map((item, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{item.nameLevel}</TableCell>
            <TableCell>{item.classes}</TableCell>
            <TableCell>{item.subjects}</TableCell>
          </TableRow>
        );
      })
    ) : (
      <TableRow>
        <TableCell colSpan={4}>
          <Stack display={"flex"} alignItems="center" justifyContent={"center"}>
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
  );
  const view = !getSubject.isLoading ? (
    getSubject.data.data.length !== 0 ? (
      getSubject.data.data.map((item, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.nameSubject}</TableCell>
            <TableCell>{item.teachers}</TableCell>
          </TableRow>
        );
      })
    ) : (
      <TableRow>
        <TableCell colSpan={4}>
          <Stack display={"flex"} alignItems="center" justifyContent={"center"}>
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
  );
  const numberT = () => {
    let n = 0;
    getSubject.data.data.forEach((element) => {
      n += element.teachers;
    });
    return n;
  };
  const [gender, setGender] = React.useState([0, 0]);
  React.useEffect(() => {
    if (getDatabyGender.data) {
      if (getDatabyGender.data.data) {
        setGender(getDatabyGender.data.data);
      }
      console.log(gender);
    }
  }, [getDatabyGender.data]);
  const [numT, setNumt] = React.useState(0);
  React.useEffect(() => {
    function doSomething() {
      setNumt(numberT);
    }
    if (getSubject.data) doSomething();
  }, [getSubject.data]);
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
      <Grid container mt={2} spacing={2}>
        <Grid item xs={12} md={7}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                variant="h5"
                mb="3.5px"
                color="textPrimary"
                alignSelf="center"
              >
                Users Statistics
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <AdminCard1
                title="Parent"
                newTitle="This number represnts valid parents"
                number={
                  getNumberofUsers.data
                    ? getNumberofUsers.data.data[0].parent
                    : "null"
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AdminCard2
                title="All Students"
                newTitle="This number represnts valid students"
                number={
                  getNumberofUsers.data
                    ? getNumberofUsers.data.data[0].student
                    : "null"
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AdminCard3
                text="Teachers"
                total={
                  getNumberofUsers.data
                    ? getNumberofUsers.data.data[0].teacher
                    : "null"
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <AdminCard3
                text="Secretaries"
                total={
                  getNumberofUsers.data
                    ? getNumberofUsers.data.data[0].secretary
                    : "null"
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Users Pei Chart</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ overflowX: "auto", overflowY: "hidden" }}
              >
                <PeiChart
                  numbers={gender ? gender : [0, 0]}
                  keys={["Male", "Female"]}
                  theme={theme}
                />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
      <Grid container mt={2} spacing={2}>
        <Grid item xs={12} md={8}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="subtitle1">New Parents</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} mt={4}>
                <BarChart data={data} theme={theme} />
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="subtitle1">Table of Subjects</Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer sx={{ maxHeight: "370px" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Subject</TableCell>
                        <TableCell>Number of Teachers</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{view}</TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={1} />
                        <TableCell>Total</TableCell>
                        <TableCell>{numT}</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button variant="text" color="primary">
                  <Link component={RouterLink} to="/admin/subjects">
                    View All
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
      <Grid container mt={2} spacing={2}>
        <Grid item xs={12} md={8}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Teachers</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <TeachersGridData
                  data={get5Records.data ? get5Records.data.data : []}
                  columns={columns}
                  height={400}
                  isLoading={get7Records.isLoading}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button variant="text" color="primary">
                  <Link component={RouterLink} to="/admin/users/teachers">
                    View All
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Typography variant="subtitle1">Table of Levels</Typography>
              </Grid>
              <Grid item xs={12}>
                <TableContainer sx={{ maxHeight: "400px" }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>level</TableCell>
                        <TableCell>Number of classes</TableCell>
                        <TableCell>Number of subject</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>{view1}</TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid
                item
                xs={12}
                alignSelf="end"
                display="flex"
                justifyContent="center"
              >
                <Button variant="text" color="primary">
                  <Link component={RouterLink} to="/admin/classes">
                    View All
                  </Link>
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={12}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="subtitle1">Parents</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <TeachersGridData
                  data={get7Records.data ? get7Records.data.data : []}
                  columns={columns2}
                  height={500}
                  isLoading={get7Records.isLoading}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Button variant="text" color="primary">
                  <Link component={RouterLink} to="/admin/users/parents">
                    View All
                  </Link>
                </Button>
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
      <Link
        underline="hover"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "text.primary",
          fontWeight: "semi-bold",
        }}
        component={RouterLink}
        to="/admin"
      >
        <DashboardOutlined color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        Dashboard
      </Link>
    </Breadcrumbs>
  );
}
const columns = [
  {
    field: "avatar",
    headerName: "#",
    width: 50,
    renderCell: (data) => {
      return (
        <Avatar
          variant="rounded"
          src={data.value}
          sx={{ width: "40px", height: "40px" }}
        />
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
    field: "firstName",
    headerName: "First name",
    width: 100,
    headerClassName: "header-background",
  },
  {
    field: "lastName",
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
  },
  {
    field: "subjects",
    headerName: "Subjects",
    width: 130,
    sortable: false,
    headerClassName: "header-background",
  },
  {
    field: "username",
    headerName: "User Name",
    width: 80,
    headerClassName: "header-background",
  },
  {
    field: "email",
    headerName: "Email",
    width: 140,
    headerClassName: "header-background",
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 100,
    headerClassName: "header-background",
    sortable: false,
    renderCell: () => {
      return (
        <ButtonGroup>
          <IconButton aria-label="delete" color="error" variant="contained">
            <Delete />
          </IconButton>
          <IconButton aria-label="delete" color="orange">
            <Edit />
          </IconButton>
        </ButtonGroup>
      );
    },
  },
];
const columns2 = [
  {
    field: "avatar",
    headerName: "#",
    width: 50,
    renderCell: (data) => {
      return (
        <Avatar
          variant="rounded"
          src={data.value}
          sx={{ width: "40px", height: "40px" }}
        />
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
    field: "firstName",
    headerName: "First name",
    width: 100,
    headerClassName: "header-background",
  },
  {
    field: "lastName",
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
  },
  {
    field: "children",
    headerName: "Children",
    width: 100,
    sortable: false,
    type: "number",
    headerClassName: "header-background",
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
    headerName: "Actions",
    width: 100,
    headerClassName: "header-background",
    sortable: false,
    renderCell: () => {
      return (
        <ButtonGroup>
          <IconButton aria-label="delete" color="error" variant="contained">
            <Delete />
          </IconButton>
          <IconButton aria-label="delete" color="orange">
            <Edit />
          </IconButton>
        </ButtonGroup>
      );
    },
  },
];
const data2 = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "Nadhir",
    lastName: "Djabali",
    age: 20,
    children: 3,
    username: "Nadhiro77",
    email: "nadhir@gmail.com",
    address: "Tebessa",
    phone: "0792408342",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "Nadhir",
    lastName: "Djabali",
    age: 20,
    children: 3,
    username: "Nadhiro77",
    email: "nadhir@gmail.com",
    address: "Tebessa",
    phone: "0792408342",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "Nadhir",
    lastName: "Djabali",
    age: 20,
    children: 3,
    username: "Nadhiro77",
    email: "nadhir@gmail.com",
    address: "Tebessa",
    phone: "0792408342",
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "Nadhir",
    lastName: "Djabali",
    age: 20,
    children: 3,
    username: "Nadhiro77",
    email: "nadhir@gmail.com",
    address: "Tebessa",
    phone: "0792408342",
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "Nadhir",
    lastName: "Djabali",
    age: 20,
    children: 3,
    username: "Nadhiro77",
    email: "nadhir@gmail.com",
    address: "Tebessa",
    phone: "0792408342",
  },
  {
    id: 6,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "Nadhir",
    lastName: "Djabali",
    age: 20,
    children: 3,
    username: "Nadhiro77",
    email: "nadhir@gmail.com",
    address: "Tebessa",
    phone: "0792408342",
  },
  {
    id: 7,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "Nadhir",
    lastName: "Djabali",
    age: 20,
    children: 3,
    username: "Nadhiro77",
    email: "nadhir@gmail.com",
    address: "Tebessa",
    phone: "0792408342",
  },
  {
    id: 8,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "Nadhir",
    lastName: "Djabali",
    age: 20,
    children: 3,
    username: "Nadhiro77",
    email: "nadhir@gmail.com",
    address: "Tebessa",
    phone: "0792408342",
  },
  {
    id: 9,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "Nadhir",
    lastName: "Djabali",
    age: 20,
    children: 3,
    username: "Nadhiro77",
    email: "nadhir@gmail.com",
    address: "Tebessa",
    phone: "0792408342",
  },
  {
    id: 10,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "Nadhir",
    lastName: "Djabali",
    age: 20,
    children: 3,
    username: "Nadhiro77",
    email: "nadhir@gmail.com",
    address: "Tebessa",
    phone: "0792408342",
  },
];
const data = [
  {
    id: 1,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "John",
    lastName: "Doe",
    age: 21,
    subjects: "Math, English, Science",
    username: "johndoe",
    email: "aa@gmail.com",
  },
  {
    id: 2,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "John",
    lastName: "Doe",
    age: 21,
    subjects: "Math, English, Science",
    username: "johndoe",
    email: "aa@gmail.com",
  },
  {
    id: 3,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "John",
    lastName: "Doe",
    age: 21,
    subjects: "Math, English, Science",
    username: "johndoe",
    email: "aa@gmail.com",
  },
  {
    id: 4,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "John",
    lastName: "Doe",
    age: 21,
    subjects: "Math, English, Science",
    username: "johndoe",
    email: "aa@gmail.com",
  },
  {
    id: 5,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "John",
    lastName: "Doe",
    age: 21,
    subjects: "Math, English, Science",
    username: "johndoe",
    email: "aa@gmail.com",
  },
  {
    id: 6,
    avatar: "https://randomuser.me/api/portraits/",
    firstName: "John",
    lastName: "Doe",
    age: 21,
    subjects: "Math, English, Science",
    username: "johndoe",
    email: "aa@gmail.com",
  },
];
function TeachersGridData(props) {
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
    ];
  });
  const theme = useTheme();
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
        loading={props.isLoading}
      />
    </Box>
  );
}
export default Dashboard;
