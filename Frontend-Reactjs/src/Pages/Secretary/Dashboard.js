import React from 'react';
import { Box, Grid, CircularProgress,Stack,Breadcrumbs, Avatar, TableContainer, Table, TableRow, TableBody, TableHead, TableFooter, TableCell, Divider, Typography, Button, IconButton, ButtonGroup, useTheme } from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Home as HomeIcon, DashboardOutlined, Edit, Delete } from '@mui/icons-material';
import StudentImage from './../../Images/4151543.jpg';
import AdminCard1 from '../../Components/AdminComponents/AdminCard1';
import AdminCard2 from '../../Components/AdminComponents/AdminCard2';
import AdminCard3 from '../../Components/AdminComponents/AdminCard3';
import PeiChart from '../../Components/AdminComponents/PeiChart';
import MainCard from '../../Components/MainCard';
import BarChart from '../../Components/AdminComponents/BarChart';
import axios from "axios";
import { useQuery } from "react-query";
import { DataGrid } from '@mui/x-data-grid';
function Dashboard ()
{
    const theme = useTheme();
    const getStudentNotValidate = useQuery(
      "getStudentNotValidate",
      async () => {
        return axios.get("http://localhost:8000/api/getStudentNotValidate");
      }
    );
    const getStudentValidate = useQuery("getStudentValidate", async () => {
      return axios.get("http://localhost:8000/api/getStudentValidate");
    });
    const getValidateParent = useQuery("getValidateParent", async () => {
      return axios.get("http://localhost:8000/api/getValidateParent");
    });
    const get10Students = useQuery("get10Students", async () => {
      return axios.get("http://localhost:8000/api/get10Students");
    });
    const showNumberOfAbsence = useQuery("showNumberOfAbsence", async () => {
      return axios.get("http://localhost:8000/api/showNumberOfAbsence");
    });
    const showNumberOfLate = useQuery("showNumberOfLate", async () => {
      return axios.get("http://localhost:8000/api/showNumberOfLate");
    });
    const showNumberOfAbsentIn7Days = useQuery(
      "showNumberOfAbsentIn7Days",
      async () => {
        return axios.get("http://localhost:8000/api/showNumberOfAbsentIn7Days");
      }
    );
     const view1 = !showNumberOfAbsence.isLoading ? (
       showNumberOfAbsence.data.data.length !== 0 ? (
         showNumberOfAbsence.data.data.map((item, index) => {
           return (
               <TableRow key={index}>
                 <TableCell>{item.name}</TableCell>
                 <TableCell>{item.number}</TableCell>
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
           <Stack
             display={"flex"}
             alignItems="center"
             justifyContent={"center"}
           >
             <CircularProgress color="secondary" />
           </Stack>
         </TableCell>
       </TableRow>
     );
     const view2 = !showNumberOfLate.isLoading ? (
       showNumberOfLate.data.data.length !== 0 ? (
         showNumberOfLate.data.data.map((item, index) => {
           return (
             <TableRow key={index}>
               <TableCell>{item.name}</TableCell>
               <TableCell>{item.number}</TableCell>
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
           <Stack
             display={"flex"}
             alignItems="center"
             justifyContent={"center"}
           >
             <CircularProgress color="secondary" />
           </Stack>
         </TableCell>
       </TableRow>
     );
     const view = !showNumberOfAbsentIn7Days.isLoading ? (
       showNumberOfAbsentIn7Days.data.data.length !== 0 ? (
         showNumberOfAbsentIn7Days.data.data.map((item, index) => {
           return (
             <TableRow key={index}>
               <TableCell>{item.name}</TableCell>
               <TableCell>{item.number}</TableCell>
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
           <Stack
             display={"flex"}
             alignItems="center"
             justifyContent={"center"}
           >
             <CircularProgress color="secondary" />
           </Stack>
         </TableCell>
       </TableRow>
     );
     const [numT, setNumt] = React.useState(0);
     React.useEffect(() => {
       function doSomething() {
         let n = 0;
         showNumberOfAbsence.data.data.forEach((element) => {
           n += element.number;
         });
         setNumt(n);
       }
       if (showNumberOfAbsence.data) doSomething();
     }, [showNumberOfAbsence.data]);
     const [numT1, setNumt1] = React.useState(0);
     React.useEffect(() => {
       function doSomething() {
         let n = 0;
         showNumberOfLate.data.data.forEach((element) => {
           n += element.number;
         });
         setNumt1(n);
       }
       if (showNumberOfLate.data) doSomething();
     }, [showNumberOfLate.data]);
     const [numT2, setNumt2] = React.useState(0);
     React.useEffect(() => {
       function doSomething() {
         let n = 0;
         showNumberOfAbsentIn7Days.data.data.forEach((element) => {
           n += element.number;
         });
         setNumt2(n);
       }
       if (showNumberOfAbsentIn7Days.data) doSomething();
     }, [showNumberOfAbsentIn7Days.data]);
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
                  Students Statistics
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <AdminCard1
                  title="Students"
                  newTitle="All students"
                  number={
                    getStudentNotValidate.data && getStudentValidate.data
                      ? getStudentValidate.data.data +
                        getStudentNotValidate.data.data
                      : "0"
                  }
                  getStudentValidate
                  numberNew=""
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AdminCard2
                  title="Parents"
                  newTitle="Valid parents"
                  number={getValidateParent.data && getValidateParent.data.data}
                  numberNew="7"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AdminCard3
                  text="Students valid"
                  total={
                    getStudentValidate.data && getStudentValidate.data.data
                  }
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <AdminCard3
                  text="Students invalid"
                  total={
                    getStudentNotValidate.data &&
                    getStudentNotValidate.data.data
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <MainCard sx={{ width: "100%", height: "100%" }}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Students Pei Chart
                  </Typography>
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
                    numbers={
                      getStudentNotValidate.data && getStudentValidate.data
                        ? [
                            getStudentValidate.data.data,
                            getStudentNotValidate.data.data,
                          ]
                        : [0, 0]
                    }
                    keys={["Students valid", "Students invalid"]}
                    theme={theme}
                  />
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
                  <Typography variant="subtitle1">Students</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <GridData
                    getAllStudentsValid={get10Students}
                    height={500}
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button variant="text" color="primary">
                    <Link component={RouterLink} to="/secretary/students">
                      View All
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
        <Grid container mt={1} spacing={2}>
          <Grid item xs={12} md={4}>
            <MainCard sx={{ width: "100%", height: "100%" }}>
              <Grid container>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Typography variant="subtitle1">Table of Absences</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer sx={{ maxHeight: "370px" }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>name</TableCell>
                          <TableCell>Number of Absences</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>{view1}</TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell>Total absences</TableCell>
                          <TableCell>{numT}</TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button variant="text" color="primary">
                    <Link component={RouterLink} to="/secretary/absence">
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
                  <Typography variant="subtitle1">Table of Lateness</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer sx={{ maxHeight: "370px" }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>name</TableCell>
                          <TableCell>Number of Lateness</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>{view2}</TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell>Total lateness</TableCell>
                          <TableCell>{numT1}</TableCell>
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </TableContainer>
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button variant="text" color="primary">
                    <Link component={RouterLink} to="/secretary/lateness">
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
                  <Typography variant="subtitle1">
                    Justification in this week
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TableContainer sx={{ maxHeight: "370px" }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>name</TableCell>
                          <TableCell>Number of justification</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>{view}</TableBody>
                      <TableFooter>
                        <TableRow>
                          <TableCell>Total Justification</TableCell>
                          <TableCell>{numT2}</TableCell>
                        </TableRow>
                      </TableFooter>
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

function IconBreadcrumbs ()
{
    return (
        <Breadcrumbs aria-label="breadcrumb" justifyContent='center' alignItems='center'>
            <Link
                underline="hover"
                sx={ { display: 'flex', alignItems: 'center', color: 'text.primary', fontWeight: 'bold', fontSize: '1rem' } }
                component={ RouterLink }
                to="/secretary"
            >
                <HomeIcon sx={ { mr: 0.5 } } color="primary" fontSize="medium" />
                Secretary
            </Link>
            <Link
                underline="hover"
                sx={ { display: 'flex', alignItems: 'center', color: 'text.primary', fontWeight: 'semi-bold' } }
                component={ RouterLink }
                to="/secretary"
            >
                <DashboardOutlined color="primary" sx={ { mr: 0.5 } } fontSize="medium" />
                Dashboard
            </Link>
        </Breadcrumbs>
    );
}
function GridData(props) {
  const theme = useTheme();
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
      field: "gender",
      headerName: "Gender",
      width: 70,
      headerClassName: "header-background",
    },
    {
      field: "parent",
      headerName: "Parent Name",
      width: 160,
      sortable: false,
      headerClassName: "header-background",
      renderCell: (data) => {
        return (
          <Typography variant="body1">
            {data.row.parentFirstname + " " + data.row.parentLastname}
          </Typography>
        );
      },
    },
    {
      field: "nameClass",
      headerName: "Class",
      width: 100,
      headerClassName: "header-background",
    },
    {
      field: "nameLevel",
      headerName: "Level",
      width: 120,
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
  ]);
  React.useEffect(() => {});
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
        rows={
          props.getAllStudentsValid.data
            ? props.getAllStudentsValid.data.data
            : {}
        }
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        loading={props.getAllStudentsValid.isLoading}
      />
    </Box>
  );
}
export default Dashboard;