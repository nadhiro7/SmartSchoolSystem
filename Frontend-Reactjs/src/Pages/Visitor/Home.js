import React from "react";
import VisitorHeader from "../../Components/VistorHeader";
import {
  Stack,
  Box,
  Typography,
  Container,
  Button,
  Paper,
  CardContent,
  Card,
  TextareaAutosize,
  CardMedia,
  TextField,
  useFormControl,
} from "@mui/material";
import landingBackground from "../../Images/BgHome.jpg";
import ManagementPhoto from "../../Images/Management.png";
import LearningPhoto from "../../Images/Learning.png";
import TeachingPhoto from "../../Images/Teaching.png";
import { Send } from "@mui/icons-material";
import {
  BrowserRouter,
  Router,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./Register/SignUp";
function Home() {
  return (
    <Stack>
      <Stack
        sx={{
          background: `url( ${landingBackground} )`,
          backgroundSize: "cover",
          width: "100%",
          height: "100vh",
        }}
      >
        <VisitorHeader />
        <Container maxWidth="md">
          <Box sx={{ mt: "170px", width: { xs: "300px", md: "400px" } }}>
            <Stack spacing={2}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  color: "white",
                  fontSize: { xs: "h3", md: "h2" },
                  fontWeight: "bold",
                }}
              >
                Welcome to My Smart School
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                sx={{ color: "white", fontSize: { xs: "h4", md: "h3" } }}
              >
                A place to learn and grow
              </Typography>
              <Typography variant="body1" component="p" sx={{ color: "white" }}>
                Smart schools, is an advanced school model, provide
                opportunities and conditions for schools to improve their
                adaptive capacity and balance development in the face of rapid
                changes in society in general.
              </Typography>
              <Stack spacing={2}>
                <Typography
                  variant="body1"
                  component="p"
                  sx={{ color: "white" }}
                >
                  Join us today and start learning
                </Typography>
                <Stack
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-Start",
                  }}
                  spacing={1}
                  direction="row"
                >
                  <Button
                    to="/Signup"
                    component={Link}
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: "h4", fontWeight: "bold" }}
                  >
                    Sign up
                  </Button>
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ color: "white" }}
                  >
                    or
                  </Typography>
                  <Button
                    to="/Login"
                    component={Link}
                    variant="contained"
                    textColor="text.primary"
                    sx={{
                      fontSize: "h4",
                      fontWeight: "bold",
                      textColor: "text.primary",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Stack>
      {/* <HomeBody></HomeBody> */}
    </Stack>
  );
}

// function HomeBody() {
//   return (
//     <>
//       <Stack sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
//         <Container maxWidth="md">
//           <Box
//             sx={{
//               pt: "50px",
//               pb: "50px",
//               display: { xs: "block", md: "flex" },
//               alignItems: "center",
//               flexDirection: "column",
//               textAlign: "center",
//             }}
//           >
//             <Typography
//               variant="h4"
//               component="h1"
//               sx={{
//                 mb: "30px",
//                 fontSize: { xs: "h3", md: "h2" },
//                 fontWeight: "bold",
//               }}
//             >
//               About Us
//             </Typography>
//             <Typography
//               variant="h5"
//               component="h2"
//               gutterBottom
//               sx={{ fontSize: { xs: "h4", md: "h3" } }}
//             >
//               What is My Smart School?
//             </Typography>
//             <Typography
//               variant="body1"
//               component="p"
//               sx={{ color: "black", maxWidth: "400px" }}
//             >
//               Smart school is a web application that provides a platform for
//               students to learn and grow, It is a learning management system.
//             </Typography>
//           </Box>
//           <Box>
//             <Typography
//               variant="h5"
//               component="h2"
//               gutterBottom
//               sx={{ fontSize: { xs: "h4", md: "h3" }, textAlign: "center" }}
//             >
//               Why My Smart School?
//             </Typography>
//             <Stack
//               spacing={2}
//               sx={{ mt: "20px", mb: "35px" }}
//               direction={{ xs: "column", md: "row" }}
//             >
//               <Card sx={{ maxWidth: 345 }}>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={ManagementPhoto}
//                   alt="Management"
//                   sx={{ objectFit: "fill" }}
//                 />
//                 <CardContent>
//                   <Typography
//                     gutterBottom
//                     sx={{ color: "black" }}
//                     variant="h5"
//                     component="div"
//                   >
//                     Management
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "grey" }}>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                     Donec eget ex euismod, euismod nisi eu,
//                   </Typography>
//                 </CardContent>
//               </Card>
//               <Card sx={{ maxWidth: 345 }}>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={LearningPhoto}
//                   alt="Learning"
//                   sx={{ objectFit: "fill" }}
//                 />
//                 <CardContent>
//                   <Typography
//                     gutterBottom
//                     sx={{ color: "black" }}
//                     variant="h5"
//                     component="div"
//                   >
//                     Learning
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "grey" }}>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                     Donec eget ex euismod, euismod nisi eu,
//                   </Typography>
//                 </CardContent>
//               </Card>
//               <Card sx={{ maxWidth: 345 }}>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={TeachingPhoto}
//                   alt="Teaching"
//                   sx={{ objectFit: "fill" }}
//                 />
//                 <CardContent>
//                   <Typography
//                     gutterBottom
//                     sx={{ color: "black" }}
//                     variant="h5"
//                     component="div"
//                   >
//                     Teaching
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: "grey" }}>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                     Donec eget ex euismod, euismod nisi eu,
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Stack>
//           </Box>
//         </Container>
//       </Stack>
//       <Stack sx={{ pt: "40px", pb: "40px" }}>
//         <Container maxWidth="md">
//           <Typography
//             variant="h4"
//             component="h1"
//             sx={{
//               textAlign: "center",
//               mb: "30px",
//               fontSize: { xs: "h3", md: "h2" },
//               fontWeight: "bold",
//             }}
//           >
//             Contact Us
//           </Typography>
//           <Stack sx={{ width: "100%", alignItems: "center" }}>
//             <Paper
//               sx={{ pt: "20px", pb: "20px", pl: "10px", pr: "10px" }}
//               elevation={3}
//               square
//             >
//               <Stack spacing={2} sx={{ width: { xs: "100%", md: "400px" } }}>
//                 <TextField
//                   id="outlined-basic"
//                   sx={{ maxWidth: "400px", height: "45px" }}
//                   color="primary"
//                   label="Name"
//                   variant="standard"
//                 />
//                 <TextField
//                   id="outlined-basic"
//                   sx={{ maxWidth: "400px", height: "45px" }}
//                   color="primary"
//                   label="Email"
//                   variant="standard"
//                 />
//                 <TextareaAutosize
//                   aria-label="minimum height"
//                   minRows={5}
//                   placeholder="Your Message"
//                   style={{ maxWidth: 400, padding: "7px" }}
//                   sx={{ "&:focus": { outline: "none" } }}
//                   color="primary"
//                 />
//                 <Button
//                   startIcon={<Send />}
//                   variant="contained"
//                   color="primary"
//                   sx={{ fontSize: "h4", fontWeight: "bold" }}
//                 >
//                   Send
//                 </Button>
//               </Stack>
//             </Paper>
//           </Stack>
//         </Container>
//       </Stack>
//     </>
//   );
// }

export default Home;
