import React from "react";
import {
  Stack,
  InputAdornment,
  createTheme,
  ThemeProvider,
  Box,
  TextField,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Button,
  IconButton,
  Typography,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import {
  VisibilityOffOutlined,
  VisibilityOutlined,
  Lock,
  Person,
  Map,
  Mail,
  CalendarMonth,
  Phone,
} from "@mui/icons-material";
import image from "./../../../Images/6300959.jpg";
import svgBg from "./../../../Images/svgBackground.svg";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { CheckCircle, CloseOutlined } from "@mui/icons-material";

const steps = ["User Information", "Account Information", "Account Security"];
function SignUp() {
  const SignUp = useQuery(
    "createUser",
    async () => {
      return axios.post("http://localhost:8000/api/register", {
        firstname: firstname.value,
        lastname: lastname.value,
        username: username.value,
        email: email.value,
        password: password.value,
        gender: gender.value ? gender.value : "Male",
        phone: phone.value,
        address: address.value,
        birthday: birthday.value,
        isValidate: 0,
        type: "parent",
        time: new Date().toLocaleTimeString().slice(0, 8),
        date: new Date().toISOString().split("T")[0],
      });
    },
    {
      enabled: false,
      cacheTime: 1000,
      staleTime: 1000,
      keepPreviousData: false,
    }
  );
  const [message, setMessage] = React.useState(false);
  const handleSubmit = () => {
    if (
      password.value.length > 0 &&
      confirmPassword.value.length > 0 &&
      confirmPassword.value == password.value
    ) {
      SignUp.refetch().then((res) => {
        if (res.data.data == "Successfully Add") {
          setMessage(true);
        } else {
          setMessage(false);
        }
        handleNext();
      });
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [firstname, setFirstname] = React.useState({
    value: "",
    validValue: true,
  });
  const [lastname, setLastname] = React.useState({
    value: "",
    validValue: true,
  });
  const [email, setEmail] = React.useState({
    value: "",
    validValue: true,
  });
  const [phone, setPhone] = React.useState({
    value: "",
    validValue: true,
  });
  const [address, setAddress] = React.useState({
    value: "",
    validValue: true,
  });
  const [username, setUsername] = React.useState({
    value: "",
    validValue: true,
  });
  const [birthday, setBirthday] = React.useState({
    value: "",
    validValue: true,
  });
  const [password, setPassword] = React.useState({
    value: "",
    validValue: true,
  });
  const [confirmPassword, setConfirmPassword] = React.useState({
    value: "",
    validValue: true,
  });
  const [gender, setGender] = React.useState({
    value: "",
    validValue: true,
  });
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleGenderChange = (event, newValue) => {
    setGender({ value: newValue, valid: true });
  };
  const [validForm, setValidForm] = React.useState(true);
  const handleChangeEvent = (event) => {
    console.log(event.target.name);
    switch (event.target.name) {
      case "Firstname":
        setFirstname({
          value: event.target.value,
          validValue: event.target.value !== "",
        });
        break;
      case "Lastname":
        setLastname({
          value: event.target.value,
          validValue: event.target.value !== "",
        });
        break;
      case "Email":
        setEmail({
          value: event.target.value,
          validValue: event.target.value !== "",
        });
        break;
      case "Phone":
        setPhone({
          value: event.target.value,
          validValue: event.target.value !== "",
        });
        break;
      case "Address":
        setAddress({
          value: event.target.value,
          validValue: event.target.value !== "",
        });
        break;
      case "Username":
        setUsername({
          value: event.target.value,
          validValue: event.target.value !== "",
        });
        break;
      case "Birthday":
        setBirthday({
          value: event.target.value,
          validValue: event.target.value !== "",
        });
        break;
      case "Password":
        setPassword({
          value: event.target.value,
          validValue: event.target.value !== "",
        });
        break;
      case "ConfirmPassword":
        setConfirmPassword({
          value: event.target.value,
          validValue: event.target.value !== "",
        });
        break;
      default:
        break;
    }
  };
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep === 0) {
      if (
        firstname.value === "" ||
        lastname.value === "" ||
        address.value === "" ||
        birthday.value === ""
      ) {
        setValidForm(false);
        setFirstname({
          value: firstname.value,
          validValue: firstname.value !== "",
        });
        setLastname({
          value: lastname.value,
          validValue: lastname.value !== "",
        });
        setAddress({
          value: address.value,
          validValue: address.value !== "",
        });
        setBirthday({
          value: birthday.value,
          validValue: birthday.value !== "",
        });
      } else {
        setValidForm(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 1) {
      if (
        email.value === "" ||
        username.value === "" ||
        phone.value === "" ||
        gender.validValue
      ) {
        setValidForm(false);
        setEmail({
          value: email.value,
          validValue: email.value !== "",
        });
        setUsername({
          value: username.value,
          validValue: username.value !== "",
        });
        setPhone({
          value: phone.value,
          validValue: phone.value !== "",
        });
      } else {
        setValidForm(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === 2) {
      if (
        password.value === "" ||
        confirmPassword.value === "" ||
        password.value !== confirmPassword.value
      ) {
        setValidForm(false);
        setPassword({
          value: password.value,
          validValue: password.value !== "",
        });
        setConfirmPassword({
          value: confirmPassword.value,
          validValue:
            confirmPassword.value !== "" ||
            password.value === confirmPassword.value,
        });
      } else {
        setValidForm(true);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const success =
    "All steps completed - your account has been created! please wait the admin accepte your account.";
  const error = "Your informations not valid please try again";
  return (
    <Grid
      container
      spacing={3}
      sx={{
        marginLeft: "0px !important",
        minHeight: "100vh",
        flexWrap: "nowrap",
        width: "100% !important",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        item
        sx={{ display: { xs: "none", md: "block" } }}
        sm={false}
        md={7}
      >
        <Box
          sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
          }}
        ></Box>
      </Grid>
      <Grid
        item
        xs={11}
        sm={8}
        md={5}
        sx={{ paddingLeft: "0px !important" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          spacing={0.5}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={9}>
            <Stack
              sx={{ alignItems: "center", justifyContent: "center" }}
              direction="row"
            >
              <IconButton
                component={Link}
                to="/"
                size="large"
                edge="start"
                aria-label="Logo"
                sx={{ mr: 0.5 }}
                color="primary"
              >
                <SchoolIcon fontSize="large" />
              </IconButton>
              <Typography
                variant="h2"
                noWrap
                component="div"
                color="primary"
                sx={{
                  fontSize: { xs: "17px", md: "h2" },
                  fontWeight: "bold",
                }}
              >
                Create a Parent Account
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={9} sx={{ textAlign: "center" }}>
            <Typography
              variant="h5"
              noWrap
              component="div"
              color="text.disabled"
              sx={{
                fontSize: { xs: "h4", md: "h3" },
                fontWeight: "semi-bold",
              }}
            >
              SIGN UP
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box width="100%">
              <Stepper
                alternativeLabel
                fullWidth
                sx={{ mb: 3, mt: 2, fontSize: "10px" }}
                activeStep={activeStep}
              >
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel
                        {...labelProps}
                        sx={{ fontSize: "10px !important" }}
                      >
                        {label}
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      {message ? success : error}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button color="info" component={Link} to="/Login">
                      Sign in
                    </Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Stack spacing={1} direction="column">
                    {activeStep + 1 == 1 && (
                      <>
                        <Box sx={{ textAlign: "center" }}>
                          <InputField
                            type="text"
                            color="primary"
                            label="Firstname"
                            value={firstname.value}
                            icon={<Person />}
                            handleChangeEvent={handleChangeEvent}
                            validValue={firstname.validValue}
                          />
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                          <InputField
                            type="text"
                            color="primary"
                            label="Lastname"
                            value={lastname.value}
                            icon={<Person />}
                            handleChangeEvent={handleChangeEvent}
                            validValue={lastname.validValue}
                          />
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                          <InputField
                            type="text"
                            color="primary"
                            label="Address"
                            value={address.value}
                            icon={<Map />}
                            handleChangeEvent={handleChangeEvent}
                            validValue={address.validValue}
                          />
                        </Box>
                        <Box sx={{ textAlign: "center" }}>
                          <InputField
                            type="date"
                            color="primary"
                            label="Birthday"
                            value={birthday.value}
                            icon={<CalendarMonth />}
                            handleChangeEvent={handleChangeEvent}
                            validValue={birthday.validValue}
                          />
                        </Box>
                      </>
                    )}
                    {activeStep + 1 == 2 && (
                      <>
                        <Box sx={{ textAlign: "center" }}>
                          <InputField
                            type="text"
                            color="primary"
                            label="Username"
                            value={username.value}
                            icon={<Person />}
                            handleChangeEvent={handleChangeEvent}
                            validValue={username.validValue}
                          />
                        </Box>
                        <Box sx={{ textAlign: "center" }} flexBasis="48%">
                          <InputField
                            type="mail"
                            color="primary"
                            label="Email"
                            value={email.value}
                            icon={<Mail />}
                            handleChangeEvent={handleChangeEvent}
                            validValue={email.validValue}
                          />
                        </Box>
                        <Box sx={{ textAlign: "center" }} flexBasis="48%">
                          <InputField
                            label="Phone"
                            color="primary"
                            value={phone.value}
                            icon={<Phone />}
                            handleChangeEvent={handleChangeEvent}
                            validValue={phone.validValue}
                          />
                        </Box>
                        <Box sx={{ textAlign: "center" }} flexBasis="48%">
                          <Autocomplete
                            id="combo-box-demo"
                            options={["Male", "Female"]}
                            onChange={handleGenderChange}
                            value={gender.value}
                            fullWidth
                            color="primary"
                            renderInput={(params) => (
                              <TextField
                                variant="standard"
                                {...params}
                                label="Gender"
                              />
                            )}
                          />
                        </Box>
                      </>
                    )}
                    {activeStep + 1 == 3 && (
                      <>
                        <Box sx={{ textAlign: "center" }} flexBasis="48%">
                          <InputField
                            color="primary"
                            visibilOff={<VisibilityOffOutlined />}
                            visibilOn={<VisibilityOutlined />}
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            handleClickShowPassword={handleClickShowPassword}
                            icon={<Lock />}
                            value={password.value}
                            handleChangeEvent={handleChangeEvent}
                            validValue={password.validValue}
                            showPassword={showPassword}
                          />
                        </Box>
                        <Box sx={{ textAlign: "center" }} flexBasis="48%">
                          <InputField
                            color="primary"
                            visibilOff={<VisibilityOffOutlined />}
                            visibilOn={<VisibilityOutlined />}
                            label="ConfirmPassword"
                            icon={<Lock />}
                            type={showConfirmPassword ? "text" : "password"}
                            handleClickShowPassword={
                              handleClickShowConfirmPassword
                            }
                            value={confirmPassword.value}
                            handleChangeEvent={handleChangeEvent}
                            validValue={confirmPassword.validValue}
                            showPassword={showConfirmPassword}
                          />
                        </Box>
                      </>
                    )}
                  </Stack>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      pt: 2,
                      mt: 1.5,
                      mb: 1.5,
                    }}
                  >
                    <Button
                      color="primary"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1, color: "white", borderRadius: "0px" }}
                      variant="contained"
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button
                      sx={{ color: "white", borderRadius: "0px" }}
                      onClick={
                        activeStep === steps.length - 1
                          ? handleSubmit
                          : handleNext
                      }
                      color="primary"
                      variant="contained"
                    >
                      {activeStep === steps.length - 1 ? "Sign up" : "Next"}
                    </Button>
                  </Box>
                  <Stack
                    sx={{ alignItems: "center", justifyContent: "center" }}
                    direction="row"
                  >
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      you have an account?
                    </Typography>
                    <Button
                      component={Link}
                      to="/Login"
                      variant="text"
                      sx={{ fontWeight: "bold" }}
                      color="primary"
                    >
                      Sign in
                    </Button>
                  </Stack>
                </React.Fragment>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
function InputField(props) {
  return (
    <TextField
      id="outlined-basic"
      label={props.label}
      variant="standard"
      fullWidth
      value={props.value}
      required
      error={!props.validValue}
      helperText={!props.validValue ? `${props.label} is required` : ""}
      type={props.type}
      name={props.label}
      color="primary"
      onChange={(e) => props.handleChangeEvent(e)}
      InputProps={{
        endAdornment: (
          <IconButton onClick={props.handleClickShowPassword}>
            {props.showPassword ? props.visibilOff : props.visibilOn}
          </IconButton>
        ),
        startAdornment: (
          <InputAdornment position="start">
            {props.label === "phone" ? "+213" : props.icon}
          </InputAdornment>
        ),
      }}
    />
  );
}
export default SignUp;
