//3rd Party Imports
import { Outlet } from "react-router-dom";
import { Box, Grid } from "@mui/material";
//Static Imports
import Navbar from "@components/Navbar";
import ShoppingFilterPage from "@components/FilterComponent";

function NavbarWithFilterLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          bgcolor: "background.default",
          width: "100%",
        }}
      >
        <ShoppingFilterPage />
        <Outlet />
      </Box>
    </Box>
  );
}

export default NavbarWithFilterLayout;
