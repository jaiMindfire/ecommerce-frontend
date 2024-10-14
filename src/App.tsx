import React from "react";
import { Outlet } from "react-router-dom";
import { ThemeProviderWrapper } from "./store/context/ThemeContext";
import { CssBaseline } from "@mui/material";
import { PopupProvider } from "./store/context/LoginPopupContext";

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
