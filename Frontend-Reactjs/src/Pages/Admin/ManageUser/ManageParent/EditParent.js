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
import { Link as RouterLink, useParams, useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  Person,
} from "@mui/icons-material";
import MainCard from "./../../../../Components/MainCard";
import { shouldForwardProp } from "@mui/system";
import { useQuery } from "react-query";
import axios from "axios";
import useGetUser from "../../../../Hooks/useGetUser";
const TextFieldStyled = styled(TextField, { shouldForwardProp })(
  ({ theme }) => ({
    borderRadius: `7px`,
    "& .MuiInputBase-input": {
      background: theme.palette.primary.light,
    },
  })
);
function EditParent() {
  const params = useParams();
  const navigate = useNavigate();
  const parentId = params.parentId;
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
        setPassword({ value, valid: true });
        break;
      case "re_EnterPassword":
        setRe_EnterPassword({
          value,
          valid: value == password.value,
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
    setGender({ value: newValue.label, valid: true });
  };

  const handleSubmitDisabled = () => {
    if (
      firstname.valid &&
      lastname.valid &&
      username.valid &&
      email.valid &&
      phone.valid &&
      birthday.valid &&
      address.valid &&
      re_EnterPassword.value == password.value &&
      gender.valid
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  };
  const getUser = useGetUser(parentId);
  if (getUser.data) {
    if (getUser.data.data == "fail") {
      navigate(-2);
    }
  }

  React.useEffect(() => {
    if (
      !parentId ||
      parentId === undefined ||
      parentId === "" ||
      parentId === "undefined"
    ) {
      navigate(-2);
    }
    if (getUser.data) {
      if (getUser.data.data != "fail") {
      }
    }
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
    getUser.data,
  ]);
  const { isLoading1, data1, refetch } = useQuery(
    "editUser",
    async () => {
      return axios.post("http://localhost:8000/api/editUser", {
        firstname: firstname.value,
        lastname: lastname.value,
        username: username.value,
        email: email.value,
        gender: gender.value,
        birthday: birthday.value,
        address: address.value,
        phone: phone.value,
        password: password.value,
        id: parentId,
      });
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
          setEmail({ value: getUser.data.data.email, valid: true });
          setPhone({ value: getUser.data.data.phone, valid: true });
          setGender({ value: getUser.data.data.gender, valid: true });
          setBirthday({ value: getUser.data.data.birthday, valid: true });
          setPassword({ value: getUser.data.data.password, valid: true });
          setAddress({ value: getUser.data.data.address, valid: true });
          setRe_EnterPassword({
            value: getUser.data.data.password,
            valid: true,
          });
        }
      }
    }
    doSomthing();
  }, [getUser.data]);
  const [success, setSuccess] = React.useState("");
  const succes = (
    <>
      {success}
    </>
  );
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
                  <Alert
                    variant="filled"
                    severity="success"
                    sx={{ width: "100%" }}
                  >
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
        setEmail({ value: getUser.data.data.email, valid: true });
        setPhone({ value: getUser.data.data.phone, valid: true });
        setGender({ value: getUser.data.data.gender, valid: true });
        setBirthday({ value: getUser.data.data.birthday, valid: true });
        setPassword({ value: getUser.data.data.password, valid: true });
        setAddress({ value: getUser.data.data.address, valid: true });
        setRe_EnterPassword({ value: getUser.data.data.password, valid: true });
      }
    }
  };
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
        <IconBreadcrumbs parentId={parentId} />
      </Box>
      <Grid container mt={2}>
        <Grid item xs={12}>
          <MainCard sx={{ width: "100%", height: "100%" }}>
            <Grid container>
              <Grid item xs={12} mb={1} display="flex" justifyContent="center">
                <Typography variant="h3">Edit Parent</Typography>
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
                    label="change Password"
                    type="password"
                    fullWidth
                    helperText="if you don't change password please don't fill it"
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
        to={`/admin/users/parents/EditParent/${props.parentId}`}
      >
        Edit Parents
      </Link>
    </Breadcrumbs>
  );
}

export default EditParent;
