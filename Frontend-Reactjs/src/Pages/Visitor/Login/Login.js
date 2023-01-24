import React from "react";
import {
  Stack,
  Box,
  TextField,
  Grid,
  Button,
  IconButton,
  Typography,
  FormHelperText,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import image from "./../../../Images/5098293.jpg";
import svgBg from "./../../../Images/svgBackground.svg";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useQuery } from "react-query";
import axios from "axios";
function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [username, setUsername] = React.useState("");
  const [user, setUser] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [validPassword, setValidPassword] = React.useState(true);
  const [validUsername, setValidUsername] = React.useState(true);
  const [validForm, setValidForm] = React.useState(false);
  const refBut = React.useRef();
  const { isLoading, data, refetch } = useQuery(
    "getUser",
    async () => {
      return axios.post("http://localhost:8000/api/login", {
        email: username,
        password: password,
      });
    },
    {
      enabled: false,
      cacheTime: 1000,
      staleTime: 1000,
    }
  );

  const CheckValidForm = () => {
    if (!password || !username) {
      setValidForm(false);
    } else {
      setValidForm(true);
    }
  };
  const strin = (
    <FormHelperText error>
      {user == "fail" ? "your email or password invalid" : ""}
    </FormHelperText>
  );
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
    if (event.target.value === "") {
      setValidUsername(false);
    } else {
      setValidUsername(true);
    }
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    if (event.target.value === "") {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  };
  React.useEffect(() => {
    function doSomthing() {
      CheckValidForm();
    }
    doSomthing();
  }, [username, password]);
  React.useEffect(() => {
    console.log(user);
    if (user) {
      if (user != "fail") {
        if (user.type === "admin") {
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/admin");
        } else if (user.type === "secretary") {
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/secretary");
        } else if (user.type === "teacher") {
          localStorage.setItem("user", JSON.stringify(user));
          navigate("/teacher");
        } else if (user.type === "parent") {
          if (user.isValidate !== 0) {
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/parent");
          }
        }
      }
    }
  }, [user]);
  const handleSubmit = () => {
    CheckValidForm();
    if (validForm) {
      refetch().then((res) => {
        if (res.isSuccess) {
          setUser(res.data.data);
        } else {
          setError(res.data.message);
        }
      });
    }
  };
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
        xs={false}
        sm={false}
        md={7}
        lg={7}
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
        sx={{ bgcolor: "background.paper", paddingLeft: "0px !important" }}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          spacing={1.5}
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
                color="primary"
                edge="start"
                aria-label="Logo"
                sx={{ mr: 0.5 }}
              >
                <SchoolIcon fontSize="large" />
              </IconButton>
              <Typography
                variant="h2"
                noWrap
                component="div"
                color="primary"
                sx={{ fontSize: { xs: "16px", md: "h2" }, fontWeight: "bold" }}
              >
                Welcome To SmartSchool
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={9} sx={{ textAlign: "center" }}>
            <AccountCircleIcon fontSize="large" sx={{ opacity: "0.3" }} />
            <Typography
              variant="h4"
              noWrap
              component="div"
              sx={{ fontSize: { xs: "14px", md: "h3" }, fontWeight: "bold" }}
            >
              Sign in
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ textAlign: "center" }}>
              <TextField
                id="outlined-basic"
                label="email"
                type="email"
                variant="standard"
                fullWidth
                onChange={handleChangeUsername}
                value={username}
                required
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ textAlign: "center" }}>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="standard"
                fullWidth
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={handleChangePassword}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  ),
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ textAlign: "end" }}>
              <Button
                variant="text"
                to="/forgotPassword"
                component={Link}
                color="primary"
              >
                Forgot Password?
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ textAlign: "center" }}>
              <Button
                size="large"
                variant="contained"
                sx={{ color: "white", fontWeight: "semi-bold" }}
                color="primary"
                ref={refBut}
                disabled={!validForm}
                onClick={handleSubmit}
                fullWidth
              >
                Sign in
              </Button>
              {strin}
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Stack
              sx={{ alignItems: "center", justifyContent: "center" }}
              direction="row"
            >
              <Typography variant="body2" color="textSecondary" component="p">
                Don't have an account?
              </Typography>
              <Button
                component={Link}
                to="/Signup"
                variant="text"
                sx={{ fontWeight: "bold" }}
                color="primary"
              >
                Sign Up
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
