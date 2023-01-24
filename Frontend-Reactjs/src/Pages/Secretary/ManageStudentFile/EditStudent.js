import React from "react";
import {
  Box,
  IconButton,
  Grid,
  Breadcrumbs,
  Stack,
  TextField,
  Divider,
  styled,
  Typography,
  Snackbar,
  Alert,
  AlertTitle,
  Button,
  Autocomplete,
  useTheme,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Person,
  Edit,
  Delete,
  CameraEnhance as Camera,
  AddAPhoto,
} from "@mui/icons-material";
import MainCard from "../../../Components/MainCard";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { shouldForwardProp } from "@mui/system";
import { useQuery } from "react-query";
import axios from "axios";
import useGetStudent from "../../../Hooks/useGetStudent";
const TextFieldStyled = styled(TextField, { shouldForwardProp })(
  ({ theme }) => ({
    background: theme.palette.primary.light,
    borderRadius: `7px`,
    "& .MuiInputBase-input": {
      background: theme.palette.primary.light,
    },
  })
);
function EditStudent() {
  const params = useParams();
  const navigate = useNavigate();
  const photoRef = React.useRef();
  const [firstname, setFirstname] = React.useState({ value: "", valid: false });
  const [lastname, setLastname] = React.useState({ value: "", valid: false });
  const [parent, setParent] = React.useState({ value: "", valid: false });
  const [email, setEmail] = React.useState({ value: "", valid: false });
  const [classes, setClasses] = React.useState({ value: "", valid: false });
  const [address, setAddress] = React.useState({ value: "", valid: false });
  const [birthday, setBirthday] = React.useState({
    value: new Date(),
    valid: true,
  });
  const [gender, setGender] = React.useState({ value: "", valid: false });
  const studentId = params.studentId;
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const [srcPhoto, setSrcPhoto] = React.useState("");
  const { isLoading1, data1, refetch } = useQuery(
    "editStudent",
    async () => {
      const fdata = new FormData();
      if (photoRef.current.files[0]) {
        fdata.append("image", photoRef.current.files[0]);
      }
      fdata.append("firstname", firstname.value);
      fdata.append("lastname", lastname.value);
      fdata.append("gender", gender.value);
      fdata.append("email", email.value);
      fdata.append("address", address.value);
      fdata.append(
        "birthday",
        new Date(birthday.value).toISOString().split("T")[0]
      );
      fdata.append("id_class", classes.value.id);
      fdata.append("id_level", classes.value.id_Level);
      fdata.append("id_parent", parent.value.id);
      fdata.append("isValidate", 1);
      fdata.append("id", studentId);
      return axios.post("http://localhost:8000/api/updateStudent", fdata);
    },
    {
      enabled: false,
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
    }
  );
  const { isLoading, data } = useGetStudent(studentId);
  if (data) {
    if (data.data == "fail") {
      navigate(-2);
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstname":
        setFirstname({ value, valid: value.length > 0 });
        break;
      case "lastname":
        setLastname({ value, valid: value.length > 0 });
        break;
      case "email":
        setEmail({ value, valid: value.length > 0 });
        break;
      case "address":
        setAddress({ value, valid: value.length > 0 });
        break;
      default:
        break;
    }
  };
  const getAllParents = useQuery("getParent", async () => {
    return axios.get("http://localhost:8000/api/getAllParent");
  });
  const getAllClasses = useQuery("getAllClasses", async () => {
    return axios.get("http://localhost:8000/api/getAllClasses");
  });
  const getLevels = useQuery("getLevels", async () => {
    return axios.get("http://localhost:8000/api/getLevels");
  });
  const getLevel = (idLevel) => {
    if (getLevels.data) {
      const l = getLevels.data.data.filter((level) => {
        return level.id == idLevel;
      });
      return l[0].nameLevel;
    } else {
      return "";
    }
  };
  const getClass = (idclass, id_Level) => {
    if (getAllClasses.data) {
      const l = allClasses.filter((classes) => {
        return classes.id == idclass;
      });
      return { id: idclass, label: l[0] ? l[0].label : "", id_Level: id_Level };
    } else {
      return "";
    }
  };
  const [allParent, setAllParent] = React.useState([]);
  const [allClasses, setAllClasses] = React.useState([]);
  React.useEffect(() => {
    setAllParent(
      getAllParents.data
        ? getAllParents.data.data.map((item) => {
            return {
              id: item.id,
              label: `${item.firstname} ${item.lastname}`,
            };
          })
        : []
    );
    if (data)
      setParent({
        value: {
          id: data.data.user_id,
          label: `${data.data.parentFirstname} ${data.data.parentLastname}`,
        },
        valid: true,
      });
  }, [getAllParents.data]);
  React.useEffect(() => {
    setAllClasses(
      getAllClasses.data
        ? getAllClasses.data.data.map((item) => {
            return {
              id: item.id,
              label: item.nameClass + " " + getLevel(item.level_id),
              id_Level: item.level_id,
            };
          })
        : []
    );
    if (data)
      setClasses({
        value: getClass(data.data.classes_id, data.data.level_id),
        valid: false,
      });
  }, [getAllClasses.data, getLevels.data]);

  const handleBirthdayChange = (date) => {
    setBirthday({ value: date, valid: true });
  };
  const handleGenderChange = (event, newValue) => {
    setGender({ value: newValue, valid: true });
  };
  const handleParentChange = (event, newValue) => {
    setParent({ value: newValue, valid: true });
  };
  const handleClassChange = (event, newValue) => {
    setClasses({ value: newValue, valid: true });
  };
  const handleSubmitDisabled = () => {
    if (
      firstname.valid &&
      lastname.valid &&
      email.valid &&
      birthday.valid &&
      address.valid &&
      gender.valid
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };
  React.useEffect(() => {
    if (
      !studentId ||
      studentId === undefined ||
      studentId === "" ||
      studentId === "undefined"
    ) {
      navigate(-1);
    }
    handleSubmitDisabled();
  }, [firstname, lastname, parent, email, classes, birthday, address]);
  React.useEffect(() => {
    function doSomthing() {
      if (data) {
        if (data.data != "fail") {
          setFirstname({ value: data.data.firstname, valid: true });
          setLastname({ value: data.data.lastname, valid: true });
          setEmail({ value: data.data.email, valid: true });
          setGender({ value: data.data.gender, valid: true });
          setBirthday({ value: data.data.birthday, valid: true });
          setAddress({ value: data.data.address, valid: true });
          setParent({
            value: {
              id: data.data.user_id,
              label: `${data.data.parentFirstname} ${data.data.parentLastname}`,
            },
            valid: true,
          });
          setClasses({
            value: getClass(data.data.classes_id, data.data.level_id),
            valid: true,
          });
        }
      }
    }
    doSomthing();
  }, [data]);
  const handleCancel = () => {
    setFirstname({ value: data.data.firstname, valid: true });
    setLastname({ value: data.data.lastname, valid: true });
    setParent({
      value: {
        id: data.data.user_id,
        label: `${data.data.parentFirstname} ${data.data.parentLastname}`,
      },
      valid: true,
    });
    setAddress({ value: data.data.address, valid: true });
    setEmail({ value: data.data.email, valid: true });
    setClasses({
      value: getClass(data.data.classes_id, data.data.level_id),
      valid: true,
    });
    setGender({ value: data.data.gender, valid: true });
    setBirthday({ value: data.data.birthday, valid: true });
    setSrcPhoto("");
    photoRef.current.value = null;
  };
  const handleSubmit = (event) => {
    refetch().then((res) => {
      if (res.data.data === "Successfuly edit") {
        setSuccess(
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={true}
            autoHideDuration={5000}
          >
            <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
              <AlertTitle>Successfully</AlertTitle>
              Successfully Edit --<strong>check it out!</strong>
            </Alert>
          </Snackbar>
        );
        setTimeout(() => {
          handleCancel();
          setSuccess("");
        }, 4000);
      } else {
        setSuccess(
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={true}
            autoHideDuration={5000}
          >
            <Alert variant="filled" severity="error">
              <AlertTitle>failed</AlertTitle>
              Failed Edit invalid informations --
              <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        );
        setTimeout(() => {
          setSuccess("");
          handleCancel();
        }, 4000);
      }
    });
  };
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const theme = useTheme();
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
        <IconBreadcrumbs studentId={studentId} />
      </Box>
      <Grid container mt={2}>
        <Grid item xs={12}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} mb={1} display="flex" justifyContent="center">
                <Typography variant="h3">Edit Student</Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Divider />
              </Grid>
              <Grid item xs={12} mb={{ xs: 2, md: 5 }}>
                <Stack
                  spacing={2}
                  direction={{ xs: "column", md: "row" }}
                  sx={{ width: "100%" }}
                >
                  <TextFieldStyled
                    onChange={handleChange}
                    name="firstname"
                    value={firstname.value}
                    label="Firstname"
                    fullWidth
                  />
                  <TextFieldStyled
                    onChange={handleChange}
                    name="lastname"
                    value={lastname.value}
                    label="Lastname"
                    fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} mb={{ xs: 2, md: 5 }}>
                <Stack
                  spacing={2}
                  direction={{ xs: "column", md: "row" }}
                  sx={{ width: "100%" }}
                >
                  <Autocomplete
                    id="combo-box-demo"
                    options={allParent}
                    onChange={handleParentChange}
                    fullWidth
                    sx={{
                      borderRadius: `7px`,
                      bgcolor: theme.palette.primary.light,
                      "& input": {
                        bgcolor: theme.palette.primary.light,
                      },
                    }}
                    value={parent.value}
                    renderInput={(params) => (
                      <TextFieldStyled {...params} label="Parent" />
                    )}
                  />
                  <Autocomplete
                    id="combo-box-demo"
                    options={allClasses}
                    onChange={handleClassChange}
                    fullWidth
                    sx={{
                      borderRadius: `7px`,
                      bgcolor: theme.palette.primary.light,
                      "& input": {
                        bgcolor: theme.palette.primary.light,
                      },
                    }}
                    value={classes.value}
                    renderInput={(params) => (
                      <TextFieldStyled {...params} label="Class" />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} mb={{ xs: 2, md: 5 }}>
                <Stack
                  spacing={2}
                  direction={{ xs: "column", md: "row" }}
                  sx={{ width: "100%" }}
                >
                  <TextFieldStyled
                    onChange={handleChange}
                    name="address"
                    value={address.value}
                    label="Address"
                    fullWidth
                  />
                  <TextFieldStyled
                    onChange={handleChange}
                    type="email"
                    name="email"
                    value={email.value}
                    label="Email"
                    fullWidth
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} mb={{ xs: 2, md: 5 }}>
                <Stack
                  spacing={2}
                  direction={{ xs: "column", md: "row" }}
                  sx={{ width: "100%" }}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      disableFuture
                      label="Birthday"
                      openTo="year"
                      value={birthday.value}
                      onChange={handleBirthdayChange}
                      views={["year", "month", "day"]}
                      fullWidth
                      sx={{ borderRadius: `7px`, height: "100%" }}
                      renderInput={(params) => (
                        <TextFieldStyled fullWidth {...params} />
                      )}
                    />
                  </LocalizationProvider>
                  <Autocomplete
                    id="combo-box-demo"
                    options={["Male", "Female"]}
                    onChange={handleGenderChange}
                    fullWidth
                    sx={{
                      borderRadius: `7px`,
                      bgcolor: theme.palette.primary.light,
                      "& input": {
                        bgcolor: theme.palette.primary.light,
                      },
                    }}
                    value={gender.value}
                    renderInput={(params) => (
                      <TextFieldStyled {...params} label="Gender" />
                    )}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} mb={{ xs: 2, md: 5 }}>
                <input
                  ref={photoRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setSrcPhoto(URL.createObjectURL(e.target.files[0]))
                  }
                />
                <Box
                  sx={{ position: "relative" }}
                  width={200}
                  height={200}
                  mt={1}
                  border={`1px dashed ${theme.palette.primary.main}`}
                >
                  <AddAPhoto
                    color="primary"
                    sx={{
                      zIndex: "1",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                    }}
                  />
                  <img
                    style={{ zIndex: "10", width: "100%", height: "100%" }}
                    src={
                      data
                        ? srcPhoto
                          ? srcPhoto
                          : "http://127.0.0.1:8000/public/" + data.data.image
                        : srcPhoto
                    }
                  ></img>
                </Box>
              </Grid>
              <Grid item xs={12} mb={2} display="flex" justifyContent="center">
                {succes}
              </Grid>
              <Grid item xs={12} mb={5}>
                <Stack spacing={2} direction="row" sx={{}}>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={submitDisabled}
                  >
                    Submit
                  </Button>
                  <Button variant="contained" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}
const genderOption = [
  { label: "Male", id: 1 },
  { label: "Female", id: 2 },
];
function IconBreadcrumbs(props) {
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
        to="/secretary"
      >
        <HomeIcon sx={{ mr: 0.5 }} color="primary" fontSize="medium" />
        Secretary
      </Link>
      <Link
        underline="hover"
        sx={{
          display: "flex",
          alignItems: "center",
          color: "text.primary",
          fontWeight: "semi-bold",
        }}
        component={RouterLink}
        to="/secretary/students"
      >
        <Person color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        Students
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
        to={"/secretary/students/editStudent/" + props.studentId}
      >
        Edit Student
      </Link>
    </Breadcrumbs>
  );
}

export default EditStudent;
