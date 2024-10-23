// React Imports
import React from "react";
// 3rd Party Imports
import { Snackbar, Alert } from "@mui/material";

interface SnackbarMessageProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type: "success" | "error";
}

const SnackbarMessage: React.FC<SnackbarMessageProps> = ({
  open,
  onClose,
  message,
  type,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMessage;
