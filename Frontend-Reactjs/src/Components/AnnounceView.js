import * as React from "react";
import {
  styled,
  Paper,
  Popper,
  useTheme,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Link, Edit, Delete } from "@mui/icons-material";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Announce(props) {
  const [expanded, setExpanded] = React.useState(false);

  const theme = useTheme();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ bgcolor: "inherit" }}>
      {props.announce.image && (
        <CardMedia
          component="img"
          height="194"
          image={"http://127.0.0.1:8000/public/" + props.announce.image}
        />
      )}

      <CardContent sx={{ height: "50px !important" }}>
        <Typography variant="h3" color="text.primary">
          {props.announce.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {props.announce.link && (
          <IconButton
            href={props.announce.link}
            rel="noreferrer"
            traget="_blank"
            aria-label="add to favorites"
            LinkComponent={"a"}
            color="secondary"
            onClick={() => {
              window.location.replace(props.announce.link);
            }}
          >
            <Link />
            <Typography variant="h4" color="secondary">
              View file
            </Typography>
          </IconButton>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          color="secondary"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.announce.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
