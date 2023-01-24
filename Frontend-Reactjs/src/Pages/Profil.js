import React from "react";
import {
  Box,
  Grid,
  IconButton,
  Stack,
  TextField,
  Divider,
  styled,
  Typography,
  Button,
  Autocomplete,
  useTheme,
  Snackbar,
  Alert,
  AlertTitle,
  Avatar,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import { Camera, AddAPhoto } from "@mui/icons-material";
import MainCard from "./../Components/MainCard";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { shouldForwardProp } from "@mui/system";
import { useQuery } from "react-query";
import axios from "axios";
import useGetUser from "./../Hooks/useGetUser";
const TextFieldStyled = styled(TextField, { shouldForwardProp })(
  ({ theme }) => ({
    borderRadius: `7px`,
    outlineColor: "#fff",
    "& .MuiInputBase-input": {
      background: "transparent",
    },
    "& .MuiFormLabel-root": {
      color: theme.palette.text.primary,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.grey[500],
    },
  })
);
function Profil() {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [firstname, setFirstname] = React.useState({
    value: "",
    valid: false,
  });
  const [lastname, setLastname] = React.useState({ value: "", valid: false });
  const [username, setUsername] = React.useState({ value: "", valid: false });
  const [phone, setPhone] = React.useState({ value: "", valid: false });
  const [birthday, setBirthday] = React.useState({
    value: new Date(),
    valid: true,
  });
  const [srcPhoto, setSrcPhoto] = React.useState("");
  const [gender, setGender] = React.useState({ value: "", valid: false });
  const [address, setAddress] = React.useState({ value: "", valid: false });
  const photoRef = React.useRef();
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "firstname":
        setFirstname({ value, valid: value.length > 0 });
        break;
      case "lastname":
        setLastname({ value, valid: value.length > 0 });
        break;
      case "username":
        setUsername({ value, valid: value.length > 0 });
        break;
      case "phone":
        setPhone({ value, valid: value.length > 0 });
        break;
      case "address":
        setAddress({ value, valid: value.length > 0 });
        break;
      default:
        break;
    }
  };

  const handleBirthdayChange = (date) => {
    setBirthday({ value: date, valid: true });
  };
  const handleGenderChange = (event, newValue) => {
    setGender({ value: newValue.label, valid: true });
  };

  const handleSubmitDisabled = () => {
    if (
      firstname.valid &&
      lastname.valid &&
      username.valid &&
      phone.valid &&
      birthday.valid &&
      address.valid &&
      gender.valid
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };
  const getUser = useGetUser(user.id);
  if (getUser.data) {
    if (getUser.data.data == "fail") {
      navigate(-2);
    }
  }
  const { isLoading1, data1, refetch } = useQuery(
    "editUser",
    async () => {
      const fdata = new FormData();
      if (photoRef.current.files[0]) {
        fdata.append("image", photoRef.current.files[0]);
      }
      fdata.append("firstname", firstname.value);
      fdata.append("lastname", lastname.value);
      fdata.append("gender", gender.value);
      fdata.append("address", address.value);
      fdata.append("id", user.id);
      fdata.append(
        "birthday",
        new Date(birthday.value).toISOString().split("T")[0]
      );
      fdata.append("username", username.value);
      fdata.append("phone", phone.value);
      return axios.post("http://localhost:8000/api/editProfil", fdata);
    },
    {
      enabled: false,
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
    }
  );
  React.useEffect(() => {
    function doSomthing() {
      if (getUser.data) {
        if (getUser.data.data != "fail") {
          setFirstname({ value: getUser.data.data.firstname, valid: true });
          setLastname({ value: getUser.data.data.lastname, valid: true });
          setUsername({ value: getUser.data.data.username, valid: true });
          setPhone({ value: getUser.data.data.phone, valid: true });
          setGender({ value: getUser.data.data.gender, valid: true });
          setBirthday({ value: getUser.data.data.birthday, valid: true });
          setAddress({ value: getUser.data.data.address, valid: true });
        }
        handleSubmitDisabled();
      }
    }
    doSomthing();
  }, [getUser.data]);
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
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
          setSuccess("");
          getUser.refetch();
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

  const handleCancel = () => {
    if (getUser.data) {
      if (getUser.data.data != "fail") {
        setFirstname({ value: getUser.data.data.firstname, valid: true });
        setLastname({ value: getUser.data.data.lastname, valid: true });
        setUsername({ value: getUser.data.data.username, valid: true });
        setPhone({ value: getUser.data.data.phone, valid: true });
        setGender({ value: getUser.data.data.gender, valid: true });
        setBirthday({ value: getUser.data.data.birthday, valid: true });
        setAddress({ value: getUser.data.data.address, valid: true });
      }
      handleSubmitDisabled();
    }
  };
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
      <ChangePassword id={user.id} />
      <Grid container mt={2}>
        <Grid item xs={12}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} mb={1} display="flex" justifyContent="center">
                <Typography variant="h3">Account Settings</Typography>
              </Grid>
              <Grid item xs={12} mb={2}>
                <Divider />
              </Grid>
              <Grid
                item
                xs={12}
                mb={{ xs: 2, md: 5 }}
                display="flex"
                justifyContent="center"
                flexDirection="column"
                alignItems="center"
              >
                <IconButton
                  color="primary"
                  onClick={() => {
                    photoRef.current.click();
                  }}
                >
                  <AddAPhoto />
                  <Typography variant="subtitle1">
                    Choose your profil photo
                  </Typography>
                </IconButton>
                <Box
                  sx={{ position: "relative" }}
                  width={220}
                  height={220}
                  //   border={`1px dashed ${theme.palette.primary.main}`}
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
                  <Avatar
                    sx={{ width: "100%", height: "100%" }}
                    src={
                      getUser.data
                        ? srcPhoto
                          ? srcPhoto
                          : "http://127.0.0.1:8000/public/" +
                            getUser.data.data.image
                        : srcPhoto
                    }
                  ></Avatar>
                </Box>
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
                  <TextFieldStyled
                    onChange={handleChange}
                    name="username"
                    value={username.value}
                    label="Username"
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
                  <TextFieldStyled
                    onChange={handleChange}
                    name="address"
                    value={address.value}
                    label="Address"
                    fullWidth
                  />
                  <TextFieldStyled
                    onChange={handleChange}
                    name="phone"
                    value={phone.value}
                    label="Mobile"
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
                      bgcolor: "transparent",
                      "& input": {
                        bgcolor: "transparent",
                      },
                    }}
                    value={gender.value}
                    renderInput={(params) => (
                      <TextFieldStyled {...params} label="Gender" />
                    )}
                  />
                </Stack>
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
                </Stack>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
      {succes}
    </Box>
  );
}
const genderOption = [
  { label: "Male", id: 1 },
  { label: "Female", id: 2 },
];
function ChangePassword(props) {
  const [email, setEmail] = React.useState({ value: "", valid: false });
  const [password, setPassword] = React.useState({ value: "", valid: false });
  const [np, setNp] = React.useState({ value: "", valid: false });
  const [submitDisabled, setSubmitDisabled] = React.useState(false);
  const handleSubmitDisabled = () => {
    if (email.valid && password.valid && np.valid) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };
  const handleCancel = () => {
    setEmail({ value: "", valid: false });
    setPassword({ value: "", valid: false });
    setNp({ value: "", valid: false });
    handleSubmitDisabled();
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail({ value, valid: value.length > 0 });
        break;
      case "password":
        setPassword({ value, valid: value.length > 0 });
        break;
      case "np":
        setNp({ value, valid: value.length > 0 });
        break;
      default:
        break;
    }
  };
  const { isLoading1, data1, refetch } = useQuery(
    "editUser",
    async () => {
      return axios.post("http://localhost:8000/api/ChangePassword", {
        email: email.value,
        password: password.value,
        np: np.value,
        id: props.id,
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
  const handleSubmit = (event) => {
    refetch().then((res) => {
      if (res.data.data === "success") {
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
              Your password is changed --<strong>check it out!</strong>
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
              vertical: "top",
              horizontal: "center",
            }}
            open={true}
            autoHideDuration={5000}
          >
            <Alert variant="filled" severity="error">
              <AlertTitle>failed</AlertTitle>
              Failed changed invalid informations --
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
  React.useEffect(() => {
    handleSubmitDisabled();
  }, [email, np, password]);
  return (
    <Grid item xs={12}>
      <MainCard sx={{ width: "100%", height: "100%" }}>
        <Grid container>
          <Grid item xs={12} mb={1} display="flex" justifyContent="center">
            <Typography variant="h3">Security Settings</Typography>
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
              <TextFieldStyled
                onChange={handleChange}
                name="password"
                value={password.value}
                label="Current password"
                type="password"
                fullWidth
              />
              <TextFieldStyled
                onChange={handleChange}
                name="np"
                value={np.value}
                label="New password"
                type="password"
                fullWidth
              />
            </Stack>
          </Grid>
          <Grid item xs={12} mb={5}>
            <Stack spacing={2} direction="row" sx={{}}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={submitDisabled}
              >
                Save
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </MainCard>
      {succes}
    </Grid>
  );
}
export default Profil;
