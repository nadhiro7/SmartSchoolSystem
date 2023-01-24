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
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  DialogContentText,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link, Edit, Delete } from "@mui/icons-material";
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
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen = (idd, lesson) => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <Card sx={{ bgcolor: "inherit" }}>
      <CardHeader
        action={
          <>
            <IconButton
              aria-label="settings"
              color="secondary"
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <MoreVertIcon />
            </IconButton>
            <Popper
              placement="bottom"
              disablePortal={true}
              open={open}
              anchorEl={anchorRef.current}
              modifiers={[
                {
                  name: "flip",
                  enabled: false,
                  options: {
                    altBoundary: true,
                    rootBoundary: "viewport",
                    padding: 8,
                  },
                },
                {
                  name: "preventOverflow",
                  enabled: true,
                  options: {
                    altAxis: true,
                    altBoundary: true,
                    tether: true,
                    rootBoundary: "document",
                    padding: 8,
                  },
                },
                {
                  name: "arrow",
                  enabled: true,
                },
              ]}
            >
              <Paper
                sx={{
                  height: "fit-content ",
                  width: "70px",
                  transform: "translateY(15px)",
                  minWidth: "200px",
                }}
                elevation={8}
              >
                <List
                  component="nav"
                  sx={{
                    width: "100%",
                    backgroundColor: theme.palette.background.paper,
                    [theme.breakpoints.down("md")]: {
                      minWidth: "100%",
                    },
                    "& .MuiListItemButton-root": {
                      mt: 0.5,
                    },
                  }}
                >
                  <ListItemButton
                    onClick={() => {
                      props.handleOpenEdit(props.announce);
                    }}
                  >
                    <ListItemIcon>
                      <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ color: theme.palette.text.primary }}
                      primary={<Typography variant="body1">Edit</Typography>}
                    />
                  </ListItemButton>
                  <ListItemButton
                    onClick={handleClickOpen}
                  >
                    <ListItemIcon>
                      <Delete fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      sx={{ color: theme.palette.text.primary }}
                      primary={<Typography variant="body1">Delete</Typography>}
                    />
                  </ListItemButton>
                </List>
              </Paper>
            </Popper>
          </>
        }
        title={"Announce"}
      />
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
      <Dialog
        open={open1}
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h5">Delete Announce</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" variant="subtitle1">
            Are you sure to delete this announce?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose1}>No</Button>
          <Button
            onClick={() => {
              props.deleteAnnounce(props.announce.id);
              setOpen((prevOpen) => !prevOpen);
            }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
