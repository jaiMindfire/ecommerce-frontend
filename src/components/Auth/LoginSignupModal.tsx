//React Imports
import React, { useState, Suspense, lazy } from "react";
//3rd Party Imports
import { Dialog, DialogContent, Tabs, Tab, Box } from "@mui/material";
//Static Imports
import SkeletonLoader from "./LoginSkeleton";
// Lazy-loaded components
const LoginPage = lazy(() => import("@components/Auth/Login"));
const SignupPage = lazy(() => import("@components/Auth/Signiup"));

// Props interface for LoginSignupModal
interface LoginSignupModalProps {
  open: boolean;
  handleClose: () => void;
}

const LoginSignupModal: React.FC<LoginSignupModalProps> = ({
  open,
  handleClose,
}) => {
  //states
  const [tabValue, setTabValue] = useState<number>(0);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="login-signup-dialog"
      aria-describedby="login-signup-content"
    >
      <DialogContent dividers>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ marginBottom: 2 }}
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>

        <Suspense fallback={<SkeletonLoader />}>
          {tabValue === 0 && <LoginPage />}
          {tabValue === 1 && <SignupPage />}
        </Suspense>
      </DialogContent>
    </Dialog>
  );
};

export default LoginSignupModal;
