import React from "react";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";
function TimelineDay(props) {
  return (
    <Timeline position="alternate">
      {props.day.map((item, index) => {
        return (
          <TimelineItem>
            <TimelineOppositeContent align={index % 2 == 0 ? "right" : "left"}>
              {item.time}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color={index % 2 == 0 ? "error" : "secondary"} />
              <TimelineConnector
                sx={{
                  bgcolor: index % 2 == 0 ? "error.main" : "secondary.main",
                }}
              />
            </TimelineSeparator>
            <TimelineContent>
              Class: {item.class} Classroom: {item.classroom}
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
export default TimelineDay;
