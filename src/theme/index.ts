import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00796b",
      light: "#4DA48C",
    },
    secondary: {
      main: "#ff4081",
      contrastText: "#fff",
    },
    background: {
      default: "#fffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif", // A clean, readable font
    button: {
      fontWeight: 600, // Make call-to-action buttons stand out
    },
    h1: {
      fontSize: "2.5rem", // Large headlines for product sections
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.75rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00796b" },
    secondary: { main: "#ff4081" },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    button: {
      fontWeight: 600,
    },
    h1: {
      fontSize: "2.5rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.75rem",
    },
  },
  shape: {
    borderRadius: 8,
  },
});
