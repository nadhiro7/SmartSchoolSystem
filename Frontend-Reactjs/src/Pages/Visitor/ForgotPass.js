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
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useQuery } from "react-query";
import axios from "axios";
function ForgotPass() {
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
    "ForgotPassword",
    async () => {
      return axios.post("http://localhost:8000/api/ForgotPassword", {
        email: username,
        password: password,
        time: new Date().toLocaleTimeString().slice(0, 8),
        date: new Date().toISOString().split("T")[0],
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
  const [state, setState] = React.useState();
  const strin = <Typography variant="body2">{state}</Typography>;
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
  const handleSubmit = () => {
    CheckValidForm();
    if (validForm) {
      refetch().then((res) => {
        if (res.data.data == "success") {
          setState("your reqeust is send");
          setPassword("");
          setUsername("");
          setTimeout(() => {
            setState("");
          }, 5000);
        } else {
          setState("your information is invalid");
          setPassword("");
          setUsername("");
          setTimeout(() => {
            setState("");
          }, 5000);
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
        xs={11}
        sm={8}
        md={5}
        sx={{ bgcolor: "background.paper", paddingLeft: "0px !important" }}
        justifyContent="center"
        alignItems="center"
        display="flex"
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
              <Typography
                variant="h2"
                noWrap
                component="div"
                color="primary"
                sx={{ fontSize: { xs: "16px", md: "h2" }, fontWeight: "bold" }}
              >
                Forgot Password
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={9} sx={{ textAlign: "center" }}>
            <Typography variant="body1" component="div">
              Please enter Your email and new password and wait until admin
              accept your request
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
                label="Your New Password"
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
                Submit
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box sx={{ textAlign: "center" }}>{strin}</Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ForgotPass;
