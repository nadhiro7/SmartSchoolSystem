import React from "react";
import {
  Paper,
  Stack,
  Button,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import {
  Home as HomeIcon,
  Person,
  Edit,
  BookOutlined,
  Add,
  Room,
} from "@mui/icons-material";
import { useQuery } from "react-query";
import axios from "axios";
const Content = ({ children, appointmentData, ...restProps }) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
    <Stack spacing={2} direction="row" alignItems="center" ml={2.5} mb={1.5}>
      <Room />
      <span>classroom : {appointmentData.nameClassroom}</span>
    </Stack>
    <Stack spacing={2} direction="row" alignItems="center" ml={2.5} mb={1.5}>
      <BookOutlined />
      <span>subject : {appointmentData.nameSubject}</span>
    </Stack>
    {appointmentData.teacher && (
      <Stack spacing={2} direction="row" alignItems="center" ml={2.5}>
        <Person />
        <span>teacher : {appointmentData.teacher}</span>
      </Stack>
    )}
  </AppointmentTooltip.Content>
);
const Header = ({ children, appointmentData, ...restProps }) => {
  const storeLesson = useQuery(
    "storeLesson",
    async () => {
      return axios.post("http://localhost:8000/api/storeLesson", {
        date: new Date().toISOString().split("T")[0],
        startTime: new Date(appointmentData.startDate)
          .toLocaleTimeString()
          .slice(0, 8),
        endTime: new Date(appointmentData.endDate)
          .toLocaleTimeString()
          .slice(0, 8),
        classes_id: appointmentData.classes_id,
        subjects_id: appointmentData.subject.id,
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
  const addLesson = () => {
    storeLesson.refetch().then((res) => {
      if (res.data.data === "failed") {
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
              <strong>Lesson is exist!</strong>
            </Alert>
          </Snackbar>
        );
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } else {
        if (res.data.data) {
          setSuccess(
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={true}
              autoHideDuration={5000}
            >
              <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
                <AlertTitle>Successfully</AlertTitle>
                Successfully Add --<strong>check it out!</strong>
              </Alert>
            </Snackbar>
          );
          setTimeout(() => {
            setSuccess("");
          }, 3000);
        }
      }
    });
  };
  return (
    <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
      <Stack spacing={2} direction="row" alignItems="center" ml={2.5} mb={1.5}>
        <Button onClick={addLesson} variant="text">
          <Add /> Add Lesson
        </Button>
      </Stack>
      {succes}
    </AppointmentTooltip.Header>
  );
};
function ScheduleDay(props) {
  return (
    <Paper>
      <Scheduler data={props.data} height={300}>
        <DayView startDayHour={8} endDayHour={18} />
        <Appointments />
        <AppointmentTooltip
          headerComponent={Header}
          contentComponent={Content}
        />
      </Scheduler>
    </Paper>
  );
}

export default ScheduleDay;
