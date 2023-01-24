import React from 'react';
import {
  Box,
  Snackbar,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Alert,
  AlertTitle,
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
  TextField,
  Autocomplete,
  styled,
  Stack,
  useTheme,
} from "@mui/material";
import Link from '@mui/material/Link';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Close, Edit, Delete, PersonAdd, VisibilityOutlined, List } from '@mui/icons-material';
import MainCard from '../../../Components/MainCard';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { shouldForwardProp } from '@mui/system';
import { useQuery } from "react-query";
import axios from "axios";
const TextFieldStyled = styled( TextField, { shouldForwardProp } )( ( { theme } ) => ( {
    background: theme.palette.primary.light,
    borderRadius: `7px`,
    '& .MuiInputBase-input': {
        background: theme.palette.primary.light,
    },
} ) );

function StudentNotes ()
{
    const params = useParams();
    const classId = params.idClass;
    const subject = params.subject;
    const idStudent = params.idStudent;
    const theme = useTheme();
        const handleOpenEdit = (item) => {
          setOpen(true);
          setPopType({ action: "Edit", item: item });
        };
    const createStudentMarks = useQuery("createStudentMarks", async () => {
      return axios.post(
        "http://localhost:8000/api/createStudentMarks/",{std: idStudent,sub: subject}
      );
    });
    const [open, setOpen] = React.useState(false);
        const getMarkSheetStudent = useQuery(
          "getMarkSheetStudentAllSeason",
          async () => {
            return axios.post(
              "http://localhost:8000/api/getMarkSheetStudentAllSeason/",
              {
                id:  idStudent,
                sub: subject,
              }
            );
          },
        );
        const [data, setData] = React.useState([]);
        React.useEffect(() => {
          function doSomething() {
              if (getMarkSheetStudent.data) {
                if (getMarkSheetStudent.data.data) {
                  setData(getMarkSheetStudent.data.data);
                }
              }
          }
          doSomething();
        }, [ getMarkSheetStudent.data]); 
         React.useEffect(() => {
           getMarkSheetStudent.refetch();
         }, [open]); 
        const view = data
          ? data.map((item,index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.season ? item.season : "vide"}</TableCell>
                  <TableCell>{item.Ev ? item.Ev : "vide"}</TableCell>
                  <TableCell>{item.test ? item.test : "vide"}</TableCell>
                  <TableCell>{item.exam ? item.exam : "vide"}</TableCell>
                  <TableCell>{item.grade ? item.grade : "vide"}</TableCell>
                  <TableCell>{item.comment ? item.comment : "vide"}</TableCell>
                  <TableCell>{item.noteTotal ? item.noteTotal : "vide"}</TableCell>
                  <TableCell>
                    <Actions
                      theme={theme}
                      item={item}
                      handleOpen={handleOpenEdit}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          : null;
    
    const [ popType, setPopType ] = React.useState( { action: 'Add', item: null } );
    const handleClose = () =>
    {
        setOpen( false );

    };
    return (
        <Box sx={ {  p: 1, minHeight: '100vh', maxHeight: 'fit-content', width: '100% !important', borderRadius: '10px' } } bgcolor='primary.light'>
            <Box sx={ { mt: 2, ml: 2 } }>
                <IconBreadcrumbs />
            </Box>
            <Grid container mt={ 2 }>
                <Grid item xs={ 12 }>
                    <MainCard sx={ { width: '100%', height: '100%' } }>
                        <Grid container>
                            <Grid item xs={ 12 } sx={ { backgroundColor: '#9e9e9e5c', p: 1 } }>
                                <Grid container display='flex' alignItems='center'>
                                    <Grid item xs={ 11 }>
                                        <Typography variant="subtitle1">Student Notes</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={ 12 }>
                                <Divider />
                            </Grid>
                            <Grid item xs={ 12 }>
                                <TableContainer sx={ { minHeight: '370px' } }>
                                    <Table stickyHeader>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell></TableCell>
                                                <TableCell>Season</TableCell>
                                                <TableCell>Rate</TableCell>
                                                <TableCell>Test</TableCell>
                                                <TableCell>Exam</TableCell>
                                                <TableCell>Grade</TableCell>
                                                <TableCell>Comment</TableCell>
                                                <TableCell>Total Note</TableCell>
                                                <TableCell>Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                               view
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>
            <PopUp open={ open } action={ popType.action } item={ popType.item } handleClose={ handleClose } />
        </Box>
    );
}
function Actions ( props )
{
    return (
        <Stack spacing={ 1 } direction='row'>
            <ButtonBase
                aria-label="open drawer"
                edge="start"
                onClick={ () => { props.handleOpen( props.item ); } }
                sx={ {
                    borderRadius: '50% !important',
                    width: '30px !important',
                    height: '30px',
                    color: 'white',
                    transition: '0.3s',
                    backgroundColor: props.theme.palette.warning.dark,
                } }
            >
                <Edit fontSize='small' />
            </ButtonBase>
        </Stack>
    );
}
function PopUp ( props )
{
    const theme = useTheme();
    const [rate, setRate] = React.useState({
      value: props.action === "Add" ? "" : props.item.Ev,
      valid: props.action === "Add" ? false : true,
    });
    const [ test, setTest ] = React.useState( { value: props.action === 'Add' ? '' : props.item.test, valid: props.action === 'Add' ? false : true } );
    const [ exam, setExam ] = React.useState( { value: props.action === 'Add' ? '' : props.item.exam, valid: props.action === 'Add' ? false : true } );
    const [ grade, setGrade ] = React.useState( { value: props.action === 'Add' ? '' : props.item.grade, valid: props.action === 'Add' ? false : true } );
    const [ comment, setComment ] = React.useState( { value: props.action === 'Add' ? '' : props.item.comment, valid: props.action === 'Add' ? false : true } );
    const [ total, setTotal ] = React.useState( { value: props.action === 'Add' ? '' : props.item.noteTotal, valid: props.action === 'Add' ? false : true } );
    const [ submitDisabled, setSubmitDisabled ] = React.useState( true );
    const editMarksheet = useQuery(
      "editMarksheet",
      async () => {
        return axios.post("http://localhost:8000/api/updateMarksheet", {
          Ev: rate.value,
          grade: grade.value,
          exam: exam.value,
          comment: comment.value,
          test: test.value,
          noteTotal: total.value,
          subjects_id: props.item.subjects_id,
          student_id: props.item.students_id,
          season: props.item.season, 
          id: props.item.id,
        });
      },
      {
        enabled: false,
        cacheTime: 1000,
        staleTime: 1000,
        keepPreviousData: false,
      }
    );
    const [success, setSuccess] = React.useState("");
    const succes = <>{success}</>;
    const handleSubmit = () => {
        editMarksheet.refetch().then((res) => {
          if (res.data.data === "doesnt exist") {
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
                  Failed edit—
                  <strong>check it out!</strong>
                </Alert>
              </Snackbar>
            );
            setTimeout(() => {
              setSuccess("");
              handleCancel();
            }, 10000);
          } else {
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
                  Successfully edit—<strong>check it out!</strong>
                </Alert>
              </Snackbar>
            );
            setTimeout(() => {
              setSuccess("");
              handleCancel();
              props.handleClose();
            }, 4000);
          }
        });
    };
    const handleChange = ( event ) =>
    {
        const { name, value } = event.target;
        switch ( name )
        {
            case "rate":
                setRate( { value, valid: ( value ) } );
                break;
            case "test":
                setTest( { value, valid: ( value ) } );
                break;
            case "exam":
                setExam( { value, valid: ( value ) } );
                break;
            case "grade":
                setGrade( { value, valid: value.length > 0 } );
                break;
            case "comment":
                setComment( { value, valid: value.length > 0 } );
                break;
            case "total":
                setTotal( { value, valid: ( value ) } );
                break;
            default:
                break;
        }

    };
    const handleSubmitDisabled = () =>
    {
        if ( rate.valid && test.valid && exam.valid && total.valid && comment.valid && grade.valid )
        {
            setSubmitDisabled( false );
        }
        else
        {
            setSubmitDisabled( true );
        }
    };
    React.useEffect(
        () =>
        {
            function doSomething ()
            {
                handleCancel();
            }
            doSomething();
        }, [ props ]
    );
    React.useEffect(
        () =>
        {
            handleSubmitDisabled();
            // console.log(  );
        }, [ rate, test, total, grade, exam, comment ]
    );
    const handleCancel = () =>
    {
        setRate( { value: props.action === 'Add' ? '' : props.item.Ev, valid: props.action === 'Add' ? false : true } );
        setTest( { value: props.action === 'Add' ? '' : props.item.test, valid: props.action === 'Add' ? false : true } );
        setExam( { value: props.action === 'Add' ? '' : props.item.exam, valid: props.action === 'Add' ? false : true } );
        setGrade( { value: props.action === 'Add' ? '' : props.item.grade, valid: props.action === 'Add' ? false : true } );
        setComment( { value: props.action === 'Add' ? '' : props.item.comment, valid: props.action === 'Add' ? false : true } );
        setTotal( { value: props.action === 'Add' ? '' : props.item.noteTotal, valid: props.action === 'Add' ? false : true } );
    };
    return (
      <Dialog open={props.open} fullWidth onClose={props.handleClose}>
        <DialogTitle>
          <Typography variant="h4">{props.action} Student Note</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} mb={2}>
              <Divider />
            </Grid>
            <Grid item xs={12} mb={2}>
              <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
                <TextFieldStyled
                  value={rate.value}
                  onChange={handleChange}
                  name="rate"
                  type="number"
                  label="Rate"
                  fullWidth
                />
                <TextFieldStyled
                  value={test.value}
                  onChange={handleChange}
                  name="test"
                  type="number"
                  label="Test"
                  fullWidth
                />
                <TextFieldStyled
                  value={exam.value}
                  onChange={handleChange}
                  name="exam"
                  type="number"
                  label="Exam"
                  fullWidth
                />
                <TextFieldStyled
                  value={grade.value}
                  onChange={handleChange}
                  name="grade"
                  label="Grade"
                  fullWidth
                />
                <TextFieldStyled
                  value={comment.value}
                  onChange={handleChange}
                  name="comment"
                  multiline
                  label="Comment"
                  fullWidth
                />
                <TextFieldStyled
                  value={total.value}
                  onChange={handleChange}
                  name="total"
                  type="number"
                  label="Total note"
                  fullWidth
                />
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCancel}>
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={submitDisabled}
          >
            {props.action}
          </Button>
        </DialogActions>
        {succes}
      </Dialog>
    );
}
function IconBreadcrumbs ( props )
{
    return (
        <Breadcrumbs aria-label="breadcrumb" justifyContent='center' alignItems='center'>
            <Link
                underline="hover"
                sx={ { display: 'flex', alignItems: 'center', color: 'text.primary', fontWeight: 'bold', fontSize: '1rem' } }
                component={ RouterLink }
                to="/teacher"
            >
                <HomeIcon sx={ { mr: 0.5 } } color="primary" fontSize="medium" />
                Teacher
            </Link>
            <Link
                underline="hover"
                sx={ { display: 'flex', alignItems: 'center', color: 'text.primary', fontWeight: 'semi-bold' } }
                component={ RouterLink }
                to="/markSheets"
            >
                <List color="primary" sx={ { mr: 0.5 } } fontSize="medium" />
                MarkSheets
            </Link>
        </Breadcrumbs>
    );
}
export default StudentNotes;