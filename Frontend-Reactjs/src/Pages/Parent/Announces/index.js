import React from "react";
import {
  Box,
  Grid,
  Breadcrumbs,
  Popover,
  Card,
  Autocomplete,
  Table,
  TextareaAutosize,
  TableRow,
  TableBody,
  TableHead,
  IconButton,
  CircularProgress,
  Divider,
  Typography,
  ButtonBase,
  Stack,
  TextField,
  styled,
  Button,
  useTheme,
} from "@mui/material";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import {
  Home as HomeIcon,
  Camera,
  AddAPhoto,
  Delete,
  Add,
  Close,
} from "@mui/icons-material";
import MainCard from "./../../../Components/MainCard";
import { DataGrid } from "@mui/x-data-grid";
import { shouldForwardProp } from "@mui/system";
import Announce from "./../../../Components/AnnounceView";
import announcePhoto from "./../../../Images/Management.png";
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
function Announces() {
  const theme = useTheme();

  const getAllAnnounces = useQuery("getAllAnnounces", async () => {
    return axios.get("http://localhost:8000/api/getAllAnnounces");
  });
  const view = !getAllAnnounces.isLoading ? (
    getAllAnnounces.data.data.length != 0 ? (
      getAllAnnounces.data.data.reverse().map((item, index) => {
        return (
          <Grid
            item
            display="flex"
            justifyContent="center"
            key={index}
            mb={1}
            mt={1}
            xs={12}
          >
            <MainCard
              sx={{
                width: { xs: "100%", sm: "400px" },
                height: "100%",
              }}
            >
              <Announce announce={item} />
            </MainCard>
          </Grid>
        );
      })
    ) : (
      <Grid
        item
        xs={12}
        height={300}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="subtitle1">Annouces are Vide</Typography>
      </Grid>
    )
  ) : (
    <Grid
      item
      xs={12}
      height={300}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress color="secondary"></CircularProgress>
    </Grid>
  );
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
              <Grid item xs={12} sx={{ backgroundColor: "#9e9e9e5c", p: 1 }}>
                <Grid container display="flex" alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">Announces</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container>{view}</Grid>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </Box>
  );
}

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
        to="/parent"
      >
        <HomeIcon sx={{ mr: 0.5 }} color="primary" fontSize="medium" />
        Parent
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
        to="/admin/announces"
      >
        Announces
      </Link>
    </Breadcrumbs>
  );
}
export default Announces;
