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
import { Link as RouterLink } from "react-router-dom";
import {
  Home as HomeIcon,
  Person,
  Edit,
  Delete,
  PersonAdd,
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
const TextFieldStyled = styled(TextField, { shouldForwardProp })(
  ({ theme }) => ({
    background: theme.palette.primary.light,
    borderRadius: `7px`,
    "& .MuiInputBase-input": {
      background: theme.palette.primary.light,
    },
  })
);
function AddStudent() {
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
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const [srcPhoto, setSrcPhoto] = React.useState("");
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
      parent.valid &&
      email.valid &&
      classes.valid &&
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
    handleSubmitDisabled();
  }, [firstname, lastname, parent, email, classes, birthday, address]);
  const [success, setSuccess] = React.useState("");
  const succes = (
    <>
      {success}
    </>
  );
  const handleSubmit = (event) => {
    refetch().then((res) => {
      if (res.data.data !== "Successfully Add") {
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
              Failed add --
              <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        );
        setTimeout(() => {
          setSuccess("");
          handleCancel();
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
            <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
              <AlertTitle>Successfully</AlertTitle>
              Successfully Add --<strong>check it out!</strong>
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
  const handleCancel = () => {
    setFirstname({ value: "", valid: false });
    setLastname({ value: "", valid: false });
    setParent({ value: "", valid: false });
    setAddress({ value: "", valid: false });
    setEmail({ value: "", valid: false });
    setClasses({ value: "", valid: false });
    setGender({ value: "", valid: false });
    setBirthday({ value: new Date(), valid: true });
    photoRef.current.value = null;
    setSrcPhoto('')
  };
  const { isLoading, error, data, refetch } = useQuery(
    "storeStudent",
    async () => {
      const fdata = new FormData();
      console.log(photoRef.current.files[0]);
      fdata.append("image", photoRef.current.files[0]);
      fdata.append("firstname", firstname.value);
      fdata.append("lastname", lastname.value);
      fdata.append("gender", gender.value.label);
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
      return axios.post("http://localhost:8000/api/storeStudent", fdata);
    },
    {
      enabled: false,
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
    }
  );
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
        <IconBreadcrumbs />
      </Box>
      <Grid container mt={2}>
        <Grid item xs={12}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} mb={1} display="flex" justifyContent="center">
                <Typography variant="h3">Add New Students</Typography>
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
                    options={genderOption}
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
                <IconButton
                  color="primary"
                  onClick={() => {
                    photoRef.current.click();
                  }}
                >
                  <Camera />
                  <Typography variant="subtitle1">
                    Choose Student Photo
                  </Typography>
                </IconButton>
                <Box
                  sx={{ position: "relative" }}
                  width={200}
                  height={200}
                  border={`1px dashed ${theme.palette.primary.main}`}
                >
                  <input
                    ref={photoRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setSrcPhoto(URL.createObjectURL(e.target.files[0]))
                    }
                    style={{
                      zIndex: "-2",
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      visibility: "hidden",
                    }}
                  />
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
                  {srcPhoto && (
                    <img
                      style={{ zIndex: "10", width: "99%", height: "99%" }}
                      src={srcPhoto}
                    ></img>
                  )}
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
const parentOption = [
  { label: "nadhir djabali", id: 1 },
  { label: "salah allag", id: 2 },
  { label: "menasria mahdi", id: 3 },
];
const classOption = [
  { label: "class 1 primary years", id: 1 },
  { label: "class 2 primary years", id: 2 },
  { label: "class 2 secondary years", id: 3 },
];
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
        to="/secretary/students/AddStudent"
      >
        <PersonAdd color="primary" sx={{ mr: 0.5 }} fontSize="medium" />
        Add Student
      </Link>
    </Breadcrumbs>
  );
}

export default AddStudent;
