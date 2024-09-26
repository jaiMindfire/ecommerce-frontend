import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import { CssBaseline } from "@mui/material";

const App: React.FC = () => {
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      <Outlet />
    </ThemeProviderWrapper>
  );
};

export default App;
