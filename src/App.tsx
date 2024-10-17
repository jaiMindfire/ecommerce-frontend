import React from "react";
import { Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { PopupProvider } from "./store/context/LoginPopupContext";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ThemeProvider } from "@mui/system";

const App: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* for login/signup popup  */}
      <PopupProvider>
        <Outlet />
      </PopupProvider>
    </ThemeProvider>
  );
};

export default App;
