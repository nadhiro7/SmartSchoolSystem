import React from 'react';
import { Box, Grid, Breadcrumbs, Popover, Card, Autocomplete, Table, TextareaAutosize, TableRow, TableBody, TableHead, IconButton, TableCell, Divider, Typography, ButtonBase, Stack, TextField, styled, Button, useTheme } from '@mui/material';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { Home as HomeIcon, Person, Edit, Delete, Add, Close } from '@mui/icons-material';
import MainCard from './../../../Components/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import { shouldForwardProp } from '@mui/system';
import Announce from "./../../../Components/Announce";
import announcePhoto from "./../../../Images/Management.png";
import { useQuery } from "react-query";
import axios from "axios";
const TextFieldStyled = styled( TextField, { shouldForwardProp } )( ( { theme } ) => ( {
    background: theme.palette.primary.light,
    borderRadius: `7px`,
    '& .MuiInputBase-input': {
        background: theme.palette.primary.light,
    },
} ) );
function ManageSchedules ()
{
    const theme = useTheme();
    const getAllClasses = useQuery("getAllClass", async () => {
      return axios.get("http://localhost:8000/api/getAllClasses");
    });
    const view = !getAllClasses.isLoading ? (
      getAllClasses.data.data != [] ? (
        getAllClasses.data.data.map((item, index) => {
          return (
            <Grid item xs={12} key={index} mb={1} mt={1}>
              <MainCard>
                <Stack
                  display="flex"
                  direction={{ xs: "column", md: "row" }}
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle1">
                    Class name: {item.nameClass}
                  </Typography>
                  <Typography variant="subtitle1">
                    level: {item.nameLevel}
                  </Typography>
                  <Actions id={item.id} item={item} theme={theme} />
                </Stack>
              </MainCard>
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12} mb={1} mt={1}>
          <MainCard>
            <Stack
              display="flex"
              direction={{ xs: "column", md: "row" }}
              justifyContent="center"
            >
              <Typography variant="subtitle1">
                No classes to show
              </Typography>
            </Stack>
          </MainCard>
        </Grid>
      )
    ) : (
      <h1>isLoading</h1>
    );
    return (
        <Box sx={ { p: 1, minHeight: '100vh', maxHeight: 'fit-content', width: '100% !important', borderRadius: '10px' } } bgcolor='primary.light'>
            <Box sx={ { mt: 2, ml: 2 } }>
                <IconBreadcrumbs />
            </Box>
            <Grid container mt={ 2 }>
                <Grid item xs={ 12 }>
                    <MainCard sx={ { width: '100%', height: '100%' } }>
                        <Grid container>
                            <Grid item xs={ 12 } sx={ { backgroundColor: '#9e9e9e5c', p: 1 } }>
                                <Typography variant="subtitle1">All Schedules</Typography>
                            </Grid>
                            <Grid item xs={ 12 }>
                                <Divider />
                            </Grid>
                            <Grid item xs={ 12 } display="flex" justifyContent='center' p={ 1 }>
                                <Typography variant="subtitle1">Every class has one schedule</Typography>
                            </Grid>
                            <Grid item xs={ 12 }>
                                <Divider />
                            </Grid>
                            <Grid item xs={ 12 }>
                                <Grid container>
                                    { view}
                                </Grid>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>
        </Box>
    );
}
function Actions ( props )
{
    return (
      <Stack spacing={1} direction="row">
        <ButtonBase
          aria-label="open drawer"
          edge="start"
          component={RouterLink}
          to={`/admin/schedules/edit/${props.id}/${props.item.level_id}`}
          sx={{
            borderRadius: "50% !important",
            width: "30px !important",
            height: "30px",
            color: "white",
            transition: "0.3s",
            backgroundColor: props.theme.palette.warning.dark,
          }}
        >
          <Edit fontSize="small" />
        </ButtonBase>
      </Stack>
    );
}
const classes = [
    {
        id: 1,
        name: `class 1`,
        level: 'Primary year'
    },
    {
        id: 2,
        name: `class 2`,
        level: 'Primary year'
    },
    {
        id: 3,
        name: `class 1`,
        level: 'Secondary year'
    },
    {
        id: 4,
        name: `class 2`,
        level: 'Secondary year'
    },
    {
        id: 5,
        name: `class 1`,
        level: 'Third year'
    },
    {
        id: 6,
        name: `class 1`,
        level: 'Fourth year'
    },
    {
        id: 7,
        name: `class 2`,
        level: 'Fourth year'
    }
];
function IconBreadcrumbs ()
{
    return (
        <Breadcrumbs aria-label="breadcrumb" justifyContent='center' alignItems='center'>
            <Link
                underline="hover"
                sx={ { display: 'flex', alignItems: 'center', color: 'text.primary', fontWeight: 'bold', fontSize: '1rem' } }
                component={ RouterLink }
                to="/admin"
            >
                <HomeIcon sx={ { mr: 0.5 } } color="primary" fontSize="medium" />
                Admin
            </Link>
            <Link
                underline="hover"
                sx={ { display: 'flex', alignItems: 'center', color: 'text.primary', fontWeight: 'semi-bold', fontSize: '0.9rem' } }
                component={ RouterLink }
                to="/admin/schedules"
            >
                Schedules
            </Link>
        </Breadcrumbs>
    );
}
export default ManageSchedules;