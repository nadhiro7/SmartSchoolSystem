import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
  AlertTitle,
  DialogContentText,
  CircularProgress,
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
  TextField,
  Typography,
  Button,
  IconButton,
  ButtonGroup,
  Stack,
  useTheme,
} from "@mui/material";
import Link from '@mui/material/Link';
import { Link as RouterLink,useParams } from 'react-router-dom';
import { Home as HomeIcon, Delete, Edit, VisibilityOutlined, Add, Close } from '@mui/icons-material';
import { useQuery } from "react-query";
import axios from "axios";
import MainCard from '../../../Components/MainCard';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
function TextbookPages ()
{
    const params = useParams();
    const classID = params.teacherId;
    const [ open, setOpen ] = React.useState( false );
    const [ item, setItem ] = React.useState( null );
    const handleOpen = ( item ) =>
    {
        setOpen( true );
        setItem( item );
    };
    const handleClose = () =>
    {
        setOpen( false );

    };
    const showTextbooks = useQuery("showTextbooks", async () => {
      return axios.get("http://localhost:8000/api/showTextbooks/" + classID);
    });
    const theme = useTheme();
    return (
      <>
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
                  <Grid
                    item
                    xs={12}
                    sx={{ backgroundColor: "#9e9e9e5c", p: 1 }}
                  >
                    <Grid container display="flex" alignItems="center">
                      <Grid item xs={10}>
                        <Typography variant="subtitle1">
                          Textbook Pages
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <GridData
                      showTextbooks={showTextbooks}
                      handleOpen={handleOpen}
                      height={500}
                    />
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </Box>
        <PopUp open={open} item={item} handleClose={handleClose} />
      </>
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
                to="/secretary/textbooks"
            >Textbooks</Link>
        </Breadcrumbs>
    );
}
function PopUp ( props )
{
    const theme = useTheme();
    console.log( props.item );
    const [ item, setItem ] = React.useState( { id: '', lesson: '', teacher: '', date: '',startTime: "",endTime: "", title: '', content: '' } );
    React.useEffect( () =>
    {
        if ( !props.item )
        {
            props.handleClose();
        } else
        {
            setItem({
              id: props.item.id,
              lesson: props.item.nameSubject,
              teacher: props.item.firstname + " " + props.item.lastname,
              date: props.item.date,
              startTime: props.item.startTime,
              endTime: props.item.endTime,
              title: props.item.title,
              content: props.item.content,
            });
        }
    }, [ props ] );
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
          <DialogTitle>
            <Typography variant="h4">Textbook page content</Typography>
          </DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={12} mb={2}>
                <Divider />
              </Grid>
              <Grid item xs={12} mb={2}>
                <Typography variant="h5">lesson :</Typography>
                <Typography variant="subtitle">{item.lesson}</Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Typography variant="h5">teacher :</Typography>
                <Typography variant="subtitle">{item.teacher}</Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Typography variant="h5">date :</Typography>
                <Typography variant="subtitle">{item.date}</Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Typography variant="h5">Start time :</Typography>
                <Typography variant="subtitle">{item.startTime}</Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Typography variant="h5">End time :</Typography>
                <Typography variant="subtitle">{item.endTime}</Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Typography variant="h5">title :</Typography>
                <Typography variant="subtitle">{item.title}</Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Typography variant="h5">content :</Typography>
                <Typography variant="subtitle">{item.content}</Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
    );
}
function GridData ( props )
{
    const theme = useTheme();
    const viewPageInfo = React.useCallback( ( params ) => () =>
    {
        props.handleOpen( params );
        console.log( params );
    } );
    const [data,setData] = React.useState([])
    React.useEffect(()=>{
        if(props.showTextbooks.data){
            if (props.showTextbooks.data.data){
                setData(props.showTextbooks.data.data);
            }
        }
    },[props.showTextbooks.data])
    const columns = React.useMemo(() => [
      {
        field: "id",
        headerName: "ID",
        width: 50,
        headerClassName: "header-background",
      },
      {
        field: "nameSubject",
        headerName: "Lesson",
        width: 100,
        headerClassName: "header-background",
      },
      {
        field: "teacher",
        headerName: "Teacher",
        width: 150,
        headerClassName: "header-background",
        renderCell: (data)=>{
            return (
              <Typography variant="body1">
                {data.row.firstname + " " + data.row.lastname}
              </Typography>
            );
        }
      },
      {
        field: "date",
        headerName: "Lesson Date",
        width: 130,
        headerClassName: "header-background",
      },
      {
        field: "startTime",
        headerName: "Start time",
        width: 110,
        headerClassName: "header-background",
      },
      {
        field: "endTime",
        headerName: "End time",
        width: 110,
        headerClassName: "header-background",
      },
      {
        field: "title",
        headerName: "Title",
        width: 100,
        headerClassName: "header-background",
      },
      {
        field: "content",
        headerName: "Content",
        width: 250,
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
            icon={<VisibilityOutlined size="large" color="primary" />}
            label="View"
            onClick={viewPageInfo(params.row)}
          />,
        ],
      },
    ]);
    return (
        <Box sx={ { mt: 2, height: props.height, width: '100%', '& .header-background': { backgroundColor: theme.palette.primary.light } } }>
            <DataGrid
                rows={ data }
                columns={ columns }
                pageSize={ 10 }
                rowsPerPageOptions={ [ 10 ] }
                disableSelectionOnClick
            />
        </Box>
    );
}
export default TextbookPages;