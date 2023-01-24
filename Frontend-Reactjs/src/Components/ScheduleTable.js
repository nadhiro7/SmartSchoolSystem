import React from "react";
import { Paper, Stack } from "@mui/material";
import {
  Scheduler,
  WeekView,
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
function ScheduleTable(props) {
  return (
    <Paper>
      <Scheduler data={props.data} height={600}>
        <WeekView excludedDays={[5, 6]} startDayHour={8} endDayHour={18} />
        <Appointments />
        <AppointmentTooltip contentComponent={Content} />
      </Scheduler>
    </Paper>
  );
}

export default ScheduleTable;
