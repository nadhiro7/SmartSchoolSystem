import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  TextareaAutosize,
  Divider,
  Typography,
  ButtonBase,
  Stack,
  TextField,
  styled,
  Button,
  useTheme,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { Home as HomeIcon, Add } from "@mui/icons-material";
import MainCard from "./../../../Components/MainCard";
import { shouldForwardProp } from "@mui/system";
import Announce from "./../../../Components/Announce";
import { useQuery } from "react-query";
import axios from "axios";
const TextFieldStyled = styled(TextField, { shouldForwardProp })(
  ({ theme }) => ({
    background: theme.palette.primary.light,
    borderRadius: `7px`,
    "& .MuiInputBase-input": {
      background: theme.palette.primary.light,
    },
  })
);
function Announces() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [popType, setPopType] = React.useState({ action: "Add", item: null });
  const handleOpenAdd = () => {
    setOpen(true);
    setPopType({ action: "Add", item: null });
  };
  const handleOpenEdit = (item) => {
    setOpen(true);
    setPopType({ action: "Edit", item: item });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getAllAnnounces = useQuery("getAllAnnounces", async () => {
    return axios.get("http://localhost:8000/api/getAllAnnounces");
  });
  const deleteAnnounce = (id) => {
    axios
      .delete("http://localhost:8000/api/deleteAnnounce/" + id)
      .then((res) => {
        if (res.data === "failed") {
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
                Failed Delete
                <strong>check it out!</strong>
              </Alert>
            </Snackbar>
          );
          setTimeout(() => {
            setSuccess("");
          }, 4000);
        } else {
          if (res.data === "success") {
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
                  Successfully Delete<strong>check it out!</strong>
                </Alert>
              </Snackbar>
            );
            setTimeout(() => {
              setSuccess("");
            }, 4000);
          }
        }
        getAllAnnounces.refetch();
      });
  };
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  React.useEffect(() => {
    getAllAnnounces.refetch();
  }, [open]);
  const view = !getAllAnnounces.isLoading ? (
    getAllAnnounces.data.data.length != 0 ? (
      getAllAnnounces.data.data.map((item, index) => {
        return (
          <Grid
            item
            display="flex"
            justifyContent="center"
            key={index}
            mb={1}
            mt={1}
            xs={12}
          >
            <MainCard
              sx={{
                width: { xs: "100%", sm: "400px" },
                height: "100%",
              }}
            >
              <Announce
                announce={item}
                deleteAnnounce={deleteAnnounce}
                handleOpenEdit={handleOpenEdit}
              />
            </MainCard>
          </Grid>
        );
      })
    ) : (
      <Grid
        item
        xs={12}
        height={300}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="subtitle1">Annouces are Vide</Typography>
      </Grid>
    )
  ) : (
    <Grid
      item
      xs={12}
      height={300}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress color="secondary"></CircularProgress>
    </Grid>
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
            <Grid container>
              <Grid item xs={12} sx={{ backgroundColor: "#9e9e9e5c", p: 1 }}>
                <Grid container display="flex" alignItems="center">
                  <Grid item xs={11}>
                    <Typography variant="subtitle1">Announces</Typography>
                  </Grid>
                  <Grid item xs={1} display="flex" justifyContent={"end"}>
                    <ButtonBase
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleOpenAdd}
                      sx={{
                        borderRadius: "50% !important",
                        width: "30px !important",
                        height: "30px",
                        color: "white",
                        transition: "0.3s",
                        backgroundColor: theme.palette.secondary.dark,
                      }}
                    >
                      <Add fontSize="small" />
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container>{view}</Grid>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
      <PopUp
        open={open}
        action={popType.action}
        item={popType.item}
        handleClose={handleClose}
      />
      {succes}
    </Box>
  );
}

