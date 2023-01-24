import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  Popover,
  Card,
  Autocomplete,
  Table,
  TextareaAutosize,
  TableRow,
  TableBody,
  TableHead,
  IconButton,
  TableCell,
  Divider,
  Typography,
  ButtonBase,
  Stack,
  TextField,
  styled,
  Button,
  useTheme,
  Alert,
  AlertTitle,
  Snackbar
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink,useParams } from "react-router-dom";
import {
  Home as HomeIcon,
  Person,
  Edit,
  BookOutlined,
  Add,
  Room,
} from "@mui/icons-material";
import MainCard from "./../../../Components/MainCard";
import { DataGrid } from "@mui/x-data-grid";
import { shouldForwardProp } from "@mui/system";
import Announce from "./../../../Components/Announce";
import announcePhoto from "./../../../Images/Management.png";
import { useQuery } from "react-query";
import axios from "axios";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  DragDropProvider,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";


const PREFIX = "Demo";
export const classes = {
  container: `${PREFIX}-container`,
  text: `${PREFIX}-text`,
  formControlLabel: `${PREFIX}-formControlLabel`,
};

const TextEditor = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (props.type === "multilineTextEditor") {
    return null;
  }
  return <AppointmentForm.TextEditor {...props} />;
};

const BasicLayout = ({ onFieldChange, appointmentData, ...restProps }) => {
  const onCustomFieldChange = (e,value) => {
    onFieldChange({...onFieldChange, subject: value });
  };
  const onCustomFieldChange2 = (e, value) => {
    onFieldChange({ ...onFieldChange, classroom: value });
  };
  const params = useParams();
  const level = params.level;
  const getAllLevelSubjects = useQuery("getAllLevelSubjects", async () => {
    return axios.get("http://localhost:8000/api/getAllLevelSubjects/" + level);
  });
  const [subjects, setSubjects] = React.useState([]);
  React.useEffect(() => {
    setSubjects(
      getAllLevelSubjects.data
        ? getAllLevelSubjects.data.data.map((item) => {
            return { id: item.id, label: `${item.nameSubject} | teacher is ${item.firstname} ${item.lastname}`,userId: item.user_id };
          })
        : []
    );
  }, [getAllLevelSubjects.data]);
  const getAllClassrooms = useQuery("getAllClassrooms", async () => {
    return axios.get("http://localhost:8000/api/getAllClassrooms");
  });
  const [classrooms, setClassrooms] = React.useState([]);
  React.useEffect(() => {
    setClassrooms(
      getAllClassrooms.data
        ? getAllClassrooms.data.data.map((item) => {
            return {
              id: item.id,
              label: `${item.nameClassroom} | type is ${item.type}`,
            };
          })
        : []
    );
  }, [getAllClassrooms.data]);
  const theme = useTheme();
  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      <Stack spacing={2} direction="column">
        <Autocomplete
          id="combo-box-demo"
          options={subjects}
          onChange={onCustomFieldChange}
          fullWidth
          sx={{
            borderRadius: `7px`,
            bgcolor: theme.palette.primary.light,
            "& input": {
              bgcolor: theme.palette.primary.light,
            },
          }}
          value={appointmentData.subject}
          renderInput={(params) => (
            <TextFieldStyled {...params} label="Subject" />
          )}
        />
        <Autocomplete
          id="combo-box-demo"
          options={classrooms}
          onChange={onCustomFieldChange2}
          fullWidth
          sx={{
            borderRadius: `7px`,
            bgcolor: theme.palette.primary.light,
            "& input": {
              bgcolor: theme.palette.primary.light,
            },
          }}
          value={appointmentData.classroom}
          renderInput={(params) => (
            <TextFieldStyled {...params} label="Classroom" />
          )}
        />
      </Stack>
    </AppointmentForm.BasicLayout>
  );
};


const StyledGrid = styled(Grid)(() => ({
  [`&.${classes.textCenter}`]: {
    textAlign: "center",
  },
}));

const StyledRoom = styled(Room)(({ theme: { palette } }) => ({
  [`&.${classes.icon}`]: {
    color: palette.action.active,
  },
}));

