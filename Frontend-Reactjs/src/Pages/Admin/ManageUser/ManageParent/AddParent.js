import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
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
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import {
  Home as HomeIcon,
  Person,
} from "@mui/icons-material";
import MainCard from "./../../../../Components/MainCard";
import { useQuery } from "react-query";
import axios from "axios";
import { shouldForwardProp } from "@mui/system";

const TextFieldStyled = styled(TextField, { shouldForwardProp })(
  ({ theme }) => ({
    background: theme.palette.primary.light,
    borderRadius: `7px`,
    "& .MuiInputBase-input": {
      background: theme.palette.primary.light,
    },
  })
);
function AddParent() {
  const [firstname, setFirstname] = React.useState({ value: "", valid: false });
  const [lastname, setLastname] = React.useState({ value: "", valid: false });
  const [username, setUsername] = React.useState({ value: "", valid: false });
  const [email, setEmail] = React.useState({ value: "", valid: false });
  const [phone, setPhone] = React.useState({ value: "", valid: false });
  const [birthday, setBirthday] = React.useState({
    value: new Date(),
    valid: true,
  });
  const [gender, setGender] = React.useState({ value: "", valid: false });
  const [password, setPassword] = React.useState({ value: "", valid: false });
  const [address, setAddress] = React.useState({ value: "", valid: false });
  const [submitDisabled, setSubmitDisabled] = React.useState(true);
  const [re_EnterPassword, setRe_EnterPassword] = React.useState({
    value: "",
    valid: false,
  });
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
      case "email":
        setEmail({ value, valid: value.length > 0 });
        break;
      case "phone":
        setPhone({ value, valid: value.length > 0 });
        break;
      case "password":
        setPassword({ value, valid: value.length > 0 });
        break;
      case "re_EnterPassword":
        setRe_EnterPassword({
          value,
          valid: value.length > 0 && value == password.value,
        });
        break;
      case "address":
        setAddress({ value, valid: value.length > 0 });
        break;
      default:
        break;
    }
  };

  const handleBirthdayChange = (event) => {
    setBirthday({ value: event.target.value, valid: true });
  };
  const handleGenderChange = (event, newValue) => {
    setGender({ value: newValue, valid: true });
  };
  const handleSubmitDisabled = () => {
    if (
      firstname.valid &&
      lastname.valid &&
      username.valid &&
      email.valid &&
      phone.valid &&
      birthday.valid &&
      password.valid &&
      re_EnterPassword.valid &&
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
  }, [
    firstname,
    lastname,
    username,
    email,
    phone,
    birthday,
    password,
    address,
    re_EnterPassword,
  ]);
  const [success, setSuccess] = React.useState("");
  const succes = <>{success}</>;
  const handleSubmit = (event) => {
    refetch().then((res) => {
      if (res.data.data === "Your informations is invalid") {
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
              Informations is invalid --
              <strong>check it out!</strong>
            </Alert>
          </Snackbar>
        );
        setTimeout(() => {
          setSuccess("");
          handleCancel();
        }, 4000);
      } else {
        if (res.data.data === "Successfully Add") {
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
        }else{
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
        }
      }
    });
  };
  const handleCancel = () => {
    setFirstname({ value: "", valid: false });
    setLastname({ value: "", valid: false });
    setUsername({ value: "", valid: false });
    setAddress({ value: "", valid: false });
    setEmail({ value: "", valid: false });
    setPhone({ value: "", valid: false });
    setGender({ value: "", valid: false });
    setPassword({ value: "", valid: false });
    setRe_EnterPassword({ value: "", valid: false });
    setBirthday({ value: new Date(), valid: true });
  };
  const { isLoading, error, data, refetch } = useQuery(
    "createParent",
    async () => {
      return axios.post("http://localhost:8000/api/register", {
        firstname: firstname.value,
        lastname: lastname.value,
        username: username.value,
        email: email.value,
        password: password.value,
        gender: gender.value.label,
        phone: phone.value,
        address: address.value,
        birthday: birthday.value,
        isValidate: 1,
        type: "parent",
      });
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
                <Typography variant="h3">Add New Parent</Typography>
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
                  <TextFieldStyled
                    onChange={handleChange}
                    name="username"
                    value={username.value}
                    label="Username"
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
                  <TextFieldStyled
                    value={birthday.value}
                    onChange={handleBirthdayChange}
                    type="date"
                    fullWidth
                  />
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
                <Stack
                  spacing={2}
                  direction={{ xs: "column", md: "row" }}
                  sx={{ width: "100%" }}
                >
                  <TextFieldStyled
                    onChange={handleChange}
                    name="password"
                    value={password.value}
                    label="Password"
                    type="password"
                    fullWidth
                  />
                  <TextFieldStyled
                    onChange={handleChange}
                    name="re_EnterPassword"
                    value={re_EnterPassword.value}
                    label="Re-Enter Password"
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
                    Submit
                  </Button>
                  <Button variant="contained" onClick={handleCancel}>
                    Reset
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
      <Typography
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "0.9rem",
        }}
        color="text.primary"
      >
        <Person sx={{ mr: 0.5 }} color="primary" fontSize="medium" />
        Users
      </Typography>
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
        to="/admin/users/parents"
      >
        Parents
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
        to="/admin/users/parents/addParent"
      >
        Add Parents
      </Link>
    </Breadcrumbs>
  );
}

export default AddParent;
