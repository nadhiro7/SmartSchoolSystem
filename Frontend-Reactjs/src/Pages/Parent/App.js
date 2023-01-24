import React from "react";
import SideBar from "./../../Components/SideBar";
import NavBar from "./../../Components/NavBar";
import { Box, CssBaseline, Container } from "@mui/material";
import { appMenu, otherMenu } from "../../Routes/ParentMenu";
import Routes from "./../../Routes/ParentRoutes";
function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavBar open={open} handleOpen={handleOpen} />
      <SideBar open={open} listApp={appMenu} listOther={otherMenu} />
      <Container
        sx={{
          transform: "translateY(60px)",
          pl: 2,
          pr: 2,
          height: "max-content",
        }}
      >
        <Routes />
      </Container>
    </Box>
  );
}

export default App;