function PopUp(props) {
  const photoRef = React.useRef();
  const theme = useTheme();
  const [title, setTitle] = React.useState({
    value: props.action === "Add" ? "" : props.item.title,
    valid: props.action === "Add" ? false : props.item.title.length > 0,
  });
  const [link, setLink] = React.useState({
    value: props.action === "Add" ? "" : props.item.link,
    valid: props.action === "Add" ? false : props.item.link.length > 0,
  });
  const [content, setContent] = React.useState({
    value: props.action === "Add" ? "" : props.item.content,
    valid: props.action === "Add" ? false : props.item.title.length > 0,
  });
  const [photo, setPhoto] = React.useState({
    value: {},
    valid: props.action === "Add" ? false : true,
  });
  const [srcPhoto, setSrcPhoto] = React.useState("");
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const handleChange = (event) => {
    const { names, value } = event.target;
    setTitle({ value, valid: value.length > 0 });
  };
  const [image, setImage] = React.useState();
  const handleChangePhoto = (event) => {
    setImage([...event]);
    setSrcPhoto(URL.createObjectURL(event[0]));
  };
  const handleLinkChange = (event) => {
    const { names, value } = event.target;
    setLink({ value, valid: true });
  };
  const handleContentChange = (event) => {
    const { names, value } = event.target;
    setContent({ value, valid: true });
  };
  const handleSubmitDisabled = () => {
    if (title.valid && link.valid && content.valid) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };
  React.useEffect(() => {
    function doSomething() {
      handleCancel();
    }
    doSomething();
  }, [props]);
  React.useEffect(() => {
    function doSomething() {
      if (!props.open) {
        setSrcPhoto("");
      }
    }
    doSomething();
  }, [props.open]);
  React.useEffect(() => {
    handleSubmitDisabled();
  }, [title, link, content, photo]);
  const handleCancel = () => {
    setTitle({
      value: props.action === "Add" ? "" : props.item.title,
      valid: props.action === "Add" ? false : props.item.title.length > 0,
    });
    setLink({
      value: props.action === "Add" ? "" : props.item.link,
      valid: props.action === "Add" ? false : props.item.link.length > 0,
    });
    setContent({
      value: props.action === "Add" ? "" : props.item.content,
      valid: props.action === "Add" ? false : props.item.content.length > 0,
    });
    setPhoto({
      value: "",
      valid: props.action === "Add" ? false : true,
    });
  };
  const handleReset = () => {
    srcPhoto();
  };
  const createAnnounce = useQuery(
    "createAnnounce",
    async () => {
      const fdata = new FormData();
      fdata.append("image", photoRef.current.files[0]);
      fdata.append("content", content.value);
      fdata.append("title", title.value);
      if (link.value) {
        fdata.append("link", link.value);
      }
      return axios.post("http://localhost:8000/api/storeAnnounce", fdata);
    },
    {
      enabled: false,
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
    }
  );
  const updateAnnounce = useQuery(
    "updateAnnounce",
    async () => {
      const fdata = new FormData();
      if (photoRef.current.files[0]) {
        fdata.append("image", photoRef.current.files[0]);
      }

      fdata.append("content", content.value);
      fdata.append("title", title.value);
      fdata.append("link", link.value);
      if (link.value) {
        fdata.append("link", link.value);
      }
      fdata.append("id", props.item.id);
      return axios.post("http://localhost:8000/api/updateAnnounce", fdata);
    },
    {
      enabled: false,
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
    }
  );
  const handleSubmit = () => {
    if (props.action == "Add") {
      createAnnounce.refetch().then((res) => {
        if (res.data.data !== "success") {
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
            handleCancel();
            props.handleClose();
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
              <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
                <AlertTitle>Successfully</AlertTitle>
                Successfully Add --<strong>check it out!</strong>
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
    } else {
      updateAnnounce.refetch().then((res) => {
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
                Failed edit --
                <strong>Please try again!</strong>
              </Alert>
            </Snackbar>
          );
          setTimeout(() => {
            setSuccess("");
            handleCancel();
            props.handleClose();
          }, 4000);
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
                <Alert
                  variant="filled"
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  <AlertTitle>Successfully</AlertTitle>
                  Successfully edit --<strong>check it out!</strong>
                </Alert>
              </Snackbar>
            );
            setTimeout(() => {
              setSuccess("");
              handleCancel();
              props.handleClose();
            }, 4000);
          }
        }
      });
    }
  };
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  return (
    <Dialog fullWidth open={props.open} onClose={props.handleClose}>
      <DialogTitle>
        <Typography variant="h4">{props.action} Announce</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <Divider />
          </Grid>
          <Grid item xs={12} mb={2}>
            <Stack spacing={2} direction="column" sx={{ width: "100%" }}>
              <input
                type="file"
                onChange={(e) => handleChangePhoto(e.target.files)}
                label="Photo"
                ref={photoRef}
                fullWidth
              />
              <Box
                sx={{ position: "relative" }}
                width={"100%"}
                height={200}
                border={`1px dashed ${theme.palette.primary.main}`}
              >
                <img
                  style={{ zIndex: "10", width: "100%", height: "100%" }}
                  src={
                    props.item
                      ? srcPhoto
                        ? srcPhoto
                        : "http://127.0.0.1:8000/public/" + props.item.image
                      : srcPhoto
                  }
                ></img>
              </Box>
              <TextFieldStyled
                value={title.value}
                onChange={handleChange}
                label="Title"
                fullWidth
              />
              <TextFieldStyled
                value={link.value}
                onChange={handleLinkChange}
                label="Link"
                fullWidth
              />
              <TextareaAutosize
                aria-label="content"
                minRows={5}
                placeholder="Your Content"
                value={content.value}
                onChange={handleContentChange}
                style={{ maxWidth: 400, padding: "7px" }}
                sx={{ "&:focus": { outline: "none" } }}
                bgcolor={theme.palette.primary.light}
              />
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
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
        to="/admin/announces"
      >
        Announces
      </Link>
    </Breadcrumbs>
  );
}
export default Announces;
