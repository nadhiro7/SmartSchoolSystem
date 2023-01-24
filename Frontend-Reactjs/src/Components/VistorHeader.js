import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";
const pages = ["Home", "Sign up", "Sign in"];
const hrefs = ["", "Signup", "Login"];
const VisitorHeader = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "transparent", color: "white" }}
      elevation={0}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              mr: 2,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="Logo"
              sx={{ mr: 1 }}
              size="large"
            >
              <SchoolIcon />
            </IconButton>
            <Typography variant="h4" noWrap component="div" color={"#fff"}>
              My Smart School
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
              size="large"
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {pages.map((page, index) => (
                    <Button
                      component={Link}
                      to={hrefs[index]}
                      color="inherit"
                      sx={{ mr: 2 }}
                    >
                      {page}
                    </Button>
                  ))}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="div"
            color={"#fff"}
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              display: { xs: "flex", md: "none" },
            }}
          >
            My Smart School
          </Typography>
          <Stack
            sx={{ display: { xs: "none", md: "flex" } }}
            spacing={1}
            direction="row"
          >
            {pages.map((page, index) => (
              <Button
                to={hrefs[index]}
                component={Link}
                color="inherit"
                sx={{ mr: 2 }}
              >
                {page}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default VisitorHeader;