const TextFieldStyled = styled(TextField, { shouldForwardProp })(
  ({ theme }) => ({
    background: theme.palette.primary.light,
    borderRadius: `7px`,
    "& .MuiInputBase-input": {
      background: theme.palette.primary.light,
    },
  })
);
const Content = ({ children, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Stack spacing={2} direction="row" alignItems="center" ml={2.5} mb={1.5}>
      <StyledRoom className={classes.icon} />
      <span>classroom : {appointmentData.nameClassroom}</span>
    </Stack>
    <Stack spacing={2} direction="row" alignItems="center" ml={2.5} mb={1.5}>
      <BookOutlined />
      <span>subject : {appointmentData.nameSubject}</span>
    </Stack>
    <Stack spacing={2} direction="row" alignItems="center" ml={2.5}>
      <Person />
      <span>teacher : {appointmentData.teacher}</span>
    </Stack>
  </AppointmentTooltip.Content>
);
const editingOptionsList = [
  { id: "allowAdding", text: "Adding" },
  { id: "allowDeleting", text: "Deleting" },
  { id: "allowUpdating", text: "Updating" },
  { id: "allowResizing", text: "Resizing" },
  { id: "allowDragging", text: "Dragging" },
];
function Schedule() {
  const theme = useTheme();
  const [data, setData] = React.useState([]);
  const params = useParams();
  const classId = params.classId;
  const getScheduler = useQuery("getScheduler", async () => {
    return axios.get("http://localhost:8000/api/getScheduler/" + classId);
  });
   React.useEffect(() => {
     setData(
       getScheduler.data
         ? getScheduler.data.data.map((item) => {
             return {
               id: item.id,
               ids: item.id,
               allDay: false,
               endDate: item.endTime,
               startDate: item.startTime,
               title: item.title,
               rRule: item.rRule,
               subject: {
                 id: item.subjects_id,
                 label: `${item.nameSubject} | teacher is ${item.firstname} ${item.lastname}`,
                 userId: item.user_id,
               },
               classroom: {
                 id: item.classrooms_id,
                 label: `${item.nameClassroom} | type is ${item.type}`,
               },
               user_id: item.user_id,
               nameSubject: item.nameSubject,
               nameClassroom: item.nameClassroom,
               teacher: `${item.firstname} ${item.lastname}`,
             };
           })
         : []
     );
   }, [getScheduler.data]);
  const [editingOptions, setEditingOptions] = React.useState({
    allowAdding: true,
    allowDeleting: true,
    allowUpdating: true,
    allowDragging: true,
    allowResizing: true,
  });
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [isAppointmentBeingCreated, setIsAppointmentBeingCreated] =
    React.useState(false);

  const {
    allowAdding,
    allowDeleting,
    allowUpdating,
    allowResizing,
    allowDragging,
  } = editingOptions;
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const [schedule,setSchedule] = React.useState();
  const onCommitChanges = React.useCallback(
    ({added, deleted,changed}) => {
      if (added) {
        if(!added.subject || !added.classroom){
          setSuccess(
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={true}
              autoHideDuration={5000}
            >
              <Alert variant="filled" severity="warning">
                <AlertTitle>failed</AlertTitle>
                subject field or classroom field are required --
                <strong>check it out!</strong>
              </Alert>
            </Snackbar>
          );
          setTimeout(() => {
            setSuccess("");
          }, 4000);
        }else{
          if(added.user_id){
            axios
              .post("http://localhost:8000/api/editSchedule", {
                startTime: `${
                  new Date(added.startDate).toISOString().split("T")[0]
                } ${new Date(added.startDate).toLocaleTimeString()}`,
                endTime: `${
                  new Date(added.endDate).toISOString().split("T")[0]
                } ${new Date(added.endDate).toLocaleTimeString()}`,
                title: added.title ? added.title : "t",
                rRule: added.rRule
                  ? added.rRule
                  : `RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=${new Date(
                      added.startDate
                    )
                      .toUTCString()
                      .slice(0, 2)
                      .toLocaleUpperCase()}`,
                subjects_id: added.subject.id,
                classrooms_id: added.classroom.id,
                users_id: added.subject.userId,
                classId: classId,
                id: added.ids,
              })
              .then((res) => {
                getScheduler.refetch();
                if (res.data) {
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
                         Successfully Edit --<strong>check it out!</strong>
                       </Alert>
                     </Snackbar>
                   );
                  setTimeout(() => {
                    setSuccess("");
                  }, 4000);
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
                      <Alert variant="filled" severity="error">
                        <AlertTitle>failed</AlertTitle>
                        Failed Edit --
                        <strong>check it out!</strong>
                      </Alert>
                    </Snackbar>
                  );
                    setTimeout(() => {
                      setSuccess("");
                    }, 4000);
                }
              });
          }else{
            axios
              .post("http://localhost:8000/api/addSchedule", {
                startTime: `${
                  new Date(added.startDate).toISOString().split("T")[0]
                } ${new Date(added.startDate).toLocaleTimeString()}`,
                endTime: `${
                  new Date(added.endDate).toISOString().split("T")[0]
                } ${new Date(added.endDate).toLocaleTimeString()}`,
                title: added.title ? added.title : "t",
                rRule: added.rRule
                  ? added.rRule
                  : `RRULE:INTERVAL=1;FREQ=WEEKLY;BYDAY=${new Date(
                      added.startDate
                    )
                      .toUTCString()
                      .slice(0, 2)
                      .toLocaleUpperCase()}`,
                subjects_id: added.subject.id,
                classrooms_id: added.classroom.id,
                users_id: added.subject.userId,
                classId: classId,
              })
              .then((res) => {
                getScheduler.refetch();
                if (res.data = "exist") {
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
                        Successfully Add --<strong>check it out!</strong>
                      </Alert>
                    </Snackbar>
                  );
                  setTimeout(() => {
                    setSuccess("");
                  }, 4000);
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
                      <Alert variant="filled" severity="error">
                        <AlertTitle>failed</AlertTitle>
                        Failed Add --
                        <strong>check it out!</strong>
                      </Alert>
                    </Snackbar>
                  );
                  setTimeout(() => {
                    setSuccess("");
                  }, 4000);
                }
              });
          }
        }
      }
      if (
        changed !== undefined &&
        deleted == undefined &&
        added == undefined
      ) {
        console.log(Object.keys(changed)[0]);
        axios
          .delete(
            "http://localhost:8000/api/deleteSchedule/" +
              Object.keys(changed)[0]
          )
          .then((res) => {
            getScheduler.refetch();
            if (res.data == "deleted") {
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
                    Successfully Delete --<strong>check it out!</strong>
                  </Alert>
                </Snackbar>
              );
              setTimeout(() => {
                setSuccess("");
              }, 4000);
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
                  <Alert variant="filled" severity="error">
                    <AlertTitle>failed</AlertTitle>
                    Failed Delete --
                    <strong>check it out!</strong>
                  </Alert>
                </Snackbar>
              );
              setTimeout(() => {
                setSuccess("");
              }, 4000);
            }
          });
      }
      setIsAppointmentBeingCreated(false);
    },
    [setData, setIsAppointmentBeingCreated, data]
  );
  const onAddedAppointmentChange = React.useCallback((appointment) => {
    setAddedAppointment(appointment);
    setIsAppointmentBeingCreated(true);
  });

  const TimeTableCell = React.useCallback(
    React.memo(({ onDoubleClick, ...restProps }) => (
      <WeekView.TimeTableCell
        {...restProps}
        onDoubleClick={allowAdding ? onDoubleClick : undefined}
      />
    )),
    [allowAdding]
  );
  const CommandButton = React.useCallback(
    ({ id, ...restProps }) => {
      if (id === "deleteButton") {
        return (
          <AppointmentForm.CommandButton
            id={id}
            {...restProps}
            disabled={!allowDeleting}
          />
        );
      }
      return <AppointmentForm.CommandButton id={id} {...restProps} />;
    },
    [allowDeleting]
  );
  const allowDrag = React.useCallback(
    () => allowDragging && allowUpdating,
    [allowDragging, allowUpdating]
  );
  const allowResize = React.useCallback(
    () => allowResizing && allowUpdating,
    [allowResizing, allowUpdating]
  );
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
            <Paper>
              <Scheduler data={data} height={600}>
                <ViewState currentDate={new Date()} />
                <EditingState
                  onCommitChanges={onCommitChanges}
                  addedAppointment={addedAppointment}
                  onAddedAppointmentChange={onAddedAppointmentChange}

                />
                <IntegratedEditing />
                <WeekView
                  startDayHour={8}
                  endDayHour={18}
                  excludedDays={[5, 6]}
                  timeTableCellComponent={TimeTableCell}
                />
                <Appointments />
                <AppointmentTooltip
                  contentComponent={Content}
                  showOpenButton
                  showDeleteButton={true}
                />
                <AppointmentForm
                  basicLayoutComponent={BasicLayout}
                  textEditorComponent={TextEditor}
                  commandButtonComponent={CommandButton}
                  readOnly={isAppointmentBeingCreated ? false : !allowUpdating}
                />
                <ConfirmationDialog ignoreCancel />
                <DragDropProvider
                  allowDrag={allowDrag}
                  allowResize={allowResize}
                />
              </Scheduler>
            </Paper>
          </MainCard>
        </Grid>
      </Grid>
      {succes}
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
          fontSize: "0.9rem",
        }}
        component={RouterLink}
        to="/admin/schedules"
      >
        Schedules
      </Link>
    </Breadcrumbs>
  );
}
export default Schedule;
