import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProviderWrapper } from "./context/ThemeContext";
import { CssBaseline } from "@mui/material";
import { PopupProvider } from "./context/LoginPopupContext";

const App: React.FC = () => {
  return (
    <ThemeProviderWrapper>
      <CssBaseline />
      <PopupProvider>
        <Outlet />
      </PopupProvider>
    </ThemeProviderWrapper>
  );
};

export default App;
